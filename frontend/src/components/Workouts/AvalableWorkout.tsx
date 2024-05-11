import { GoPlus } from 'react-icons/go'

interface AVALABLEWORKOUT_PROPS {
    workout: string
    clickHandler: (workout: string) => void
}

const AvalableWorkout = ({ workout, clickHandler }: AVALABLEWORKOUT_PROPS) => {
    return (
        <div className='w-44 h-44 sm:w-52  sm:h-52 aspect-square border border-1 focus-within:border-theme-color-aqua rounded-md flex flex-col items-center'>
            <button
                onClick={() => clickHandler(workout)}
                className='w-[80%] aspect-square grid place-content-center border text-4xl md:text-6xl cursor-pointer border-none outline-none focus-visible:opacity-75 hover:opacity-75 transition-all peer focus-visible:text-theme-color-aqua hover:text-theme-color-aqua'
            >
                <GoPlus />
            </button>
            <h1 className='py-3 w-full peer-focus-visible:bg-theme-color-aqua peer-focus-visible:text-theme-modal-bg-light bg-theme-modal-bg-light text-lg sm:text-xl font-bold text-theme-bg-dark text-opacity-65 text-center'>
                {workout}
            </h1>
        </div>
    )
}

export default AvalableWorkout
