"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Logique du formulaire à ajouter ici
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="h-dvh relative font-orbitron text-gold">
      <div className="bg-[url(../public/LoginBackground.webp)] bg-cover bg-center -z-50 opacity-20 absolute inset-0" />
      <Link href="/" className="absolute m-10">
        ← <span className="hover:underline">Retour</span>
      </Link>
      <div className="flex flex-col justify-center items-center h-full gap-5">
        <div className="border-2 border-gold rounded-full p-1 aspect-square flex items-center justify-center">
          <div className="border-2 border-gold/50 rounded-full p-5 aspect-square flex items-center justify-center">
            <svg
              width="54"
              height="48"
              viewBox="0 0 54 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Frame">
                <g clipPath="url(#clip0_28_35)">
                  <path
                    id="Vector"
                    d="M30 9C30 9.79565 29.684 10.5587 29.1214 11.1213C28.5588 11.6839 27.7957 12 27 12C26.2044 12 25.4413 11.6839 24.8787 11.1213C24.3161 10.5587 24 9.79565 24 9C24 8.20435 24.3161 7.44129 24.8787 6.87868C25.4413 6.31607 26.2044 6 27 6C27.7957 6 28.5588 6.31607 29.1214 6.87868C29.684 7.44129 30 8.20435 30 9ZM31.9782 16.5C34.4063 14.8875 36 12.1313 36 9C36 4.03125 31.9688 0 27 0C22.0313 0 18 4.03125 18 9C18 12.1313 19.5938 14.8875 22.0219 16.5H21C19.3407 16.5 18 17.8406 18 19.5C18 21.1594 19.3407 22.5 21 22.5H24V42H19.5C14.5313 42 10.5 37.9688 10.5 33V32.4281L11.1563 33.0844C12.0375 33.9656 13.4625 33.9656 14.3344 33.0844C15.2063 32.2031 15.2157 30.7781 14.3344 29.9062L9.0938 24.6562C8.21255 23.775 6.78755 23.775 5.91567 24.6562L0.656299 29.9062C-0.224951 30.7875 -0.224951 32.2125 0.656299 33.0844C1.53755 33.9562 2.96255 33.9656 3.83442 33.0844L4.49067 32.4281V33C4.49067 41.2875 11.2032 48 19.4907 48H26.9907H34.4907C42.7782 48 49.4907 41.2875 49.4907 33V32.4281L50.1469 33.0844C51.0282 33.9656 52.4532 33.9656 53.325 33.0844C54.1969 32.2031 54.2063 30.7781 53.325 29.9062L48.075 24.6562C47.1938 23.775 45.7688 23.775 44.8969 24.6562L39.6469 29.9062C38.7657 30.7875 38.7657 32.2125 39.6469 33.0844C40.5282 33.9562 41.9532 33.9656 42.825 33.0844L43.4813 32.4281V33C43.4813 37.9688 39.45 42 34.4813 42H30V22.5H33C34.6594 22.5 36 21.1594 36 19.5C36 17.8406 34.6594 16.5 33 16.5H31.9782Z"
                    fill="#C8A97E"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_28_35">
                  <path d="M0 0H54V48H0V0Z" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-4xl flex flex-col items-center">Erebos<span>Connexion</span></h2>
        </div>
        <div className="border-2 border-gold relative py-5 px-6 bg-zinc-800/40">
          <div className="rounded-full bg-gold w-3 h-3 absolute top-0 left-0 -translate-2/3" />
          <div className="rounded-full bg-gold w-3 h-3 absolute top-0 right-0 -translate-y-2/3 translate-x-2/3" />
          <div className="rounded-full bg-gold w-3 h-3 absolute bottom-0 left-0 translate-y-2/3 -translate-x-2/3" />
          <div className="rounded-full bg-gold w-3 h-3 absolute bottom-0 right-0 translate-2/3" />
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col justify-center">
                <label htmlFor="email">Adresse email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gold/50 rounded bg-zinc-800/50 p-2 outline-none"
                  name="email"
                  id="email"
                  required
                />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gold/50 rounded bg-zinc-800/50 p-2 outline-none"
                  name="password"
                  id="password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gold text-black w-full rounded p-2.5 uppercase text-sm hover:cursor-pointer hover:bg-opacity-80 transition-all duration-300"
            >
              Entrer à Erebos
            </button>
          </form>
        </div>
        <Link href="/register" className="hover:underline text-sm">
          Rejoindre l’aventure
        </Link>
      </div>
    </div>
  );
}
