import { Button } from "@mui/material";

export default function MovieDownload({ download }) {

    // var data = [
    //     {
    //         "seasonNumber": 1, "numberOfEpisodes": 1, "zip": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "episodesLinks":
    //             [
    //                 {
    //                     "link480P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size480P": "200MB",
    //                     "link720P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size720P": "400MB",
    //                     "link1080P": "", "size1080P": "",
    //                     "link4k": "", "size4k": ""
    //                 }
    //             ]
    //     },
    //     {
    //         "seasonNumber": 2, "numberOfEpisodes": 2, "zip": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "episodesLinks":
    //             [
    //                 {
    //                     "link480P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size480P": "200MB",
    //                     "link720P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size720P": "400MB",
    //                     "link1080P": "", "size1080P": "", "link4k": "", "size4k": ""
    //                 },
    //                 {
    //                     "link480P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size480P": "200MB",
    //                     "link720P": "https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J", "size720P": "400MB",
    //                     "link1080P": "", "size1080P": "",
    //                     "link4k": "", "size4k": ""
    //                 }
    //             ]
    //     }
    // ]

    // const data=download.eplinks

    // const seasonNumber = data.map((item, i) => {
    //     const episode = item.episodesLinks.map((ep) => {
    //         return console.log(ep.link480P, '480p')
    //     })
    // })
    console.log('doenload', download.eplinks)
    console.log('movie', download)

    return (<>
        <div className="w-full min-h-[100px] flex justify-center items-center flex-col">
            <div className=" w-[98%] mid:w-[1280px] min-h-[150px] flex justify-center items-center flex-col">
                <div className="w-full h-[60px] flex justify-center items-center text-3xl font-bold text-cyan-500">Downloads</div>
                {download?.content == 'movie' ? <>
                    {download?.link480p?.length > 0 ? <>
                        <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Quality : 480P {`{${download.language}}`} Size : {download.size480p}</div>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={download.link480p}>
                            <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </> : <></>}
                    {download?.link720p?.length > 0 ? <>
                        <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Quality : 720P {`{${download.language}}`} Size : {download.size720p}</div>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={download.link720p}>
                            <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </> : <></>}
                    {download?.link1080p?.length > 0 ? <>
                        <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Quality : 1080P {`{${download.language}}`} Size : {download.size1080p}</div>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={download.link1080p}>
                            <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </> : <></>}
                    {download?.link4k?.length > 0 ? <>
                        <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Quality : 4k {`{${download.language}}`} Size : {download.size4k}</div>
                        <a className="w-[200px] h-[80px] flex justify-center items-center" href={download.link4k}>
                            <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
                    </> : <></>}
                </> : <>
                    <div className="w-full flex justify-center items-center flex-col">
                        {JSON.parse(download.eplinks).map((season) => (
                          <div className='w-full h-[80px] flex justify-center items-center'>
                            
                            <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Season {season.seasonNumber}</button>
                              </div>
                        ))}
                    </div>
                </>}
            </div>
        </div>
    </>)
}