import { useState } from "react";
import CardDisplay from "../components/CardDisplay";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NextPrev from "../components/NextPrev";
import Search from "../components/Search";

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full bg-gradient-to-br from-[#0f0c29] via-[#2c2c54] to-[#24243e] overflow-y-auto">
            <Header />
            <Search />
            <Category />
            <CardDisplay 
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <Footer />
        </div>
    );
}