'use client'

import { useState } from 'react'


interface CreateAccountProps {
  openSignIn: () => void
}

const CreateAccount: React.FC<CreateAccountProps> = ({ openSignIn }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://mechanicalturk.one/api/user/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password // Only send one password
        })
      });

      if (!response.ok) {
        // If response is not ok, throw an error
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Handle response here. For example, redirect to a login page or display a success message
      console.log(data);
      setSuccessMessage('Account created successfully! Please log in.');
      setError(''); // Clear any previous errors

      setTimeout(() => {
        openSignIn();
      }, 2000)
    } catch (err) {
      // Handle errors here, such as displaying a message to the user
      setError('An error occurred while creating the account');
      setSuccessMessage('');
    }
    console.log('Form data submitted:', formData);
  };








  return (


    <div className='w-[50%] min-w-[500px] bg-blue-400 rounded-md p-14 flex font-[Sora] text-white flex flex-col'>
      <div className='text-3xl'>Create Account</div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full mt-10">
        <div>
          <label htmlFor="username" className="block text-sm font-medium ">Username</label>
          <input
            placeholder='Username'
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block text-slate-700 w-full px-3 py-2 border border-gray-300 bg-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium ">Password</label>
          <input
            placeholder='password'
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block text-slate-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium ">Confirm Password</label>
          <input
            placeholder='confirm password'
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block text-slate-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium ">Email</label>
          <input
            placeholder='email@site.com'
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block text-slate-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        {error && <div className='text-black text-center'>{error}</div>}
        {successMessage && <div className='text-green-600 text-3xl'>{successMessage}</div>}
      </form>
      <div className='text-xs mt-2'>Already have an account?
        <button
          className='ml-2 underline hover:text-gray-200'
          onClick={openSignIn}
        >Sign In</button>
      </div>

    </div>

  )
}

export default CreateAccount