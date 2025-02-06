import { useState } from "react";
import { todoInterface } from "../interfaces/TodoInterface"; // Importera interface

// Hook för att skicka ett POST-anrop
export default function usePost(url: string) {

    // States för komponent 
    const [data, setData] = useState<todoInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Funktion för att lägga till ny todo 
    const postData = async (newTodo: todoInterface) => {
        try {
            setLoading(true);
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo),
            });

            // Om inte ok
            if (!res.ok) {
                throw Error("Något gick fel vid skapandet av en ny todo " + res.status);
            }

            // Bearbeta svar
            const data = await res.json();
            setData(data);

            // Fånga upp fel
        } catch (error) {
            setError("Det blev ett fel vid skapandet av en ny todo");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postData }
}