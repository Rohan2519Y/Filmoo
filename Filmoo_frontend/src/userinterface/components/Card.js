import { useEffect, useState } from "react"
import { getData, serverURL } from "../../backendservices/FetchNodeServices"
import { useNavigate } from "react-router"

export default function Card({ movieList }) {
  const navigate = useNavigate();

  return (
    <>
      {movieList?.map((item) => (
        <div
          key={item.movieid}
          onClick={() => {
            navigate(`/download/${item.movieid}`);
          }}
          className="w-[46%] md:w-[18%] sm:w-[23%] mid:h-[350px] md:h-[33vw] sm:h-[43vw] h-[310px] bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600
            flex justify-center items-center border border-gray-300 rounded-xl shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-110"
        >
          <div className="w-[90%] h-[90%] flex justify-center items-center flex-col">
            <div className="w-full h-[60%] flex justify-center items-center">
              <img
                src={`${serverURL}/images/${item?.image}`}
                className="max-w-full max-h-full"
                alt={item?.title}
              />
            </div>
            <div className="w-full h-[40%] flex justify-center items-center">
              <div
                className="w-full h-auto text-base md:text-lg text-slate-200 font-bold leading-tight"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item?.title}{" "}
                {item?.size480p ? `480P: [${item?.size480p}]` : ""}{" "}
                {item?.size720p ? `720P: [${item?.size720p}]` : ""}{" "}
                {item?.size1080p ? `1080P: [${item?.size1080p}]` : ""}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}