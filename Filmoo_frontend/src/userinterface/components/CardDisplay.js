import Card from "./Card";
import NextPrev from "./NextPrev";
import { useEffect, useState } from "react"
import { getData, serverURL, postData } from "../../backendservices/FetchNodeServices"
import { useParams } from "react-router-dom";

export default function CardDisplay({ currentPage, onPageChange }) {
    const [movieList, setMovieList] = useState([]);
    const itemsPerPage = 20;
    const params = useParams()

    const fetchAllMovie = async () => {
        if (params.text && params.text.trim().length > 0) {
            const res = await postData('download/fetch_movies_by_search', { searchtext: params.text });
            setMovieList(res.data);
        } else {
            const res = await getData('download/fetch_movies');
            setMovieList(res.data);
        }
    };

    useEffect(function () {
        fetchAllMovie()
    }, [params])

    console.log(params, movieList)

    const totalPages = Math.ceil(movieList.length / itemsPerPage);

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return movieList.slice(startIndex, endIndex);
    };

    return (
        <>
            <div className="w-full flex justify-center items-center my-9">
                <div className="w-[85%] sm:w-[98%] mid:w-[1280px] h-full flex justify-start md:gap-x-[2.5%] sm:gap-x-[2.65%] gap-x-[8%] gap-y-10 items-center flex-wrap">
                    <Card movieList={getCurrentPageData()} />
                </div>
            </div>

            {totalPages > 1 && (
                <NextPrev
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </>
    )
}