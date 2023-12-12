'use client'
import TypingGame2 from './TypingGame2';
import React, {useState} from 'react';
import MainGame from './game/MainGame';


const Computer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className='w-full h-full'>
        <div className='w-full h-5/6 rounded-3xl' style={{boxShadow: '-2px -2px 0px lightgray'}}>
        <div className='w-full h-[90%] bg-black rounded-t-3xl text-white pt-4 px-4 '>
        {/* <TypingGame2 modalOpen={modalOpen}/> */}
        <MainGame /> 
        </div>
        <div className='w-full h-[10%] bg-[#dcdcdc] border border-slate-500 rounded-b-3xl' style={{boxShadow: '-2px -2px 10px  gray inset'}}></div>
        </div>
        <div className='w-full h-[15%] flex items-center justify-center'>
            <div className='w-[12%] h-full bg-[#dcdcdc] border-x border-b border-black rounded-b-lg z-[-1]' style={{boxShadow: '-2px -1px 0px lightgray, -2px -2px 10px gray inset'}}></div>
        </div>
    </div>
  );
};

export default Computer;
