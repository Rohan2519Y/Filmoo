import Category from "../components/Category";
import SeriesDownload from "../components/Downloads/SeriesDownload";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { postData } from "../../backendservices/FetchNodeServices";

export default function Series() {
    const [movieList, setMovieList] = useState([]);
    const params = useParams();
    const fetchAllMovie = async () => {
        try {
            const res = await postData("download/fetch_movies_by_id", { movieid: params.movieid });
            setMovieList(res.data);
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
    };

    useEffect(() => {
        if (params.movieid) {
            fetchAllMovie();
        }
    }, [params.movieid]);

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen w-full text-white">
            <Header />
            <Search />
            <Category />
            {movieList[0] && <SeriesDownload movieList={movieList[0]} season={params.season}/>}
            <Footer />
        </div>
    );
}
