'use client'
import React, {useState, useEffect }from 'react';
import MainGame from '@/components/game/MainGame';
import CustomKeyboard from '@/components/CustomKeyboard';
import BurgerButton from '@/components/BurgerButton';
import NavBar from '@/components/NavBar';


const Page: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [textChosen, setTextChosen] = useState('Hello! Welcome to the wonderful world of typing! Using the menu to the left you can choose a poem by a famous poet to practice with. Or you can choose the characters that you want to work on and we\'ll generate some text for you. Create an account so you can track your progress and the keys of your keyboard will change color to show your accuracy!')
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    }
    const setText = (text: string) => {
        setTextChosen(text);
    };

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className='w-full h-full min-h-screen flex flex-row'>
            
            <div className='h-full min-h-screen'>
                <NavBar openModal={openModal} closeModal={closeModal} setText={setText} navOpen={navOpen} toggleNav={toggleNav} />
            </div>
            <div className={modalOpen ? 'h-full min-h-screen flex-grow  flex flex-col blur' : 'h-full min-h-screen flex-grow ml-4 mt-4 flex flex-col' }>
                <div className='w-full '> 
                    <MainGame templateString={textChosen} modalOpen={modalOpen} />
                </div>
                <div className='w-full h-[200px]  min-[750px]:h-[300px] min-[1000px]:h-[375px] px-6'> 
                    <CustomKeyboard /> 
                </div>
            </div>
        </div>
    );
};

export default Page;
