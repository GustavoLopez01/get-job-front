import { FormEvent } from 'react'
import Register from '../../assets/images/register.png'
import { useNavigate } from 'react-router'

type LoginProps = {
    showLogin: boolean
}

export const Login = ({ showLogin } : LoginProps) => {

    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate("/dashboard")
    }

    return (
        <div className="w-1/2 flex items-center">
            {showLogin ? (
                <div className='w-full'>
                    <h1 className="font-RobotoBold text-center text-3xl">Inicia sesión</h1>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="flex flex-col items-center pt-5 space-y-5">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight border-2"
                                placeholder="Ingresa tu correo electrónico"
                                onChange={() => {}}
                            />

                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-RobotoLight border-2"
                                placeholder="Ingresa tu contraseña"
                                onChange={() => {}}
                            />

                            <input 
                                type="submit"
                                className="w-3/4 cursor-pointer bg-violet-secondary text-white uppercase py-2 font-RobotoBold rounded-[5px]"
                                value="inicia sesión"
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <img src={Register} className="w-full" />
            )}
        </div>
    )
}
