import {
    ChangeEvent,
    FormEvent,
    useState
} from "react"
import { useNavigate } from "react-router"
import { saveJob } from "../../api/job-api"
import type { Job, JobToSave } from "../../types"
import { CATEGORIES } from "../../constants"

const initialState = {
    name: '',
    description: '',
    salary: 0,
    active: true,
    showSalary: true,
    details: '',
}

export default function AddVacancy() {
    const navigate = useNavigate()

    const [vacancy, setVacancy] = useState<JobToSave>(initialState)

    const handleChange = (event: ChangeEvent<HTMLInputElement> |
        ChangeEvent<HTMLTextAreaElement> |
        ChangeEvent<HTMLSelectElement>) => {
        try {
            const { name, value } = event.target
            setVacancy({
                ...vacancy,
                [name]: value
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const response: Job = await saveJob(vacancy)
            if (response.id) {
                navigate("/my-vacancies")
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="w-full mt-5 px-5">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="name"
                            >
                                Titulo de la vacante
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-full h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-roboto-light border-[1px]"
                                placeholder="Ejemplo: Desarrollador de software"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>Categoria</label>
                            <select
                                className="w-full h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-roboto-light border-2"
                                id="category"
                                name="category"
                                onChange={handleChange}
                            >
                                <option>-- Selecciona una opción --</option>
                                {CATEGORIES.map((category) => (
                                    <option
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label>Salario</label>
                            <input
                                id="salary"
                                name="salary"
                                type="number"
                                className="w-full h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-roboto-light border-2"
                                placeholder="Ejemplo: 10000"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col w-full ">
                            <label>¿Deseas mostrar el salario en la vacante?</label>
                            <div className="flex justify-between pt-2">
                                <div className="flex justify-center gap-2 w-1/2">
                                    <label htmlFor="yes">Si</label>
                                    <input
                                        type="radio"
                                        id="yes"
                                        value="1"
                                        name="showSalary"
                                        className="w-5"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-center gap-2 w-1/2">
                                    <label htmlFor="no">No</label>
                                    <input
                                        type="radio"
                                        id="no"
                                        value="0"
                                        name="showSalary"
                                        className="w-5"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col pt-4">
                        <label>Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-roboto-light border-2 min-h-24 resize-none"
                            placeholder="Ejemplo: Conocimientos en algun software de control de versiones - Git, GitLab"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className="bg-indigo-600 hover:bg-indigo-500 w-full text-white uppercase py-5 px-5 font-roboto-black mt-5"
                        type="submit"
                    >
                        + Agregar
                    </button>
                </form>
            </div>
        </>
    )
}
