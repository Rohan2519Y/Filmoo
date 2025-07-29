import CardDisplay from "../components/CardDisplay";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";

export default function Home() {
    return (<>
        <div className="w-full bg-gradient-to-br from-[#0f0c29] via-[#2c2c54] to-[#24243e] overflow-y-auto">
            <Header />
            <Search />
            <Category/>
            <CardDisplay/>
            <Footer/>
        </div>
    </>);
}