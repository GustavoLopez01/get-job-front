import { formatCurrency } from "../../helpers"
import type { Job } from "../../types"

interface CardJobProps {
    job: Job
}

export const CardJob = ({ job } : CardJobProps) => {

  return (
    <>
      <div className="ease-in duration-300 w-full flex flex-col border-2 shadow-sm py-5 px-4 rounded-md my-4 cursor-pointer">
        <div className="w-full">
          <p className="font-roboto-black text-xl uppercase"> { job.name } </p>
          { job.showSalary ? (
            <p className="font-semibold">{ formatCurrency(job.salary) } - Mensual </p>
          ) : ( 
            <p className="font-semibold">El salario lo prodrás conocer cuando te contacte el reclutador.</p>  
          )}
          <p className="text-slate-600 pt-2 font-roboto-light"> { job.description } </p>
        </div>
        <div className="flex flex-col justify-center gap-3 my-2">
            <button className="bg-purple-600 hover:bg-purple-500 uppercase px-3 rounded-md py-2 text-white font-bold">Ver detalles</button>
            <button className="bg-slate-600 hover:bg-slate-500 uppercase px-3 py-2 rounded-md text-white font-bold">Postularte</button>
        </div>
      </div>
    </>
  )
}
