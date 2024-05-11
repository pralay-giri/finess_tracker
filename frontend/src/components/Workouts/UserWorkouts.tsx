import { ReactElement } from 'react'
import { BiCycling } from 'react-icons/bi'
import { BsFire } from 'react-icons/bs'
import { FaEdit, FaWalking } from 'react-icons/fa'
import { LiaRunningSolid } from 'react-icons/lia'
import { MdOutlineAccessTimeFilled } from 'react-icons/md'
import { TbSwimming } from 'react-icons/tb'

const WORKOUT_ICON: { [key: string]: ReactElement } = {
    running: <LiaRunningSolid />,
    swimming: <TbSwimming />,
    cycling: <BiCycling />,
    walking: <FaWalking />,
}

interface USERWORKOOT_PROPS {
    workout: { [key: string]: string }
    clickHandler: (workoutName: string) => void
}

const UserWorkouts = ({ workout, clickHandler }: USERWORKOOT_PROPS) => {
    return (
        <div
            key={workout.id}
            className='w-52 h-auto p-10 bg-theme-modal-bg-light text-theme-bg-dark flex flex-col gap-1 items-center rounded-md text-center'
        >
            <span className='text-3xl md:text-5xl text-theme-color-blue'>
                {WORKOUT_ICON[workout.name]}
            </span>
            <div className='text-lg font-bold *:text-theme-bg-dark flex gap-1 items-center'>
                <MdOutlineAccessTimeFilled />
                <span className='opacity-65'>{workout.totalTimeSpend} min</span>
            </div>
            <div className='text-lg font-bold flex gap-1 items-center'>
                <BsFire className='text-theme-color-orange' />
                <span className='text-theme-bg-dark opacity-65'>
                    {workout.caloriesBurn} calories
                </span>
            </div>
            <div className='text-xl font-bold flex gap-1 items-center'>
                <span className='text-2xl md:text-3xl text-theme-color-blue'>
                    {workout.name}
                </span>
                <button
                    onClick={() => clickHandler(workout.name)}
                    className='p-1 text-lg ml-auto rounded-sm transition-all border border-transparent outline-none hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-sm'
                >
                    <FaEdit />
                </button>
            </div>
        </div>
    )
}

export default UserWorkouts
