import {
    ChangeEventHandler,
    FormEventHandler,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { FaX } from 'react-icons/fa6'

interface UPDATEMODAL_PROPS {
    updateHandler: ({
        age,
        weight,
        height,
        heart,
    }: {
        [key: string]: string
    }) => void
    closeModal: () => void
}

const UpdateModal = ({ updateHandler, closeModal }: UPDATEMODAL_PROPS) => {
    const [inputValues, setInputValues] = useState<{
        age: string
        weight: string
        height: string
        heart: string
    }>({
        age: '',
        weight: '',
        height: '',
        heart: '',
    })

    const handleInpuUpdate = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            const { name, value } = e.target
            setInputValues((prev) => {
                return {
                    ...prev,
                    [name]: value,
                }
            })
        },
        [inputValues],
    )

    const handleSubmit = useCallback<FormEventHandler<HTMLButtonElement>>(
        (e) => {
            e.preventDefault()
            updateHandler(inputValues)
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
                    <p>info</p>
                    <button
                        onClick={() => closeModal()}
                        className='text-xl p-1 hover:bg-opacity-65 rounded-sm transition-colors border border-transparent outline-none hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-xs focus-visible:shadow-theme-bg-dark'
                    >
                        <FaX />
                    </button>
                </header>
                <form className='*:w-full *:my-1 *:px-2 *:py-1 *:text-lg *:text-theme-bg-dark *:rounded-sm *:outline-none *:border *:transition-all'>
                    <input
                        type='number'
                        name='age'
                        placeholder='age'
                        value={inputValues.age}
                        onChange={handleInpuUpdate}
                        className='text-theme-bg-dark rounded-sm outline-none border transition-all focus-visible:border-theme-bg-dark valid:border-theme-bg-dark focus-visible:shadow-sm focus-visible:shadow-theme-bg-dark hover:border-theme-bg-dark text-opacity-65 hide-input-conrtoler'
                    />
                    <input
                        type='number'
                        name='weight'
                        placeholder='weight'
                        value={inputValues.weight}
                        onChange={handleInpuUpdate}
                        className=' focus-visible:border-theme-bg-dark valid:border-theme-bg-dark focus-visible:shadow-sm focus-visible:shadow-theme-bg-dark hover:border-theme-bg-dark text-opacity-65 hide-input-conrtoler'
                    />
                    <input
                        type='number'
                        name='height'
                        placeholder='height'
                        value={inputValues.height}
                        onChange={handleInpuUpdate}
                        className='text-theme-bg-dark rounded-sm outline-none border transition-all focus-visible:border-theme-bg-dark valid:border-theme-bg-dark focus-visible:shadow-sm focus-visible:shadow-theme-bg-dark hover:border-theme-bg-dark text-opacity-65 hide-input-conrtoler'
                    />
                    <input
                        type='number'
                        name='heart'
                        placeholder='heart'
                        value={inputValues.heart}
                        onChange={handleInpuUpdate}
                        className='text-theme-bg-dark rounded-sm outline-none border transition-all focus-visible:border-theme-bg-dark valid:border-theme-bg-dark focus-visible:shadow-sm focus-visible:shadow-theme-bg-dark hover:border-theme-bg-dark text-opacity-65 hide-input-conrtoler'
                    />
                    <div className='border-none *:border *:border-transparent *:px-2 *:py-1 *:my-2 *:shadow-sm *:w-6/12  *:transition-all *:rounded-sm *:outline-none *:text-theme-modal-bg-light'>
                        <button
                            onClick={handleSubmit}
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
                </form>
            </div>
        </div>
    )
}

export default UpdateModal
