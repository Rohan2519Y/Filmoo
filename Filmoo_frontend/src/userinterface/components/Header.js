import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { getData } from '../../backendservices/FetchNodeServices';
export default function Header() {
    const [menu, setMenu] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [closing, setClosing] = useState(false);
    const [activeMenu, setActiveMenu] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [languageList, setLanguageList] = useState([]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setMenu(false);
            setIsClosing(false);
        }, 300);
    };

    const handleMenuClose = () => {
        setMenu(true)
        setClosing(true);
        setTimeout(() => {
            setActiveMenu('');
            setClosing(false);
        }, 300);
    };

    const handleMenu = (m) => {
        handleClose()
        if (activeMenu === m) {
            handleMenuClose();
        } else {
            setActiveMenu(m);
            setMenu(true);
        }
    };

    const fetchAllCategory = async () => {
        var res = await getData("category/fetch_categories");
        setCategoryList(res.data);
    };

    const fetchAllGenres = async () => {
        var res = await getData("category/fetch_genres");
        setGenreList(res.data);
    };

    const fetchAllLanguages = async () => {
        var res = await getData("category/fetch_languages");
        setLanguageList(res.data);
    };

    useEffect(function () {
        fetchAllCategory();
        fetchAllGenres();
        fetchAllLanguages();
    }, []);

    return (
        <>
            <style jsx>{`
                @keyframes slideInFromRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slideInFromRight 0.3s ease-out forwards;
                }

                @keyframes slideOutFromRight {
                    from { transform: translateX(0); }
                    to { transform: translateX(100%); }
                }
                .animate-slide-out-right {
                    animation: slideOutFromRight 0.3s ease-out forwards;
                }
                    
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10%); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slidedown {
                    animation: slideDown 0.3s ease-out forwards;
                }
            `}</style>

            <div className="bg-gray-500 border-b border-[#333333] shadow-xl md:h-[100px] h-[80px] w-full flex relative">
                <div className="h-full md:w-[30%] w-[40%] flex justify-center items-center mr-auto">
                    <img src="https://res.cloudinary.com/dio6iadsq/image/upload/v1753368344/logo_ho4bun.png" className="max-w-[90%] max-h-[80%] cursor-pointer" />
                </div>
                <div className="w-[70%] md:flex hidden justify-evenly items-center pr-5">
                    <div className="text-white w-[15%] flex justify-center items-center text-lg cursor-pointer hover:text-red-500 hover:font-medium">Home</div>
                    <div
                        onMouseEnter={() => setActiveMenu('category')}
                        onMouseLeave={() => setActiveMenu('')}
                        className={`text-white w-[15%] h-[30%] flex justify-center items-center text-lg cursor-pointer ${activeMenu === 'category' ? 'hover:text-red-500 hover:font-medium' : ''} `}
                    >
                        Category
                    </div>
                    <div
                        onMouseEnter={() => setActiveMenu('genre')}
                        onMouseLeave={() => setActiveMenu('')}
                        className={`text-white w-[15%] h-[30%] flex justify-center items-center text-lg cursor-pointer ${activeMenu === 'genre' ? 'hover:text-red-500 hover:font-medium' : ''} `}
                    >
                        Genre
                    </div>
                    <div
                        onMouseEnter={() => setActiveMenu('language')}
                        onMouseLeave={() => setActiveMenu('')}
                        className={`text-white w-[15%] h-[30%] flex justify-center items-center text-lg cursor-pointer ${activeMenu === 'language' ? 'hover:text-red-500 hover:font-medium' : ''} `}
                    >
                        Language
                    </div>
                </div>

                <div className="md:hidden h-full flex items-center justify-center mr-5">
                    <MenuIcon style={{ fontSize: '200%' }} className="text-slate-800 cursor-pointer" onClick={() => setMenu(true)} />
                </div>

                {menu &&
                    <div className={`bg-black opacity-[60%] md:hidden fixed z-40 h-full w-[70%] right-0 flex justify-center ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
                        <CloseIcon onClick={handleClose} style={{ fontSize: '200%' }} className='text-white absolute right-5 top-4 cursor-pointer' />
                        <div className='h-auto w-full flex justify-center items-center flex-col top-[60px] absolute overflow-y-auto'>
                            <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                            <div className='w-full h-[60px] flex justify-center items-center text-white text-lg opacity-[100%] cursor-pointer '>Home</div>
                            <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                            <div onClick={() => handleMenu('category')} className='w-full h-[60px] flex justify-center items-center text-white text-lg opacity-[100%] cursor-pointer '>Category</div>
                            <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                            <div onClick={() => handleMenu('genre')} className='w-full h-[60px] flex justify-center items-center text-white text-lg opacity-[100%] cursor-pointer '>Genre</div>
                            <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                            <div onClick={() => handleMenu('language')} className='w-full h-[60px] flex justify-center items-center text-white text-lg opacity-[100%] cursor-pointer '>Language</div>
                            <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        </div>
                    </div>}

                {activeMenu === 'category' && (<>
                    <div className="w-[300px] bg-gradient-to-r from-blue-700 to-cyan-700 fixed top-[8%] right-[34.5%] md:flex hidden flex-wrap shadow-2xl rounded-md animate-slidedown"
                        onMouseEnter={() => setActiveMenu('category')}
                        onMouseLeave={() => setActiveMenu('')}>
                        {categoryList.map((item, index) => (
                            <div key={index} className="w-[50%] my-[20px] text-slate-300 flex justify-center items-center font-medium text-lg cursor-pointer hover:text-slate-200 hover:font-semibold">
                                {item.categoryname}
                            </div>
                        ))}
                    </div>
                    <div className={`bg-black opacity-[80%] md:hidden fixed z-40 h-full w-full flex justify-center ${closing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
                        <CloseIcon onClick={handleMenuClose} style={{ fontSize: '200%' }} className='text-white absolute right-5 top-4 cursor-pointer' />
                        <div className='absolute top-[60px] w-full h-[calc(100vh-60px)] flex justify-center'>
                            <div className='w-full max-h-full overflow-y-auto'>
                                <div className='flex flex-col items-center'>
                                    <hr className='bg-white w-[90%]' />
                                    {categoryList.map((item, index=0) => (
                                        <React.Fragment key={index++}>
                                            <div className='w-full h-[60px] flex justify-center items-center text-white text-lg cursor-pointer'>
                                                {item.categoryname}
                                            </div>
                                            <hr className='bg-white w-[90%]' />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}

                {activeMenu === 'genre' && (<>
                    <div className="w-[300px] bg-gradient-to-r from-blue-700 to-cyan-700 fixed top-[8%] right-[18.5%] md:flex hidden flex-wrap shadow-2xl rounded-md animate-slidedown"
                        onMouseEnter={() => setActiveMenu('genre')}
                        onMouseLeave={() => setActiveMenu('')}>
                        {genreList.map((item, index) => (
                            <div key={index} className="w-[50%] my-[20px] text-slate-300 flex justify-center items-center font-medium text-lg cursor-pointer hover:text-slate-200 hover:font-semibold">
                                {item.genre}
                            </div>
                        ))}
                    </div>
                    <div className={`bg-black opacity-[80%] md:hidden fixed z-40 h-full w-full flex justify-center ${closing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
                        <CloseIcon onClick={handleMenuClose} style={{ fontSize: '200%' }} className='text-white absolute right-5 top-4 cursor-pointer' />
                        <div className='absolute top-[60px] w-full h-[calc(100vh-60px)] flex justify-center'>
                            <div className='w-full max-h-full overflow-y-auto'>
                                <div className='flex flex-col items-center'>
                                    <hr className='bg-white w-[90%]' />
                                    {genreList.map((item, index=0) => (
                                        <React.Fragment key={index++}>
                                            <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl cursor-pointer'>
                                                {item.genre}
                                            </div>
                                            <hr className='bg-white w-[90%]' />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}

                {activeMenu === 'language' && (<>
                    <div className="w-[300px] bg-gradient-to-r from-blue-700 to-cyan-700 fixed top-[8%] right-[3.4%] md:flex hidden flex-wrap shadow-2xl rounded-md animate-slidedown"
                        onMouseEnter={() => setActiveMenu('language')}
                        onMouseLeave={() => setActiveMenu('')}>
                        {languageList.map((item, index) => (
                            <div key={index} className="w-[50%] my-[20px] text-slate-300 flex justify-center items-center font-medium text-lg cursor-pointer hover:text-slate-200 hover:font-semibold">
                                {item.language}
                            </div>
                        ))}
                    </div>
                    <div className={`bg-black opacity-[80%] md:hidden fixed z-40 h-full w-full flex justify-center ${closing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
                        <CloseIcon onClick={handleMenuClose} style={{ fontSize: '200%' }} className='text-white absolute right-5 top-4 cursor-pointer' />
                        <div className='absolute top-[60px] w-full h-[calc(100vh-60px)] flex justify-center'>
                            <div className='w-full max-h-full overflow-y-auto'>
                                <div className='flex flex-col items-center'>
                                    <hr className='bg-white w-[90%]' />
                                    {languageList.map((item, index=0) => (
                                        <React.Fragment key={index++}>
                                            <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl cursor-pointer'>
                                                {item.language}
                                            </div>
                                            <hr className='bg-white w-[90%]' />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}
            </div>
        </>
    );
}