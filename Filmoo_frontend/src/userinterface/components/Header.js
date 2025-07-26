import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function Header() {

    const [menu, setMenu] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setMenu(false)
            setIsClosing(false)
        }, 300)
    }

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
        `}</style>
        <div className="bg-gray-500 border-b border-[#333333] shadow-xl  md:h-[100px] h-[80px] w-full flex">
            <div className="h-full md:w-[30%] w-[40%] flex justify-center items-center mr-auto">
                <img src="https://res.cloudinary.com/dio6iadsq/image/upload/v1753368344/logo_ho4bun.png" className="max-w-[90%] max-h-[80%] cursor-pointer"></img>
            </div>
            <div className=" w-[70%] md:flex hidden justify-evenly items-center" >
                <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[10%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-300" >Home</div>
                <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[10%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-300" >Featured</div>
                <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[10%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-300" >Category</div>
                <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[10%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-300" >Genre</div>
                <div style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)' }} className="text-white w-[10%] justify-center items-center flex text-lg cursor-pointer hover:font-medium hover:text-red-300" >Language</div>
            </div>
            <div className="md:hidden h-full flex items-center justify-center mr-5 ">
                <MenuIcon style={{ fontSize: '200%' }} className='text-slate-800 cursor-pointer' onClick={() => { setMenu(true) }} />
            </div>
            {menu &&
                <div className={`bg-black opacity-[60%] fixed z-10 h-full w-full flex justify-center ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
                    <CloseIcon onClick={handleClose} style={{ fontSize: '200%' }} className='text-white absolute right-5 top-4 cursor-pointer' />
                    <div className='h-auto w-full flex justify-center items-center flex-col top-[60px] absolute'>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Home</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Featured</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Category</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Genre</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                        <div className='w-full h-[70px] flex justify-center items-center text-white text-2xl opacity-[100%] cursor-pointer '>Language</div>
                        <hr className='bg-white opacity-[100%] w-[90%]'></hr>
                    </div>
                </div>}
        </div>
    </>)
}