import { Link } from 'react-router-dom'

// * type definition for this components properties(props)
interface STAT_PROPS {
    icon: JSX.Element
    title: string
    value: string | null
    link: string
    color: string
}

const Stat = ({ icon, title, value, link, color }: STAT_PROPS) => {
    if (!title.trim()) return

    return (
        <div
            className={
                'stat p-6 text-xl md:text-2xl font-bold bg-theme-modal-bg-light border rounded-lg flex flex-col items-center ' +
                color
            }
        >
            <div className='my-5 text-3xl md:text-4xl font-bold'>{icon}</div>
            <h2 className='value'>{value ? value : 'no records'}</h2>
            <h1 className='title text-theme-bg-dark text-2xl md:text-4xl opacity-[48%]'>
                {title}
            </h1>
            <div className='ml-auto '>
                <Link
                    to={link}
                    className={
                        'text-xl md:text-2xl underline hover:opacity-70 transition-all hover:underline focus-visible:opacity-70 ' +
                        color
                    }
                >
                    view
                </Link>
            </div>
        </div>
    )
}

export default Stat
