import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../../api/login'
import { validateFields } from '../../helpers'
import Loader from '../Loader'
import Register from '../../assets/images/register.png'

type LoginProps = {
  showLogin: boolean
}

export const Login = ({ showLogin }: LoginProps) => {
  const navigate = useNavigate()

  const [showLoader, setShowLoader] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: ""
  })
  const [error, setErrors] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const isValid = validateFields(values)
      if(!isValid) {
        setErrors("Ambos campos son requeridos")
        return
      }

      setShowLoader(true)
      const response = await auth(values.email, values.password)
      if (response.token) {
        document.cookie = `userToken=${response.token}`
        sessionStorage.setItem('role', response.role.id)
        navigate("/dashboard")
      } else {
        setErrors("Usuario o contraseña incorrectos")
      }
      setShowLoader(false)
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="md:w-1/2 md:py-0 py-7 w-full flex items-center">
      {showLogin ? (
        <div className="w-full">
          <h1 className="font-roboto-bold text-center text-3xl">Inicia sesión</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col items-center pt-5 space-y-5 relative">
              <input
                id="email"
                name="email"
                type="text"
                className="w-3/4 h-9 rounded-full outline-hidden px-4 text-black placeholder:text-black text-sm font-roboto-light border-2"
                placeholder="Ingresa tu correo electrónico"
                onChange={handleChange}
              />

              <input
                id="password"
                name="password"
                type="password"
                className="w-3/4 h-9 rounded-full outline-hidden px-4 text-black placeholder:text-black text-sm font-roboto-light border-2"
                placeholder="Ingresa tu contraseña"
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-3/4 cursor-pointer bg-violet-secondary text-white uppercase py-2 font-roboto-bold rounded-[5px] flex items-center justify-center"
              >
                {!showLoader ? "inicia sesión" : (
                  <Loader classProps="w-6 h-6 border-2 border-white" />
                )}
              </button>

              {error && (
                <span className="text-red-500 font-roboto-bold absolute -bottom-2.5"> {error} </span>
              )}
            </div>
          </form>
        </div>
      ) : (
        <img src={Register} className="w-full md:px-0 px-20" />
      )}
    </div>
  )
}
