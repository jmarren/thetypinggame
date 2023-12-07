'use client'

import {useState, useEffect} from 'react';
import CreateAccount from './CreateAccount';
import MyProfile from './MyProfile';
import Leaderboard from './Leaderboard';
import SignIn from './SignIn';
import { useAuth } from './AuthContext';
import BurgerButton from './BurgerButton';
import ModalCard from './ModalCard';

const NavBar = ({setModalOpen}) => {

const [isCreateAccountOpen, setCreateAccountOpen] = useState(false)
const [isMyProfileOpen, setMyProfileOpen] = useState(false);
const [isLeaderboardOpen, setLeaderboardOpen] = useState(false)
const [isSignInOpen, setSignInOpen] = useState(false);
const { logout} = useAuth()
const [navOpen, setNavOpen] = useState(false);


const testServer = () => {
    fetch('http://localhost:3004/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body:   JSON.stringify({"testing": "testing"}),
      }).then(response => response.text())
        .then(data => {
          console.log('success: ', data);
        })
        .catch((error) => {
          console.error('Error: ', error)
        })
    }



const toggleCreateAccount = () => {
    setMyProfileOpen(false);
    setLeaderboardOpen(false);
    setCreateAccountOpen(!isCreateAccountOpen);
    setSignInOpen(false);
}
const toggleProfile = () => {
    setMyProfileOpen(!isMyProfileOpen);
    setLeaderboardOpen(false);
    setCreateAccountOpen(false);
    setSignInOpen(false);

}
const toggleLeaderboard = () => {
    setMyProfileOpen(false);
    setLeaderboardOpen(!isLeaderboardOpen);
    setCreateAccountOpen(false);
    setSignInOpen(false);

}

const toggleSignIn = () => {
    setMyProfileOpen(false);
    setLeaderboardOpen(false);
    setCreateAccountOpen(false);
    setSignInOpen(!isSignInOpen);

}

const toggleNav = () => {
    setNavOpen(!navOpen)
}

useEffect(() => {
    if (isMyProfileOpen || isLeaderboardOpen || isCreateAccountOpen || isSignInOpen) {
        setModalOpen(true)
    } else {
        setModalOpen(false)
    }

}, [isMyProfileOpen, isLeaderboardOpen, isCreateAccountOpen, isSignInOpen]);


useEffect(() => {
    console.log(isSignInOpen)
}, [isSignInOpen]);



    // const buttonStyle = {
    //     margin: '10px',
    //     padding: '5px',
    // }
    const buttonClass = 'w-full p-4'

    return (
        <div className="flex h-full min-h-screen">            
        <div className='absolute top-0 left-0 p-4 z-[210]'>
              <BurgerButton toggleNav={toggleNav}/>
            </div>
          <div className={navOpen ? 'bg-[#F2f7f7] border-r border-blue-300 flex flex-col justify-evenly z-[120] font-[Sora] text-md text-blue-500' : 'w-10'}>
            {navOpen && 
              <>
                <div className='h-16'> </div>
                <button className={buttonClass} onClick={toggleCreateAccount}>Create Account</button>
                <button className={buttonClass} onClick={toggleProfile}>My Profile</button>
                <button className={buttonClass} onClick={toggleLeaderboard}>Leaderboard</button>
                <button className={buttonClass} onClick={toggleSignIn}>Sign In</button>
                <button className={buttonClass} onClick={testServer}>Test Server</button>
                <button className={buttonClass} onClick={logout}>Log Out</button>
              </>
            }
            <div className='flex-grow w-full bg-[#F2f7f7]'></div>
          </div>
          {isCreateAccountOpen && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><CreateAccount toggleSignIn={toggleSignIn}/></div>}
          {isLeaderboardOpen && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><ModalCard ><Leaderboard /></ModalCard> </div>}
          {isMyProfileOpen && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><MyProfile /></div>}
          {isSignInOpen && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] fixed'><SignIn /></div>}
        </div>
      )


    /*
    return (




        <>
            <>  
            {isCreateAccountOpen && <div className='w-full min-h-screen flex justify-center items-center z-[150] fixed'><CreateAccount  toggleSignIn={toggleSignIn}/></div>}
  {isLeaderboardOpen && <div className='w-full min-h-screen flex justify-center items-center z-[150] fixed'><Leaderboard /></div>}
  {isMyProfileOpen && <div className='w-full min-h-screen flex justify-center items-center z-[150] fixed'><MyProfile /></div>}
  {isSignInOpen && <div className='w-full min-h-screen flex justify-center items-center z-[200] absolute'><SignIn /></div>}

            <div className='absolute top-0 left-0 p-4 z-[210] border border-blue-600'>
            <BurgerButton toggleNav={toggleNav}/>
            </div> 
            </>
    <div className={navOpen ? 'bg-[#F2f7f7]  h-full min-h-screen border-r border-blue-300 flex flex-col justify-evenly  z-[120]   font-[Sora] text-md text-blue-500' : 'w-10'}>
        <div className='h-16 relative'>

        </div>
        
        {navOpen ? 
        <>
         <button  className={buttonClass} onClick={toggleCreateAccount}>
            Create Account
        </button>

        <button  className={buttonClass} onClick={toggleProfile}>
            My Profile
        </button>

        <button  className={buttonClass} onClick={toggleLeaderboard}>
            Leaderboard
        </button>

        <button  className={buttonClass} onClick={toggleSignIn}>
            Sign In
        </button>

        <button  className={buttonClass} onClick={testServer} >
            Test Server
        </button>

        <button  className={buttonClass} onClick={logout} >
            Log Out
        </button>
        </>
    :
            <></>
    }
       
        <div className='flex-grow w-full bg-[#F2f7f7] '>
        </div>
    </div>

    </>
    )


    */
}

export default NavBar;

    {/* {isCreateAccountOpen ? <div className='w-full min-h-screen flex justify-center items-center z-[150] fixed'><CreateAccount  toggleSignIn={toggleSignIn}/></div> : <></>}
    {isLeaderboardOpen ? <div className='w-full min-h-screen flex justify-center items-center z-[150] fixed'><Leaderboard /></div> : <></>}
    {isMyProfileOpen ? <div className='w-full min-h-screen flex justify-center items-center z-[150] fixed'><MyProfile /></div> : <></>}
    {isSignInOpen ? <div className='w-full min-h-screen flex justify-center items-center z-[150] fixed '><SignIn /></div> : <></>} */}
