import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getJobsByUser } from '../../api/job-api'
import ChartJobs from './ChartJobs'
import CardJob from '../GeneralComponents/CardJob'
import GeneralModal from '../Modal/GeneralModal'
import type { JobInnerJobRequest } from '../../types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../../helpers'

export default function JobRequestList() {
  const navigate = useNavigate()
  const [jobRequests, setjobRequests] = useState<JobInnerJobRequest[]>([])
  const [dataChart, setDataChart] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [jobData, setJobData] = useState<JobInnerJobRequest>()

  const getJobs = async () => {
    try {
      const response = await getJobsByUser({ includealldata: 1 })
      if (Array.isArray(response)) {
        setjobRequests(response)
        const data = response.map(req => {
          return {
            label: req.name || '',
            data: req.jobRequests?.length || 2
          }
        })
        // console.log(data);
        // console.log(data.map((dato) => dato.label));

        setDataChart(data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    return () => { getJobs() }
  }, [])

  return (
    <>
      <GeneralModal open={open}>
        <div className="bg-white px-4 py-4">
          <div className="flex justify-end">
            <h1 className="text-center w-full font-roboto-black text-2xl">Detalles</h1>
            <XMarkIcon
              className="size-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="flex flex-col text-[18px] py-4 gap-2">
            <p className="font-roboto-black"> Nombre:
              <span className="font-roboto-light"> {jobData?.name} </span>
            </p>

            <p className="font-roboto-black"> Descripción:
              <span className="font-roboto-light"> {jobData?.description} </span>
            </p>

            <p className="font-roboto-black"> Salario:
              <span className="font-roboto-light"> {formatCurrency(Number(jobData?.salary))} </span>
            </p>

            <p className="font-roboto-black">Estatus:
              <span
                className="font-roboto-black ml-2 py-1 px-3 text-white bg-green-500 rounded-full text-md">
                {jobData?.active ? 'Activo' : 'Inactivo'}
              </span>
            </p>

            <button
              className="uppercase text-[16px] bg-orange-500 hover:bg-orange-600 py-2 text-white font-roboto-black rounded-md cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      </GeneralModal>
      <div className="px-3 pb-10">
        {jobRequests.length > 0 ? (
          <>
            <ChartJobs chartData={dataChart} />
            <section className="flex flex-col">
              <h1 className="font-roboto-bold text-2xl py-6 text-center">Tus vacantes</h1>
              <hr className="border-1 border-dashed" />
              <div className="w-full mt-5 grid md:grid-cols-3 grid-cols-1 gap-3 font-roboto-light">
                {jobRequests.map((job) => (
                  <CardJob
                    key={job.id}
                    job={job}
                    setOpen={setOpen}
                    setJobData={setJobData}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="text-center">
            <h2 className="font-roboto-black text-2xl">Aún no tienes vacantes publicadas</h2>
            <button
              className="px-4 py-2 mt-5 border-indigo-600 border-[1px] bg-transparent rounded-full text-indigo-600 font-roboto-bold hover:scale-105 ease-in-out duration-100"
              onClick={() => navigate('/add-vacancy')}
            >
              Registrar primera vacante
            </button>
          </div>
        )}
      </div>
    </>
  )
}
