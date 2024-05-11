interface GOAL_PROPS {
    color: string
    title: string
    describtion: string
    handleSetGoal: (typeOfGoal: string) => void
}

const GoalOption = ({
    color,
    title,
    describtion,
    handleSetGoal,
}: GOAL_PROPS) => {
    return (
        <div
            className={
                'bg-theme-modal-bg-light px-6 py-3 rounded-md flex flex-col sm:flex-row gap-5 items-center text-' +
                color
            }
        >
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>
                {title}
            </h1>
            <span className='text-theme-bg-dark opacity-80 text-sm sm:text-md font-semibold word-brack-balanced'>
                {describtion}
            </span>
            <button
                onClick={() => handleSetGoal(title)}
                className={`w-[50%] sm:w-auto sm:ml-auto border text-xl font-semibold border-theme-bg-dark transition-all px-4 py-2 rounded-md outline-none  focus-visible:border-theme-bg-dark focus-visible:shadow-sm focus-visible:shadow-theme-bg-dark hover:border-theme-bg-dark hover:shadow-sm hover:shadow-theme-bg-dark`}
            >
                set
            </button>
        </div>
    )
}

export default GoalOption
