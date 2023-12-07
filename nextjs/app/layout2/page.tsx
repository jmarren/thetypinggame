'use client'
import React, {useState }from 'react';
import MainGame from '@/components/game/MainGame';
import CustomKeyboard from '@/components/CustomKeyboard';
import BurgerButton from '@/components/BurgerButton';
import NavBar from '@/components/NavBar';


const Page: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div className='w-full h-full min-h-screen  flex flex-row'>
            
            <div className='h-full min-h-screen'>
                <NavBar setModalOpen={setModalOpen}/>
            </div>
            <div className='h-full min-h-screen flex-grow  flex flex-col'>
                <div className='w-full '> 
                <MainGame />
                </div>
                <div className='w-full h-[200px]  min-[750px]:h-[300px] px-6'> 
                    <CustomKeyboard /> 
                </div>
            </div>
        </div>
    );
};

export default Page;
