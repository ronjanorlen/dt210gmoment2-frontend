// Child-komponent
import "./Todo.css"; // Importera css-fil 
import { todoInterface } from "../interfaces/TodoInterface"; // Importera interface 

const Todo = ({ todo, onTodoUpdate, deleteMessage }: { todo: todoInterface, onTodoUpdate: Function, deleteMessage: Function }) => {
    // Skriv ut i färg baserat på status
    const statusColor = todo.status === "Ej påbörjad" ? "red" : todo.status === "Pågående" ? "orange" : "green"

    // Funktion för att uppdatera status på todo 
    const updateTodo = async (e: any) => {
        let newStatus = e.target.value; // Hämta in nytt värde för status 

        // Nytt objekt för uppdaterad todo 
        const newTodo = { ...todo, status: newStatus }; // Kopiera värden från todo och ändra status 

        try {
            const res = await fetch("https://dt210gmoment2-backend.onrender.com/todo/" + todo._id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });

            if (!res.ok) {
                throw Error();
            }

            // om ok
            onTodoUpdate(); // Trigga huvudkomponent att köra fetchData-metod 

        } catch (error) {

        }

    }

    // Funktion för ta bort en todo 
    const deleteTodo = async () => {
        const confirmDelete = window.confirm("Vill du ta bort denna todo?");
        if (!confirmDelete) return;

        try {
            const res = await fetch("https://dt210gmoment2-backend.onrender.com/todo/" + todo._id, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!res.ok) {

                throw new Error("Kunde ej ta bort todo");
            }   

            // Om ok
            deleteMessage("Todon togs bort!"); // Visa meddelande 
            onTodoUpdate(); // Trigga fetchdata-metod 

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p style={{ color: statusColor }}><strong>{todo.status}</strong></p>

            <form>
                <label htmlFor="status">Ändra status:</label>
                <br />
                <select name="status" id="status" defaultValue={todo.status}
                    onChange={updateTodo}>
                    <option>Ej påbörjad</option>
                    <option>Pågående</option>
                    <option>Avklarad</option>
                </select>
            </form>
            <button className="delete-btn" onClick={deleteTodo}>Ta bort</button>

        </>
    )
}

export default Todo