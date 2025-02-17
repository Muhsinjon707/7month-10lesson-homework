import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import eye from "../assets/img/Eye.svg"
import greenEye from "../assets/img/green-eye.svg"

import useWatchList from '../store/useWatchList';
import debounce from 'lodash.debounce';

function Products() {
    const { watchList, addItem } = useWatchList();

    const [cryptos, setCryptos] = useState([]);
    const [filteredCryptos, setFilteredCryptos] = useState([])

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`)
            .then(response => {
                if (response.status == 200) {
                    console.log("Data: ", response.data);
                    setCryptos(response.data);
                    setFilteredCryptos(response.data);
                    setTotalPages(Math.ceil(response.data.length / 10));
                }
            })
            .catch(error => console.log(error))
    }, [page])

    const handleSearch = debounce(value => {
        setSearch(value);
    }, 500)

    useEffect(() => {
        if (!search) setFilteredCryptos(cryptos);

        setFilteredCryptos(
            cryptos.filter(item => {
                return (
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.symbol.toLowerCase().includes(search.toLowerCase())
                )
            })
        )
    }, [search, cryptos])

    const handlePage = (event, position) => {
        setPage(position);
    };

    const navigate = useNavigate();
    const redirectDetails = (item) => {
        navigate(`/${item.id}`)

        addItem(item);
    }

    return (
        <div className='container my-4 mx-auto px-4 flex flex-col items-center justify-center'>
            <h2 className='text-white font-normal text-4xl text-center'>Cryptocurrency Prices by Market Cap</h2>
            <input
                type="search"
                className='
                    font-normal my-4 h-14 text-lg text-start opacity-[.7] w-full
                    border border-gray-300 py-6 px-4 rounded-sm mx-2
                '
                // value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='Search For a Crypto Currency..'
            />
            <table className='table w-full text-start text-white'>
                <thead className='w-full bg-[#87CEEB]'>
                    <tr className='text-end text-black font-bold text-[16px] tracking-[0.15px]'>
                        <th className='py-5 pl-4 w-[390px] text-start'>Coin</th>
                        <th className='py-5 px-1'>Price</th>
                        <th className='py-5 px-1'>24h Change</th>
                        <th className='py-5 px-4'>Market Cap</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {
                        filteredCryptos.length > 0 ? (filteredCryptos.map((item, index) => {
                            return (
                                <tr onClick={() => redirectDetails(item)} key={index}
                                    className='cursor-pointer text-end w-full border-b text-sm font-normal'>
                                    <td className='pl-4 py-4 flex items-center justify-start gap-5'>
                                        <div>
                                            <img width={50} src={item.image} alt="" />
                                        </div>
                                        <div className='flex py-4 flex-col items-start justify-center gap-2'>
                                            <h4 className='uppercase'>{item.symbol}</h4>
                                            <p className='text-sm text-gray-400'>{item.name}</p>
                                        </div>
                                    </td>
                                    <td>₹ {item.current_price}</td>
                                    <td className='pr-2'>
                                        <div className='flex justify-end gap-3'>
                                            <div className=' w-[90px] flex justify-between'>
                                                <img width={26} src={`${watchList.includes(item) ? greenEye : eye}`} alt="" />
                                                {
                                                    item.price_change_percentage_24h.toFixed(2) > 0 ?
                                                        <p className='text-green-500'>+{item.price_change_percentage_24h.toFixed(2)}%</p> :
                                                        <p className='text-red-500'>{item.price_change_percentage_24h.toFixed(2)}%</p>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td>₹ {item.market_cap}M</td>
                                </tr>
                            );
                        })) : <tr>
                            <td colSpan={4} className='text-center py-4'>No results found</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className='w-full my-5 text-[#87CEEB] flex justify-center'>
                <Pagination
                    count={totalPages}
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