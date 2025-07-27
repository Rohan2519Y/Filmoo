import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { getData } from '../../backendservices/FetchNodeServices';

export default function Header() {

    const [menu, setMenu] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [category, setCategory] = useState(false)
    const [genre, setGenre] = useState(false)
    const [language, setLanguage] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [languageList, setLanguageList] = useState([])

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setMenu(false)
            setIsClosing(false)
        }, 300)
    }

    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_categories")
        setCategoryList(res.data)
    }

    const fetchAllGenres = async () => {
        var res = await getData("category/fetch_genres")
        setGenreList(res.data)
    }

    const fetchAllLanguages = async () => {
        var res = await getData("category/fetch_languages")
        setLanguageList(res.data)
    }

    useEffect(function () {
        fetchAllCategory()
        fetchAllGenres()
        fetchAllLanguages()
    }, [])

    return (<>
        <style jsx>{`
            @keyframes slideInFromRight {
                from {
                    transform: translateX(100%);
                }
                to {
                    transform: translateX(0);
                }
            }
            .animate-slide-in-right {
                animation: slideInFromRight 0.3s ease-out forwards;
            }

            @keyframes slideOutFromRight {
                from {
                    transform: translateX(0);
                }
                to {
                    transform: translateX(100%);
                }
            }
            .animate-slide-out-right {
                animation: slideOutFromRight 0.3s ease-out forwards;
            }

            @keyframes slidedown {
                from {
                    transform: translateY(0);
                }
                to {
                    transform: translateY(100%);
                }
            }
            .animate-slidedown {
                animation: slidedown 0.3s ease-out forwards;
            }

            @keyframes slideup {
                from {
                    transform: translateY(100%);
                }
                to {
                    transform: translateY(0);
                }
            }
            .animate-slideup {
                animation: slideup 0.3s ease-out forwards;
            }
                
        `}</style>
        <div className="bg-gray-500 border-b border-[#333333] shadow-xl  md:h-[100px] h-[80px] w-full flex relative">
            <div className="h-full md:w-[30%] w-[40%] flex justify-center items-center mr-auto">
                <img src="https://res.cloudinary.com/dio6iadsq/image/upload/v1753368344/logo_ho4bun.png" className="max-w-[90%] max-h-[80%] cursor-pointer"></img>
            </div>
            <div className=" w-[70%] md:flex hidden justify-evenly items-center pr-5" >
                <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[15%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-500" >Home</div>
                <div onMouseEnter={() => { setCategory(true) }} onMouseLeave={() => { setCategory(false) }} style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[15%] h-[30%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-500" >Category</div>
                <div onMouseEnter={() => { setGenre(true) }} onMouseLeave={() => { setGenre(false) }} style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[15%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-500" >Genre</div>
                <div onMouseEnter={() => { setLanguage(true) }} onMouseLeave={() => { setLanguage(false) }} style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[15%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-500" >Language</div>
            </div>
            <div className="md:hidden h-full flex items-center justify-center mr-5 ">
                <MenuIcon style={{ fontSize: '200%' }} className='text-slate-800 cursor-pointer' onClick={() => { setMenu(true) }} />
            </div>
            {menu &&
                <div className={`bg-black opacity-[60%] md:hidden fixed z-10 h-full w-full flex justify-center ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
                    <CloseIcon onClick={handleClose} style={{ fontSize: '200%' }} className='text-white absolute right-5 top-4 cursor-pointer' />
                    <div className='h-auto w-full flex justify-center items-center flex-col top-[60px] absolute '>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Home</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Category</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Genre</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Language</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                    </div>
                </div>}

            {category &&
                <div onMouseEnter={() => { setCategory(true) }} onMouseLeave={() => { setCategory(false) }} className='w-[300px] bg-gradient-to-r from-blue-700 to-cyan-700 fixed top-[8%] right-[34.5%] md:flex hidden flex-wrap shadow-2xl rounded-md'>
                    {categoryList.map((item) => (
                        <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className='w-[50%] my-[20px] text-slate-300 flex justify-center items-center font-medium text-lg cursor-pointer hover:text-slate-200 hover:font-semibold'>
                            {item.categoryname}
                        </div>
                    ))}
                </div>
            }
            {genre &&
                <div onMouseEnter={() => { setGenre(true) }} onMouseLeave={() => { setGenre(false) }} className='w-[300px] bg-gradient-to-r from-blue-700 to-cyan-700 fixed top-[8%] right-[18.5%] md:flex hidden flex-wrap shadow-2xl rounded-md'>
                    {genreList.map((item) => (
                        <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className='w-[50%] my-[20px] text-slate-300 flex justify-center items-center font-medium text-lg cursor-pointer hover:text-slate-200 hover:font-semibold'>
                            {item.genre}
                        </div>
                    ))}
                </div>
            }
            {language &&
                <div onMouseEnter={() => { setLanguage(true) }} onMouseLeave={() => { setLanguage(false) }} className='w-[300px] bg-gradient-to-r from-blue-700 to-cyan-700 fixed top-[8%] right-[3.4%] md:flex hidden flex-wrap shadow-2xl rounded-md'>
                    {languageList.map((item) => (
                        <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className='w-[50%] my-[20px] text-slate-300 flex justify-center items-center font-medium text-lg cursor-pointer hover:text-slate-200 hover:font-semibold'>
                            {item.language}
                        </div>
                    ))}
                </div>
            }
        </div>
    </>)
}