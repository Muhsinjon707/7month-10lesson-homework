import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Products from '../components/Products'

function Home() {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=10&sparkline=false&price_change_percentage=24h`)
            .then(response => {
                if (response.status == 200) {
                    // console.log(response.data);
                    setCryptos(response.data)
                }
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='overflow-x-hidden'>
            <div className='container my-14 flex flex-col items-center justify-center'>
                <h1 className='text-[#87CEEB] font-bold text-6xl text-center'>CRYPTOFOLIO WATCH LIST</h1>
                <p className='text-[#A9A9A9] text-sm font-medium text-center mt-1'>Get all the Info regarding your favorite Crypto Currency</p>
                <div className='relative w-full h-[250px]'>
                    <div className='slider'>
                        <ul style={{ '--time': '30s', '--quantity': 10 }}>
                            {
                                cryptos.length > 0 && cryptos.map((item, index) => {
                                    return (
                                        <li key={index} style={{ '--index': index + 1 }}>
                                            <img width={75} src={item.image} alt="" />
                                            <p className='mt-2'>{item.symbol} <span className='text-green-500'>+{item.market_cap_change_percentage_24h.toFixed(2)}%</span></p>
                                            <h4>₹ {item.current_price.toFixed(2)}</h4>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>


                <Products />
            </div>
        </div>
    )
}

export default Home