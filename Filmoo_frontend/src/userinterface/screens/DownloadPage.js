import Category from "../components/Category";
import Header from "../components/Header";
import Search from "../components/Search";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getData, postData } from "../../backendservices/FetchNodeServices";
import Title from "../components/Downloads/Title";
import Detail from "../components/Downloads/Detail";
import Description from "../components/Downloads/Description";
import Screenshot from "../components/Downloads/Screenshot";
import { useParams } from "react-router-dom";
import Poster from "../components/Downloads/Poster";
import MovieDownload from "../components/Downloads/MovieDownload";

export default function DownloadPage() {

  const [movieList, setMovieList] = useState({})
  const params=useParams()
  console.log(params)
  console.log('movie',movieList)

  const fetchAllMovie = async () => {
    try {
      const res = await postData("download/fetch_movies_by_id",{movieid:params.movieid});
      console.log("Fetched:", res.data)
      setMovieList(res.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchAllMovie();
  }, [params]);

  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen w-full text-white">
      <Header />
      <Search />
      <Category />
      {movieList.length > 0 && (
        <>
          <Title title={movieList[0]} />
          <Poster image={movieList[0].image}/>
          <Detail detail={movieList[0]} />
          <Description description={movieList[0]?.description}/>
          <Screenshot screenshot={movieList[0]?.screenshot}/>
          <MovieDownload download={movieList[0]}/>
        </>
      )}
      <Footer/>
    </div>
  );
}
