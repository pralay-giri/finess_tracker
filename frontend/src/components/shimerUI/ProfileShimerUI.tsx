const ProfileShimerUI = () => {
    return (
        <div className='w-full min-h-[60vh] mx-auto flex flex-col items-center justify-center my-5 p-5 animate-pulse'>
            <div className='w-32 md:w-40 aspect-square bg-theme-modal-bg-light opacity-20 rounded-full'></div>
            <div className='my-5 w-[40%] md:w-[20%] h-2 rounded-md bg-theme-modal-bg-light opacity-20'></div>
            <div className='w-[50%] md:w-[30%] h-2 rounded-md bg-theme-modal-bg-light opacity-20'></div>
            <div className='grid grid-cols-2 gap-10 my-5 *:w-28 sm:*:w-48 *:aspect-square *:h-auto *:rounded-sm *:bg-theme-modal-bg-light *:opacity-20'>
                <div className=''></div>
                <div className=''></div>
                <div className=''></div>
                <div className=''></div>
            </div>
        </div>
    )
}

export default ProfileShimerUI
