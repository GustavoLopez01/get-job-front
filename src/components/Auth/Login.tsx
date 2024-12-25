import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../../api/login'
import Loader from '../Loader'
import Register from '../../assets/images/register.png'

type LoginProps = {
    showLogin: boolean
}

export const Login = ({ showLogin } : LoginProps) => {
    const navigate = useNavigate()
    const [showLoader, setShowLoader] = useState(false)
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            setShowLoader(true)
            const response = await auth(values.email, values.password)
            if(response.token) {
                document.cookie = `userToken=${response.token}`
                navigate("/dashboard")
            }
            setShowLoader(false)
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="w-1/2 flex items-center">
            {showLogin ? (
                <div className='w-full'>
                    <h1 className="font-roboto-bold text-center text-3xl">Inicia sesión</h1>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="flex flex-col items-center pt-5 space-y-5">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-roboto-light border-2"
                                placeholder="Ingresa tu correo electrónico"
                                onChange={handleChange}
                            />

                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="w-3/4 h-9 rounded-[10px] outline-none px-4 text-black placeholder:text-black text-sm font-roboto-light border-2"
                                placeholder="Ingresa tu contraseña"
                                onChange={handleChange}
                            />

                            <button
                                type="submit"
                                className="w-3/4 cursor-pointer bg-violet-secondary text-white uppercase py-2 font-roboto-bold rounded-[5px] flex items-center justify-center"
                                >
                                    {!showLoader ? "inicia sesión" : (
                                        <Loader classProps="w-6 h-6" />
                                    )}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <img src={Register} className="w-full" />
            )}
        </div>
    )
}
