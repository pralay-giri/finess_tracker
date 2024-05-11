const GoalShimerUI = () => {
    return (
        <div className='mx-5 md:mx-[5%] lg:mx-[10%] my-10 min-h-[80vh]'>
            <div className='animate-pulse my-goal w-full overflow-x-auto grid grid-flow-col gap-8 py-5 justify-start'>
                {Array(4)
                    .fill(0)
                    .map((_, idx) => {
                        return (
                            <div
                                key={idx}
                                className='w-24 h-28 sm:w-36 sm:h-40 md:w-48 md:h-56 bg-theme-modal-bg-light opacity-20 text-theme-bg-dark grid place-items-center p-2 rounded-md'
                            ></div>
                        )
                    })}
            </div>
            <div className='animate-pulse *:w-full *:h-8 *:bg-theme-modal-bg-light *:opacity-20 *:rounded-md *:my-5'>
                <div className=''></div>
                <div className=''></div>
                <div className=''></div>
            </div>
        </div>
    )
}

export default GoalShimerUI
