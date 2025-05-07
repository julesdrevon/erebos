"use client";

import {useEffect} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { useUnityContext } from "react-unity-webgl";
import dynamic from "next/dynamic";
import axios from "axios";

const Unity = dynamic(
  () => import("react-unity-webgl").then((mod) => mod.Unity),
  { ssr: false }
);

export default function Game() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/engine/Build/export.loader.js",
    dataUrl: "/engine/Build/export.data",
    frameworkUrl: "/engine/Build/export.framework.js",
    codeUrl: "/engine/Build/export.wasm",
  });

  useEffect(() => {
    const getCookie = async (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const checkAuth = async () => {
      try {
        const res = await axios.post(
          "https://api.jules-drevon.fr/api/users/authenticated/",
          {},
          { withCredentials: true }
        );
        if (res.data.authenticated) {
          console.log("✅ Connecté")
          console.log(await getCookie("access_token"));
        }
      } catch {
        console.log("❌ Non connecté")
      }
    };

    checkAuth();
  }, []);

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
