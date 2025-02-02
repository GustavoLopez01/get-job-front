
import { formatCurrency, formatDate } from '../../helpers'
import type { JobInnerJobRequest } from '../../types'
import { PencilIcon } from '@heroicons/react/24/outline'

type CardJobProps = {
  job: JobInnerJobRequest,
  setOpen: (value: boolean) => void
  setJobData: (data: JobInnerJobRequest) => void
}

type RowDataProps = {
  label: string
  value: string
}
export default function CardJob({
  job,
  setOpen,
  setJobData
}: CardJobProps) {
  return (
    <>
      <div
        key={job.id}
        className="transition delay-150 duration-150 ease-in hover:translate-y-1 hover:scale-110 p-3 relative border-[1px] shadow-md rounded-md flex flex-col gap-1"
      >
        <header className="relative">
          <p
            className="font-roboto-black text-[20px] absolute -left-8 bg-orange-500 text-white px-10"
          >
            {job.name}
          </p>

          <button
            className="absolute right-2 -top-1 p-2 rounded-full bg-orange-500 text-white cursor-pointer"
          >
            <PencilIcon className="size-6" />
          </button>
        </header>

        <div className="mt-6 flex flex-col gap-1 px-2 py-4">
          <RowData
            label='Usuarios postulados'
            value={`${job.jobRequests.length}`}
          />

          <RowData
            label='Salario'
            value={`${formatCurrency(job.salary)}`}
          />

          <RowData
            label='Descripción'
            value={job.description}
          />

          <RowData
            label='Fecha de creación'
            value={formatDate(job.createdAt)}
          />

          <p className="font-roboto-bold">Estatus:
            <span
              className="font-roboto-black ml-2 py-1 px-3 text-white bg-green-500 rounded-full text-sm">
              {job.active ? 'Activo' : 'Inactivo'}
            </span>
          </p>
          <button
            className="transition ease-in w-full my-2 border-2 bg-transparent border-indigo-500 uppercase font-roboto-black text-sm text-indigo-600 py-2 rounded-md hover:bg-indigo-500 hover:text-white cursor-pointer"
            onClick={() => {
              setOpen(true)
              setJobData(job)
            }}
          >
            Mostrar detalles
          </button>
        </div>
      </div>
    </>
  )
}


const RowData = ({ label, value }: RowDataProps) => {
  return (
    <p className="font-roboto-bold">
      {label} :
      <span className="font-roboto-light"> {value} </span>
    </p>
  )
}