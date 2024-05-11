import { FaCheckDouble, FaRegEdit } from 'react-icons/fa'

interface USER_GOAL_PROPS {
    goal: {
        name: string
        target: number
        completed: number
        unit: string
        isDone: boolean
    }
    clickHandler: (goal: any) => void
}

const UserGoals = ({ goal, clickHandler }: USER_GOAL_PROPS) => {
    const percentageOfCompletedGoal = (
        (goal.completed / goal.target) *
        100
    ).toFixed(0)
    return (
        <div className='w-44 md:w-48 h-auto bg-theme-modal-bg-light text-theme-bg-dark flex flex-col gap-1 items-center p-2 rounded-md'>
            {goal.isDone ? (
                <FaCheckDouble className='ml-auto' />
            ) : (
                <button
                    onClick={() => clickHandler(goal)}
                    className='ml-auto text-xl font-bold p-1 border outline-none border-transparent focus-visible:border-theme-bg-dark focus-visible:shadow focus-visible:shadow-theme-bg-dark rounded-sm hover:opacity-70 transition-all'
                >
                    <FaRegEdit />
                </button>
            )}
            <div className='w-[70%] md:w-[80%] aspect-square rounded-full text-theme-modal-bg-light text-xl md:text-2xl font-bold bg-theme-color-aqua grid place-content-center'>
                {goal.isDone ? 'done' : percentageOfCompletedGoal + '%'}
            </div>
            <div className='text-lg md:text-xl font-bold text-theme-color-aqua text-center'>
                <span>{goal.target + ' ' + goal.unit.toLocaleLowerCase()}</span>
                <h1 className='text-xl md:text-2xl'>{goal.name}</h1>
            </div>
        </div>
    )
}

export default UserGoals
