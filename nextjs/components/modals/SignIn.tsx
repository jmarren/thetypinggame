'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import { useAuth } from '../AuthContext';



const SignIn: React.FC<{openCreateAccount: () => void}> = ({openCreateAccount}) => {
    const auth = useAuth();
    const login = auth?.login ?? null;
    const logout = auth?.logout ?? null;
    const username = auth?.username ?? '';
    const [successMessage, setSuccessMessage] = useState('');
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      });
      const [errorMessage, setErrorMessage] = useState('');

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('submitted');
        console.log(formData);
        e.preventDefault();
        if (login) {
          login(formData);
        }
      };


      return (
    <div className='w-[50%] min-w-[500px] bg-blue-400 text-white font-[Sora] rounded-md p-14 flex-col '>


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
        
        <div className='text-xs mt-2'>New Here? 
          <button 
          className='ml-2 underline hover:text-gray-200'
        onClick={openCreateAccount}
        >Create Account</button>
          </div>
        </div>
      );

}

export default SignIn