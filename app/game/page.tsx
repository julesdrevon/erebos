"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { useUnityContext } from "react-unity-webgl";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";

const Unity = dynamic(
  () => import("react-unity-webgl").then((mod) => mod.Unity),
  { ssr: false }
);

export default function Game() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/engine/Build/export.loader.js",
    dataUrl: "/engine/Build/export.data",
    frameworkUrl: "/engine/Build/export.framework.js",
    codeUrl: "/engine/Build/export.wasm",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const access = sessionStorage.getItem("access_token");
      const refresh = sessionStorage.getItem("refresh_token");

      if (!access || !refresh) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.post(
          "https://api.jules-drevon.fr/api/users/authenticated/",
          {},
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        if (res.data.authenticated) {
          setAuthToken(access);
          setRefreshToken(refresh);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Erreur de vérification :", err);
        router.push("/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  // Envoi des tokens à Unity une fois le jeu chargé
  useEffect(() => {
    if (isLoaded && authToken && refreshToken) {
      window.dispatchEvent(
        new CustomEvent("SendTokensToUnity", {
          detail: {
            accessToken: authToken,
            refreshToken: refreshToken,
          },
        })
      );
    }
  }, [isLoaded, authToken, refreshToken]);

  // Écoute côté Unity
  type UnityProviderWithSend = typeof unityProvider & {
    sendMessage: (gameObject: string, methodName: string, parameter: string) => void;
  };

  const unity = unityProvider as UnityProviderWithSend;
  useEffect(() => {
    const sendToUnity = (e: any) => {
      const { accessToken, refreshToken } = e.detail;
      if (typeof unity.sendMessage === "function") {
        unity.sendMessage("AuthReceiver", "ReceiveAccessToken", accessToken);
        unity.sendMessage("AuthReceiver", "ReceiveRefreshToken", refreshToken);
      }
    };

    window.addEventListener("SendTokensToUnity", sendToUnity);
    return () =>
      window.removeEventListener("SendTokensToUnity", sendToUnity);
  }, [unityProvider]);

  if (checkingAuth) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar />
      <main className="flex-1 overflow-hidden p-10">
        {!isLoaded && (
          <p className="text-white text-center">
            Chargement du jeu ({Math.round(loadingProgression * 100)}%)...
          </p>
        )}
        <Unity
          unityProvider={unityProvider}
          style={{ width: "100%", height: "100%", borderRadius: "8px" }}
          tabIndex={0}
        />
      </main>
      <Footer />
    </div>
  );
}
