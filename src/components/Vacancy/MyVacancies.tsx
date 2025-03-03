import { useEffect, useMemo, useState } from "react"
import { deleteJobById, getJobsByUser } from "../../api/job-api"
import type { Job } from "../../types"
import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import Modal from "../Modal/Modal"
import { formatCurrency, formatDate } from "../../helpers"

export default function MyVacancies() {
  const [vacancies, setVacancies] = useState<Job[]>()
  const [vacancy, setVacancy] = useState<Job>()
  const [numRegisters, setNumRegisters] = useState(0)
  const [pageSelected, setPageSelected] = useState(1)
  const [items, setItems] = useState<Number[]>([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const getMyVacancies = async () => {
    try {
      const response: Job[] = await getJobsByUser({})
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
    return vacancies?.filter((vacancy) => vacancy.name.includes(search.toLowerCase()))
      .slice((pageSelected * 7) - 7, (pageSelected * 7))
  }, [vacancies, pageSelected, search])

  useEffect(() => {
    return () => { getMyVacancies() }
  }, [])

  useEffect(() => {
    if (numRegisters) {
      let itemsPaginate = []
      for (let index = 0; index < numRegisters; index++) {
        itemsPaginate.push(index)
      }
      setItems(itemsPaginate)
    }
  }, [numRegisters])

  return (
    <>
      <Modal
        open={open}
        title={`¿Estas seguro de eliminar la vacante de "${vacancy?.name}"?`}
        message={'Al eliminar esta vacante ya no estara disponible.'}
        titleButtonAccept="Eliminar"
        titleButtonCancel="Cancelar"
        handleClick={handleDelete}
        setOpen={setOpen}
      />
      <div className="md:w-full px-5">
        <div className="grid md:grid-cols-2 max-md:gap-2 grid-cols-1 items-center py-5">
          <p className="font-roboto-black max-md:w-full max-md:text-center">
            Total de registros: {vacancies?.length}
          </p>
          <div className="flex justify-end items-center">
            <input
              id="search"
              name="search"
              className="h-9 min-w-[300px] max-md:w-full rounded-full border-[1px] px-4 outline-hidden"
              placeholder="Buscar..."
              onChange={(e) => setSearch(e.target.value || '')}
            />
          </div>
        </div>
        <table className="min-w-full text-center">
          <thead className="h-12 uppercase bg-indigo-500 text-white font-roboto-black">
            <tr>
              <th className="rounded-l-lg">Nombre</th>
              <th>Estado</th>
              <th>Salario</th>
              <th>Fecha de creación</th>
              <th className="rounded-r-lg"></th>
            </tr>
          </thead>
          <tbody>
            {currentVacancies?.map((vacancy, index) => {
              const showBg = index % 2 !== 0
              return (
                <tr
                  key={vacancy.id}
                  className={`font-roboto-light h-[80px]
                  ${showBg ? 'bg-indigo-500 text-white' : 'text-black'}`}>
                  <td className="px-3">{vacancy.name}</td>
                  <td className="md:visible max-[500px]:hidden px-3">
                    <span
                      className="font-roboto-black ml-2 py-1 px-3 text-white bg-green-500 rounded-full text-sm">
                      {vacancy.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-3">{formatCurrency(Number(vacancy.salary))}</td>
                  <td className="px-3">{formatDate(vacancy.createdAt)}</td>
                  <td className="px-3">
                    <button
                      className="p-1"
                      onClick={() => {
                        setVacancy(vacancy)
                      }}
                    >
                      <PencilSquareIcon className="size-6" />
                    </button>

                    <button
                      className="p-1 cursor-pointer"
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

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 py-5">
          <span className="m-0 min-w-[150px] max-md:w-full max-md:text-center font-roboto-black">
            Página actual {pageSelected}
          </span>
          <div className="w-full flex justify-end max-md:justify-center gap-5">
            {items.map((_, index) => (
              <button
                key={index}
                className="py-1 px-3 border-2 rounded-md"
                onClick={() => setPageSelected(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
