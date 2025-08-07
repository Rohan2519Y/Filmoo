import { serverURL } from "../../../backendservices/FetchNodeServices";

export default function Poster({image}) {
    return (<>
        <div className="w-full min-h-[100px] flex justify-center items-center flex-col">
            <div className=" w-[98%] mid:w-[1280px] h-[300px] flex justify-center items-center">
                <img className='min-h-[100%] max-h-[100%] max-w-full' src={`${serverURL}/images/${image}`}/>
            </div>
        </div>
    </>)
}