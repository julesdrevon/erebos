"use client";
import React from 'react';
import {useRouter} from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className={"relative h-dvh flex items-center justify-center font-orbitron"}>
      <div className={"bg-[url(../public/404.webp)] bg-cover bg-center h-dvh w-full absolute -z-50 opacity-50 blur-sm"}/>
      <div className="flex flex-col items-center gap-5">
        <p className={"text-2xl"}>Uh oh</p>
        <h2 className={"text-9xl"}>404</h2>
        <p>Il me semble que vous vous êtes perdus.</p>
        <button onClick={() => router.push('/')} className="relative flex items-center justify-center gap-2 px-4 py-2 text-gold bg-gray-800 border-2 rounded-lg hover:cursor-pointer group transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 hover:shadow-lg active:scale-95">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 fill-current" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 fill-current" />
          <div className="flex items-center gap-2">
            Retourner à l'accueil
          </div>
        </button>
      </div>
    </div>
  );
};

export default NotFound;