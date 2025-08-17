export default function Detail({detail}) {
    return (<>
        <div className="w-full min-h-[100px] flex justify-center items-center flex-col">
            <div className=" w-[95%] mid:w-[1280px] min-h-[100px] flex justify-center items-center flex-col">
                <div className="w-full h-[60px] flex justify-center items-center md:text-3xl text-xl font-bold text-cyan-500">Movie Info </div>
                <div className="w-full flex flex-col justify-center">
                    <div className="w-full min-h-[35px] flex items-center text-lg md:text-xl font-semibold text-blue-700">{detail.content == 'movie'?`Movie Name : ` : `Series Name : ` }<div className="ml-3 text-base md:text-xl text-gray-400"> {detail.name}</div></div>
                    <div className="w-full min-h-[35px] flex items-center text-lg md:text-xl font-semibold text-blue-700">Category : <div className="ml-3 text-base md:text-xl text-gray-400"> {detail.categoryname}</div></div>
                    <div className="w-full min-h-[35px] flex items-center text-lg md:text-xl font-semibold text-blue-700">Language : <div className="ml-3 text-base md:text-xl text-gray-400"> {detail.language}</div></div>
                    <div className="w-full min-h-[35px] flex items-center text-lg md:text-xl font-semibold text-blue-700">Year : <div className="ml-3 text-base md:text-xl text-gray-400"> {detail.year}</div></div>
                    <div className="w-full min-h-[35px] flex items-center text-lg md:text-xl font-semibold text-blue-700">Genre : <div className="ml-3 text-base md:text-xl text-gray-400"> {detail.genre}</div></div>
                </div>
            </div>
        </div>
    </>)
}