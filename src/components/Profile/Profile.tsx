import { ChangeEvent, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { updateUser } from '../../api/user'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setData } from '../../store/userSlice'
import type {
  UserAccountSave,
  FetchResponse,
  DataUser
} from '../../types'
import { generateUniqueKey } from '../../helpers'
import { getUserCv, updateCV, updateUserAccount } from '../../api/userAccount'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import GeneralModal from '../Modal/GeneralModal'
import DocumentVisualizer from '../GeneralComponents/DocumentVisualizer'
import Loader from '../Loader'

export type UserAccount = {
  userId: number
  age: number
  verifyToken: string
  gender: string
}

type CvResponse = {
  document: string
  success: boolean
}

const validationSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  email: yup.string().email("El correo electronico no es valido").required("El correo electronico es obligatorio"),
  age: yup.number().required("La edad es obligatoria").min(1, "La edad debe ser mayor a 0"),
  gender: yup.string().required("El genero es obligatorio"),
  isVerified: yup.boolean().required("La verificación es obligatoria"),
})

export default function Profile() {
  const user = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  const [errorMessage, seterrorMessage] = useState('')
  const [cvDocument, setCvDocument] = useState('')
  const [showCV, setShowCV] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      gender: '',
      password: '',
      isVerified: false,
      age: 0,
      roleId: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userAccount = values as UserAccountSave
        const response: FetchResponse = await updateUser(userAccount)

        if (response.success) {
          const updateUserSlice: DataUser = {
            id: userAccount.id,
            name: userAccount.name,
            lastName: userAccount.lastName,
            email: userAccount.email,
            roleId: userAccount.roleId,
            userAccount: {
              age: userAccount.age,
              gender: userAccount.gender,
              isVerified: userAccount.isVerified,
              verifyToken: ''
            }
          }
          dispatch(setData(updateUserSlice))
          return
        }

        seterrorMessage(response.message)
      } catch (error) {
        console.error(error);
      }
    }
  })

  const getUserInformation = async () => {
    try {
      if (user.id) {
        formik.setFieldValue("id", user.id)
        formik.setFieldValue("name", user.name)
        formik.setFieldValue("lastName", user.lastName)
        formik.setFieldValue("email", user.email)
        formik.setFieldValue("roleId", user.roleId)
        formik.setFieldValue("gender", user.userAccount.gender)
        formik.setFieldValue("age", user.userAccount.age)
        formik.setFieldValue("isVerified", user.userAccount.isVerified)

        const response = await getUserCv(user.id)
        console.log({ response });

        if (response) {
          setCvDocument(response)
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    formik.setFieldValue(name, value)
  }

  const handleSendVerifyEmail = async () => {
    try {
      const userAccount = {
        userId: user.id,
        gender: user.userAccount.gender,
        age: user.userAccount.age,
        verifyToken: generateUniqueKey()
      } as UserAccount

      const response: FetchResponse = await updateUserAccount(userAccount)
      if (response.success) {
        console.log(response);

      } else {

      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateCV = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = event.target
      if (files) {
        const formData = new FormData()
        formData.append(
          'file',
          files[0],
          files[0].name
        )
        console.log(files[0]);

        const response = await updateCV(formData)

      }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    return () => { getUserInformation() }
  }, [user])

  if (!user.id) return <></>

  return (
    <>
      <GeneralModal
        open={showCV}
      >
        <div className="bg-white w-[80vw] min-h-[80vh] h-full">
          {/* <iframe 
          src={cvDocument}
          className="w-full min-h-full h-[80vh]"
        /> */}

          <DocumentVisualizer
            documents={
              [{ uri: cvDocument, fileType: 'application/pdf' }]
            }
          />
        </div>
      </GeneralModal>

      <div className="flex flex-col justify-center">
        {!formik.values.email && (
          <Loader classProps='h-10 w-10 border-2 border-violet-primary' />
        )}

        {formik.values.email && (
          <div className="px-4 w-full">
            <form onSubmit={formik.handleSubmit} className="pt-10">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                <div className="flex flex-col">
                  <label
                    className="font-roboto-bold px-1"
                    htmlFor="name"
                  >
                    Nombre(s)
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-hidden"
                    placeholder="Nombre completo"
                    onChange={handleChange}
                    value={formik.values.name}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-roboto-bold px-1"
                    htmlFor="lastName"
                  >
                    Apellido(s)
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-hidden"
                    placeholder="Nombre completo"
                    onChange={handleChange}
                    value={formik.values.lastName}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-roboto-bold px-1"
                    htmlFor="email"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-hidden opacity-50 cursor-not-allowed"
                    placeholder="Correo electronico"
                    onChange={handleChange}
                    value={formik.values.email}
                    readOnly
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-roboto-bold px-1"
                    htmlFor="age"
                  >
                    Edad
                  </label>
                  <input
                    id="age"
                    name="age"
                    className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-hidden"
                    placeholder="Edad"
                    type="number"
                    min={1}
                    onChange={handleChange}
                    value={formik.values.age}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-roboto-bold px-1"
                    htmlFor="gender"
                  >
                    Genero
                  </label>
                  <select
                    className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-hidden"
                    id="gender"
                    name="gender"
                    onChange={({ target }) => {
                      formik.setFieldValue('gender', target.value)
                    }}
                    value={formik.values.gender}
                  >
                    <option value=''> -- Selecciona una opción --</option>
                    <option value='M'> Masculino </option>
                    <option value='F'> Femenino </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  {!cvDocument ? (
                    <>
                      <label
                        className="font-roboto-bold"
                        htmlFor="cv"
                      >
                        Sube tu CV
                      </label>

                      <input
                        id="cv"
                        name="cv"
                        type="file"
                        className="file:h-9 file:bg-violet-600 file:text-white file:rounded-full file:px-5 file:outline-hidden file:border-none file:cursor-pointer"
                        onChange={handleUpdateCV}
                      />
                    </>
                  ) : (
                    <div className="flex h-full justify-center items-center">
                      <button
                        type="button"
                        className="bg-violet-600 w-full rounded-full py-2 text-white font-roboto-bold cursor-pointer"
                        onClick={() => setShowCV(true)}
                      >
                        Mostrar CV
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    className="font-roboto-bold px-1"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-hidden"
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    min={1}
                    onChange={handleChange}
                  />
                </div>

              </div>
              <div className="flex justify-center w-full py-5">
                <button
                  type="submit"
                  className={`rounded-md text-white uppercase bg-indigo-500 font-roboto-bold py-2 px-10 w-1/2 ${formik.values.password ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                  disabled={!formik.values.password}
                >
                  Guardar
                </button>
              </div>
            </form>

            {errorMessage &&
              (<p className="text-red-500 font-roboto-black text-lg text-center">
                {errorMessage}
              </p>)
            }

            {!user.userAccount.isVerified && (
              <div className={`w-full flex flex-wrap justify-between 
                items-center text-white font-roboto-bold rounded-md mt-6 p-5 ${user.userAccount.verifyToken ? 'bg-amber-600' : 'bg-violet-600'}
            `}>
                {(!user.userAccount.verifyToken) && (
                  <>
                    <p className="flex font-roboto-bold items-center gap-3">
                      <ExclamationCircleIcon className='size-8' />
                      Tu cuenta aún no esta verificada
                    </p>
                    <button
                      className="bg-green-600 py-2 px-6 mx-4 hover:bg-green-500 rounded-md font-roboto-bold cursor-pointer"
                      onClick={handleSendVerifyEmail}
                    >
                      Verificar ahora
                    </button>
                  </>
                )}

                {!user.userAccount.isVerified && user.userAccount.verifyToken && (
                  <p className="text-white flex font-roboto-bold items-center gap-3">
                    Revisa tu correo electrónico para verificar tu cuenta
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

