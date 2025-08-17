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
  ] 
  [
    {
      "seasonNumber": 1, "numberOfEpisodes": 9, "episodesLinks":
        [
          { "link480P": "https://vcloud.lol/iyb0zsyyo14hhh4", "size480P": "181 MB", "link720P": "https://vcloud.lol/l_gq9-ty9xxqx_2", "size720P": "635 MB" },
          { "link480P": "https://vcloud.lol/mu8fnsmdfivj03u", "size480P": "189 MB", "link720P": "https://vcloud.lol/yh3bqxslymllsau", "size720P": "665 MB" },
          { "link480P": "https://vcloud.lol/k31k8ivipwosz8a", "size480P": "167 MB", "link720P": "https://vcloud.lol/clmfd2ac-ga_tel", "size720P": "574 MB" },
          { "link480P": "https://vcloud.lol/i9riuiyniiku0-n", "size480P": "166 MB", "link720P": "https://vcloud.lol/w9vi9fha9wivwg1", "size720P": "583 MB" },
          { "link480P": "https://vcloud.lol/spmsmhsel33oj3j", "size480P": "156 MB", "link720P": "https://vcloud.lol/v-vcvebfvfnjhzq", "size720P": "548 MB" },
          { "link480P": "https://vcloud.lol/wx3rvqneqoeouon", "size480P": "187 MB", "link720P": "https://vcloud.lol/mo31devvgoedzsv", "size720P": "655 MB" },
          { "link480P": "https://vcloud.lol/37p6bssaf96lbgj", "size480P": "176 MB", "link720P": "https://vcloud.lol/ojatmjou3gucxco", "size720P": "616 MB" },
          { "link480P": "https://vcloud.lol/j621oro4oqoqbq6", "size480P": "97 MB", "link720P": "https://vcloud.lol/faa11fymi1gfgq1", "size720P": "342 MB" },
          { "link480P": "https://vcloud.lol/k7vseotkk9esfvg", "size480P": "168 MB", "link720P": "https://vcloud.lol/crwehcbwcpwyrac", "size720P": "589 MB" }
        ],
      "zipLinks": { "480P": "https://vcloud.lol/-1dlalbusuzsrub", "720P": "https://vcloud.lol/mplalm7616sapif", "1080P": "", "4K": "" }
    }]'

    {
    "categoryid": 4,
    "categoryname": "K-Drama",
    "movieid": 31,
    "name": "Squid Game",
    "language": "English, Hindi",
    "year": "2021",
    "image": "b8332971-76c9-402e-b31a-e231cbd595c0.jpeg",
    "screenshot": "1dd8d0d9-3306-4470-a3ed-6208de4bc44d.jpg,e9c2812d-3b18-49d4-87d5-ae2e856d2efb.jpg,cfb981a2-78e7-4c0f-acca-84913aff0c9a.jpg,e5fc6f2a-17f3-4d6e-b865-d57a8706b280.jpg",
    "genre": "Action, Adventure, Drama, Mystery, Thriller",
    "description": "“Squid Game” is a South Korean survival drama series that follows a group of financially struggling individuals who are invited to participate in a mysterious competition of childhood games, with the promise of winning a massive cash prize. However, the games come with a deadly twist—losing means death—forcing contestants to risk their lives for money while exposing the extremes of human desperation, greed, and morality. Through its gripping storyline, striking visuals, and social commentary on inequality, the series delivers both intense suspense and a chilling reflection of modern society.",
    "quality": "720P",
    "link480p": null,
    "link720p": null,
    "link1080p": null,
    "link4k": null,
    "size480p": null,
    "size720p": null,
    "size1080p": null,
    "size4k": null,
    "title": "Download Squid Game (Season 1) Complete Dual-Audio {Hindi-English} Netflix Series 480p I 720p 1 1080p WEB-DL",
    "zip": "https://vcloud.lol/mplalm7616sapif",
    "eplinks": "[{\"seasonNumber\":1,\"numberOfEpisodes\":9,\"zipLinks\":{\"480P\":\"https://vcloud.lol/-1dlalbusuzsrub\",\"720P\":\"https://vcloud.lol/mplalm7616sapif\",\"1080P\":\"\",\"4K\":\"\"},\"episodesLinks\":[{\"link480P\":\"https://vcloud.lol/iyb0zsyyo14hhh4\",\"size480P\":\"181 MB\",\"link720P\":\"https://vcloud.lol/l_gq9-ty9xxqx_2\",\"size720P\":\"635 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/mu8fnsmdfivj03u\",\"size480P\":\"189 MB\",\"link720P\":\"https://vcloud.lol/yh3bqxslymllsau\",\"size720P\":\"665 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/k31k8ivipwosz8a\",\"size480P\":\"167 MB\",\"link720P\":\"https://vcloud.lol/clmfd2ac-ga_tel\",\"size720P\":\"574 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/i9riuiyniiku0-n\",\"size480P\":\"166 MB\",\"link720P\":\"https://vcloud.lol/w9vi9fha9wivwg1\",\"size720P\":\"583 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/spmsmhsel33oj3j\",\"size480P\":\"156 MB\",\"link720P\":\"https://vcloud.lol/v-vcvebfvfnjhzq\",\"size720P\":\"548 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/wx3rvqneqoeouon\",\"size480P\":\"187 MB\",\"link720P\":\"https://vcloud.lol/mo31devvgoedzsv\",\"size720P\":\"655 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/37p6bssaf96lbgj\",\"size480P\":\"176 MB\",\"link720P\":\"https://vcloud.lol/ojatmjou3gucxco\",\"size720P\":\"616 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/j621oro4oqoqbq6\",\"size480P\":\"97 MB\",\"link720P\":\"https://vcloud.lol/faa11fymi1gfgq1\",\"size720P\":\"342 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/k7vseotkk9esfvg\",\"size480P\":\"168 MB\",\"link720P\":\"https://vcloud.lol/crwehcbwcpwyrac\",\"size720P\":\"589 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"}]}]",
    "numberep": "9",
    "content": "series",
    "numberOfSeasons": 1,
    "seasonsData": [
        {
            "seasonNumber": 1,
            "numberOfEpisodes": 9,
            "zipLinks": {
                "480P": "https://vcloud.lol/-1dlalbusuzsrub",
                "720P": "https://vcloud.lol/mplalm7616sapif",
                "1080P": "",
                "4K": ""
            },
            "episodesLinks": [
                {
                    "link480P": "https://vcloud.lol/iyb0zsyyo14hhh4",
                    "size480P": "181 MB",
                    "link720P": "https://vcloud.lol/l_gq9-ty9xxqx_2",
                    "size720P": "635 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                },
                {
                    "link480P": "https://vcloud.lol/mu8fnsmdfivj03u",
                    "size480P": "189 MB",
                    "link720P": "https://vcloud.lol/yh3bqxslymllsau",
                    "size720P": "665 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                },
                {
                    "link480P": "https://vcloud.lol/k31k8ivipwosz8a",
                    "size480P": "167 MB",
                    "link720P": "https://vcloud.lol/clmfd2ac-ga_tel",
                    "size720P": "574 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                },
                {
                    "link480P": "https://vcloud.lol/i9riuiyniiku0-n",
                    "size480P": "166 MB",
                    "link720P": "https://vcloud.lol/w9vi9fha9wivwg1",
                    "size720P": "583 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                },
                {
                    "link480P": "https://vcloud.lol/spmsmhsel33oj3j",
                    "size480P": "156 MB",
                    "link720P": "https://vcloud.lol/v-vcvebfvfnjhzq",
                    "size720P": "548 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                },
                {
                    "link480P": "https://vcloud.lol/wx3rvqneqoeouon",
                    "size480P": "187 MB",
                    "link720P": "https://vcloud.lol/mo31devvgoedzsv",
                    "size720P": "655 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                },
                {
                    "link480P": "https://vcloud.lol/37p6bssaf96lbgj",
                    "size480P": "176 MB",
                    "link720P": "https://vcloud.lol/ojatmjou3gucxco",
                    "size720P": "616 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                },
                {
                    "link480P": "https://vcloud.lol/j621oro4oqoqbq6",
                    "size480P": "97 MB",
                    "link720P": "https://vcloud.lol/faa11fymi1gfgq1",
                    "size720P": "342 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                },
                {
                    "link480P": "https://vcloud.lol/k7vseotkk9esfvg",
                    "size480P": "168 MB",
                    "link720P": "https://vcloud.lol/crwehcbwcpwyrac",
                    "size720P": "589 MB",
                    "link1080P": "",
                    "size1080P": "",
                    "link4k": "",
                    "size4k": ""
                }
            ]
        }
    ]
}
*/

  console.log(movieList.seasonsData[0].zipLinks["480P"])
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
                      <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">480P - Size: {}</div>
                      <a className="w-[100%] sm:w-[200px] h-[80px] flex justify-center items-center" href={movieList.seasonsData[0].zipLinks["480P"]} target="_blank" rel="noopener noreferrer">
                        <button className="w-[100%] sm:w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </div> : <></>}
                    {movieList.seasonsData[0].zipLinks["720P"].length > 0 ? <div className="w-[45%] sm:w-auto h-auto">
                      <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">720P - Size: {}</div>
                      <a className="w-[100%] sm:w-[200px] h-[80px] flex justify-center items-center" href={movieList.seasonsData[0].zipLinks["720P"]} target="_blank" rel="noopener noreferrer">
                        <button className="w-[100%] sm:w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </div> : <></>}
                    {movieList.seasonsData[0].zipLinks["1080P"].length > 0 ? <div className="w-auto h-auto">
                      <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">1080P - Size: {}</div>
                      <a className="w-[200px] h-[80px] flex justify-center items-center" href={movieList.seasonsData[0].zipLinks["1080P"]} target="_blank" rel="noopener noreferrer">
                        <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </div> : <></>}
                    {movieList.seasonsData[0].zipLinks["4K"].length > 0 ? <div className="w-auto h-auto">
                      <div className="h-[30px] w-auto flex justify-center items-center font-semibold text-base">4K - Size: {}</div>
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
