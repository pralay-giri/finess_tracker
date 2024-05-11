import { FaX } from 'react-icons/fa6'
import { GOAL_OPTIONS_UNIT } from '../../@types'
import {
    MouseEvent,
    MouseEventHandler,
    useCallback,
    useEffect,
    useState,
} from 'react'

interface SETGOALMODAL_PROPS {
    name: string
    closeModal: () => void
    addGoalHandler: (name: string, target: string, unit: string) => void
}

const SetGoalModal = ({
    closeModal,
    name,
    addGoalHandler,
}: SETGOALMODAL_PROPS) => {
    const [inputValue, setInputValue] = useState<string>('')
    const handleSetButtonClick = useCallback<
        MouseEventHandler<HTMLButtonElement>
    >(
        (e) => {
            if (inputValue.trim()) {
                e.preventDefault()
                addGoalHandler(name, inputValue, GOAL_OPTIONS_UNIT[name])
            }
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
        <div className='w-6/12 h-[100vh] grid place-content-center mx-auto'>
            <div className='w-[90vw] sm:w-[50vw] lg:w-[30vw] xl:w-[25vw] bg-theme-color-blue text-theme-modal-bg-light p-3 rounded-sm'>
                <header className='mb-2 text-xl flex items-center justify-between'>
                    <p>{name}</p>
                    <button
                        onClick={closeModal}
                        className='text-xl p-1 hover:bg-opacity-65 rounded-sm transition-colors border border-transparent outline-none hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-xs focus-visible:shadow-theme-bg-dark'
                    >
                        <FaX />
                    </button>
                </header>
                <form>
                    <input
                        type='text'
                        name='target'
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                        }}
                        placeholder={
                            'enter your target in ' + GOAL_OPTIONS_UNIT[name]
                        }
                        className='w-full text-theme-bg-dark px-2 py-1 my-2 text-xl placeholder:lowercase rounded-sm outline-none border border-theme-bg-dark required out-of-range:border-red-500'
                    />
                    <button
                        onClick={handleSetButtonClick}
                        className=' border border-transparent px-2 py-1 my-2 shadow-sm w-6/12 bg-theme-color-aqua hover:border-theme-bg-dark rounded-sm outline-none focus-visible:border-theme-bg-dark focus-visible:shadow-sm hover:opacity-85 focu focus-visible:opacity-85 transition-all'
                    >
                        set
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

export default SetGoalModal
