'use client'

import React, { useState, useEffect } from 'react';
import BurgerButton from './BurgerButton';
import { ModalType, AssessmentType } from '@/types';


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
  updateAssessmentType: (type: AssessmentType) => void
  activeModal: ModalType
}

const NavBar: React.FC<NavBarProps> = ({ openModal, closeModal, setText, navOpen, toggleNav, modalToggles, activeModal, updateAssessmentType }) => {

  const { toggleAccount, toggleLeaderboard, togglePoems, togglePractice, toggleAssessments } = modalToggles

  const testServer = async () => {
    console.log('click');
    try {
      const response = await fetch('https://mechanicalturk.one/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ "testing": "testing" }),
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

  }, [activeModal, openModal, closeModal]);




  const buttonClass = 'w-full p-4 hover:text-blue-700 active:transform active:scale-95 transition-all duration-75'
  const modalOpenClass = 'text-blue-300 hover:text-blue-400'


  return (
    <div className="flex h-screen min-h-screen">

      {/* <div className={navOpen ? 'bg-[#F2f7f7] border-r border-blue-300 flex flex-col justify-evenly z-[120] font-[Sora] text-md text-blue-500 transition-all duration-[0.75s] relative' : 'relative transform -translate-x-full transition-all duration-[0.75s]'} > */}
      <div className={'bg-[#F2f7f7] border-r border-blue-300 flex flex-col justify-evenly z-[120] font-[Sora] text-md text-blue-500 '} >
        
        {/* {navOpen && */}
          {/* <> */}
            <div className='h-16'> </div>
            <button className={buttonClass} onClick={toggleAccount}><span className={activeModal === ModalType.Account ? modalOpenClass : ''}>Account </span></button>
            <button className={buttonClass} onClick={toggleLeaderboard}><span className={activeModal === ModalType.Leaderboard ? modalOpenClass : ''}> Leaderboard</span></button>
            <button className={buttonClass} onClick={togglePoems}><span className={activeModal === ModalType.Poems ? modalOpenClass : ''}>Poems</span></button>
            <button className={buttonClass} onClick={togglePractice}><span className={activeModal === ModalType.Practice ? modalOpenClass : ''}>Practice</span></button>
            <button className={buttonClass} onClick={toggleAssessments}><span className={activeModal === ModalType.Assessments ? modalOpenClass : ''}>Assessments</span></button>
          {/* </> */}
        {/* } */}
        <div className='flex-grow w-full bg-[#F2f7f7]'></div>
      </div>
    </div>
  )

}

export default NavBar;
