import Category from "../components/Category";
import Header from "../components/Header";
import Search from "../components/Search";
import { useEffect, useState } from "react"
import { getData, serverURL } from "../../backendservices/FetchNodeServices"
import Title from "../components/Downloads/Title";

export default function Download() {

    const [movieList, setMovieList] = useState([])

    const fetchAllMovie = async () => {
        var res = await getData('movie/fetch_movies')
        setMovieList(res.data)
    }

    useEffect(function () {
        fetchAllMovie()
    }, [])

    return (<>
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen w-full text-white">
            <Header />
            <Search />
            <Category />
            <Title title={movieList[0].title}/>
        </div>
    </>)
}