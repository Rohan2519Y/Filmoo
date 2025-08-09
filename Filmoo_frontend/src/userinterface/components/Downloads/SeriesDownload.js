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
                  {episodes.map((episode, i) => (<>
                    <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Episode : {i + 1} {`{${movieList.language}}`} </div>
                    <div className="w-full flex items-center justify-center gap-10">
                      {episode?.link480P?.length > 0 ? <>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={episode.link480P}>
                          <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                      </> : <></>}
                      {episode?.link720P?.length > 0 ? <>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={episode.link720P}>
                          <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                      </> : <></>}
                      {episode?.link1080P?.length > 0 ? <>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={episode.link1080P}>
                          <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                      </> : <></>}
                      {episode?.link4k?.length > 0 ? <>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={episode.link4k}>
                          <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                      </> : <></>}
                    </div>
                  </>))}
                </div>
              );
            })}
      </div>
    </div>
  );
}
