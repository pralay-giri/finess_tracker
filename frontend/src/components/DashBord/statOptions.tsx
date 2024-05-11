import { IoFootsteps } from 'react-icons/io5'
import { BiTask } from 'react-icons/bi'
import { PiDropFill } from 'react-icons/pi'
import { BsFire } from 'react-icons/bs'
import { GiNightSleep, GiWeightScale } from 'react-icons/gi'
import { GiBodyHeight } from 'react-icons/gi'
import { FaHeartbeat } from 'react-icons/fa'

export const STATS: {
    [key: string]: { link: string; color: string; icon: any }
} = {
    goal: {
        link: '/statistics/goal',
        color: 'text-theme-color-purple',
        icon: <BiTask />,
    },
    water: {
        link: '/statistics/water',
        color: 'text-theme-color-aqua',
        icon: <PiDropFill />,
    },
    steps: {
        link: '/statistics/steps',
        color: 'text-theme-color-blue',
        icon: <IoFootsteps />,
    },

    sleep: {
        link: '/statistics/sleep',
        color: 'text-theme-color-purple',
        icon: <GiNightSleep />,
    },

    calories: {
        link: '/statistics/calories',
        color: 'text-theme-color-orange',
        icon: <BsFire />,
    },
    weight: {
        link: '/statistics/weight',
        color: 'text-theme-color-purple',
        icon: <GiWeightScale />,
    },
    height: {
        link: '/statistics/height',
        color: 'text-theme-color-blue',
        icon: <GiBodyHeight />,
    },
    heart: {
        link: '/statistics/heart',
        color: 'text-theme-color-orange',
        icon: <FaHeartbeat />,
    },
}
