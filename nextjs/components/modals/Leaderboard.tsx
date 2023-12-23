'use client'

import React, { useState, useEffect } from 'react';
import XButton from '../XButton';
type LeaderboardData = {
    [key: string]: {
        score: number | null;
        username: string;
        game_date: string;
    }[];
} | null;

const Leaderboard: React.FC<{ toggleModal: () => void }> = ({ toggleModal }) => {
    const [data, setData] = useState<LeaderboardData>({});

    const [selected, setSelected] = useState<number | null>();

    useEffect(() => {
        fetch(`https://mechanicalturk.one/api/leaderboard`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                console.log('Leaderboard Data: ', data);
            });
    }, []);


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

    const selectListItem = (index: number) => {
        if (selected === index) {
            setSelected(null);
        } else {
            setSelected(index);
        }
    };


    const listItemClass = 'py-[0.25rem] px-[1rem] border border-slate-400 cursor-pointer hover:bg-blue-800 hover:text-white transition-all duration-[0.5s] overflow-auto';
    const selectedItemClass = 'pb-[1rem] pt-[0.5rem] px-[1rem] bg-blue-800 border border-slate-400 cursor-pointer flex-grow transition-all duration-[0.5s] overflow-auto';


    return (
        <div className='bg-[#203b75] h-[85vh] min-h-[500px] p-10 min-w-[500px] w-[90%] rounded-lg font-[Sora] relative flex flex-col' onClick={(e) => e.stopPropagation()}>
            <div className='absolute top-4 right-4 '>
                <XButton toggleModal={toggleModal} />
            </div>
            <div className='text-3xl mb-2 text-yellow-500'>Leaderboards</div>
            <ol className=' bg-[#203b75] text-yellow-500 flex-grow flex-col '>
                {Object.keys(data || {}).map((type, index) => (
                    // Your code here
                    <li
                        key={index}
                        className={selected === index ? selectedItemClass : listItemClass}
                        onClick={() => selectListItem(index)}
                    >
                        {type}
                        {(selected !== null && selected === index) && (
                            <ol className='pl-4 '>
                                <div className='grid grid-cols-6 text-white'>
                                    <div className='col-span-2'>Username</div>
                                    <div className='col-span-1'>WPM</div>
                                    <div className='col-span-3 text-right'>Date</div>
                                </div>
                                <hr />
                                {(data?.[type as keyof typeof data] || []).map((game: any, index: number) => (
                                    <li className='text-[#7a97d6]' key={index}>
                                        <div className='grid grid-cols-6'>
                                            <div className='col-span-2'>{game.username}</div>
                                            <div className='col-span-1'>{game.score}</div>
                                            <div className='col-span-3 text-right'>{formatDate(game.game_date)}</div>
                                        </div>
                                        <hr className='bg-slate-800' />
                                    </li>
                                ))}
                            </ol>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;
