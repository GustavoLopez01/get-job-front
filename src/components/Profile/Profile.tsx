import { ChangeEvent, useEffect, useState } from 'react'
import * as yup from 'yup'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { getUser } from '../../api/user'
import { User } from '../../types'
import { useFormik } from 'formik'

export default function Profile() {
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            age: 0,
            gender: "",
            isVerified: false
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
        }
    })

    const getUserInformation = async () => {
        try {
            const response: User = await getUser()
            if (response.id) {
                formik.setFieldValue("id", response.id)
                formik.setFieldValue("fullName", response.fullName)
                formik.setFieldValue("email", response.email)
                formik.setFieldValue("gender", response.userAccount.gender)
                formik.setFieldValue("age", response.userAccount.age)
                formik.setFieldValue("isVerified", response.userAccount.isVerified)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        formik.setFieldValue(name, value)
    }

    useEffect(() => {
        return () => { getUserInformation() }
    }, [])

    return (
        <>
            <div className="px-4 w-full">
                <form onSubmit={formik.handleSubmit} className="pt-10">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                        <div className="flex flex-col">
                            <label
                                className="font-roboto-bold px-1"
                                htmlFor="names"
                            >
                                Nombre(s)
                            </label>
                            <input
                                id="names"
                                name="names"
                                className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-none"
                                placeholder="Nombre completo"
                                onChange={handleChange}
                                value={formik.values.fullName}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                className="font-roboto-bold px-1"
                                htmlFor="motherSurname"
                            >
                                Apellido materno
                            </label>
                            <input
                                id="motherSurname"
                                name="motherSurname"
                                className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-none"
                                placeholder="Nombre completo"
                                onChange={handleChange}
                                value={formik.values.fullName}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                className="font-roboto-bold px-1"
                                htmlFor="lastName"
                            >
                                Apellido paterno
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-none"
                                placeholder="Nombre completo"
                                onChange={handleChange}
                                value={formik.values.fullName}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                className="font-roboto-bold px-1"
                                htmlFor="email"
                            >
                                Correo electronico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-none"
                                placeholder="Correo electronico"
                                onChange={handleChange}
                                value={formik.values.email}
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
                                className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-none"
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
                            <input
                                id="gender"
                                name="gender"
                                className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-none"
                                placeholder="Genero"
                                onChange={handleChange}
                                value={formik.values.gender}
                            />
                        </div>

                        <div className="flex flex-col">
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
                                className="file:h-9 file:rounded-full file:px-5 file:outline-none file:border-none file:cursor-pointer"

                            />
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
                                className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-none"
                                placeholder="Edad"
                                type="password"
                                min={1}
                                onChange={handleChange}
                                value={formik.values.age}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                className="font-roboto-bold px-1"
                                htmlFor="confirmPassword"
                            >
                                Edad
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-none"
                                placeholder="Edad"
                                type="password"
                                min={1}
                                onChange={handleChange}
                                value={formik.values.age}
                            />
                        </div>

                    </div>
                    <div className="flex justify-center w-full py-5">
                        <button
                            type="submit"
                            className='rounded-md text-white uppercase bg-indigo-500 font-roboto-bold py-2 px-10 w-1/2'
                        >
                            Guardar
                        </button>
                    </div>
                </form>

                <div
                    className="w-full flex flex-wrap justify-between items-center rounded-md mt-6 bg-indigo-400 p-5"
                >
                    <p className="text-white flex font-roboto-bold items-center gap-3">
                        <ExclamationCircleIcon className='size-8' />
                        Tu cuenta aún no esta verificada
                    </p>
                    <button className="bg-green-600 py-2 px-6 hover:bg-green-500 rounded-md text-white font-roboto-bold">Verificar ahora</button>
                </div>
            </div>
        </>
    )
}

const validateSchema = yup.object().shape({
    fullName: yup.string().required("El nombre es obligatorio")
}) 