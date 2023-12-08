'use client'

import { useAuth } from "./AuthContext"
import {useEffect} from 'react'
import ModalCard from "./ModalCard"

const MyProfile = () => {
const {username} = useAuth();

useEffect(() => {
    console.log(username)
}, [username]);



    return (
        <>
            <div className='text-3xl'>
                My Profile
                </div>
            
            <div className='mt-10 space-y-4'>
           
            <div className=''>
                Username
                    <br/>
            <div className='ml-2 text-slate-500'>
                {username}
                </div>
            </div>
            
            <div>
                Email 
                    <br /> 
            <div className='ml-2 text-slate-500'>
                {/* email */}
                </div>
            </div>


            <div>
                Games Played
                <br /> 
            <div className='ml-2 text-slate-500'>
                {/* games played */}
                </div>
            </div>

            <div>
                Highest WPM
                <br /> 
            <div className='ml-2 text-slate-500'>
                {/* highest wpm */}
                </div>
            </div>

            <div>
                Account Created
                <br /> 
            <div className='ml-2 text-slate-500'>
                {/* account creation date */}
                </div>
            </div>


            
            <hr className='mt-6'/> 

            <div className='mt-6'>
                <span className='flex justify-evenly'><button className=''>Change Password</button><button className=''>Log Out</button> </span>
            </div> 
            </div>
        </> 
    


    )
}

export default MyProfile