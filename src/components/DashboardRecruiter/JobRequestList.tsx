import { useEffect, useState } from 'react'
import { getJobsByUser } from '../../api/job-api'
import type { JobInnerJobRequest } from '../../types'
import ChartJobs from './ChartJobs'
import { useNavigate } from 'react-router'
import CardJob from '../GeneralComponents/CardJob'

export default function JobRequestList() {
    const navigate = useNavigate()
    const [jobRequests, setjobRequests] = useState<JobInnerJobRequest[]>([])
    const [dataChart, setDataChart] = useState<any>([])

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
        getJobs()
    }, [])

    return (
        <>
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
