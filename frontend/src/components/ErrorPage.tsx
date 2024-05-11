import { Link, useRouteError } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const ErrorPage = () => {
    const error: any = useRouteError()
    return (
        <div>
            <Header />
            <div className='min-h-[80vh] text-center my-5'>
                <div className='mx-auto w-52 aspect-square overflow-hidden rounded-full'>
                    <img src='/404.jpeg' alt='errorimg' />
                </div>
                <h1 className='text-6xl font-bold'>{error?.status}</h1>
                <h1 className='text-lg font-thin'>
                    {error?.statusText || 'Page Not Found'}
                </h1>
                <Link
                    to='/'
                    className='my-10 underline text-theme-color-blue hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-sm hover:opacity-85 focus-visible:opacity-85'
                >
                    Back to home
                </Link>
            </div>
            <Footer />
        </div>
    )
}

export default ErrorPage
