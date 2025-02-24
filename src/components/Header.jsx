import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import close from "../assets/icons/close.svg"
import WatchLists from './WatchLists';
import useWatchList from '../store/useWatchList';

function Header() {
    const [isOpen, setOpen] = useState(false);
    const { watchList, } = useWatchList();

    const location = useLocation();

    return (
        <header className='w-[1280px] flex py-4 justify-between'>
            <div className='text-[#87CEEB] font-bold text-xl uppercase'>
                <Link to="/">Cryptofolio</Link>
            </div>
            <div className="flex justify-between items-center gap-4">
                <select className='w-[65px] h-10 rounded-xl'>
                    <option>USB</option>
                    <option>RUB</option>
                    <option>EUR</option>
                </select>
                <button
                    onClick={() => setOpen(true)}
                    className='
                        button text-black bg-[#87CEEB] py-2 px-5 text-center rounded text-sm font-[500] 
                        uppercase cursor-pointer transition-all duration-300 ease-in-out
                    '>
                    Watch List
                </button>
                <div className={`
                        ${isOpen ? "absolute" : "hidden"} top-0 right-0 max-h-screen h-full bg-[#515151] w-[511px]
                        flex flex-col items-center justify-start pt-5 gap-5 z-10 ${watchList.length > 10 ? "overflow-y-scroll" : ""}
                    `}>
                    <span onClick={() => setOpen(false)} className='fixed top-6 right-6 scale-150 cursor-pointer transition-all duration-300 ease-in-out'>
                        <img src={close} alt="" />
                    </span>
                    <h2 className='font-medium text-3xl text-center uppercase text-white'>watchlist</h2>
                    <div>
                        <WatchLists />
                    </div>
                    <button className='
                        fixed bottom-10 right-10 bg-black py-4 px-6 text-lg rounded-xl 
                        cursor-pointer'
                    >Clear All</button>
                </div>
            </div>
        </header>
    )
}

export default Header