import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Utilisez next/navigation pour les routeurs

interface ApiDataFetcherProps {
  endpoint?: string; // Partie de l'URL après /api/
  params?: Record<string, string>; // Paramètres de requête
}

const ApiDataFetcher: React.FC<ApiDataFetcherProps> = ({ endpoint = '', params = {} }) => {
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const baseUrl = "https://api.jules-drevon.fr/api/";
      let url = `${baseUrl}${endpoint}`;

      // Ajoute les paramètres de requête à l'URL
      const urlParams = new URLSearchParams(params);
      const queryString = urlParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des données. Statut: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          console.log(json);
        } catch (parseError) {
          console.error("Erreur d'analyse JSON:", parseError);
          console.error("Texte de la réponse brute:", text);
        }

      } catch (error: any) {
        console.error("Erreur de récupération:", error.message);
      }
    };

    getData();
  }, [endpoint, params, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-700">Fetching data from API...</p>
    </div>
  );
};

export default ApiDataFetcher;
