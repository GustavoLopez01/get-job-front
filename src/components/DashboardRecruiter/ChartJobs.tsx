import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend 
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { BACKGROUND_COLOR, BORDER_COLOR } from '../../constants'

type ChartData = {
    data: number
    label: string
}

type ChartJobsProps = {
    chartData: ChartData[]
}

export default function ChartJobs({
    chartData
}: ChartJobsProps) {

    const data = {
        // labels: chartData.map((dato) => dato.label),
        datasets: [
            {
                label: 'Postulaciones',
                data: chartData.map((data) => data.data),
                backgroundColor: BACKGROUND_COLOR,
                borderColor: BORDER_COLOR,
                borderWidth: 1
            }
        ]
    }

    ChartJS.register(ArcElement, Tooltip, Legend)
    
    return (
        <>
            <h1 className="text-center py-5 font-roboto-bold text-2xl">Tus empleos con mas postulaciones</h1>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 md:text-left text-center">
                <div className="flex justify-center">
                    <Pie
                        data={data}
                        style={{
                            maxWidth: "400px",
                            maxHeight: "400px"
                        }}
                    />
                </div>
                <div className="space-y-12 font-roboto-light pt-5">
                    <div className="space-y-3">
                        {chartData.map((data, index) => (
                            <div 
                                className="flex justify-center gap-2"
                                key={index}
                            >
                                <p className="w-6 rounded-full" style={{ background: BACKGROUND_COLOR[index] }}></p>
                                <p className="min-w-[300px] text-left"> {data.label} </p>
                            </div>
                        ))} 
                    </div>

                    <button className="w-full py-2 px-5 font-roboto-black bg-transparent border-2 border-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white text-indigo-600 transition uppercase ease-in">
                        Descargar reporte
                    </button>
                </div>
            </div>
        </>
    )
}
