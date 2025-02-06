import './App.css'
import Todo from './components/Todo'; // Importera Todo-komponent
import useGet from './hooks/useGet'; // Importera get-hook 
import { todoInterface } from './interfaces/TodoInterface'; // Importera todointerface
import TodoForm from './components/TodoForm'; // Importera TodoForm-komponent 


function App() {

  // States för komponent 
  const { data: todos, error, loading, fetchData } = useGet<todoInterface[]>("https://dt210gmoment2-backend.onrender.com/todos");

  return (
    <>
      <main>
        <h1>Att göra:</h1>

        <TodoForm onTodoAdded={fetchData} />

        {loading && <p>Hämtar todos..</p>}

        {error && <p>{error}</p>}

        <div className="todos">
          {
            todos.map((todo) => (
              <Todo todo={todo} key={todo._id} onTodoUpdate={fetchData} />
            ))
          }
        </div>

      </main>
    </>
  );
}

export default App
