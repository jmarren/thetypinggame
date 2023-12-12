'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext';



const SignIn = () => {
    const {login, logout, username } = useAuth()
    const [successMessage, setSuccessMessage] = useState('');
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      });
      const [errorMessage, setErrorMessage] = useState('');
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        console.log('submitted');
        e.preventDefault();
        login(formData);
      }

      useEffect(() => {
        setSuccessMessage(`Welcome back, ${username}!`)
      }, [username]);
    
      return (
    <div className='w-[50%] min-w-[200px] bg-blue-400 text-white font-[Sora] rounded-md  absolute p-14 flex-col'>

        {username ?  <div className='text-white text-3xl'>{successMessage}</div> :      
        <>
        <div className='text-3xl'>
        Sign In
        </div>
        <form onSubmit={handleSubmit}  className="space-y-4 w-full mt-10">
          <div>
            <label htmlFor="username"
            >Username</label>
            <input
              className="mt-1 text-slate-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="mt-1 text-slate-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <button type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >Sign In</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            
        </form> 
        </>}
        </div>
      );

}

export default SignIn





        // try {



        //   const response = await fetch('http://localhost:3004/user/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify({
        //       username: formData.username,
        //       password: formData.password
        //     }),


        //   });
    
        //   if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(errorData.message || 'Error logging in');
        //   }
    
   
        //   console.log('Login successful');
        // //   setSuccessMessage(`Welcome back, ${formData.username}!`)
        //   setSuccess(true)
        //   setErrorMessage('');
        //   login(); 
        // } catch (error) {
        //   setErrorMessage(error.message);
        // }
    //   };

    //   useEffect(() => {

    //   }, [isLoggedIn]);