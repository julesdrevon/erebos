"use client"
import { SetStateAction, useState} from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Image from 'next/image';

export default function Profile() {
  const [name, setName] = useState("Pierre");
  const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 bg-[url(../public/ProfileBackground.jpg)] bg-cover bg-center -z-50 opacity-50" />

      <Navbar />

      <main className="flex-grow w-full flex justify-center items-center h-full font-orbitron">
        <div className="bg-gray-800/80 border-2 border-gray-700 bg-opacity-90 rounded-lg p-10 w-full max-w-1/2 pt-14 relative flex justify-center">
          <Image src={"Frame.svg"} alt="Profile" width={100} height={100} className="rounded-full border-2 border-gray-700 bg-gray-800/80 absolute -top-14" />
          <div className="flex flex-col gap-5 w-full">
            <div className="items-center flex flex-col w-full">
              <div className="">
                <div className="flex items-center bg-gray-900 py-2 px-4 rounded border-2 border-gray-700">
                  <input
                    className="text-sm font-semibold bg-transparent border-none outline-none text-white"
                    type="text"
                    value={name} // Valeur liée à l'état local
                    onChange={handleNameChange} // Met à jour l'état quand l'utilisateur tape
                  />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame">
                      <g clip-path="url(#clip0_28_177)">
                        <path id="Vector" d="M13.7812 1.84053L14.1594 2.21865C14.4531 2.5124 14.4531 2.9874 14.1594 3.27803L13.25 4.19053L11.8094 2.7499L12.7188 1.84053C13.0125 1.54678 13.4875 1.54678 13.7781 1.84053H13.7812ZM6.55625 8.00615L10.75 3.80928L12.1906 5.2499L7.99375 9.44365C7.90313 9.53428 7.79062 9.5999 7.66875 9.63428L5.84062 10.1562L6.3625 8.32803C6.39688 8.20615 6.4625 8.09365 6.55312 8.00303L6.55625 8.00615ZM11.6594 0.781152L5.49375 6.94365C5.22188 7.21553 5.025 7.5499 4.92188 7.91553L4.02812 11.0405C3.95312 11.303 4.025 11.5843 4.21875 11.778C4.4125 11.9718 4.69375 12.0437 4.95625 11.9687L8.08125 11.0749C8.45 10.9687 8.78438 10.7718 9.05313 10.503L15.2188 4.34053C16.0969 3.4624 16.0969 2.0374 15.2188 1.15928L14.8406 0.781152C13.9625 -0.0969726 12.5375 -0.0969726 11.6594 0.781152ZM2.75 1.9999C1.23125 1.9999 0 3.23115 0 4.7499V13.2499C0 14.7687 1.23125 15.9999 2.75 15.9999H11.25C12.7688 15.9999 14 14.7687 14 13.2499V9.7499C14 9.33428 13.6656 8.9999 13.25 8.9999C12.8344 8.9999 12.5 9.33428 12.5 9.7499V13.2499C12.5 13.9405 11.9406 14.4999 11.25 14.4999H2.75C2.05938 14.4999 1.5 13.9405 1.5 13.2499V4.7499C1.5 4.05928 2.05938 3.4999 2.75 3.4999H6.25C6.66563 3.4999 7 3.16553 7 2.7499C7 2.33428 6.66563 1.9999 6.25 1.9999H2.75Z" fill="#9CA3AF"/>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_28_177">
                        <path d="M0 0H16V16H0V0Z" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="text-gray-300">Sessions récentes</p>

              <div className="flex flex-col gap-2">
                <div className="bg-gray-900 px-4 py-2 rounded flex justify-between items-center border-2 border-gray-700">
                  <div>
                    <div className="flex items-center text-red-500">
                      <p><span className="">●</span> Échoué</p>
                    </div>
                    <div className="text-xs text-gray-400">Échoué le Jan 15, 2025</div>
                  </div>
                  <div className="text-xs text-gray-400">2h 15m</div>
                </div>

                <div className="bg-gray-900 px-4 py-2 rounded flex justify-between items-center border-2 border-gray-700">
                  <div>
                    <div className="flex items-center text-green-500">
                      <p><span className="">●</span> Réussit</p>
                    </div>
                    <div className="text-xs text-gray-400">Complétée le Jan 14, 2025</div>
                  </div>
                  <div className="text-xs text-gray-400">1h 45m</div>
                </div>

                <div className="bg-gray-900 px-4 py-2 rounded flex justify-between items-center border-2 border-gray-700">
                  <div>
                    <div className="flex items-center text-red-500">
                      <p><span className="">●</span> Échoué</p>
                    </div>
                    <div className="text-xs text-gray-400">Échoué le Jan 13, 2025</div>
                  </div>
                  <div className="text-xs text-gray-400">3h 32m</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
