"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import axios, { AxiosError } from 'axios';
import {useRouter} from "next/navigation"; // Import axios

// Composant réutilisable pour les coins décoratifs
const RoundedCorner = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const cornerClasses = {
    'top-left': 'top-0 left-0 -translate-2/3',
    'top-right': 'top-0 right-0 -translate-y-2/3 translate-x-2/3',
    'bottom-left': 'bottom-0 left-0 translate-y-2/3 -translate-x-2/3',
    'bottom-right': 'bottom-0 right-0 translate-2/3',
  };

  return (
    <div className={`rounded-full bg-gold w-3 h-3 absolute ${cornerClasses[position]}`} />
  );
};

// Composant réutilisable pour les champs de saisie
const InputField = ({
                      label,
                      type,
                      value,
                      onChange,
                      name,
                      id,
                      placeholder
                    }: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  placeholder?: string;
}) => (
  <div className="flex flex-col justify-center w-full">
    <label htmlFor={id} className="text-sm font-medium text-gold-200 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border-2 border-gold/50 rounded bg-zinc-800/50 p-2 outline-none text-gold-100 placeholder:text-gold-400"
      name={name}
      id={id}
      placeholder={placeholder}
      required
    />
  </div>
);

// Composant réutilisable pour le logo principal d'Erebos
const ErebosLogo = () => (
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
              d="M30 9C30 9.79565 29.684 10.5587 29.1214 11.1213C28.5588 11.6839 27 12C26.2044 12 25.4413 11.6839 24.8787 11.1213C24.3161 10.5587 24 9.79565 24 9C24 8.20435 24.3161 7.44129 24.8787 6.87868C25.4413 6.31607 26.2044 6 27 6C27.7957 6 28.5588 6.31607 29.1214 6.87868C29.684 7.44129 30 8.20435 30 9ZM31.9782 16.5C34.4063 14.8875 36 12.1313 36 9C36 4.03125 31.9688 0 27 0C22.0313 0 18 4.03125 18 9C18 12.1313 19.5938 14.8875 22.0219 16.5H21C19.3407 16.5 18 17.8406 18 19.5C18 21.1594 19.3407 22.5 21 22.5H24V42H19.5C14.5313 42 10.5 37.9688 10.5 33V32.4281L11.1563 33.0844C12.0375 33.9656 13.4625 33.9656 14.3344 33.0844C15.2063 32.2031 15.2157 30.7781 14.3344 29.9062L9.0938 24.6562C8.21255 23.775 6.78755 23.775 5.91567 24.6562L0.656299 29.9062C-0.224951 30.7875 -0.224951 32.2125 0.656299 33.0844C1.53755 33.9562 2.96255 33.9656 3.83442 33.0844L4.49067 32.4281V33C4.49067 41.2875 11.2032 48 19.4907 48H26.9907H34.4907C42.7782 48 49.4907 41.2875 49.4907 33V32.4281L50.1469 33.0844C51.0282 33.9656 52.4532 33.9656 53.325 33.0844C54.1969 32.2031 54.2063 30.7781 53.325 29.9062L48.075 24.6562C47.1938 23.775 45.7688 23.775 44.8969 24.6562L39.6469 29.9062C38.7657 30.7875 38.7657 32.2125 39.6469 33.0844C40.5282 33.9562 41.9532 33.9656 42.825 33.0844L43.4813 32.4281V33C43.4813 47.9688 39.45 42 34.4813 42H30V22.5H33C34.6594 22.5 36 21.1594 36 19.5C36 17.8406 34.6594 16.5 33 16.5H31.9782Z"
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
);

// Composant principal d'inscription
const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null); // Pour gérer l'état de l'inscription

  const handleSubmit = async (event: React.FormEvent) => { // Make handleSubmit async to use await
    event.preventDefault();
    setRegistrationStatus('En cours...'); // Indique que l'inscription est en cours

    if (password !== confirmPassword) {
      setRegistrationStatus('Les mots de passe ne correspondent pas.');
      return; // Arrête la soumission si les mots de passe ne correspondent pas
    }

    const userData = {
      username: "Erebos_User", // You might want to add a username field in your form
      email: email,
      password: password
    };

    try {
      // Utilise axios pour envoyer les données d'inscription
      const response = await axios.post("https://api.jules-drevon.fr/api/users/register/", userData);
      if (response.data.email[0] == "user with this email already exists.") {
        setRegistrationStatus('Un utilisateur avec cette adresse email existe déjà.');
        return;
      } else {
        setRegistrationStatus('Inscription réussie !');
        router.push('/profile')
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setRegistrationStatus(`Erreur lors de l'inscription: ${error.message || 'Une erreur inconnue s\'est produite.'}`);
      } else {
        setRegistrationStatus(`Erreur lors de l'inscription: ${error.message || 'Une erreur inconnue s\'est produite.'}`);
      }
      // Gère l'erreur (par exemple, affiche un message à l'utilisateur)
    }
  };

  return (
    <div className="h-dvh relative font-orbitron text-gold">
      {/* Image de fond */}
      <div
        className="bg-[url(../public/LoginBackground.webp)] bg-cover bg-center -z-50 opacity-20 absolute inset-0"
      />

      {/* Lien de retour */}
      <Link href="/" className="absolute m-10 flex items-center gap-1">
        ←<span className="hover:underline">Retour</span>
      </Link>

      {/* Conteneur du contenu principal */}
      <div className="flex flex-col justify-center items-center h-full gap-8">
        {/* Logo */}
        <ErebosLogo />

        {/* Titre */}
        <div>
          <h2 className="text-4xl flex flex-col items-center">
            Erebos
            <span>Inscription</span>
          </h2>
        </div>

        {/* Conteneur du formulaire d'inscription */}
        <div className="border-2 border-gold relative py-6 px-8 bg-zinc-800/40 w-full max-w-md">
          <RoundedCorner position="top-left" />
          <RoundedCorner position="top-right" />
          <RoundedCorner position="bottom-left" />
          <RoundedCorner position="bottom-right" />

          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6 w-full">
            {/* Champs de saisie */}
            <InputField
              label="Adresse email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              placeholder="Votre adresse email"
            />
            <InputField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="Votre mot de passe"
            />
            <InputField
              label="Confirmer le mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmez votre mot de passe"
            />

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="relative flex justify-center items-center gap-2 bg-gold text-black w-full rounded p-2.5 uppercase text-sm hover:cursor-pointer hover:bg-opacity-80 transition-all duration-300"
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-gold" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-gold" />
              <Image src={'Login.svg'} alt={'Login Icon'} width={15} height={15} />
              Rejoindre Erebos
            </button>
          </form>
          {/* Message de statut de l'inscription */}
          {registrationStatus && (
            <div className="mt-4 text-center text-sm text-red-500">
              {registrationStatus}
            </div>
          )}
        </div>

        {/* Lien de connexion */}
        <Link href="/login" className="hover:underline text-sm text-gold-200">
          J'ai déjà un compte
        </Link>
      </div>
    </div>
  );
};

export default Register;
