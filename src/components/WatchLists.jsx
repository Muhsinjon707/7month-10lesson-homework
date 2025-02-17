import React from 'react'
import useWatchList from '../store/useWatchList';

function WatchLists() {
    const { watchList, removeItem } = useWatchList();

    console.log("Watch List: ", watchList);

    return (
        <div className='w-full flex flex-wrap items-center justify-between gap-4 px-10'>
            {
                watchList.length > 0 && watchList.map((item, index) => {
                    return (
                        <div key={index} className='w-[198px] h-[248px] rounded-3xl bg-black flex flex-col items-center justify-center gap-2 py-4'>
                            <img src={item.image} width={118} alt="" />
                            <p>₹ {item.current_price}</p>
                            <button onClick={() => removeItem(item.id)} className='bg-red-500 text-white px-4 capitalize py-1 text-xl'>remove</button>
                        </div>
                    );
                })
            }

            {
                watchList.length === 0 && <p className='
                    bg-amber-900 py-4 px-5 text-white text-xl rounded-full mt-[50%]
                '>
                    No current watched items are available...
                </p>
            }
        </div>
    )
}

export default WatchLists
