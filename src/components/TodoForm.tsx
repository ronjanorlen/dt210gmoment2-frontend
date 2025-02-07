import "./TodoForm.css"; // Importera css-fil
import { useState } from "react";
import { todoInterface } from "../interfaces/TodoInterface"; // Importera todoInterface
import * as Yup from "yup"; // Importera Yup
import usePost from "../hooks/usePost"; // Importera usePost-hook 


const TodoForm = ({ onTodoAdded }: { onTodoAdded: () => void }) => {

    // Interface för felmeddelanden 
    interface ErrorsData {
        title?: string,
        description?: string,
        status?: string
    }

    // States för formuläret 
    const [formData, setFormData] = useState<todoInterface>({ title: "", description: "", status: "Ej påbörjad" })
    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    // usePost-hook 
    const { postData, loading, error } = usePost("https://dt210gmoment2-backend.onrender.com/todo");

    // Valideringsschema
    const validationSchema = Yup.object({
        title: Yup.string().required("Du måste ange en titel").min(3, "Titel måste vara minst 3 tecken lång"),
        description: Yup.string().required("Lägg till en beskrivning").max(200, "Beskrivning får vara max 200 tecken"),
        status: Yup.string().oneOf(["Ej påbörjad", "Pågående", "Avklarad"])
    })

    // States för felmeddelanden 
    const [errors, setErrors] = useState<ErrorsData>({})

    // Förhindra att sida laddas om 
    const submitForm = async (e: any) => {
        e.preventDefault();

        // Använd valideringsschema 
        try {
            await validationSchema.validate(formData, { abortEarly: false });

            setErrors({}); // Tomt objekt om ok 

            await postData(formData); // Skicka till api 

            setFormData({ title: "", description: "", status: "Ej påbörjad" }); // Rensa formulär 

            onTodoAdded(); // Uppdatera listan 

            // Fånga upp fel 
        } catch (errors) {
            const validationErrors: ErrorsData = {}; // Objekt för ev fel

            // Om det finns några fel 
            if (errors instanceof Yup.ValidationError) {
                // Loopa igenom fel 
                errors.inner.forEach(error => {
                    const prop = error.path as keyof ErrorsData;

                    // Lägg till värde på prop till validationErrors och ta ut felmeddelande 
                    validationErrors[prop] = error.message;
                })

                setErrors(validationErrors);

            }

        }

    };

    // Formulär för att lägga till todo 
    return (
        <form className="addTodoForm" onSubmit={submitForm}>
            <label htmlFor="title">Titel:</label>
            <input type="text" name="title" id="title" value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

            {errors.title && <span className="error">{errors.title}</span>}

            <label htmlFor="description">Beskrivning:</label>
            <textarea name="description" id="description" value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={200}></textarea>

            {errors.description && <span className="error">{errors.description}</span>}

            <label htmlFor="status">Status:</label>
            <select name="status" id="status" value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                {
                    statusArr.map((status, index) => (
                        <option key={index}>{status}</option>
                    ))
                }
            </select>
            {errors.status && <span className="error">{errors.status}</span>}
            <button type="submit" className="add-btn" disabled={loading}>
                {loading ? "Lägger till..." : <>
                    <i className="fa-solid fa-plus"></i> Lägg till
                </>}
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default TodoForm