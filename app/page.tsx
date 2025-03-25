import Image from "next/image";

export default function Home() {
  return (
    <div className={"bg-[url(../public/HomeBackground.jpg)] h-dvh w-full bg-cover bg-center"}>
      <div className={"w-full bg-black/80 h-16 px-8 flex items-center justify-between"}>
        <h2 className={"text-amber-500 text-4xl font-orbitron"}>Erebos</h2>
        <div>
          <Image src={"frame.svg"} alt={""} width={50} height={50} className={"rounded-full border-3 border-neutral-700"}/>
        </div>
      </div>

      <div className={"flex flex-col items-center justify-center h-full gap-5"}>
        <div className={"flex flex-col items-center justify-between gap-5"}>
          <h2 className={"text-amber-500 text-5xl font-orbitron"}>Bienvenue à Erebos</h2>
          <h1 className={"font-sans max-w-3/4 text-center"}>Une cité sous-marine où l'ambition démesurée et l'innovation sans entraves ont façonné un paradis devenu prison.</h1>
        </div>
        <div className={"font-orbitron flex gap-5 text-gray-400"}>
          <button className={"py-2 px-4 border-2 border-gray-500 bg-gray-800 rounded-lg flex items-center gap-2 hover:cursor-pointer"}>
            <div className={"w-4 h-4 border-t-2 border-l-2 border-gray-500 absolute -top-2 -left-2"}></div>
            <div className={"w-4 h-4 border-b-2 border-r-2 border-gray-500 absolute -bottom-2 -right-2"}></div>
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className={"fill-current"}>
              <g id="Frame">
                <g clipPath="url(#clip0_24_185)">
                  <path id="Vector" d="M9 1C9 0.446875 8.55313 0 8 0C7.44688 0 7 0.446875 7 1V8C7 8.55313 7.44688 9 8 9C8.55313 9 9 8.55313 9 8V1ZM4.48438 3.76875C4.90938 3.41562 4.96563 2.78437 4.6125 2.35938C4.25938 1.93438 3.62812 1.87813 3.20312 2.23125C1.55313 3.60625 0.5 5.68125 0.5 8C0.5 12.1406 3.85938 15.5 8 15.5C12.1406 15.5 15.5 12.1406 15.5 8C15.5 5.68125 14.4437 3.60625 12.7937 2.23125C12.3687 1.87813 11.7375 1.9375 11.3844 2.35938C11.0312 2.78125 11.0906 3.41562 11.5125 3.76875C12.7281 4.77812 13.4969 6.3 13.4969 8C13.4969 11.0375 11.0344 13.5 7.99687 13.5C4.95937 13.5 2.49688 11.0375 2.49688 8C2.49688 6.3 3.26875 4.77812 4.48125 3.76875H4.48438Z"/>
                </g>
              </g>
            </svg>
            Continuer
          </button>
          <button className={`py-2 px-4 border-2 border-gray-500 bg-gray-800 rounded-lg relative flex items-center gap-2 hover:cursor-pointer`}>
            <div className={"w-4 h-4 border-t-2 border-l-2 border-gray-500 absolute -top-2 -left-2"}></div>
            <div className={"w-4 h-4 border-b-2 border-r-2 border-gray-500 absolute -bottom-2 -right-2"}></div>
            <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" className={"fill-current"}>
              <g id="Frame">
                <path id="Vector" d="M8 2.5C8 1.94687 7.55312 1.5 7 1.5C6.44688 1.5 6 1.94687 6 2.5V7H1.5C0.946875 7 0.5 7.44688 0.5 8C0.5 8.55312 0.946875 9 1.5 9H6V13.5C6 14.0531 6.44688 14.5 7 14.5C7.55312 14.5 8 14.0531 8 13.5V9H12.5C13.0531 9 13.5 8.55312 13.5 8C13.5 7.44688 13.0531 7 12.5 7H8V2.5Z"/>
              </g>
            </svg>
            Nouvelle partie
          </button>
        </div>
      </div>
    </div>
  );
}
