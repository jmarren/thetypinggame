'use client'

import { useAuth } from "../AuthContext"
import {useEffect, useState} from 'react'
import ModalCard from "./ModalCard"

const MyProfile = () => {
const {username, email} = useAuth();
const [dateCreated, setDateCreated] = useState<string | null>(null)
const [totalGames, setTotalGames] = useState<number | null>(null)

useEffect(() => {
    console.log(username)
}, [username]);






useEffect(() => {
    if (username === null) return;
    if (username === undefined) return;

function formatDate(dateString: string) {
    // Create a new Date object from the date string
    const date = new Date(dateString);
  
    // Format the date
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${month} ${day}, ${year}`;
  }


    const fetchDateCreated = async () => {
        try {
            const response = await fetch(`http://localhost:3004/user/date-account-created/${username}`, {
                method: 'GET',
                credentials: 'include', // Necessary for cookies to be sent
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Response not OK');
            }

            const data = await response.json();
            console.log(data)
            setDateCreated(formatDate(data.created_at))
        } catch (error) {
            console.error('Error fetching username:', error);
        }

    }
    fetchDateCreated();

}, [username]);


useEffect(() => {
    const fetchTotalGames = async () => {
        try {
            const response = await fetch(`http://localhost:3004/game-stats/total-games/${username}`, {
                method: 'GET',
                credentials: 'include', // Necessary for cookies to be sent
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Response not OK');
            }

            const data = await response.json();
            console.log(data)
            setTotalGames(data.total_games)
        } catch (error) {
            console.error('Error fetching username:', error);
        }

    }

    fetchTotalGames();
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
                {email}
                </div>
            </div>


            <div>
                Games Played
                <br /> 
            <div className='ml-2 text-slate-500'>
                {totalGames !== null && totalGames}
                </div>
            </div>


            <div>
                Account Created
                <br /> 
            <div className='ml-2 text-slate-500'>
                {dateCreated !== null && dateCreated}
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