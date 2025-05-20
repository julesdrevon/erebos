"use client";

import { useEffect, useState, ChangeEvent, FC } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";

interface RawGame {
  game_id: number;
  state: number;
  time_left: number;
}

type Status = "success" | "failure" | "in_progress";

interface Game {
  id: string;
  status: Status;
  date: string;
  minutes: number;
  seconds: number;
}

const statusConfig: Record<Status, { color: string; label: string }> = {
  success: { color: "text-green-500", label: "Réussite" },
  failure: { color: "text-red-500", label: "Échec" },
  in_progress: { color: "text-orange-500", label: "En cours" },
};

interface ResultProps {
  status: Status;
  date: string;
  minutes: number;
  seconds: number;
}

const Result: FC<ResultProps> = ({ status, date, minutes, seconds }) => {
  const { color, label } = statusConfig[status];
  return (
    <div className={`flex items-center justify-between p-4 border-2 rounded border-[#374151] bg-[#111827]`}>
      <div className={"flex flex-col"}>
        <div>
          <span className={`font-medium ${color}`}>&#x25CF; {label}</span>
        </div>
        <span className="text-sm text-[#6B7280]">{date}</span>
      </div>
      <div className="text-sm text-[#6B7280]">
        {minutes}m {seconds}s
      </div>
    </div>
  );
};

const Profile: FC = () => {
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState("");
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getAccessToken = (): string | null => {
    return sessionStorage.getItem("access_token") || null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getAccessToken();
      const refreshToken = sessionStorage.getItem("refresh_token");

      if (!token) {
        router.push("/login");
        return;
      }

      const authRequest = async (accessToken: string) => {
        try {
          // Vérifie que le token est valide
          await axios.post(
            "https://api.jules-drevon.fr/api/users/authenticated/",
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          // Requêtes après authentification
          const userRes: AxiosResponse<{ username: string }> = await axios.get(
            "https://api.jules-drevon.fr/api/users/datas/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setName(userRes.data.username);
          setOldName(userRes.data.username);

          const gamesRes: AxiosResponse<RawGame[]> = await axios.get(
            "https://api.jules-drevon.fr/api/game/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const mapped = gamesRes.data.map(g => {
            const id = String(g.game_id);
            let status: Status;
            if (g.state === 1) {
              status = "in_progress";
            } else {
              status = g.time_left === 0 ? "failure" : "success";
            }
            const date = new Date().toLocaleDateString();
            const total = 600;
            const played = Math.max(total - g.time_left, 0);
            const minutes = Math.floor(played / 60);
            const seconds = played % 60;
            return { id, status, date, minutes, seconds };
          });

          setUserGames(mapped);
          setLoading(false);
        } catch (err) {
          throw err;
        }
      };

      try {
        await authRequest(token);
      } catch (err) {
        if (!refreshToken) {
          router.push("/login");
          return;
        }

        try {
          const refreshRes = await axios.post(
            "https://api.jules-drevon.fr/api/users/token/refresh/",
            { refresh: refreshToken }
          );

          const newAccess = refreshRes.data.access;
          sessionStorage.setItem("access_token", newAccess);
          document.cookie = `access_token=${newAccess}; path=/;`;

          await authRequest(newAccess); // relancer avec le nouveau token
        } catch (refreshErr) {
          console.error("Refresh token failed", refreshErr);
          router.push("/login");
        }
      }
    };

    fetchData();
  }, [router]);

  if (loading) return null;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleNameBlur = async () => {
    if (name !== oldName) {
      try {
        const token = getAccessToken();
        if (!token) return;
        await axios.patch(
          "https://api.jules-drevon.fr/api/users/update/",
          { username: name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOldName(name);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    // Supprimer les tokens
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    document.cookie = "access_token=; path=/; max-age=0;";
    document.cookie = "refresh_token=; path=/; max-age=0;";

    router.push("/login");
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
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-gray-300">Sessions récentes</p>
              <div className="flex flex-col gap-2 w-full">
                {userGames.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-20 bg-gray-900 rounded-lg border-2 border-gray-700">
                    <p className="text-gray-500">Aucune partie trouvée.</p>
                  </div>
                ) : (
                  [...userGames].slice().reverse().map(game => (
                    <Result key={game.id} {...game} />
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
