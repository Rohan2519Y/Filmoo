import { useState } from "react";
import CardDisplay from "../components/CardDisplay";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";

export default function SearchPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [movieType, setMovieType] = useState('');
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full bg-gradient-to-br from-[#0f0c29] via-[#2c2c54] to-[#24243e] overflow-y-auto">
            <Header />
            <Search />
            <Category />
            {movieType.length == 0 ? <></> : <div className="w-full flex justify-center items-center my-9">
                <div className="w-[85%] sm:w-[98%] mid:w-[1280px] h-full flex justify-start items-end font-bold text-2xl text-white">
                    Results For : {movieType}
                </div>
            </div>}
            <CardDisplay
                setMovieType={setMovieType}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <Footer />
        </div>
    );
}