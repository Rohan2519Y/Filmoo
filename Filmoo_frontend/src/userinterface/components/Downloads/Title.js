export default function Title({ title }) {
    console.log('title',title)
    return (<>
        <div className="w-full min-h-[100px] flex justify-center items-center flex-col">
            <hr className="w-[98%] mid:w-[1280px] my-3 border-slate-600"></hr>
            <div className=" w-[98%] mid:w-[1280px] min-h-[100px] flex text-2xl font-bold">
                {title?.title} {title?.size480p ? `480P: [${title?.size480p}]` : ''} {title?.size720p ? `720P: [${title?.size720p}]` : ''} {title?.size1080p ? `1080P: [${title?.size1080p}]` : ''}
            </div>
        </div>
    </>)
}