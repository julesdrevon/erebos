import React, { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface ApiDataFetcherProps {
  endpoint?: string;
  params?: Record<string, any>;
  method?: 'get' | 'post';
  data?: any;
}

const ApiDataFetcher: React.FC<ApiDataFetcherProps> = ({
                                                         endpoint = '',
                                                         params = {},
                                                         method = 'get',
                                                         data = null,
                                                       }) => {
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = "https://api.jules-drevon.fr/api/";
      const url = `${baseUrl}${endpoint}`;

      try {
        let response;
        switch (method) {
          case 'get':
            response = await axios.get(url, { params });
            break;
          case 'post':
            response = await axios.post(url, data, { params });
            break;
          default:
            response = await axios.get(url, { params });
        }
        console.log(response.data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          // Erreur Axios
          console.error("Erreur Axios :", error.message);
          console.error("Détails de la réponse :", error.response?.data);
          console.error("Statut de la réponse :", error.response?.status);
        } else {
          // Erreur non-Axios
          console.error("Erreur de récupération :", error.message);
        }
      }
    };

    fetchData();
  }, [endpoint, params, method, data, router]);

  // **Ajout du return manquant :**
  return (
    <div className="">
    </div>
  );
};

export default ApiDataFetcher;
