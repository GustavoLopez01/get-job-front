import { useEffect, useState } from 'react'
import { getJobsByUser } from '../../api/job-api'
import type { JobInnerJobRequest } from '../../types'
import { formatDate } from '../../helpers'
import ChartJobs from './ChartJobs'

export default function JobRequestList() {

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
                console.log(data);
                console.log(data.map((dato) => dato.label));

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
            <div className="px-3">
                <ChartJobs chartData={dataChart} />
                <section className="flex flex-col">
                    <h1 className="font-roboto-bold text-2xl py-6 text-center">Tus vacantes</h1>
                    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-3 font-roboto-light">
                        {jobRequests.map((request) => (
                            <div
                                key={request.id}
                                className="p-3 border-[1px] shadow-md rounded-md flex flex-col gap-1"
                            >
                                <p className="font-roboto-black text-[20px]"> {request.name} </p>
                                <p className="font-roboto-bold">
                                    Usuarios postulados :
                                    <span className="font-roboto-light"> {request.jobRequests.length}  </span>
                                </p>
                                <p className="font-roboto-bold">
                                    Fecha de creación:
                                    <span className="pl-1 font-roboto-light">{formatDate(request.createdAt)}</span>
                                </p>
                                <p className="font-roboto-bold">Estatus:
                                    <span
                                        className="font-roboto-black ml-2 py-1 px-3 text-white bg-green-500 rounded-full text-sm">
                                        {request.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </p>
                                <button
                                    className="transition ease-in w-full my-2 border-2 bg-transparent border-indigo-500 uppercase font-roboto-black text-sm text-indigo-600 py-2 rounded-md hover:bg-indigo-500 hover:text-white">
                                    Mostrar detalles
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}
