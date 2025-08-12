import { useEffect, useState } from "react"
import { postData } from "../../backendservices/FetchNodeServices"

export default function Search() {

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

        if (text.length == 0) {
            setSearch([])
        }

        return () => clearTimeout(delay);
    }, [text]);



    console.log('datdasas', search)
    return (<>
        <div className="w-full h-[60px] bg-slate-900/80 flex justify-center items-center flex-col relative">
            <div className="w-[98%] mid:w-[1280px] h-[80%] bg-gray-600 flex justify-center items-center rounded-lg">
                <input onChange={(e) => { setText(e.target.value) }} type="text" placeholder="Search" className="md:w-[90%] w-[80%] h-[90%] bg-transparent text-center font-semibold text-white placeholder:text-center placeholder:text-gray-400 rounded-l-lg placeholder:text-xl"></input>
                <button style={{ textShadow: '2px 2px 3px rgba(0, 0, 0, 0.6)' }} className="md:w-[10%] w-[20%] h-full bg-blue-500 hover:bg-blue-600 rounded-r-lg font-semibold text-slate-200 text-lg">Search</button>
            </div>
            {text.length > 0 && search.length > 0 ?
                <div className="w-[98%] mid:w-[1280px] min-h-[50px] sticky md:top-[155px] top-[135px] z-40">
                    {search.map((item) => (<div className="w-full h-[70px] bg-red-500">
                        {item.name}
                    </div>))}
                </div> : <></>}
        </div>
    </>)
}