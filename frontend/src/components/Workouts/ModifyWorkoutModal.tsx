import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6'

interface MODIFYWORKOUT_PROPS {
    workoutName: string
    modifyHandler: (
        totalWorkoutTime: number,
        workoutName: string,
        totalCaloriesBurned: number,
    ) => void
    closeModal: () => void
}

const ModifyWorkoutModal = ({
    workoutName,
    modifyHandler,
    closeModal,
}: MODIFYWORKOUT_PROPS) => {
    const [inputValues, setInputValues] = useState<{
        time: string
        caloriesBurn: string
    }>({
        time: '',
        caloriesBurn: '',
    })

    const hadnleInputUpdate = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            let { name: workoutName, value, max } = e.target
            const data =
                Number(value) > Number(max) ? Number(max) : Number(value)
            setInputValues((prev) => {
                return {
                    ...prev,
                    [workoutName]: String(data ? data : ''),
                }
            })
        },
        [inputValues],
    )

    // * close modal using keyboard shortcuts
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
        <div className='w-6/12 h-[100vh] grid place-content-center mx-auto'>
            <div className='w-[90vw] sm:w-[50vw] lg:w-[30vw] xl:w-[25vw] bg-theme-color-blue text-theme-modal-bg-light p-3 rounded-sm'>
                <header className='mb-2 text-xl flex items-center justify-between'>
                    <p>{workoutName}</p>
                    <button
                        onClick={closeModal}
                        className='text-xl p-1 hover:bg-opacity-65 rounded-sm transition-colors border border-transparent outline-none hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-xs focus-visible:shadow-theme-bg-dark'
                    >
                        <FaX />
                    </button>
                </header>
                <input
                    type='number'
                    name='time'
                    value={inputValues.time}
                    required={true}
                    max={720}
                    onChange={hadnleInputUpdate}
                    placeholder='add time you spend(min)'
                    className='w-full px-2 py-1 text-lg text-theme-bg-dark rounded-sm outline-none border transition-all focus-visible:border-theme-bg-dark valid:border-theme-bg-dark focus-visible:shadow-sm focus-visible:shadow-theme-bg-dark hover:border-theme-bg-dark text-opacity-65 my-2 hide-input-conrtoler'
                />
                <input
                    type='number'
                    name='caloriesBurn'
                    max={10000}
                    required={true}
                    onChange={hadnleInputUpdate}
                    placeholder='add calories you burn'
                    value={inputValues.caloriesBurn}
                    className='w-full px-2 py-1 text-lg text-theme-bg-dark rounded-sm outline-none border transition-all focus-visible:border-theme-bg-dark valid:border-theme-bg-dark focus-visible:shadow-sm focus-visible:shadow-theme-bg-dark hover:border-theme-bg-dark text-opacity-65 hide-input-conrtoler'
                />
                <div className='*:border *:border-transparent *:px-2 *:py-1 *:my-2 *:shadow-sm *:w-6/12  *:transition-all *:rounded-sm *:outline-none'>
                    <button
                        onClick={() =>
                            modifyHandler(
                                Number(inputValues.time),
                                workoutName,
                                Number(inputValues.caloriesBurn),
                            )
                        }
                        className='bg-theme-color-aqua hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-sm hover:opacity-85 focus-visible:opacity-85'
                    >
                        update
                    </button>
                    <button
                        onClick={closeModal}
                        className='bg-red-500 hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-sm hover:opacity-85 focus-visible:opacity-85 '
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModifyWorkoutModal
