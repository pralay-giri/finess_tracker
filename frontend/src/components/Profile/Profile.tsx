import toast from 'react-hot-toast'
import useFetch from '../../hooks/useFetch'
import { USER_INFO } from '../../utils/constants'
import Info from './Info'
import { useCallback, useState } from 'react'
import ModalProvider from '../ModalProvider'
import UpdateModal from './UpdateModal'
import { fetch } from '../../utils/fetch'
import ProfileShimerUI from '../shimerUI/ProfileShimerUI'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const [editModalState, setEditModalState] = useState<boolean>(false)

    const updateHandler = useCallback(
        async ({ age, weight, height, heart }: { [key: string]: string }) => {
            if (
                [age, weight, height, heart].some((value) => {
                    if (!value) {
                        return true
                    }
                })
            ) {
                return toast.error('some of the fields are empty', {
                    position: 'bottom-right',
                })
            }
            const response = await fetch('/api/user/setUserInfo', 'POST', {
                age,
                weight,
                height,
                heart,
            })
            if (response) {
                if (response.sucess) {
                    toast.success(response.message, {
                        position: 'bottom-right',
                    })
                } else {
                    toast.error(response.message, {
                        position: 'bottom-right',
                    })
                }
            }
            setEditModalState(false)
        },
        [],
    )

    const handleLogout = useCallback(async () => {
        const response = await fetch('/api/user/logout', 'DELETE', {})
        if (response) {
            if (response.sucess) {
                toast.success(response.message, { position: 'bottom-right' })
                navigate('/auth')
            } else {
                toast.error(response.message, { position: 'bottom-right' })
            }
        }
    }, [])

    const { isLoadding, data, error } = useFetch(
        '/api/user/getInfo',
        {},
        {},
        'GET',
    )

    if (error) {
        toast.error(error, { position: 'bottom-right' })
        return <h1 className='text-center'>error in fetching data </h1>
    }

    if (isLoadding) {
        return <ProfileShimerUI />
    }

    return (
        <div className='w-full min-h-[60vh] mx-auto flex flex-col items-center justify-center my-5 p-5'>
            <div className='w-28 md:w-40 aspect-square rounded-full border-2 border-theme-color-aqua bg-theme-modal-bg-light grid place-content-center text-theme-bg-dark *:text-4xl md:*:text-6xl *:uppercase *:font-semibold'>
                <span>{data.name[0] || 'f'}</span>
            </div>
            <p className='text-lg md:text-3xl capitalize font-semibold'>
                {data.name}
            </p>
            <p className='text-lg font-thin text-gray-400'>
                welcome {data.name.split(' ')[0]}
            </p>
            <div className='grid grid-cols-2 gap-10 my-5'>
                {USER_INFO.map((info) => {
                    return (
                        <Info
                            key={info}
                            name={info}
                            data={data[info]}
                            openModal={() => setEditModalState(true)}
                        />
                    )
                })}
            </div>
            <button
                onClick={handleLogout}
                className='w-60 sm:w-52 text-md sm:text-xl  rounded-sm px-5 py-2 bg-red-500 hover:border-theme-bg-dark focus-visible:border-theme-bg-dark focus-visible:shadow-sm hover:opacity-85 focus-visible:opacity-85 '
            >
                logout
            </button>
            {editModalState && (
                <ModalProvider>
                    <div className='fixed w-[100vw] top-0 left-0 bg-theme-bg-dark bg-opacity-45 backdrop-blur-md'>
                        <UpdateModal
                            closeModal={() => setEditModalState(false)}
                            updateHandler={updateHandler}
                        />
                    </div>
                </ModalProvider>
            )}
        </div>
    )
}

export default Profile
