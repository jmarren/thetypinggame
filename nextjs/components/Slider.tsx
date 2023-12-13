
import React, { useState, useRef, useEffect } from 'react';

interface SliderProps {
    options: (string)[];
    updateLength: (length: string) => void;
}

const Slider: React.FC<SliderProps> = ({ options, updateLength }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('activeIndex: ', activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;

        }
    }, [options]);

    const fixedWidth = '3rem';

    return (
        <div className='w-full h-[4.5rem] flex items-end cursor-pointer'>
            <div className=' flex'>
                <div className='text-2xl w-[8rem] text-left flex items-center'>Length</div>
                <div className='bg-slate-200 rounded-full flex-grow flex justify-between items-center text-slate-400 relative shadow-lg shadow-inner shadow-slate-500 ring ring-slate-100'>
                    <div className=' h-full flex justify-between text-slate-400 items-center z-[220] text-sm' ref={containerRef}>
                        {options.map((option, index) => (
                            <div
                                key={option}
                                className={` text-center ${activeIndex === index ? 'text-orange-500' : ''}`}
                                style={{ width: fixedWidth }}
                                onClick={() => {
                                    setActiveIndex(index)
                                    updateLength(option)
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    <div
                        className='absolute w-full rounded-full h-full text-center bg-slate-300 ring ring-slate-400'
                        style={{ transform: `translateX(${activeIndex * 3}rem)`, transition: 'transform 0.3s ease', width: '3rem' }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Slider;




// import React, { useState, useRef, useEffect } from 'react';

// interface SliderProps {
//     options: (number | string)[];
// }

// const Slider: React.FC<SliderProps> = ({ options }) => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [optionWidth, setOptionWidth] = useState<number | null>(0);
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (containerRef.current) {
//             const containerWidth = containerRef.current.clientWidth;
//             // setOptionWidth(containerWidth / options.length);
//             // setOptionWidth('3rem')
//         }
//     }, [options]);

//     if (optionWidth === null) {
//         return null; // or a loading spinner
//     }

//     return (
//         <div className='w-full h-[4.5rem] flex items-end'>
//             <div className='w-full flex'>
//                 <div className='text-3xl w-[8rem] text-left'>Length</div>
//                 <div className='bg-slate-200 rounded-full flex-grow flex justify-between items-center text-slate-400 relative'>
//                     <div className='w-full h-full absolute flex justify-between text-white items-center z-[220] text-sm' ref={containerRef}>
//                         {
//                         optionWidth ? 
//                         (options.map((option, index) => (
//                             <div
//                                 key={option}
//                                 className={` text-center ${activeIndex === index ? 'text-orange-500' : ''}`}
//                                 style={{ width: `3rem` }}
//                                 onClick={() => setActiveIndex(index)}
//                             >
//                                 {option}
//                             </div>
//                         )))
//                             :
//                         <></>
//                     }
//                     </div>
//                     {
//                         optionWidth ? 
//                     <div
//                         className='absolute rounded-full h-full text-center bg-slate-300'
//                         style={{ transform: `translateX(3rem)`, transition: 'transform 0.3s ease', width: `3rem` }}
//                     ></div>
//                     : 
//                     <></>

//                     }

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Slider;






// import React, { useState, useRef, useEffect } from 'react';

// interface SliderProps {
//     options: (number | string)[];
// }

// const Slider: React.FC<SliderProps> = ({ options }) => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [optionWidth, setOptionWidth] = useState<number | null>(null);
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (containerRef.current) {
//             const containerWidth = containerRef.current.clientWidth;
//             setOptionWidth(containerWidth / options.length);
//         }
//     }, [options]);

//     if (optionWidth === null) {
//         return null; // or a loading spinner
//     }

//     return (
//         <div className='w-full h-[4.5rem] flex items-end'>
//             <div className='w-full flex'>
//                 <div className='text-3xl w-[8rem] text-left'>Length</div>
//                 <div className='bg-slate-200 rounded-full flex-grow flex justify-between items-center text-slate-400 relative'>
//                     <div className='w-full h-full absolute flex justify-between text-white items-center z-[220] ' ref={containerRef}>
//                         {options.map((option, index) => (
//                             <div
//                                 key={option}
//                                 className={` text-center ${activeIndex === index ? 'text-orange-500' : ''}`}
//                                 style={{ width: `${optionWidth}px` }}
//                                 onClick={() => setActiveIndex(index)}
//                             >
//                                 {option}
//                             </div>
//                         ))}
//                     </div>
//                     <div
//                         className='absolute rounded-full h-full text-center bg-slate-300'
//                         style={{ transform: `translateX(${activeIndex * optionWidth}px)`, transition: 'transform 0.3s ease', width: `${optionWidth}px` }}
//                     ></div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Slider;





// import React, { useState, useRef, useEffect } from 'react';

// interface SliderProps {
//     options: (number | string)[];
// }

// const Slider: React.FC<SliderProps> = ({ options }) => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const containerRef = useRef()


//     useEffect(() => {
//         if (containerRef.current) {
//             const containerWidth = containerRef.current?.clientWidth;
//         }
//             const optionWidth = containerWidth / options.length;

//     }, [containerRef]);

    

// //    if (containerRef.current) {
// //        const containerWidth = containerRef.current?.clientWidth;
// //    }

//     return (
//         <div className='w-full h-[4.5rem] flex items-end'>
//             <div className='w-full flex'>
//                 <div className='text-3xl w-[8rem] text-left'>Length</div>
//                 <div className='bg-slate-200 rounded-full flex-grow flex justify-between items-center text-slate-400 relative'>
                   
//                     <div className='w-full h-full absolute flex justify-between text-white items-center z-[220] ' ref={containerRef}>
//                         {options.map((option, index) => (
//                             <div
//                                 key={option}
//                                 className={` text-center ${activeIndex === index ? 'text-orange-500' : ''}`}
//                                 style={{ width: `${optionWidth}%` }}
//                                 onClick={() => setActiveIndex(index)}
//                             >
//                                 {option}
//                             </div>
//                         ))}
//                     </div>
//                     <div
//                         className='absolute rounded-full h-full text-center bg-slate-300'
//                         style={{ transform: `translateX(${activeIndex * optionWidth}%)`, transition: 'transform 0.3s ease', width: `${optionWidth}%` }}
//                     ></div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Slider;





// import React, { useState } from 'react';

// interface SliderProps {
//     options: (number | string)[];
//   }

// const Slider: React.FC<SliderProps> = ({options}) => {
//   const [activeIndex, setActiveIndex] = useState(0);



//   return (
//     <div className='w-full h-[4.5rem] flex items-end'>
//       <div className='w-full flex'>
//         <div className='text-3xl w-[8rem] text-left'>Length</div>
//         <div className='bg-slate-200 rounded-full flex-grow flex justify-between items-center text-slate-400 relative'>
//           <div className='w-full h-full absolute flex justify-between text-white items-center z-[220] '>
//             {options.map((option, index) => (
//               <div
//                 key={option}
//                 className={` text-center ${activeIndex === index ? 'text-orange-500' : ''}`}
//                 onClick={() => setActiveIndex(index)}
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//           <div
//             className='absolute rounded-full h-full text-center bg-slate-300'
//             style={{ transform: `translateX(${activeIndex * 100}%)`, transition: 'transform 0.3s ease' }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Slider;