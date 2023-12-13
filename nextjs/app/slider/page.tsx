"use client"

import React, { useState } from 'react';

function Page() {
  const [activeIndex, setActiveIndex] = useState(0);

  const options = [10, 30, 60, 100];

  return (
    <div className='w-[20rem] h-[4.5rem] flex items-end'>
      <div className='w-full flex'>
        <div className='text-3xl w-[8rem] text-left'>Length</div>
        <div className='bg-slate-200 rounded-full flex-grow flex justify-between items-center text-slate-400 relative'>
          <div className='w-full h-full absolute flex justify-between text-white items-center z-[220] '>
            {options.map((option, index) => (
              <div
                key={option}
                className={`w-1/4 text-center ${activeIndex === index ? 'text-orange-500' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {option}
              </div>
            ))}
          </div>
          <div
            className='absolute rounded-full w-1/4 h-full text-center bg-slate-300'
            style={{ transform: `translateX(${activeIndex * 100}%)`, transition: 'transform 0.3s ease' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Page;