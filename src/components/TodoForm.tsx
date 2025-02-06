// Importera css-fil
import { useState } from "react";
import { todoInterface } from "../interfaces/TodoInterface"; // Importera todoInterface
import * as Yup from "yup"; // Importera Yup


const TodoForm = () => {

    // Interface för felmeddelanden 
    interface ErrorsData {
        title?: string,
        description?: string,
        status?: string
    }

    // States för formuläret 
    const [formData, setFormData] = useState<todoInterface>({ title: "", description: "", status: "Ej påbörjad" })
    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    // Valideringsschema
    const validationSchema = Yup.object({
        title: Yup.string().required("Du måste ange en titel").min(3, "Titel måste vara minst 3 tecken lång"),
        description: Yup.string().required("Beskrivning får vara max 200 tecken").max(200),
        status: Yup.string().oneOf(["Ej påbörjad", "Pågående", "Avklarad"])
    })

    // States för errors 
    const [errors, setErrors] = useState<ErrorsData>({})

    // Förhindra att sida laddas om 
    const submitForm = async (e: any) => {
        e.preventDefault();

        // Använd valideringsschema 
        try {
            await validationSchema.validate(formData, { abortEarly: false });

            console.log("todo tillagd", formData);
            setErrors({}); // Tomt objekt om ok 

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

    }


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
            {errors.status && <span className="error">{errors.status}</span>}
            <input type="submit" value="Lägg till" />
        </form>
    )
}

export default TodoForm