import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ChartOptions,
    ChartData,
    Colors,
} from 'chart.js'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors,
)

interface BARCHART_PROPS {
    data: ChartData<'bar', number[], string>
    option: ChartOptions
}

const BarChart = ({ data, option }: BARCHART_PROPS) => {
    return <Bar data={data} options={option as any}></Bar>
}

export default BarChart
