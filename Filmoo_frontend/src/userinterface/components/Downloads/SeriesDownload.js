export default function SeriesDownload({ movieList, season }) {
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
                <div key={seasonIndex}>
                  {episodes.map((episode, episodeIndex) => (
                    <div key={episodeIndex} className="text-white ml-4">
                      {episode.size480P}
                      <br />
                      {episode.link480P}
                    </div>
                  ))}
                </div>
              );
            })}
      </div>
    </div>
  );
}
