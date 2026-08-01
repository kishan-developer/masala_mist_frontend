export default function Rooms_Grid() {
    return (
        <div className='w-[full] flex flex-col items-center justify-center'>
            <h1 className='text-[35px] font-bold mb-10'>Room Details</h1>
            <div className="center_grid grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 lg:w-[80%] md:w-[90%] w-[90%]">
                <div className="h-48 bg-gray-100 rounded" />
                <div className="h-48 bg-gray-100 rounded" />
                <div className="h-48 bg-gray-100 rounded" />
            </div>
        </div>
    )
}
