import Card from "./Card";
import { useEffect, useState } from "react"
import { getData, serverURL } from "../../backendservices/FetchNodeServices"

export default function CardDisplay() {

const [movieList, setMovieList] = useState([])

    const fetchAllMovie = async () => {
        var res = await getData('movie/fetch_movies')
        setMovieList(res.data)
    }

    useEffect(function () {
        fetchAllMovie()
    }, [])

    return (<>
        <div className="w-full flex justify-center items-center my-9">
            <div className=" w-[85%] sm:w-[98%] mid:w-[1280px] h-full flex justify-start md:gap-x-[2.5%] sm:gap-x-[2.65%] gap-x-[8%] gap-y-10 items-center flex-wrap">
                <Card movieList={movieList}/>
            </div>
        </div>
    </>)
}