
export default function SearchJob() {
  return (
    <>
        <div className="grid md:grid-cols-3 grid-cols-1 pb-10 place-items-center items-end md:gap-0 gap-5">
            <div className="flex flex-col w-3/4">
                <label htmlFor="title">
                    Ingresa el puesto que buscas
                </label>
                <input 
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Ejemplo: Desarrollador frontend"
                    className="w-full h-9 rounded-[8px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight border-2"
                    />
            </div>

            <div className="flex flex-col w-3/4">
                <label htmlFor="title">
                    Ingresa la ubicación
                </label>
                <input 
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Ejemplo: Ciudad de México"
                    className="w-full h-9 rounded-[8px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight border-2"
                    />
            </div>

            <input 
                value="Buscar"
                className="bg-violet-secondary uppercase font-RobotoBold rounded-md cursor-pointer text-center text-white w-3/4 h-12"
                type="submit"
            />
        </div>
    </>
  )
}
