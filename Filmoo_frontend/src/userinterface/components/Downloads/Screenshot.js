import { serverURL } from "../../../backendservices/FetchNodeServices"

export default function Screenshot({ screenshot }) {

    const screenshots = screenshot.split(/\s*,\s*/);

    return (<>
        <div className="w-full min-h-[100px] flex justify-center items-center flex-col mt-4">
            <div className=" w-[98%] mid:w-[1280px] min-h-[100px] flex justify-center items-center flex-col">
                <div className="w-full h-[60px] flex justify-center items-center text-lg md:text-3xl font-bold text-cyan-500">Screenshots</div>
                <div className="w-full flex justify-center items-center gap-y-3 gap-x-[4%] flex-wrap">
                    {screenshots.map((item) => (
                        <div className="w-[48%] md:h-[200px] h-[150px] flex items-center justify-center border-[1px] border-slate-800">
                            <img className="max-h-full min-h-full max-w-full " src={`${serverURL}/images/${item}`}></img>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}