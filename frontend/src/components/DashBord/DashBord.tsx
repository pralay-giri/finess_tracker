import { ChartData, ChartOptions } from 'chart.js'
import LineChart from '../LineChart'
import { Link, useNavigate } from 'react-router-dom'
import Stat from './Stat'
import useFetch from '../../hooks/useFetch'
import DashBordShimerUI from '../shimerUI/DashBordShimerUI'
import { STATS } from './statOptions'

const DashBord = () => {
    const navigator = useNavigate()
    const {
        isLoadding,
        error,
        data: response,
    }: any = useFetch('/api/dashboard/', {}, {}, 'GET')

    if (isLoadding) {
        return <DashBordShimerUI />
    }
    if (error) {
        navigator('/auth')
    }

    if (!response) {
        return null
    }
    const data: ChartData<'line', number[], string> = {
        labels: response['caloriesStat'].map((data: any) => {
            return new Date(data.date).getDate()
        }),
        datasets: [
            {
                label: 'calories',
                data: response['caloriesStat'].map((data: any) => data.data),
                backgroundColor: '#ED7B46',
                borderColor: '#ED7B46',
            },
        ],
    }
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'chartArea',
                align: 'start',
            },
            title: {
                display: true,
                text: 'calories burn in 30 days',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'calories',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'date',
                },
            },
        },
    }

    return (
        <div className='mx-5 md:mx-[5%] lg:mx-[10%] grid place-content-center xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
            <div className='mt-2 mx-auto w-[100%] h-auto border  bg-theme-modal-bg-light border-black rounded-lg sm:col-span-2 xl:col-span-3'>
                <LineChart data={data} options={options} />
                <div className='text-right m-2'>
                    <Link
                        to='/statistics/calories'
                        className='text-lg  font-semibold underline md:text-2xl text-theme-color-blue hover:opacity-70 transition-all hover:underline focus-visible:opacity-70'
                    >
                        view statistics
                    </Link>
                </div>
            </div>
            {Object.keys(STATS).map((key) => {
                const { color, icon, link } = STATS[key]
                return (
                    <Stat
                        color={color}
                        icon={icon}
                        link={link}
                        title={key}
                        value={
                            response[key]?.data
                                ? response[key].data + response[key].unit
                                : null
                        }
                        key={key}
                    />
                )
            })}
        </div>
    )
}

export default DashBord
