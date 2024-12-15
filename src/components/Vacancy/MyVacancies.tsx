import { useEffect, useMemo, useState } from "react"
import { deleteJobById, getJobsByUser } from "../../api/job-api"
import type { Job } from "../../types"
import {
    PencilSquareIcon,
    TrashIcon,
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon
} from "@heroicons/react/24/outline"
import Modal from "../Modal/Modal"

export default function MyVacancies() {
    const [vacancies, setVacancies] = useState<Job[]>()
    const [vacancy, setVacancy] = useState<Job>()
    const [numRegisters, setNumRegisters] = useState(0)
    const [viewSelected, setViewSelected] = useState(1)
    const [open, setOpen] = useState(false)

    const getMyVacancies = async () => {
        try {
            const response: Job[] = await getJobsByUser()
            console.log(response);

            if (Array.isArray(response)) {
                setVacancies(response)
                setNumRegisters(Math.ceil(response.length / 7))
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            if (vacancy) {
                const response = await deleteJobById(vacancy.id)
                if (response) {
                    setVacancies((currentVacancies) =>
                        currentVacancies?.filter((objVacancy) => objVacancy.id !== vacancy.id)
                    )
                    setOpen(false)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const currentVacancies = useMemo(() => {
        return vacancies?.slice((viewSelected * 7) - 7, (viewSelected * 7))
    }, [vacancies, viewSelected])


    const handleNextPage = () => {
        try {
            if (numRegisters <= viewSelected) return
            setViewSelected((current) => current + 1)
        } catch (error) {
            console.error(error);
        }
    }

    const handleLastPage = () => {
        try {
            if (viewSelected <= 1) return
            setViewSelected((current) => current - 1)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        return () => { getMyVacancies() }
    }, [])

    return (
        <>
            <Modal
                open={open}
                title={'¿Estas seguro de eliminar esta vacante?'}
                message={'Al eliminar esta vacante ya no estara disponible.'}
                titleButtonAccept="Eliminar"
                titleButtonCancel="Cancelar"
                handleClick={handleDelete}
                setOpen={setOpen}
            />
            <div className="md:w-full px-5">
                <p className="m-0 py-5 font-RobotoBlack">
                    Número total de registros {vacancies?.length}
                </p>
                <table className="min-w-full text-center">
                    <thead className="h-12 font-RobotoBlack">
                        <th>No</th>
                        <th>Nombre</th>
                        <th className="md:visible max-[500px]:hidden">Activo</th>
                        <th>Salario</th>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody>
                        {currentVacancies?.map((vacancy, index) => {
                            const showBg = index % 2 !== 0
                            return (
                                <tr
                                    key={vacancy.id}
                                    className={`font-RobotoLight h-[80px]
                                ${showBg ? 'bg-indigo-500 text-white' : 'text-black'}`}>
                                    <td className="font-RobotoBold">{index + 1}</td>
                                    <td>{vacancy.name}</td>
                                    <td className="md:visible max-[500px]:hidden">{vacancy.active ? 'Si' : 'No'}</td>
                                    <td>{vacancy.salary}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setOpen(true)
                                                setVacancy(vacancy)
                                            }}
                                        >
                                            <PencilSquareIcon className="size-6" />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setOpen(true)
                                                setVacancy(vacancy)
                                            }}
                                        >
                                            <TrashIcon className="size-6" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="flex justify-between gap-5 py-5">
                    <span className="m-0 min-w-[150px] font-RobotoBlack">
                        Página actual {viewSelected}
                    </span>
                    <div className="w-full flex justify-end gap-5">
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-indigo-400">
                            <ArrowLeftCircleIcon
                                className={`text-white`}
                                onClick={handleLastPage}
                            />
                        </div>
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-indigo-400">
                            <ArrowRightCircleIcon
                                className={`text-white`}
                                onClick={handleNextPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
