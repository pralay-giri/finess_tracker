import { LOGO_TEXT } from '../utils/constants'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6'

const Header = () => {
    const navigate = useNavigate()
    const [navigationVisibility, setNavigationVisibility] =
        useState<boolean>(false)

    const toogleNavigation = useCallback<
        MouseEventHandler<HTMLButtonElement>
    >(() => {
        setNavigationVisibility((prev) => !prev)
    }, [navigationVisibility])

    useEffect(() => {
        if (navigationVisibility)
            document.documentElement.style.overflow = 'hidden'
        else document.documentElement.style.overflow = 'auto'
    }, [navigationVisibility])

    return (
        <header
            className={`px-5 md:px-10 py-3 flex items-center ${navigationVisibility ? '' : ''}`}
        >
            <Link to='/'>
                <h1 className='text-xl font-bold md:text-3xl md:letter-space-1'>
                    {LOGO_TEXT}
                </h1>
            </Link>
            <nav
                className={`ml-auto md:block md:*:flex-row md:relative md:w-auto md:bg-none absolute w-[45%] right-0 top-0 bottom-0 *:flex-col *:text-center bg-theme-bg-dark backdrop-blur-md bg-opacity-70 z-10 ${navigationVisibility ? 'block' : 'hidden'}`}
            >
                <ul className='*:text-theme-modal-bg-light *:text-md *:uppercase flex gap-[24px] '>
                    <div className='text-left'>
                        <button
                            onClick={toogleNavigation}
                            className='text-xl my-5 ml-5 md:hidden hover:opacity-55 transition-all'
                        >
                            <FaX />
                        </button>
                    </div>
                    <li>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive
                                    ? 'opacity-100'
                                    : 'opacity-[47%] hover:opacity-100 transition-all'
                            }
                        >
                            Dashbord
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/goals'
                            className={({ isActive }) =>
                                isActive
                                    ? 'opacity-100'
                                    : 'opacity-[47%] hover:opacity-100 transition-all'
                            }
                        >
                            Goals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/workouts'
                            className={({ isActive }) =>
                                isActive
                                    ? 'opacity-100'
                                    : 'opacity-[47%] hover:opacity-100 transition-all'
                            }
                        >
                            workouts
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <button
                onClick={toogleNavigation}
                className='ml-auto mr-5 text-2xl p-1 hover:opacity-50 transition-all md:hidden'
            >
                <RxHamburgerMenu />
            </button>
            <section className='md:ml-auto '>
                <button
                    onClick={() => navigate('/profile')}
                    className='w-10 md:w-14 overflow-hidden rounded-full border-2 transition-all border-theme-modal-bg-light active:border-theme-color-orange focus-visible:outline-none focus-visible:border-theme-color-blue focus-visible:shadow-sm focus-visible:shadow-theme-color-aqua hover:border-theme-color-blue  '
                >
                    <img
                        src='/logo.jpg'
                        alt='profile'
                        className='aspect-square w-full'
                    />
                </button>
            </section>
        </header>
    )
}

export default Header
