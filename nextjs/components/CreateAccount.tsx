'use client'

import {useState} from 'react'


const CreateAccount = ({toggleSignIn}) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
        const response = await fetch('http://localhost:3004/create-account', {
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
            toggleSignIn();
          }, 2000)
        } catch (err) {
          // Handle errors here, such as displaying a message to the user
          setError('An error occurred while creating the account');
          setSuccessMessage('');
        }
        console.log('Form data submitted:', formData);
      };
        







    return (


        <div className='w-[50%] h-[80%] bg-sky-300 rounded-md z-[30] absolute p-14 flex'>

<form onSubmit={handleSubmit} className="space-y-4 w-full mt-10">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {successMessage && <div className='text-green-600 text-3xl'>{successMessage}</div>}
            </form>

        </div>

    )
}

export default CreateAccount