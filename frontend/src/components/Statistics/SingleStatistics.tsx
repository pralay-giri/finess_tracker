import { useState } from 'react'
import BarChart from '../BarChart'
import { useParams } from 'react-router-dom'
import RangeSelector from './RangeSelector'
import useFetch from '../../hooks/useFetch'
import toast from 'react-hot-toast'
import { ChartData, ChartOptions } from 'chart.js'
import StatisticsShimerUI from '../shimerUI/StatisticsShimerUI'

const SingleStatistics = () => {
    const { type } = useParams()
    const [dateInterval, setDateInterval] = useState<string>('1 MONTH')
    const [barColor, setBarColor] = useState<string>('#EC7338')

    const {
        data: response,
        isLoadding,
        error,
    } = useFetch(
        `/api/statistics/getStatistics?interval=${dateInterval}&name=${type}`,
        {},
        {},
        'GET',
    )

    if (isLoadding) {
        return <StatisticsShimerUI />
    }

    if (error) {
        return <h1 className='text-center'>error in fetching data</h1>
    }

    const data: ChartData<'bar', number[], string> = {
        labels: response.map((res: any) => {
            return new Date(res.date).getDate()
        }),

        datasets: [
            {
                label: type,
                data: response.map((res: any) => {
                    return res.data
                }),
                backgroundColor: barColor,
                barPercentage: 0.3,
            },
        ],
    }

    const option: ChartOptions = {
        responsive: true,
        color: 'black',
        plugins: {
            legend: {
                position: 'chartArea',
                align: 'start',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: type,
                    color: 'black',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'day',
                    color: 'black',
                },
            },
        },
    }

    return (
        <div className='mx-[2%] sm:mx-[5%] md:mx-[10%] xl:mx-[15%] min-h-[80vh]'>
            <div className='flex justify-end mt-5 gap-3 items-center'>
                <p className='text-sm md:text-lg'>select your range: </p>
                <RangeSelector
                    dateInterval={dateInterval}
                    setDateInterval={setDateInterval}
                />
                <p className='text-sm md:text-lg'>select bar color: </p>
                <input
                    type='color'
                    value={barColor}
                    onChange={(e) => setBarColor(e.target.value)}
                />
            </div>
            <div className='m-auto mt-5 p-2 mx-auto w-[100%] h-auto col-span-2 bg-[#87e3ff] border-black rounded-t-md '>
                <BarChart data={data} option={option} />
            </div>
            <div className='bg-white px-10 py-5 text-theme-bg-dark text-center *:my-2'>
                <h1 className='text-lg md:text-xl lg:text-3xl font-bold opacity-[79%]'>
                    {type}
                </h1>
            </div>
        </div>
    )
}

export default SingleStatistics
