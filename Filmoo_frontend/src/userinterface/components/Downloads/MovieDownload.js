import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function MovieDownload({ download }) {



  // const data=download.eplinks

  // const seasonNumber = data.map((item, i) => {
  //     const episode = item.episodesLinks.map((ep) => {
  //         return console.log(ep.link480P, '480p')
  //     })
  // })

  const navigate = useNavigate()

  return (<>
    <div className="w-full min-h-[100px] flex justify-center items-center flex-col">
      <div className=" w-[98%] mid:w-[1280px] min-h-[150px] flex justify-center items-center flex-col">
        <div className="w-full h-[60px] flex justify-center items-center text-xl md:text-3xl font-bold text-cyan-500">Downloads</div>
        {download?.content == 'movie' ? <>
          {download?.link480p!='null' && download?.link480p?.length > 0 ? <>
            <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Quality : 480P {`{${download.language}}`} Size : {download.size480p}</div>
            <a className="w-[200px] h-[80px] flex justify-center items-center" href={download.link480p} target="_blank" rel="noopener noreferrer">
              <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
          </> : <></>}
          {download?.link720p!='null' && download?.link720p?.length > 0 ? <>
            <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Quality : 720P {`{${download.language}}`} Size : {download.size720p}</div>
            <a className="w-[200px] h-[80px] flex justify-center items-center" href={download.link720p} target="_blank" rel="noopener noreferrer">
              <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
          </> : <></>}
          {download?.link1080p!='null' && download?.link1080p?.length > 0 ? <>
            <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Quality : 1080P {`{${download.language}}`} Size : {download.size1080p}</div>
            <a className="w-[200px] h-[80px] flex justify-center items-center" href={download.link1080p} target="_blank" rel="noopener noreferrer">
              <button className="w-[200px] h-[60%] text-white font-semibold rounded-lg shadow-md transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-blue-700 to-indigo-800 
                            hover:from-indigo-900 hover:via-blue-900 hover:to-indigo-900 
                              active:scale-95 active:shadow-inner">Download Now</button></a>
          </> : <></>}
          { download?.link4k!='null' && download?.link4k?.length > 0? <>
            <div className="w-full h-[50px] flex justify-center items-center text-xl font-semibold flex-col">Quality : 4k {`{${download.language}}`} Size : {download.size4k}</div>
            <a className="w-[200px] h-[80px] flex justify-center items-center" href={download.link4k} target="_blank" rel="noopener noreferrer">
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
                              active:scale-95 active:shadow-inner" onClick={() => navigate(`/series/${download.movieid}/${season.seasonNumber}`)}>Download Season {season.seasonNumber}</button>
              </div>
            ))}
          </div>
        </>}
      </div>
    </div>
  </>)
}