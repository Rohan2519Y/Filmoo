import { useEffect, useState } from "react";
import { getData } from '../../backendservices/FetchNodeServices';
import { useNavigate } from "react-router";
export default function Category() {
    
    const navigate=useNavigate()
    const [categoryList, setCategoryList] = useState([]);

    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_categories");
        setCategoryList(res.data);
    };

    useEffect(function () {
        fetchAllCategory()
    }, [])

    return (<>
        <div className="w-full md:min-h-[80px] flex justify-center items-center">
            <div className=" w-[98%] mid:w-[1280px] h-full flex md:justify-between justify-evenly items-center flex-wrap">
                {categoryList.map((item) => (
                    <div onClick={() => navigate(`/searchpage/${item.categoryname}`, { state: { type: "category" } })} className="h-[50px] md:w-[20%] w-[40%] my-3 md:my-0 
                        bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 
                        flex justify-center items-center shadow-3xl
                      text-slate-200 font-medium text-lg 
                      hover:text-slate-100 hover:font-semibold 
                        transition-all duration-300 transform hover:scale-110
                        hover:bg-gradient-to-r hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 
                        cursor-pointer rounded-lg select-none">
                        {item.categoryname}
                    </div>
                ))}
            </div>
        </div>
    </>)
}