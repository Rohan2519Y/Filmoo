import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Footer() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const smatches = useMediaQuery(theme.breakpoints.down('sm'));

    return (<>
        <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-white w-full md:h-[300px] h-[230px] flex flex-col justify-center">
            <div className="h-[20%] w-full flex items-center justify-center text-2xl md:text-5xl font-bold">FILMOO</div>
            <div className="h-[25%] w-full flex items-center justify-center md:gap-x-[5%] gap-x-[10%]">
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon style={{ fontSize: matches ? '250%' : '300%' }} className='hover:text-red-700 cursor-pointer' />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon style={{ fontSize: matches ? '250%' : '300%' }} className='hover:text-pink-500 cursor-pointer' />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <XIcon style={{ fontSize: matches ? '250%' : '300%' }} className='hover:text-slate-900 cursor-pointer' />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon style={{ fontSize: matches ? '250%' : '300%' }} className='hover:text-sky-700 cursor-pointer' />
                </a>
            </div>
            <div className='h-[40%] w-full flex items-center justify-center flex-col'>
                <div className='h-1/2 w-full flex items-center justify-center text-lg font-semibold'>
                    FeedBack
                </div>
                <div className='h-1/2 md:w-[30%] w-[70%] bg-slate-100 justify-center items-center flex rounded-lg border-2 border-black relative'>
                    <input type='text' placeholder='Give Your FeedBack' className='w-[90%] h-[90%] rounded-lg bg-transparent border-slate-100 focus:outline-none focus:border-none text-black text-lg' />
                    <SendIcon className='absolute top-[18%] right-2 text-slate-800 cursor-pointer' />
                </div>
            </div>
            <div className="h-[15%] w-full flex items-center justify-center md:text-lg text-base font-normal">© 2025 Rohan Company. All rights reserved.</div>
        </div>
    </>)
}