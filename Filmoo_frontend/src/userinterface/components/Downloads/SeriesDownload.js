export default function SeriesDownload({ movieList, season }) {

  /* var data = [
      {
          "seasonNumber": 1, "numberOfEpisodes": 1, "zip": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "episodesLinks":
              [
                  {
                      "link480P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size480P": "200MB",
                      "link720P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size720P": "400MB",
                      "link1080P": "", "size1080P": "",
                      "link4k": "", "size4k": ""
                  }
              ]
      },
      {
          "seasonNumber": 2, "numberOfEpisodes": 2, "zip": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "episodesLinks":
              [
                  {
                      "link480P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size480P": "200MB",
                      "link720P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size720P": "400MB",
                      "link1080P": "", "size1080P": "", "link4k": "", "size4k": ""
                  },
                  {
                      "link480P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size480P": "200MB",
                      "link720P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size720P": "400MB",
                      "link1080P": "", "size1080P": "",
                      "link4k": "", "size4k": ""
                  }
              ]
      }
  ] */

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
                  {seasonItem?.zip?.length == 0 ? <></> : <div className="w-[45%] sm:w-auto h-auto ">
                    <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">
                      Zip Link 
                    </div>
                    <a className="w-[100%] sm:w-[200px] h-[80px] flex justify-center items-center"
                      href={seasonItem?.zip}
                      target="_blank"
                      rel="noopener noreferrer">
                      <button className="w-[100%] sm:w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                       bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                     hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                       active:scale-95 active:shadow-inner">
                        Download Now
                      </button>
                    </a>
                  </div>}

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
