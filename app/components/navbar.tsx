"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between w-full h-16 px-8 bg-black/80">
      <h2
        onClick={() => router.push('/')}
        className="text-4xl font-orbitron text-amber-500 hover:cursor-pointer hover:opacity-80 transition-opacity duration-300"
      >
        Erebos
      </h2>
      <Image
        src={"/Avatar.jpg"}
        alt="Avatar"
        width={50}
        height={50}
        onClick={() => router.push('/profile')}
        className="rounded-full border-3 border-neutral-700 hover:border-amber-500 hover:cursor-pointer transition-all duration-300 ease-in-out"
      />
    </nav>
  );
};

export default Navbar;