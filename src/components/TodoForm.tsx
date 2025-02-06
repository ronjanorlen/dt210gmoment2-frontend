// Importera css-fil
import { useState } from "react";
import { todoInterface } from "../interfaces/TodoInterface"; // Importera todoInterface


const TodoForm = () => {

    // Interface för felmeddelanden 
    interface ErrorsData {
        title?: string,
        description?: string
    }

    // States för formuläret 
    const [formData, setFormData] = useState<todoInterface>({ title: "", description: "", status: "Ej påbörjad" })
    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    // States för errors 
    const [errors, setErrors] = useState<ErrorsData>({})

    // Funktion för att validera data 
    const validateForm = ((data: todoInterface) => {

        const validationErrors: ErrorsData = {}; // Objekt för ev fel 

        if (!data.title) {
            validationErrors.title = "Ange en titel";
        }

        if (!data.description) {
            validationErrors.description = "Ange en beskrivning";
        }

        return validationErrors;
    })

    // Förhindra att sida laddas om 
    const submitForm = ((e: any) => {
        e.preventDefault();

        // Validera fält innan formulär skickas 
        const validationErrors = validateForm(formData);

        // Kontrollera props i objekt 
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            
        } else {
            setErrors({});
            // Skicka data om korrekt 

        }

    })


    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title">Titel:</label>
            <input type="text" name="title" id="title" value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

            {errors.title && <span className="error">{errors.title}</span>}

            <label htmlFor="description">Beskrivning:</label>
            <textarea name="description" id="description" value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>

            {errors.description && <span className="error">{errors.description}</span>}

            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                {
                    statusArr.map((status, index) => (
                        <option key={index}>{status}</option>
                    ))
                }
            </select>
            <input type="submit" value="Lägg till" />
        </form>
    )
}

export default TodoForm