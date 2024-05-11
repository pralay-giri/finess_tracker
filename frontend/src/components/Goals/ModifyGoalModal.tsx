import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6'

interface MODIFYGOAL_PROPS {
    goal: any
    closeModal: () => void
    updateHandler: (goal: any, completedValue: any) => void
}

const ModifyGoalModal = ({
    goal,
    closeModal,
    updateHandler,
}: MODIFYGOAL_PROPS) => {
    const [inputValue, setInputValue] = useState<string>('')
    const handleUpdate = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (e) => {
            e.preventDefault()
            updateHandler(goal, inputValue)
            return
        },
        [inputValue],
    )

    useEffect(() => {
        const listner = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase()
            if (key === 'ESCAPE') {
                closeModal()
            }
        }
        document.documentElement.addEventListener('keydown', listner)
        return () => {
            document.documentElement.removeEventListener('keydown', listner)
        }
    }, [])

    return (
        <div className='w-full h-[100vh] grid place-content-center mx-auto'>
            <div className='w-[90vw] sm:w-[50vw] lg:w-[30vw] xl:w-[25vw] bg-theme-color-blue text-theme-modal-bg-light p-3 rounded-sm'>
                <header className='mb-2 text-xl flex items-center justify-between'>
                    <p>{goal.name}</p>
                    <button
                        onClick={closeModal}
                        className='text-xl p-1 hover:bg-opacity-65 rounded-sm transition-colors border border-transparent outline-none hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-xs focus-visible:shadow-theme-bg-dark'
                    >
                        <FaX />
                    </button>
                </header>
                <form className='text-xl'>
                    <input
                        type='number'
                        name=''
                        id=''
                        min={0}
                        max={goal.target}
                        value={inputValue}
                        onChange={(e) =>
                            setInputValue(
                                Number(e.target.value) > goal.target
                                    ? goal.target
                                    : e.target.value,
                            )
                        }
                        placeholder='add completed value'
                        className='w-full text-theme-bg-dark px-2 py-1 my-2 text-xl rounded-sm outline-none border border-theme-bg-dark required out-of-range:border-red-500 hide-input-conrtoler'
                    />
                    <button
                        onClick={handleUpdate}
                        className=' border border-transparent px-2 py-1 my-2 shadow-sm w-6/12 bg-theme-color-aqua hover:border-theme-bg-dark rounded-sm outline-none focus-visible:border-theme-bg-dark focus-visible:shadow-sm hover:opacity-85 focu focus-visible:opacity-85 transition-all'
                    >
                        update
                    </button>
                    <button
                        onClick={closeModal}
                        className='shadow-sm w-6/12 px-2 py-1 my-2 border border-transparent bg-red-500 hover:border-theme-bg-dark rounded-sm outline-none  focus-visible:border-theme-bg-dark focus-visible:shadow-sm hover:opacity-85 focu focus-visible:opacity-85 transition-all'
                    >
                        close
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ModifyGoalModal
