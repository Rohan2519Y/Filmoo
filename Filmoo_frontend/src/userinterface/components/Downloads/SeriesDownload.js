import { useState,useEffect } from "react";

export default function SeriesDownload({ movieList, season }) {

  const [s480, setS480] = useState(0)
  const [s720, setS720] = useState(0)
  const [s1080, setS1080] = useState(0)
  const [s4k, setS4k] = useState(0)

  useEffect(() => {
    let total480 = 0, total720 = 0, total1080 = 0, total4k = 0

    const seasons = JSON.parse(movieList?.eplinks);
    const seasonItem = seasons.find(s => String(s.seasonNumber) === String(season));
    if (seasonItem) {
      const episodes = Array.isArray(seasonItem.episodesLinks)
        ? seasonItem.episodesLinks
        : JSON.parse(seasonItem.episodesLinks || "[]");

      episodes.forEach(ep => {
        total480 += parseInt(ep?.size480P)
        total720 += parseInt(ep?.size720P)
        total1080 += parseInt(ep?.size1080P)
        total4k += parseInt(ep?.size4k)
      });
    }
    if(total480>=1024){
      total480=total480/1024
      setS480(total480.toFixed(2)+' GB')
    }
    else{
      setS480(total480+' MB')
    }
    if(total720>=1024){
      total720=total720/1024
      setS720(total720.toFixed(2)+' GB')
    }
    else{
      setS720(total720+' MB')
    }
    if(total1080>=1024){
      total1080=total1080/1024
      setS1080(total1080.toFixed(2)+' GB')
    }
    else{
      setS1080(total1080+' MB')
    }
    if(total4k>=1024){
      total4k=total4k/1024
      setS4k(total4k.toFixed(2)+' GB')
    }
    else{
      setS4k(total4k+' MB')
    }
  }, [movieList, season]);


  return (
    <div className="w-full min-h-[100px] flex justify-center items-center flex-col">
      <div className="w-[98%] mid:w-[1280px] min-h-[150px] flex justify-center items-center flex-col">
        {movieList?.eplinks &&
          JSON.parse(movieList.eplinks)
            .filter((s) => String(s.seasonNumber) === String(season))
            .map((seasonItem, seasonIndex) => {
              const episodes = Array.isArray(seasonItem?.episodesLinks)
                ? seasonItem.episodesLinks
                : JSON.parse(seasonItem?.episodesLinks || "[]");

              return (
                <div className="flex justify-center items-center flex-col w-full">
                  <div className="w-full h-[100px] flex justify-center items-center font-bold text-4xl text-cyan-500">Download Season {season}</div>
                  <div className="w-full h-[50px] flex justify-center items-center text-3xl font-bold flex-col text-violet-400">Zip Links</div>
                  <div className="w-full flex items-center justify-center gap-x-2 sm:gap-x-10 flex-wrap sm:flex-nowrap">
                    {movieList.seasonsData[0].zipLinks["480P"].length > 0 ? <div className="w-[45%] sm:w-auto h-auto ">
                      <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">480P - Size: {s480}</div>
                      <a className="w-[100%] sm:w-[200px] h-[80px] flex justify-center items-center" href={movieList.seasonsData[0].zipLinks["480P"]} target="_blank" rel="noopener noreferrer">
                        <button className="w-[100%] sm:w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </div> : <></>}
                    {movieList.seasonsData[0].zipLinks["720P"].length > 0 ? <div className="w-[45%] sm:w-auto h-auto">
                      <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">720P - Size: {s720}</div>
                      <a className="w-[100%] sm:w-[200px] h-[80px] flex justify-center items-center" href={movieList.seasonsData[0].zipLinks["720P"]} target="_blank" rel="noopener noreferrer">
                        <button className="w-[100%] sm:w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </div> : <></>}
                    {movieList.seasonsData[0].zipLinks["1080P"].length > 0 ? <div className="w-auto h-auto">
                      <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">1080P - Size: {s1080}</div>
                      <a className="w-[200px] h-[80px] flex justify-center items-center" href={movieList.seasonsData[0].zipLinks["1080P"]} target="_blank" rel="noopener noreferrer">
                        <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </div> : <></>}
                    {movieList.seasonsData[0].zipLinks["4K"].length > 0 ? <div className="w-auto h-auto">
                      <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">4K - Size: {s4k}</div>
                      <a className="w-[200px] h-[80px] flex justify-center items-center" href={movieList.seasonsData[0].zipLinks["4K"]} target="_blank" rel="noopener noreferrer">
                        <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </div> : <></>}
                  </div>
                  {episodes.map((episode, i) => (<>
                    <div className="w-full h-[50px] flex justify-center items-center text-2xl font-semibold flex-col text-violet-400">Episode : {i + 1} {`{${movieList.language}}`} </div>
                    <div className="w-full flex items-center justify-center gap-x-2 sm:gap-x-10 flex-wrap sm:flex-nowrap">
                      {episode?.link480P?.length > 0 ? <div className="w-[45%] sm:w-auto h-auto ">
                        <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">480P - Size: {episode.size480P}</div>
                        <a className="w-[100%] sm:w-[200px] h-[80px] flex justify-center items-center" href={episode.link480P} target="_blank" rel="noopener noreferrer">
                          <button className="w-[100%] sm:w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                      </div> : <></>}
                      {episode?.link720P?.length > 0 ? <div className="w-[45%] sm:w-auto h-auto">
                        <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">720P - Size: {episode.size720P}</div>
                        <a className="w-[100%] sm:w-[200px] h-[80px] flex justify-center items-center" href={episode.link720P} target="_blank" rel="noopener noreferrer">
                          <button className="w-[100%] sm:w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                      </div> : <></>}
                      {episode?.link1080P?.length > 0 ? <div className="w-auto h-auto">
                        <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">1080P - Size: {episode.size1080P}</div>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={episode.link1080P} target="_blank" rel="noopener noreferrer">
                          <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                      </div> : <></>}
                      {episode?.link4k?.length > 0 ? <div className="w-auto h-auto">
                        <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">4K - Size: {episode.size4k}</div>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={episode.link4k} target="_blank" rel="noopener noreferrer">
                          <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                      </div> : <></>}
                    </div>
                  </>))}
                </div>
              );
            })}
      </div>
    </div>
  );
}
