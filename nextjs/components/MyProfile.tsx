'use client'

import { useAuth } from "./AuthContext"
import {useEffect} from 'react'

const MyProfile = () => {
const {username} = useAuth();

useEffect(() => {
    console.log(username)
}, [username]);



    return (
        <div className='w-[50%] h-[80%] bg-green-300 rounded-md z-[30] absolute '>
            <div>
                Username: {username}
            </div>
        
        </div> 


    )
}

export default MyProfile