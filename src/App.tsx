import './App.css'
import { useState, useEffect } from "react"; // Importera useState och useEffect
import Todo from './components/Todo'; // Importera Todo-komponent
import useGet from './hooks/useGet'; // Importera get-hook 

//Interface for todo 
interface todoInterface {
  _id?: string,
  title: string,
  description: string,
  status: string
}

function App() {

  // States för komponent 
  const {data : todos, error, loading, fetchData} = useGet<todoInterface[]>("https://dt210gmoment2-backend.onrender.com/todos");
  
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
