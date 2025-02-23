import { useEffect, useMemo, useState } from 'react';
import { getAllJobs } from '../../api/job-api';
import type { Job } from '../../types';
import { formatCurrency, formatDate } from '../../helpers';

const ABILITIES = [
  { name: "React", value: "React", color: "bg-sky-600" },
  { name: "Vue", value: "Vue", color: "bg-green-600" },
  { name: "Angular", value: "Angular", color: "bg-red-600" },
  { name: "Java", value: "Java", color: "bg-orange-600" },
]

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobSelected, setJobSelected] = useState<Job>()
  const [currentPage, setCurrentPage] = useState(1)

  const handleGetJobs = async () => {
    try {
      const response = await getAllJobs()
      if (Array.isArray(response)) {
        setJobs(response)
        setJobSelected(response[0])
      }
    } catch (error) {
      console.error(error);
    }
  }

  const buttonsNavigate = useMemo(() => {
    const buttons = Math.ceil(jobs.length / 5)
    let finalButtons = []
    for (let index = 0; index < buttons; index++) {
      finalButtons.push({
        label: index + 1,
        value: index + 1,
      })
    }
    return finalButtons
  }, [jobs.length])

  const finalJobs = useMemo(() => {
    const end = currentPage * 5
    const start = end - 5
    return jobs.slice(start, end)
  }, [currentPage, jobs.length])

  useEffect(() => {
    return () => { handleGetJobs() }
  }, [])

  return (
    <>
      <div className="w-full px-6 grid md:grid-cols-3 grid-cols-1 gap-4 items-end">
        <div className="flex flex-col text-slate-600">
          <label
            htmlFor="jobName"
            className="px-2 font-roboto-bold"
          >
            Puesto
          </label>
          <input
            type="text"
            id="jobName"
            placeholder="Desarrollador front end"
            className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-hidden border-slate-600"
          />
        </div>

        <div className="flex flex-col md:px-5 px-0 text-slate-600">
          <label
            htmlFor="ubication"
            className="px-2 font-roboto-bold"
          >
            Ubicación
          </label>
          <input
            type="text"
            id="ubication"
            placeholder="Desarrollador front end"
            className="h-9 rounded-full transition ease-in duration-150 border-[1px] px-4 outline-hidden border-slate-600"
          />
        </div>

        <button className="w-full h-12 bg-violet-primary cursor-pointer font-roboto-black rounded-md text-white">
          Buscar
        </button>
      </div>

      <section className="grid md:grid-cols-2 grid-cols-1 gap-4 px-6 py-4 pt-8">
        <div className="min-h-full flex flex-col gap-4">
          {finalJobs.map((job) => (
            <div className="w-full font-roboto-light" key={job.id}>
              <h2 className="font-roboto-bold text-lg flex flex-wrap justify-between gap-2 items-end text-slate-700">
                {job.name}
                <span className="text-[11px] font-roboto-light">
                  {formatDate(job.createdAt)}
                </span>
              </h2>

              <p> {job.description} </p>

              <p className="py-1"> +{ABILITIES.length - 1} tecnologias requeridas </p>

              <button
                className="w-full my-2 py-3 bg-sky-500 text-white font-roboto-bold rounded-full cursor-pointer"
                onClick={() => setJobSelected(job)}
              >
                Ver detalle
              </button>

              <hr className="border-1" />
            </div>
          ))}

          <div className="w-full font-roboto-bold flex justify-center gap-2 pb-5">
            {buttonsNavigate.map((btn) => (
              <button
                key={btn.value}
                className={
                  `px-3 py-1 border-2 rounded-md cursor-pointer
                  ${currentPage === btn.value ? 'bg-slate-200' : 'bg-transparent'}
                  `
                }
                onClick={() => setCurrentPage(btn.value)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative px-5">
          <div className="flex flex-col space-y-3">
            <h1 className="text-xl font-roboto-black text-slate-700">
              {jobSelected?.name}
            </h1>

            {jobSelected?.showSalary && (
              <p className="font-roboto-black m-0"> Salario: {formatCurrency(jobSelected.salary)} </p>
            )}

            <section className="flex flex-col">
              <h2 className="py-2 font-roboto-bold">Tecnologias</h2>
              <div className="flex flex-wrap gap-2">
                {ABILITIES.map((ability) => (
                  <span
                    className={`rounded-full px-5 py-0.5 text-white text-sm font-roboto-bold ${ability.color} hover:scale-105 cursor-pointer`}
                    key={ability.value}
                  >
                    {ability.name}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <p className="flex flex-col font-roboto-bold">
                Descripción:
                <span className="font-roboto-light">
                  {jobSelected?.description}
                </span>
              </p>
            </section>

            <section>
              <p className="flex flex-col font-roboto-bold">
                Se requiere:
                <span className="font-roboto-light">
                  {jobSelected?.description}
                </span>
              </p>
            </section>

            <button className="w-full rounded-full text-white uppercase font-roboto-black cursor-pointer bg-violet-500 py-3">
              Postularte
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
