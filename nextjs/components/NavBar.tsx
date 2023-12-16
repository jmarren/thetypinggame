'use client'

import React, {useState, useEffect} from 'react';
import { useAuth } from './AuthContext';
import BurgerButton from './BurgerButton';
import { ModalType } from '@/types';


interface NavBarProps {
  openModal: () => void
  closeModal: () => void
  setText: (text: string) => void
  navOpen: boolean
  toggleNav: () => void
  modalToggles: {
    toggleAccount: () => void
    toggleLeaderboard: () => void
    togglePoems: () => void
    togglePractice: () => void
    toggleAssessments: () => void
  }
  activeModal: ModalType
}

const NavBar: React.FC<NavBarProps> = ({openModal, closeModal, setText, navOpen, toggleNav, modalToggles, activeModal}) => {

 const {toggleAccount, toggleLeaderboard, togglePoems, togglePractice, toggleAssessments} = modalToggles


const { logout} = useAuth()


const testServer = async () => {
    console.log('click');
    try {
        const response =  await fetch('http://localhost:3004/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body:   JSON.stringify({"testing": "testing"}),
      })
  if (response.ok) {
        const data = await response.json();
        console.log(data);
    } 
    else {
       console.error('error in testServer: ', response.status)
    }
    } catch (error) {
        console.error('Error: ', error)
        }
    }

 

useEffect(() => {
    if (activeModal !== ModalType.None) {
        openModal();
    } else {
        closeModal();
    }

}, [activeModal]);




    const buttonClass = 'w-full p-4 hover:text-blue-700 active:transform active:scale-95 transition-all duration-75'
    const modalOpenClass = 'text-blue-300 hover:text-blue-400'


    return (
        <div className="flex h-full min-h-screen">            
        <div className='absolute top-0 left-0 p-4 z-[210]'>
              <BurgerButton toggleNav={toggleNav} navOpen={navOpen} />
            </div>
          <div className={navOpen ? 'bg-[#F2f7f7] border-r border-blue-300 flex flex-col justify-evenly z-[120] font-[Sora] text-md text-blue-500 transition-all duration-[0.5s]  transform translate-x-0' : 'transform -translate-x-full'}>
            {navOpen && 
              <>
                <div className='h-16'> </div>
                <button className={buttonClass} onClick={toggleAccount}><span className={activeModal === ModalType.Account ? modalOpenClass : ''}>Account </span></button>
                <button className={buttonClass} onClick={toggleLeaderboard}><span className={activeModal === ModalType.Leaderboard ? modalOpenClass : ''}> Leaderboard</span></button>
                <button className={buttonClass} onClick={togglePoems}><span className={activeModal === ModalType.Poems ? modalOpenClass : ''}>Poems</span></button>
                <button className={buttonClass} onClick={togglePractice}><span className={activeModal === ModalType.Practice ? modalOpenClass : ''}>Practice</span></button> 
                <button className={buttonClass} onClick={toggleAssessments}><span className={activeModal === ModalType.Assessments ? modalOpenClass : ''}>Assessments</span></button>               
                <button className={buttonClass} onClick={testServer}>Test Server</button>
                <button className={buttonClass} onClick={logout}>Log Out</button>
              </>
            }
            <div className='flex-grow w-full bg-[#F2f7f7]'></div>
          </div>
        </div>
      )

}

export default NavBar;
