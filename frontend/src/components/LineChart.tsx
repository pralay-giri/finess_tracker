import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

interface PRPOS {
    data: ChartData<'line', number[], string>
    options: ChartOptions<'line'>
}

const LineChart = ({ data, options }: PRPOS) => {
    return <Line data={data} options={options} />
}

export default LineChart
