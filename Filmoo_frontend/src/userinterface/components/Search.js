import { useEffect, useState } from "react"
import { postData, serverURL } from "../../backendservices/FetchNodeServices"
import { useNavigate } from "react-router"

export default function Search() {

    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [search, setSearch] = useState([])

    const fetchSearch = async () => {
        if (!text.trim()) {
            setSearch([])
            return
        }
        var res = await postData('download/fetch_movies_by_search', { searchtext: text })
        setSearch(res.data)
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                fetchSearch();
            }
        }, 2000);

        if (text.length === 0) {
            setSearch([])
        }

        return () => clearTimeout(delay);
    }, [text]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/searchpage/${text}`, { state: { type: "search" } })
            setText('')
        }
    }

    return (
        <>
            <div className="w-full bg-slate-900/80 flex justify-center items-center flex-col relative z-40 h-[60px] ">
                {/* Search Bar */}
                <div className="relative w-[98%] mid:w-[1280px] h-[48px] bg-gray-600 flex justify-center items-center rounded-lg">
                    <input
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleSearch}
                        type="text"
                        placeholder="Search"
                        className="md:w-[90%] w-[80%] h-full bg-transparent text-center font-semibold text-white text-xl 
                                   placeholder:text-center select-none placeholder:text-gray-400 rounded-l-lg focus:outline-none"
                    />
                    <button
                        onClick={() => {navigate(`/searchpage/${text}`, { state: { type: "search" } });setText('')}}
                        style={{ textShadow: '2px 2px 3px rgba(0, 0, 0, 0.6)' }}
                        className="md:w-[10%] w-[20%] h-full select-none bg-blue-500 hover:bg-blue-600 rounded-r-lg font-semibold text-slate-200 text-lg"
                    >
                        Search
                    </button>

                    {/* Dropdown */}
                    {text.length > 0 && search.length > 0 && (
                        <div className="absolute top-[48px] left-0 w-full bg-slate-700 rounded-b-lg shadow-lg max-h-[300px] overflow-y-auto">
                            {search.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {navigate(`/download/${item.movieid}`);setText('')}}
                                    className="w-full h-24 hover:bg-slate-600 cursor-pointer text-white flex p-1 box-border"
                                >
                                    <div className='w-[30%] flex justify-center items-center p-1 box-border'>
                                        <img src={`${serverURL}/images/${item?.image}`} className="max-w-full max-h-full" />
                                    </div>
                                    <div className="w-[70%] flex justify-center items-center p-1 box-border">
                                        {item.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}