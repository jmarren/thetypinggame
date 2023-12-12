import React, { useState, useEffect } from 'react';
import CardGrid from '../CardGrid';

interface PracticeProps {
  setText: (text: string) => void;
  toggleModal: () => void;
}

const Practice: React.FC<PracticeProps> = ({setText, toggleModal}) => {
    const [charsSelected, setCharsSelected] = useState<string[]>([]);
    const [areCharsSelected, setAreCharsSelected] = useState(false);
    const [lengthSelected, setLengthSelected] = useState(0);
    const [isLengthSelected, setIsLengthSelected] = useState(false);




    const toggleSelectChars = (char: string) => {
        if (charsSelected.includes(char)) {
            setCharsSelected(charsSelected.filter((c) => c !== char));
        } else {
            setCharsSelected([...charsSelected, char]);
        }
    }

const lengthsAvailable = ['10', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'];

const characters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 
    '`', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/', 
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?', ' '
];

    return (
        <>
            <div className='text-3xl w-full text-left'>
                {areCharsSelected ? <>Choose</> : <>Choose the Letters You'd like to Practice</>}
                </div>


                {areCharsSelected ? (
                    <CardGrid items={lengthsAvailable} toggleSelect={toggleSelectChars} selected={charsSelected} />
                ) 
                : 
                (
                    <CardGrid items={characters} toggleSelect={toggleSelectChars} selected={charsSelected} />
                ) }

                



           <div className='w-full h-[4.5rem]  flex items-end'>

            <div className='w-full flex'>
            <div className='text-3xl w-[8rem] text-left'>
            Length
                </div>
            <div className='bg-slate-200 rounded-full flex-grow  flex justify-between items-center text-slate-400 relative'>

                <div className='w-full h-full absolute flex justify-between text-white items-center z-[220] '>
                <div className='w-1/4 text-center'>
                    10
                </div>
                <div className='w-1/4 text-center'>
                    30
                </div>
                <div className='w-1/4 text-center'>
                    60
                </div>
                <div className='w-1/4 text-center'>
                    100
                </div>
       
                <div className='absolute w-1/4 z-[230] border border-black self-end h-full' >
                    </div>
                    <div className='absolute w-1/4 border border-black flex-grow'>
                        </div> 
                    <div className='absolute w-3/4 border border-black'>
                    </div>
                </div>
            

                
                <div className='w-1/4 text-center'>
                    10
                </div>
                <div className='w-1/4 text-center'>
                    30
                </div>
                <div className='w-1/4 text-center'>
                    60
                </div>
                <div className='w-1/4 text-center'>
                    100
                </div>
                <div className='absolute rounded-full w-1/4 h-full text-center bg-slate-300'>
                </div>
            </div>
            
                </div>


            </div>


           <div className='h-[2rem] w-full'>
            </div>
            <div className='flex items-center w-full justify-center'>
           <button className=' w-[8rem]  bg-green-400 rounded-md py-2 px-3 text-xl active:scale-95 text-white '>
            Create
            </button>
            </div>          
      </>
    );
};

export default Practice;


/* 
          <div className='grid grid-cols-3 gap-4 overflow-y-scroll max-h-64 text-sky-600  bg-blue-100 text-center mt-10 p-6'>
           {characters.map((char, index) => (
             <div
               onClick={() => toggleSelect(char)}
               key={index}
               className={charsSelected.includes(char) ? 'p-6 bg-yellow-200 rounded shadow border-2 border-white cursor-pointer hover:bg-slate-300 flex items-center scale-105' :'p-6 bg-slate-100 rounded shadow cursor-pointer hover:bg-slate-300 flex items-center'}
             >
                <span className='w-full text-center font-[courier]'>
               {char}
               </span>
             </div>
           ))}
           </div> */