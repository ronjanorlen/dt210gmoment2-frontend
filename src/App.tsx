import './App.css'
import Todo from './components/Todo'; // Importera Todo-komponent
import useGet from './hooks/useGet'; // Importera get-hook 
import { todoInterface } from './interfaces/TodoInterface'; // Importera todointerface
import TodoForm from './components/TodoForm'; // Importera TodoForm-komponent 
import { useState } from "react"; // Importera useState


function App() {

  // States för komponent 
  const { data: todos = [], error, loading, fetchData } = useGet<todoInterface[]>("https://dt210gmoment2-backend.onrender.com/todos");


  // Meddelande vid borttagning av todo 
  const [message, setMessage] = useState<string | null>(null);

  const deleteMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); // Visa meddelande i 3 sek
  };

  return (
    <>
      <main>
        <h1>Att göra lista</h1>

        <h2>Lägg till ny uppgift</h2>
        <TodoForm onTodoAdded={fetchData} />

        {message && <p className="delete-msg">{message}</p>} {/*Visa meddelande vid borttagning*/}

        {loading && <p className="get-todos">Hämtar todos..</p>} {/*I väntan på api*/}

        {error && <p className="error-msg">{error}</p>} {/*Om fel vid inhämtning*/}

        <h2>Min uppgifter:</h2>
        {/* Kontrollera om todos är tomt */}
        <div className="todo-container">
          {(!todos || (Array.isArray(todos) && todos.length === 0)) && !loading && !error ? (
            <p className="empty-msg">Inga uppgifter har lagts till ännu</p> // Om inga todos finns, visa detta meddelande
          ) : (
            Array.isArray(todos) && todos.map((todo) => (
              <div className="todo" key={todo._id}>
                <Todo todo={todo} onTodoUpdate={fetchData} deleteMessage={deleteMessage} />
              </div>
            ))
          )}
        </div>

      </main>
    </>
  );
}

export default App
