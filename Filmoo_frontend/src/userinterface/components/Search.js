export default function Search() {
    return (<>
        <div className="w-full h-[60px] bg-slate-900/80 flex justify-center items-center">
            <div className="w-[98%] mid:w-[1280px] h-[80%] bg-gray-600 flex justify-center items-center rounded-lg">
                <input type="text" placeholder="Search" className="md:w-[90%] w-[80%] h-[90%] bg-transparent placeholder:text-center placeholder:text-gray-400 rounded-l-lg"></input>
                <button style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="md:w-[10%] w-[20%] h-full bg-blue-500 hover:bg-blue-600 rounded-r-lg">Search</button>
            </div>
        </div>
    </>)
}