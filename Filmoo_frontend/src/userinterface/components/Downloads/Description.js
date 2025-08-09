export default function Description({description}) {
    return (<>
        <div className="w-full min-h-[100px] flex justify-center items-center flex-col">
            <div className=" w-[98%] mid:w-[1280px] min-h-[100px] flex justify-center items-center flex-col">
                <div className="w-full h-[60px] flex justify-center items-center text-lg md:text-3xl font-bold text-cyan-500">About Movie or Description </div>
                <div className="w-full min-h-[100px] flex text-base md:text-xl">{description}</div>
            </div>
        </div>
    </>)
}