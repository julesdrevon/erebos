"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from 'next/image';
import Result from "@/app/components/result";

export default function Profile() {
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState("");
  const router = useRouter();

  // Vérifie l'authentification au chargement de la page
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          "https://api.jules-drevon.fr/api/users/authenticated/",
          {},
          { withCredentials: true }
        );
        const userRes = await axios.get(
          "https://api.jules-drevon.fr/api/users/datas/",
          { withCredentials: true }
        );
        setName(userRes.data.username);
        setOldName(userRes.data.username);
      } catch (error: unknown) {
        try {
          console.log('token refreshing');
          await axios.post(
            "https://api.jules-drevon.fr/api/users/token/refresh/",
            {},
            { withCredentials: true }
          );
          console.log('token refreshed');
          const userRes = await axios.get(
            "https://api.jules-drevon.fr/api/users/datas/",
            { withCredentials: true }
          );
          setName(userRes.data.username);
          setOldName(userRes.data.username);
          checkAuth();
        } catch (refreshError) {
          router.push("/login");
        }
      }
    };
    checkAuth();
  }, [router]);

  // Change localement le nom
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Envoie le nom mis à jour à l'API seulement s’il est différent
  const handleNameBlur = async () => {
    if (name !== oldName) {
      try {
        await axios.patch("https://api.jules-drevon.fr/api/users/update/", { username: name }, { withCredentials: true });
        setOldName(name);
      } catch (err) {
        console.error("Erreur lors de la mise à jour du nom :", err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://api.jules-drevon.fr/api/users/logout/", {}, {
        withCredentials: true,
      });
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 bg-[url(../public/ProfileBackground.jpg)] bg-cover bg-center -z-50 opacity-50" />
      <Navbar />
      <main className="flex-grow w-full flex flex-col justify-center items-center h-full font-orbitron gap-5">
        <div className="bg-gray-800/80 border-2 border-gray-700 bg-opacity-90 rounded-lg p-10 w-full lg:max-w-1/2 max-w-3/4 pt-14 relative flex justify-center">
          <Image src={"/Avatar.jpg"} alt="Profile" width={100} height={100} className="rounded-full border-2 border-gray-700 bg-gray-800/80 absolute -top-14" />
          <div className="flex flex-col gap-5 w-full">
            <div className="items-center flex flex-col w-full">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center bg-gray-900 py-2 px-4 rounded border-2 border-gray-700 w-full">
                  <input
                    className="text-sm outline-none w-full bg-transparent text-white"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                  />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG content */}
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-gray-300">Sessions récentes</p>
              <div className="flex flex-col gap-2">
                <Result status={"failure"} date={""} minutes={0} seconds={0}/>
                <Result status={"failure"} date={""} minutes={0} seconds={0}/>
                <Result status={"success"} date={""} minutes={0} seconds={0}/>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="relative flex items-center justify-center gap-2 px-4 py-2 text-red-500 bg-gray-800 border-2 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 active:scale-95">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 fill-current" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 fill-current" />
          <div className="flex items-center gap-2">
            Déconnexion
          </div>
        </button>
      </main>
      <Footer />
    </div>
  );
}
