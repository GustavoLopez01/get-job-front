import { ChangeEvent, FormEvent } from "react"

export default function AddVacancy() {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <>
            <div className="w-full mt-5 px-5">
                <form >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label>Titulo de la vacante</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="w-full h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight border-2"
                                placeholder="Ejemplo: Desarrollador de software"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>Categoria</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="w-full h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight border-2"
                                placeholder="Elige alguna categoria"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Salario</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="w-full h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight border-2"
                                placeholder="Ejemplo: 10000"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col pt-4">
                        <label>Descripción</label>
                        <textarea
                            id="email"
                            name="email"
                            className="w-full h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight border-2 min-h-24 resize-none"
                            placeholder="Ejemplo: Conocimientos en algun software de control de versiones - Git, GitLab"
                        />
                    </div>

                    <button
                        className="bg-indigo-600 hover:bg-indigo-500 w-full text-white uppercase py-5 px-5 font-RobotoBlack mt-5"
                    >
                        + Agregar
                    </button>
                </form>
            </div>
        </>
    )
}
