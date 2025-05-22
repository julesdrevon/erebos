"use client";

import React, { Fragment, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Game() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: "/engine/Build/engine.loader.js",
    dataUrl: "/engine/Build/engine.data",
    frameworkUrl: "/engine/Build/engine.framework.js",
    codeUrl: "/engine/Build/engine.wasm",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const access = sessionStorage.getItem("access_token");
      const refresh = sessionStorage.getItem("refresh_token");

      if (!access || !refresh) {
        router.push("/login");
        return;
      }

      const authenticate = async (token: string) => {
        return await axios.post(
          "https://api.jules-drevon.fr/api/users/authenticated/",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      };

      try {
        const res = await authenticate(access);
        if (res.data.authenticated) {
          setAuthToken(access);
          setRefreshToken(refresh);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.warn("Access token expired, attempting refresh...");

        try {
          const refreshRes = await axios.post(
            "https://api.jules-drevon.fr/api/users/token/refresh/",
            { refresh }
          );

          const newAccess = refreshRes.data.access;
          sessionStorage.setItem("access_token", newAccess);
          document.cookie = `access_token=${newAccess}; path=/;`;

          const retryRes = await authenticate(newAccess);
          if (retryRes.data.authenticated) {
            setAuthToken(newAccess);
            setRefreshToken(refresh);
          } else {
            router.push("/login");
          }
        } catch (refreshErr) {
          console.error("Refresh token invalid or expired", refreshErr);
          router.push("/login");
        }
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  // ✅ Envoi des tokens à Unity une fois que tout est chargé
  useEffect(() => {
    if (isLoaded && authToken && refreshToken) {
      console.log("🚀 Envoi des tokens via CustomEvent → Unity WebGL");

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
  useEffect(() => {
    const sendToUnity = (e: any) => {
      const { accessToken, refreshToken } = e.detail;

      if (typeof sendMessage === "function") {
        console.log("🛰 Envoi à Unity :", accessToken, refreshToken);

        sendMessage("APICube", "ReceiveAccessToken", accessToken);
        sendMessage("APICube", "ReceiveRefreshToken", refreshToken);
        sendMessage("APICube", "TestUnityCall", "Hello Unity from SendTokensToUnity event");
      }
    };

    window.addEventListener("SendTokensToUnity", sendToUnity);
    return () => {
      window.removeEventListener("SendTokensToUnity", sendToUnity);
    };
  }, [sendMessage]);

  if (checkingAuth) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar />
      <main className="flex-1 overflow-hidden py-10 px-36">
        {!isLoaded && (
          <p className="text-white text-center">
            Chargement du jeu ({Math.round(loadingProgression * 100)}%)...
          </p>
        )}
        <div className="w-full max-w-7xl max-h-fit mx-auto aspect-video max-h-[200px] rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <Unity
            unityProvider={unityProvider}
            style={{ width: "100%", height: "100%" }}
            tabIndex={0}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
