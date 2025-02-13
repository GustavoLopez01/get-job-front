import { memo, ChangeEvent, useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { saveUser } from '../../api/user'
import type { UserSave } from '../../types'
import Login from '../../assets/images/login.png'

type RegisterProps = {
  showLogin: boolean
  setShowLogin: (value: boolean) => void
}

type FieldInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  name: string
  id: string
  type: string
  placeholder: string
  value: string
}

const validationSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  email: yup.string().email('Ingresa un correo válido').required('El correo es requerido'),
  roleId: yup.number().required('Selecciona una opción'),
  password: yup.string().required('La contraseña es requerida'),
})

const Register = memo(function Register({ showLogin, setShowLogin }: RegisterProps) {

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      roleId: 0,
      someFieldEmpty: ''
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { password, confirmPassword } = values;
        if (password !== confirmPassword) {
          formik.setFieldError('someFieldEmpty', 'Las contraseñas no coinciden')
          return
        }

        const { name, lastName, email, roleId } = values
        const newUser = {
          name,
          lastName,
          roleId,
          email,
          password
        } as UserSave

        const response: UserSave = await saveUser(newUser)
        if (response.email) {
          setShowLogin(true)
          return
        }

        formik.setFieldError('someFieldEmpty', 'Ocurrió un error al crear la cuenta intenta de nuevo')
      } catch (error) {
        console.error(error);
      }
    }
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    formik.setFieldValue(name, value)
  }

  useEffect(() => {
    const errors = Object.values(formik.errors)
    if (errors.length > 0) formik.setFieldError('someFieldEmpty', 'Todos los campos son requeridos')
  }, [formik.errors])

  return (
    <div className="md:w-1/2 w-[400px] h-[550px] bg-violet-secondary rounded-l-2xl rounded-r-[100px]">
      {!showLogin ? (
        <div className="flex flex-col">
          <h1 className="text-3xl font-roboto-bold pt-8 text-white text-center">
            Regístrate
          </h1>

          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="flex flex-col items-center pt-5 space-y-5">
              <FieldInput
                id="name"
                name="name"
                type="text"
                placeholder="Ingresa tu nombre (s)"
                handleChange={handleChange}
                value={formik.values.name}
              />

              <FieldInput
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Ingresa tu apellido (s)"
                handleChange={handleChange}
                value={formik.values.lastName}
              />

              <FieldInput
                id="email"
                name="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                handleChange={handleChange}
                value={formik.values.email}
              />

              <select
                id="roleId"
                name="roleId"
                className="w-3/4 h-9 rounded-full outline-hidden px-4 text-black placeholder:text-black text-sm font-roboto-light bg-white"
                onChange={({ target }) => {
                  formik.setFieldValue('roleId', target.value)
                  console.log(target.value)
                }}
              >
                <option value="">¿Quién eres?</option>
                <option value="1">Empresa</option>
                <option value="2">Candidato</option>
              </select>

              <FieldInput
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                handleChange={handleChange}
                value={formik.values.password}
              />

              <FieldInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirma tu contraseña"
                handleChange={handleChange}
                value={formik.values.confirmPassword}
              />

              <div className="w-3/4">
                <input
                  className="bg-violet-tertiary w-full  text-white font-black uppercase py-2 rounded-[5px] font-roboto-bold text-center cursor-pointer"
                  value="Crear cuenta"
                  type="submit"
                />
                <button
                  className="text-white w-full cursor-pointer"
                  onClick={() => setShowLogin(true)}
                >
                  ¿Ya tienes una cuenta?
                </button>
              </div>

              {formik.errors.someFieldEmpty && (
                <span className="text-red-500 font-roboto-bold">
                  {formik.errors.someFieldEmpty}
                </span>
              )}
            </div>
          </form>
        </div>
      ) : (
        <>
          <h2 className="text-center font-roboto-black text-white pt-6 px-10 text-xl">Aquí comienza tu carrera profesional</h2>
          <img src={Login} className="w-full" />
        </>
      )}
    </div>
  )
})

const FieldInput = ({
  handleChange,
  name,
  id,
  type,
  placeholder,
}: FieldInputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className="w-3/4 h-9 rounded-full outline-hidden px-4 text-black placeholder:text-black text-sm font-roboto-light bg-white"
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}

export default Register