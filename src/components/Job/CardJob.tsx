import { formatCurrency } from "../../helpers"

type Job = {
    name: string,
    description: string,
    salary: number,
    showSalary: boolean
}

interface CardJobProps {
    job: Job
}

export const CardJob = ({ job } : CardJobProps) => {

  return (
    <>
      <div className="w-full flex border-2 shadow-sm py-5 px-4 rounded-md my-4 cursor-pointer">
        <div className="w-3/4">
          <p className="font-RobotoBlack text-xl uppercase"> { job.name } </p>
          { job.showSalary && (
            <p> { formatCurrency(job.salary) } </p>
          )}
          <p className="text-slate-600"> { job.description } </p>
        </div>
        <div className="flex flex-col justify-center gap-3">
            <button className="bg-purple-600 hover:bg-purple-500 px-3 rounded-md py-2 text-white font-bold">Ver más</button>
            <button className="bg-slate-600 hover:bg-slate-500 px-3 py-2 rounded-md text-white font-bold">Postularte</button>
        </div>
      </div>
    </>
  )
}
