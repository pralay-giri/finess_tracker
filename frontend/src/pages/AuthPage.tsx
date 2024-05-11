import {
    ChangeEventHandler,
    FormEventHandler,
    MouseEventHandler,
    useCallback,
    useState,
} from 'react'
import { LOGO_TEXT, TOAST_OPT } from '../utils/constants'
import { GoEye, GoEyeClosed } from 'react-icons/go'
import { fetch } from '../utils/fetch'
import { LuLoader2 } from 'react-icons/lu'
import toast from 'react-hot-toast'
import { RESPONSE_INFER } from '../@types'
import { useNavigate } from 'react-router-dom'

interface FORM_INPUT_INFER {
    name: string
    email: string
    password: string
}

const AuthPage = () => {
    const navigate = useNavigate()
    const [isSigninVisile, setIsSigninVisile] = useState<boolean>(true)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isLoadding, setIsLoadding] = useState<boolean>(false)
    const [inputData, setInputData] = useState<FORM_INPUT_INFER>({
        email: '',
        name: '',
        password: '',
    })

    // ? usecallback for preventing the redeclaration of functions
    const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            const { name } = e.target
            setInputData((prev) => {
                return { ...prev, [name]: e.target.value }
            })
        },
        [inputData],
    )

    const handleToggleAuth = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (e) => {
            e.preventDefault()
            setIsSigninVisile((prev) => !prev)
        },
        [],
    )

    const handleFormSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        async (e) => {
            e.preventDefault()
            setIsLoadding((prev) => !prev)
            let response: RESPONSE_INFER | null = null
            if (isSigninVisile) {
                response = await fetch('/api/user/login', 'POST', {
                    email: inputData.email,
                    password: inputData.password,
                })
            } else {
                // * register
                response = await fetch('/api/user/register', 'POST', {
                    ...inputData,
                })
            }
            if (!response) return null
            if (response.sucess) {
                toast.success(response.message, TOAST_OPT)
                navigate('/')
            } else {
                toast.error(response.message, TOAST_OPT)
            }
            setIsLoadding((prev) => !prev)
        },
        [inputData, isSigninVisile, isLoadding],
    )

    return (
        <div className='min-h-[80vh]'>
            <div className='mx-auto mt-20 w-3/12 py-5 px-10 border bg-theme-modal-bg-light text-theme-bg-dark rounded-sm'>
                <div className='mx-auto logo w-24 aspect-square rounded-full overflow-hidden border-2 border-theme-bg-dark shadow shadow-theme-bg-dark'>
                    <img
                        src='/logo.jpg'
                        alt='logo'
                        className='w-full object-cover object-center'
                    />
                </div>
                <p className='text-center text-xl'>
                    wellcome to <strong>{LOGO_TEXT}</strong>
                </p>
                <form
                    onSubmit={handleFormSubmit}
                    className='mt-2 text-xl *:my-1'
                >
                    {!isSigninVisile && (
                        <input
                            type='text'
                            name='name'
                            placeholder='name'
                            value={inputData.name}
                            onChange={handleInputChange}
                            className='w-full border border-theme-bg-dark rounded-sm px-2 py-1 active:border-theme-color-blue'
                        />
                    )}
                    <input
                        type='email'
                        name='email'
                        placeholder='email'
                        value={inputData.email}
                        onChange={handleInputChange}
                        className='w-full border border-theme-bg-dark rounded-sm px-2 py-1'
                    />
                    <div className='border border-theme-bg-dark flex items-center rounded-sm focus-within:outline focus-within:outline-1'>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            name='password'
                            placeholder='password'
                            value={inputData.password}
                            onChange={handleInputChange}
                            autoComplete='true'
                            className='w-full px-2 py-1 border-none outline-none rounded-sm'
                        />
                        {isPasswordVisible ? (
                            <GoEyeClosed
                                onClick={() =>
                                    setIsPasswordVisible((prev) => !prev)
                                }
                                className='mx-1 w-7 cursor-pointer'
                            />
                        ) : (
                            <GoEye
                                onClick={() =>
                                    setIsPasswordVisible((prev) => !prev)
                                }
                                className='mx-1 w-7 cursor-pointer'
                            />
                        )}
                    </div>
                    <p className='text-sm text-right'>
                        {isSigninVisile ? 'already' : "didt't"} have an account{' '}
                        <button
                            onClick={handleToggleAuth}
                            className='underline text-theme-color-blue cursor-pointer transition-all hover:opacity-80 focus-visible:opacity-80'
                        >
                            {isSigninVisile ? 'register' : 'login'}
                        </button>
                    </p>
                    <button
                        disabled={isLoadding}
                        className='w-full rounded-sm text-xl font-bold text-theme-modal-bg-light bg-theme-bg-dark px-3 py-2 disabled:opacity-25'
                    >
                        {isLoadding ? (
                            <LuLoader2 className='mx-auto text-xl animate-spin' />
                        ) : isSigninVisile ? (
                            'login'
                        ) : (
                            'register'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthPage
