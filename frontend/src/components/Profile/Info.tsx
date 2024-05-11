import { FaEdit } from 'react-icons/fa'
interface INFO_PROPS {
    name: string
    data: number
    openModal: () => void
}

const Info = ({ name, data, openModal }: INFO_PROPS) => {
    return (
        <div className='w-28 sm:w-48 h-auto rounded-sm bg-theme-modal-bg-light text-theme-bg-dark px-2 py-5'>
            <div className='text-right'>
                <button
                    onClick={() => openModal()}
                    className='p-1 text-xl cursor-pointer border border-transparent  focus-visible:border-theme-bg-dark hover:opacity-85'
                >
                    <FaEdit className='' />
                </button>
            </div>
            <p className='text-md sm:text-xl text-center font-bold'>{data}</p>
            <h1 className='text-center text-lg sm:text-2xl font-bold text-theme-color-blue capitalize'>
                {name}
            </h1>
        </div>
    )
}

export default Info
