import { LOGO_TEXT } from '../utils/constants'
import { FaGithubSquare } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'
import { FaFacebookSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className=' w-full mt-10 py-5 bg-theme-color-blue bg-opacity-40 flex gap-10 items-center justify-center'>
            <h1 className='text-2xl letter-space-1 font-bold'>
                <Link to='/'>@{LOGO_TEXT}</Link>
            </h1>
            <nav>
                <ul className='flex gap-5'>
                    <li className='hover:text-theme-color-aqua transition-all'>
                        <a
                            href='https://github.com/pralay-giri'
                            target='_blank'
                        >
                            <FaGithubSquare />
                        </a>
                    </li>
                    <li className='hover:text-theme-color-aqua transition-all'>
                        <a
                            href='https://www.linkedin.com/in/prala-ygiri/'
                            target='_blank'
                        >
                            <BsLinkedin />
                        </a>
                    </li>
                    <li className='hover:text-theme-color-aqua transition-all'>
                        <a
                            href='https://www.facebook.com/profile.php?id=100087947311318'
                            target='_blank'
                        >
                            <FaFacebookSquare />
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer
