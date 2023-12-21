'use client'



import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://mechanicalturk.one/api/leaderboard')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);

    const listItemClass = 'py-[0.25rem] px-[1rem] border border-slate-400 cursor-pointer ';
    const selectedItemClass = 'py-[0.25rem] px-[1rem] border border-slate-400 cursor-pointer h-[15rem] transition-all duration-[500] overflow-auto';

    const assessmentTypes = [
        'First Eight',
        'Home Row',
        'Top Row',
        'Bottom Row',
        'All Letters',
        'Numbers Row',
        'Symbols',
        'Numbers',
        'All',
    ];

    function formatDate(isoString: string) {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }

    console.log(formatDate('2023-12-19T20:04:59.480Z')); // Outputs: "December 19, 2023"

    return (
        <div className='bg-[#203b75]  p-10 min-w-[500px] w-[90%] rounded-lg font-[Sora] '>
            <div className='text-3xl mb-2 text-yellow-500  '>Leaderboards</div>
            <ol className=' bg-[#203b75] text-yellow-500'>
                {assessmentTypes.map((type, index) => (
                    <li
                        key={index}
                        className={selected === index ? selectedItemClass : listItemClass}
                        onClick={() => setSelected(selected === index ? null : index)}
                    >
                        {type}
                        {(selected !== null && selected === index && data[assessmentTypes[selected]]) &&
                            <ol className='pl-4 '>
                                <div className='grid grid-cols-6 text-white'>
                                    <div className='col-span-2'>Username</div>
                                    <div className='col-span-1'>WPM</div>
                                    <div className='col-span-3 text-right'>Date</div>
                                </div>
                                <hr />

                                {data[assessmentTypes.selected].map((game: any, index: number) => (
                                    <li className='text-[#7a97d6]' key={index}>
                                        <div className='grid grid-cols-6'>
                                            <div className='col-span-2'>{game.username}</div>
                                            <div className='col-span-1'>{game.score}</div>
                                            <div className='col-span-3 text-right'>{formatDate(game.game_date)}</div>
                                        </div><hr className='bg-slate-800' />
                                    </li>

                                ))}
                            </ol>
                        }
                    </li>
                ))}
            </ol>
        </div>
    );

};

export default Leaderboard;
