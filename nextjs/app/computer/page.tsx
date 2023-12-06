import Computer from '@/components/Computer';
import CustomKeyboard from '@/components/CustomKeyboard';
import KeyboardResponsive from '@/components/KeyboardResponsive';



import React from 'react';

const Page: React.FC = () => {
  return (
    <>
    <div className='w-full min-h-screen  grid grid-cols-10 grid-rows-6'>
      <div className='border border-white bg-slate-300 row-span-6'>
        Nav
        </div>
        <div className='col-span-9 row-span-4 flex items-center justify-center'>  
        <div className='w-11/12 h-full pt-4'>         
         <Computer />
         </div>
        </div>
        <div className='col-span-9 row-span-2 flex justify-center'>
          <div className='w-2/3 h-full'>
                      <KeyboardResponsive />
          </div>
        </div>
      {/* <div className='w-full h-[500px] '>
      </div>
            <div className='w-[1000px] h-[350px] font-bold absolute top-20'>
            </div> */}
    </div>
    <div className='w-full h-[40vh] fixed bottom-0 wood-background z-[-2] '>
      </div>
    <div className='w-full h-[60vh] fixed top-0 brick-wall z-[-2]'></div>
    </>
  );
};

export default Page;
