'use client'

import React, {useState, useEffect} from 'react';
import CreateAccount from './CreateAccount';
import MyProfile from './MyProfile';
import Leaderboard from './Leaderboard';
import SignIn from './SignIn';
import { useAuth } from './AuthContext';
import BurgerButton from './BurgerButton';
import ModalCard from './ModalCard';
import ChooseText from './ChooseText';

interface NavBarProps {
  openModal: () => void
  closeModal: () => void
  setText: (text: string) => void
}

const NavBar: React.FC<NavBarProps> = ({openModal, closeModal, setText}) => {

    enum ModalType {
        None,
        CreateAccount,
        MyProfile,
        Leaderboard,
        SignIn,
        ChooseText
      }
      const [activeModal, setActiveModal] = useState(ModalType.None);

const { logout} = useAuth()
const [navOpen, setNavOpen] = useState(false);


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

 

    const toggleModal = (modalType: ModalType) => {
        if (activeModal === modalType) {
          setActiveModal(ModalType.None);
        } else {
          setActiveModal(modalType);
        }
    };


          const toggleCreateAccount = () => toggleModal(ModalType.CreateAccount);
          const toggleProfile = () => toggleModal(ModalType.MyProfile);
          const toggleLeaderboard = () => toggleModal(ModalType.Leaderboard);
          const toggleSignIn = () => toggleModal(ModalType.SignIn);
          const toggleChooseText = () => toggleModal(ModalType.ChooseText);



const toggleNav = () => {
    setNavOpen(!navOpen)
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
              <BurgerButton toggleNav={toggleNav}/>
            </div>
          <div className={navOpen ? 'bg-[#F2f7f7] border-r border-blue-300 flex flex-col justify-evenly z-[120] font-[Sora] text-md text-blue-500 transition-all duration-[0.5s]  transform translate-x-0' : 'transform -translate-x-full'}>
            {navOpen && 
              <>
                <div className='h-16'> </div>
                <button className={buttonClass} onClick={toggleCreateAccount}><span className={activeModal === ModalType.CreateAccount ? modalOpenClass : ''}>Create Account </span></button>
                <button className={buttonClass} onClick={toggleProfile}><span className={activeModal === ModalType.MyProfile ? modalOpenClass : ''}>My Profile </span></button>
                <button className={buttonClass} onClick={toggleLeaderboard}><span className={activeModal === ModalType.Leaderboard ? modalOpenClass : ''}> Leaderboard</span></button>
                <button className={buttonClass} onClick={toggleSignIn}><span className={activeModal === ModalType.SignIn ? modalOpenClass : ''}>Sign In </span></button>
                <button className={buttonClass} onClick={toggleChooseText}><span className={activeModal === ModalType.ChooseText ? modalOpenClass : ''}>Choose Text</span></button>
                <button className={buttonClass} onClick={testServer}>Test Server</button>
                <button className={buttonClass} onClick={logout}>Log Out</button>
              </>
            }
            <div className='flex-grow w-full bg-[#F2f7f7]'></div>
          </div>
        {activeModal === ModalType.CreateAccount && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><CreateAccount toggleSignIn={toggleSignIn}/></div>}
        {activeModal === ModalType.Leaderboard && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><ModalCard ><Leaderboard /></ModalCard> </div>}
        {activeModal === ModalType.MyProfile && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><ModalCard><MyProfile /></ModalCard></div>}
        {activeModal === ModalType.SignIn && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><SignIn /></div>}
        {activeModal === ModalType.ChooseText && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><ModalCard><ChooseText setText={setText} toggleModal={toggleChooseText} /></ModalCard></div>}
        </div>
      )

}

export default NavBar;
