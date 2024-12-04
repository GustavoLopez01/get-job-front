import { JOBS } from "../../db/fakeData"
import { CardJob } from "./CardJob"
import SearchJob from "./SearchJob"

export const JobList = () => {
  return (
    <div className="md:max-w-5xl mx-auto">
        <div className="pt-10">
            <SearchJob />
            <div className="grid md:grid-cols-2 grid-cols-1 md:p-2 p-4 gap-4">
                <div>
                    <h1 className="font-RobotoBlack text-2xl">Explora los puestos mas recientes</h1>
                    {JOBS.map((job, index) => (
                        <CardJob
                            key={index}
                            job={job}
                        />
                    ))}
                </div>

                <div>
                    <h1 className="font-RobotoBlack text-2xl">Tus postulaciones</h1>
                    {JOBS.map((job, index) => (
                        <CardJob job={job} key={index} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
