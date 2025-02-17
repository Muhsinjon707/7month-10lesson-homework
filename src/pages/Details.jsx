import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

function Details() {
    const { crypto } = useParams();

    const [newCrypto, setCrypto] = useState(null);

    const [customData, setCustomData] = useState([]);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}`)
            .then(response => {
                if (response.status === 200) {
                    setCrypto(response.data);
                    // console.log(21, response);
                }
            })
            .catch(error => console.log(error));
    }, [crypto]);

    if (!newCrypto) return <p>Loading...</p>;

    const data = {
        labels: ['9:15 AM', '9:45 AM', '10:15 AM', '10:45 AM', '11:15 AM', '11:45 AM', '12:15 AM', '12:45 AM', '1:15 AM', '1:45 AM', '2:15 AM', '2:45 AM', '3:15 AM', '3:45 AM', '4:15 AM', '4:45 AM', '6:35 AM', '7:15 AM', '7:45 AM', '8:15 AM', '8:45 AM', '9:15 PM', '9:45 PM', '10:15 PM', '10:45 PM', '11:15 PM', '11:45 PM', '12:15 AM', '12:45 AM', '1:15 AM', '1:45 AM', '2:15 AM', '2:45 AM', '3:15 AM', '3:45 AM', '4:15 AM', '4:45 AM', '6:35 AM', '7:15 AM', '7:45 AM', '8:15 AM'],
        datasets: [
            {
                label: 'Price (Past 1 Day)',
                data: customData,
                fill: false,
                borderColor: 'blue',
                tension: 0.4
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (INR)'
                },
            },
        },
    };

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
                {/* Chart (To be implemented) */}
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

export default Details;
