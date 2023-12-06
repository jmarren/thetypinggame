'use client'

import {useState, useEffect} from 'react';
import CreateAccount from './CreateAccount';
import MyProfile from './MyProfile';
import Leaderboard from './Leaderboard';
import SignIn from './SignIn';
import { useAuth } from './AuthContext';

const NavBar = ({setModalOpen}) => {

const [isCreateAccountOpen, setCreateAccountOpen] = useState(false)
const [isMyProfileOpen, setMyProfileOpen] = useState(false);
const [isLeaderboardOpen, setLeaderboardOpen] = useState(false)
const [isSignInOpen, setSignInOpen] = useState(false);
const { logout} = useAuth()


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

useEffect(() => {
    if (isMyProfileOpen || isLeaderboardOpen || isCreateAccountOpen || isSignInOpen) {
        setModalOpen(true)
    } else {
        setModalOpen(false)
    }

}, [isMyProfileOpen, isLeaderboardOpen, isCreateAccountOpen, isSignInOpen]);




    const buttonStyle = {
        margin: '10px',
        padding: '5px',
    }
    const buttonClass = 'rounded-md bg-slate-50 border-2 border-slate-500'

    return (
        <>

    <div className='bg-slate-300 rounded-md flex flex-col justify-evenly fixed left-0 top-10 z-[40]'>

        <button style={buttonStyle} className={buttonClass} onClick={toggleCreateAccount}>
            Create Account
        </button>

        <button style={buttonStyle} className={buttonClass} onClick={toggleProfile}>
            My Profile
        </button>

        <button style={buttonStyle} className={buttonClass} onClick={toggleLeaderboard}>
            Leaderboard
        </button>

        <button style={buttonStyle} className={buttonClass} onClick={toggleSignIn}>
            Sign In
        </button>

        <button style={buttonStyle} className={buttonClass} onClick={testServer} >
            Test Server
        </button>

        <button style={buttonStyle} className={buttonClass} onClick={logout} >
            Log Out
        </button>
    </div>
    {isCreateAccountOpen ? <div className='w-full min-h-screen flex justify-center items-center z-[30] absolute'><CreateAccount  toggleSignIn={toggleSignIn}/></div> : <></>}
    {isLeaderboardOpen ? <div className='w-full min-h-screen flex justify-center items-center z-[30] absolute'><Leaderboard /></div> : <></>}
    {isMyProfileOpen ? <div className='w-full min-h-screen flex justify-center items-center z-[30] absolute'><MyProfile /></div> : <></>}
    {isSignInOpen ? <div className='w-full min-h-screen flex justify-center items-center z-[30] absolute'><SignIn /></div> : <></>}

    </>
    )
}

export default NavBar;