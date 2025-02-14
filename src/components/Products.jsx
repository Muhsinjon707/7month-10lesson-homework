import React, { useEffect, useState } from 'react'

import Pagination from '@mui/material/Pagination';


import eye from "../assets/img/Eye.svg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Products() {
    const [cryptos, setCryptos] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`)
            .then(response => {
                if (response.status == 200) {
                    // console.log(response.data);
                    setCryptos(response.data)
                }
            })
            .catch(error => console.log(error))
    }, [page])

    const handlePage = (event, position) => {
        setPage(position);
    };

    const navigate = useNavigate();
    const redirectDetails = (id) => {
        navigate(`/${id}`)
    }

    return (
        <div className='container my-4 mx-auto flex flex-col items-center justify-center'>
            <h2 className='text-white font-normal text-4xl text-center'>Cryptocurrency Prices by Market Cap</h2>
            <input
                type="search"
                className='
                    font-normal my-4 h-14 text-lg text-start white opacity-[.7] w-full
                    border border-gray-300 py-6 px-4 rounded-sm
                '
                placeholder='Search For a Crypto Currency..'
            />
            <table className='table w-full rounded-sm text-start text-white'>
                <thead className='w-full bg-[#87CEEB]'>
                    <tr className='text-end'>
                        <th className='py-5 px-4 w-[390px] text-start'>Coin</th>
                        <th className='py-5 px-4'>Price</th>
                        <th className='py-5 px-4'>24th Change</th>
                        <th className='py-5 px-4'>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cryptos.length > 0 && cryptos.map((item, index) => {
                            return (
                                <tr onClick={() => redirectDetails(item.id)} key={index} className='cursor-pointer gtext-end w-full border-b'>
                                    <td className='flex pl-2 py-4 justify-start items-center gap-3'>
                                        <img width={50} src={item.image} alt="" />
                                        <div className='flex py-4 flex-col items-start justify-center gap-2'>
                                            <h4 className='uppercase'>{item.symbol}</h4>
                                            <p className='text-sm text-gray-400'>{item.name}</p>
                                        </div>
                                    </td>
                                    <td className='py-4'>₹ {item.current_price}</td>
                                    <td className='py-4 pr-5'>
                                        <div className='flex justify-end gap-3'>
                                            <img width={26} src={eye} alt="" /> +{item.price_change_percentage_24h.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className='pr-2'>₹ {item.market_cap}M</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <div className='w-full my-5 text-[#87CEEB] flex justify-center'>
                <Pagination
                    count={10}
                    page={page}
                    onChange={handlePage}
                    sx={{
                        "& .MuiPaginationItem-root": { color: "#87CEEB" }
                    }}
                />
            </div>
        </div>
    )
}

export default Products