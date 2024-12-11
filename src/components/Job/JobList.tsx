import { useEffect, useState } from "react"
import { getAllJobs } from "../../api/job-api"
import { CardJob } from "./CardJob"
import SearchJob from "./SearchJob"
import type { Job } from "../../types"

export const JobList = () => {

    const [jobs, setJobs] = useState<Job[]>([])

    const getJobs = async () => {
        try {
            const response: Job[] = await getAllJobs()
            if(Array.isArray(response)) {
                setJobs(response)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        return () => { getJobs() } 
    }, [])

    return (
        <div className="">
            <div className="pt-10">
                <SearchJob />
                <div className="grid md:grid-cols-2 grid-cols-1 md:p-2 p-4 gap-4">
                    <div>
                        <h1 className="font-RobotoBlack text-2xl">Explora los puestos mas recientes</h1>
                        {jobs.map((job) => (
                            <CardJob
                                key={job.id}
                                job={job}
                            />
                        ))}
                    </div>

                    <div>
                        <h1 className="font-RobotoBlack text-2xl">Tus postulaciones</h1>
                        {jobs.map((job, index) => (
                            <CardJob job={job} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
