import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

const App: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Toaster />
            <Footer />
        </>
    )
}

export default App
