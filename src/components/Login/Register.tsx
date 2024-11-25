import { FormEvent } from "react"
import Login from "../../assets/images/login.png"

type RegisterProps = {
    showLogin: boolean
}

export const Register = ({ showLogin } : RegisterProps) => {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <div className="md:w-1/2 w-[400px] h-[550px] bg-violet-secondary rounded-l-2xl rounded-r-[100px]">
            {!showLogin ? (
                <div className="flex flex-col">
                    <h1 className="text-3xl font-RobotoBold pt-8 text-white text-center">Regístrate</h1>

                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="flex flex-col items-center pt-5 space-y-5">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight"
                                placeholder="Ingresa tu nombre (s)"
                                onChange={() => {}}
                            />

                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight"
                                placeholder="Ingresa tu apellido (s)"
                                onChange={() => {}}
                            />

                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight"
                                placeholder="Ingresa tu correo electrónico"
                                onChange={() => {}}
                            />

                            <div className="flex w-3/4 justify-between">
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    className="w-[130px] h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight"
                                    placeholder="Edad"
                                    onChange={() => {}}
                                />

                                <input
                                    id="gender"
                                    name="gender"
                                    type="text"
                                    className="w-[130px] h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight"
                                    placeholder="Género"
                                    onChange={() => {}}
                                />
                            </div>

                            <input
                                id="password"
                                name="password"
                                type="text"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight"
                                placeholder="Contraseña"
                                onChange={() => {}}
                            />

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="text"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight"
                                placeholder="Confirma tu contraseña"
                                onChange={() => {}}
                            />

                            <div className="w-3/4">
                                <input 
                                    className="bg-violet-tertiary w-full  text-white font-black uppercase py-2 rounded-[5px] font-RobotoBold text-center cursor-pointer" 
                                    value="Registrar"
                                    type="submit"    
                                />
                                <p className="text-white text-center">¿Ya tienes una cuenta?</p>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <h2 className="text-center font-RobotoBlack text-white pt-6 px-10 text-xl">Aquí comienza tu carrera profesional</h2>
                    <img src={Login} className="w-full" />
                </>
            )}
        </div>
    )
}
