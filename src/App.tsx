import './App.css'
import { useState, useEffect } from "react"; // Importera useState och useEffect
import Todo from './components/Todo'; // Importera Todo-komponent

//Interface for todo 
interface todoInterface {
  _id: string,
  title: string,
  description: string,
  status: string
}

function App() {

  // States för komponent 
  const [todos, setTodos] = useState<todoInterface[] | []>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData();
  }, [])

  // Hämta in data från api
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dt210gmoment2-backend.onrender.com/todos");

    // Om inte ok 
      if (!res.ok) {
        throw Error("Något gick fel vid hämtning av todos " + res.status);
      }

      // Bearbeta svar 
      const data = await res.json();
      setTodos(data);

      // Fånga upp fel
    } catch (error) {
      setError("Det blev ett fel vid hämtning av todos");
    } finally {
      setLoading(false); // Vid klar med anrop 
    }
  }

  return (
    <>
    <main>
      <h1>Att göra:</h1>

     {loading && <p>Hämtar todos..</p>}

     {error && <p>{error}</p>}

     <div className="todos">
      {
        todos.map((todo) => (
          <Todo todo={todo} key={todo._id} onTodoUpdate={fetchData}/>
        ))
      }
     </div>

    </main>
    </>
  );
}

export default App
