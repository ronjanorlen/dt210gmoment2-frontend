import { useState, useEffect } from "react"; // Importera useState och useEffect 

// Hook för get-anrop 
export default function useGet<T>(url: string): {
  data: T, // Representera todointerface 
  error: string | null,
  loading: boolean,
  fetchData: () => void
} {
  // States för komponent 
  const [data, setData] = useState<T>([] as T) // Kan vara array av interface, eller bara objekt av interface 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData();
  }, [url]) // Om url ändras, kör anrop på nytt 

  // Hämta alla todos från api
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);

      // Om inte ok 
      if (!res.ok) {
        throw Error("Något gick fel vid hämtning av data " + res.status);
      }

      // Bearbeta svar 
      const data = await res.json();
      setData(data);

      // Fånga upp fel
    } catch (error) {
      setError("Det blev ett fel vid hämtning av data");
    } finally {
      setLoading(false); // Vid klar med anrop 
    }
  }

  return { data, error, loading, fetchData }
}