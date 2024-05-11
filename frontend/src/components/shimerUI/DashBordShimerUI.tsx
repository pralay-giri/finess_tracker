// * it a ui that defin a empty structure like DashBord
const DashBordShimerUI = () => {
    return (
        <div className='mx-5 md:mx-[5%] lg:mx-[10%] grid place-content-center xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 animate-pulse'>
            <div className='sm:col-span-2 xl:col-span-3 h-[70vh] bg-theme-modal-bg-light opacity-20 rounded-lg'></div>
            <div className='h-[30vh] bg-theme-modal-bg-light opacity-20 rounded-lg'></div>
            <div className='h-[30vh] bg-theme-modal-bg-light opacity-20 rounded-lg'></div>
            <div className='h-[30vh] bg-theme-modal-bg-light opacity-20 rounded-lg'></div>
            <div className='h-[30vh] bg-theme-modal-bg-light opacity-20 rounded-lg'></div>
            <div className='h-[30vh] bg-theme-modal-bg-light opacity-20 rounded-lg'></div>
        </div>
    )
}

export default DashBordShimerUI
