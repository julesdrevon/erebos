"use client";

import { useEffect, useState, ChangeEvent, FocusEvent, FC } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Result from "@/app/components/result";

interface Game {
  id: string;
  status: "success" | "failure";
  date: string;
  minutes: number;
  seconds: number;
}

const Profile: FC = () => {
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState("");
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        // 1) Vérification d'authentification
        await axios.post(
          "https://api.jules-drevon.fr/api/users/authenticated/",
          {},
          { withCredentials: true }
        );

        // 2) Si OK, on récupère le profil
        const userRes: AxiosResponse<{ username: string }> = await axios.get(
          "https://api.jules-drevon.fr/api/users/datas/",
          { withCredentials: true }
        );
        setName(userRes.data.username);
        setOldName(userRes.data.username);

        // 3) puis les parties
        const gamesRes: AxiosResponse<Game[]> = await axios.get(
          "https://api.jules-drevon.fr/api/game/",
          { withCredentials: true }
        );
        setUserGames(gamesRes.data);

        // 4) tout s'est bien passé
        setLoading(false);
      } catch (err) {
        // en cas d'erreur (401, refresh fail, réseau…), on redirige
        console.error("Auth check failed:", err);
        router.push("/login");
      }
    };

    checkAuthAndFetch();
  }, [router]);

  // Tant que la vérif/auth + données ne sont pas chargées, on n'affiche rien
  if (loading) {
    return null; // ou un spinner <div>Chargement…</div>
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameBlur = async (e: FocusEvent<HTMLInputElement>) => {
    if (name !== oldName) {
      try {
        await axios.patch(
          "https://api.jules-drevon.fr/api/users/update/",
          { username: name },
          { withCredentials: true }
        );
        setOldName(name);
      } catch (err) {
        console.error("Erreur lors de la mise à jour du nom :", err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://api.jules-drevon.fr/api/users/logout/",
        {},
        { withCredentials: true }
      );
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 bg-[url('/ProfileBackground.jpg')] bg-cover bg-center -z-50 opacity-50" />
      <Navbar />
      <main className="flex-grow w-full flex flex-col justify-center items-center h-full font-orbitron gap-5">
        <div className="bg-gray-800/80 border-2 border-gray-700 rounded-lg p-10 w-full lg:max-w-1/2 max-w-3/4 pt-14 relative flex justify-center">
          <Image
            src="/Avatar.jpg"
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-700 bg-gray-800/80 absolute -top-14"
          />
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center justify-center bg-gray-900 py-2 px-4 rounded border-2 border-gray-700 w-full">
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  placeholder="Ton nom"
                  className="text-sm outline-none w-full bg-transparent text-white"
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG content */}
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-gray-300">Sessions récentes</p>
              <div className="flex flex-col gap-2">
                {userGames.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-20 bg-gray-900 rounded-lg border-2 border-gray-700">
                    <p className="text-gray-500">Aucune partie trouvée.</p>
                  </div>
                ) : (
                  userGames.map((game) => (
                    <Result
                      key={game.id}
                      status={game.status}
                      date={game.date}
                      minutes={game.minutes}
                      seconds={game.seconds}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="relative flex items-center justify-center gap-2 px-4 py-2 text-red-500 bg-gray-800 border-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 active:scale-95"
        >
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2" />
          <span>Déconnexion</span>
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
