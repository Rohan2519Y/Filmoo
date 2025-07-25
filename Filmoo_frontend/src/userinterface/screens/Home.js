import Header from "../components/Header";
import Search from "../components/Search";

export default function Home() {
    return (<>
        <div className="w-full h-screen bg-gradient-to-br from-[#0f0c29] via-[#2c2c54] to-[#24243e]">
            <Header />
            <Search />
        </div>
    </>);
}