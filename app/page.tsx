"use client";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [canContinue, setCanContinue] = useState(false);
  const [loadingNewGame, setLoadingNewGame] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("access_token");
      const refreshToken = sessionStorage.getItem("refresh_token");

      if (!token) return;

      const authRequest = async (accessToken: string) => {
        const authRes = await axios.post(
          "https://api.jules-drevon.fr/api/users/authenticated/",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (authRes.data.authenticated) {
          setIsAuthenticated(true);
          const gameRes = await axios.get("https://api.jules-drevon.fr/api/game/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (gameRes.data && Object.keys(gameRes.data).length > 0) {
            setCanContinue(true);
          }
        }
      };

      try {
        await authRequest(token);
      } catch (err) {
        if (!refreshToken) return;
        try {
          const refreshRes = await axios.post("https://api.jules-drevon.fr/api/users/token/refresh/", {
            refresh: refreshToken,
          });
          const newAccess = refreshRes.data.access;
          sessionStorage.setItem("access_token", newAccess);
          document.cookie = `access_token=${newAccess}; path=/;`;
          await authRequest(newAccess);
        } catch (refreshErr) {
          console.error("❌ Échec du refresh token", refreshErr);
        }
      }
    };

    checkAuth();
  }, []);

  const handleNewGame = async () => {
    const token = sessionStorage.getItem("access_token");
    if (!token) return;

    setLoadingNewGame(true);
    try {
      const res = await axios.post(
        "https://api.jules-drevon.fr/api/game/new/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        router.push("/game");
      } else {
        console.error("❌ Création de partie échouée");
      }
    } catch (err) {
      console.error("❌ Erreur new game", err);
    } finally {
      setLoadingNewGame(false);
    }
  };

  return (
    <div className="relative h-dvh">
      <div className="absolute inset-0 bg-[url(../public/HomeBackground.jpg)] bg-cover bg-center -z-50 opacity-50" />
      <div className="flex flex-col h-dvh">
        <Navbar />
        <main className="flex flex-grow flex-col items-center justify-center gap-5 w-full">
          <div className="text-center px-4 space-y-5">
            <h2 className="text-5xl font-orbitron text-amber-500">Bienvenue à Erebos</h2>
            <p className="max-w-3xl mx-auto">
              Une cité sous-marine où l'ambition démesurée et l'innovation sans entraves ont façonné un paradis devenu prison.
            </p>
          </div>
          <div className="gap-10 font-orbitron flex">
          {[
            {
              text: "Continuer",
              click: () => router.push("/game"),
              disabled: !isAuthenticated || !canContinue,
              iconPath: (
                <path d="M9 1C9 0.446875 8.55313 0 8 0C7.44688 0 7 0.446875 7 1V8C7 8.55313 7.44688 9 8 9C8.55313 9 9 8.55313 9 8V1ZM4.48438 3.76875C4.90938 3.41562 4.96563 2.78437 4.6125 2.35938C4.25938 1.93438 3.62812 1.87813 3.20312 2.23125C1.55313 3.60625 0.5 5.68125 0.5 8C0.5 12.1406 3.85938 15.5 8 15.5C12.1406 15.5 15.5 12.1406 15.5 8C15.5 5.68125 14.4437 3.60625 12.7937 2.23125C12.3687 1.87813 11.7375 1.9375 11.3844 2.35938C11.0312 2.78125 11.0906 3.41562 11.5125 3.76875C12.7281 4.77812 13.4969 6.3 13.4969 8C13.4969 11.0375 11.0344 13.5 7.99687 13.5C4.95937 13.5 2.49688 11.0375 2.49688 8C2.49688 6.3 3.26875 4.77812 4.48125 3.76875H4.48438Z" />
              ),
              iconSize: { w: 16, h: 16 },
            },
            {
              text: loadingNewGame ? "Chargement..." : "Nouvelle partie",
              click: handleNewGame,
              disabled: !isAuthenticated || loadingNewGame,
              iconPath: (
                <path d="M8 2.5C8 1.94687 7.55312 1.5 7 1.5C6.44688 1.5 6 1.94687 6 2.5V7H1.5C0.946875 7 0.5 7.44688 0.5 8C0.5 8.55312 0.946875 9 1.5 9H6V13.5C6 14.0531 6.44688 14.5 7 14.5C7.55312 14.5 8 14.0531 8 13.5V9H12.5C13.0531 9 13.5 8.55312 13.5 8C13.5 7.44688 13.0531 7 12.5 7H8V2.5Z" />
              ),
              iconSize: { w: 14, h: 16 },
            },
          ].map(({ iconPath, text, click, disabled, iconSize }) => (
            <button
              key={text}
              onClick={click}
              disabled={disabled}
              className={`relative flex items-center justify-center gap-2 px-4 py-2 border-2 rounded-lg group transition-all duration-300 ${
                disabled
                  ? "bg-gray-900 text-gray-600 border-gray-700 cursor-not-allowed"
                  : "text-gray-400 bg-gray-800 ease-in-out hover:bg-gray-700 hover:scale-105 hover:shadow-lg active:scale-95 hover:border-amber-500 hover:cursor-pointer"
              }`}
            >
              {!disabled && (
                <>
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 group-hover:border-amber-500" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 group-hover:border-amber-500" />
                </>
              )}
              <div className={`flex items-center gap-2 transition-all duration-300 ${!disabled ? "group-hover:translate-x-1" : ""}`}>
                <svg
                  width={iconSize.w}
                  height={iconSize.h}
                  viewBox={`0 0 ${iconSize.w} ${iconSize.h}`}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`fill-current transition-colors duration-300 ${
                    disabled ? "text-gray-600" : "group-hover:fill-amber-500"
                  }`}
                >
                  {iconPath}
                </svg>
                <span className={`transition-colors duration-300 ${!disabled ? "group-hover:text-amber-500" : "text-gray-600"}`}>
                  {text}
                </span>
              </div>
            </button>
          ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
