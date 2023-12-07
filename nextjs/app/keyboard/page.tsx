// 'use client'

// import React, { useState, useEffect } from 'react';
import CustomKeyboard from '@/components/CustomKeyboard';

const Page: React.FC = () => {
   
    return (

           <div className='w-full h-full h-screen border-4 border-green-500'>
                <CustomKeyboard />    
           </div>

    );
};

export default Page;