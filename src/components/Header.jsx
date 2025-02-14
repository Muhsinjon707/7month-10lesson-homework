import React from 'react'

function Header() {
    return (
        <header className='w-[1280px] flex py-4 justify-between'>
            <div className='text-[#87CEEB] font-bold text-xl uppercase'>
                Cryptofolio
            </div>
            <div className="flex justify-between items-center gap-4">
                <select className='w-[65px] h-10 rounded-xl'>
                    <option>USB</option>
                    <option>RUB</option>
                    <option>EUR</option>
                </select>
                <button className='
                        button text-black bg-[#87CEEB] py-2 px-5 text-center rounded text-sm font-[500] 
                        uppercase
                    '>
                    Watch List
                </button>
            </div>
        </header>
    )
}

export default Header