import Category from "../components/Category";
import Header from "../components/Header";
import Search from "../components/Search";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getData } from "../../backendservices/FetchNodeServices";
import Title from "../components/Downloads/Title";
import Detail from "../components/Downloads/Detail";
import Description from "../components/Downloads/Description";
import Screenshot from "../components/Downloads/Screenshot";

export default function Download() {
  const [movieList, setMovieList] = useState([]);

  const fetchAllMovie = async () => {
    try {
      const res = await getData("download/fetch_movies");
      console.log("Fetched:", res.data)
      setMovieList(res.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchAllMovie();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen w-full text-white">
      <Header />
      <Search />
      <Category />
      {movieList.length > 0 && (
        <>
          <Title title={movieList[0]} />
          <Detail detail={movieList[0]} />
          <Description description={movieList[0].description}/>
          <Screenshot screenshot={movieList[0].screenshot}/>
        </>
      )}
      <Footer/>
    </div>
  );
}
