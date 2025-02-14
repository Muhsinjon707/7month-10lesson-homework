import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Details() {
    const { crypto } = useParams();
    const [newCrypto, setCrypto] = useState(null);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}`)
            .then(response => {
                if (response.status === 200) {
                    setCrypto(response.data);
                }
            })
            .catch(error => console.log(error));
    }, [crypto]); // Added dependency

    if (!newCrypto) return <p>Loading...</p>;

    return (
        <div className='w-screen absolute top-15 left-0 bg-[#14161A] text-white p-4 flex '>
            <div className='w-3/12 min-h-[550px] text-center border-r-1 flex flex-col items-start justify-center gap-4'>
                <img src={newCrypto.image.large} alt={newCrypto.id} className='mx-auto w-32 h-32' />
                <h4 className='w-full text-center font-bold text-4xl capitalize'>{crypto}</h4>
                <p className='mt-4 text-start text-sm font-normal text-[#808080]'>
                    {newCrypto.description?.en?.substring(0, 300) || "No description available."}
                </p>
                <div className='flex flex-col items-start justify-center gap-5'>
                    <h3>
                        <span className='font-bold'>Rank: </span>
                        <span className='text-gray-300'>{newCrypto.market_cap_rank}</span>
                    </h3>
                    <h3>
                        <span className='font-bold'>Current Price: </span>
                        <span className='text-gray-300'>
                            ${newCrypto.market_data?.current_price?.usd}
                        </span>
                    </h3>
                    <h3>
                        <span className='font-bold'>Market Cap: </span>
                        <span className='text-gray-300'>${newCrypto.market_data?.market_cap?.usd}</span>
                    </h3>
                </div>
            </div>
            <div className='w-9/12 mt-8 text-center'>
                Chart (To be implemented)
            </div>
        </div>
    );
}

export default Details;
