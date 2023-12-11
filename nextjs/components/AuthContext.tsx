'use client'

import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

export interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

type FormDataType = {
    username: string;
    password: string;
  };

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState(null)

    const fetchUsername = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3004/user/get-username-with-token', {
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
            setUsername(data.username);
            setIsLoggedIn(true)
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    }, []);




    const login = async (formData: FormDataType) => {
        try {
            const response = await fetch('http://localhost:3004/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    

            const data = await response.json();
            if (response.ok) {
                // Set the username in your AuthContext
                console.log('data.username: ', data.username);
                setUsername(data.username);
                setIsLoggedIn(true)
                console.log('LOGIN SUCCEEDED');
                } else {
                // Handle login failure
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };



    // const login = () => {
    //     setIsLoggedIn(true)
    // }

    const logout = () => {
        fetch('http://localhost:3004/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    console.log('successfully logged out');
                }
            })
            .catch(error => console.error('there was an error when logging out: ', error))

        setUsername(null)
        setIsLoggedIn(false)
    }


    useEffect(() => {
        if (isLoggedIn === false) setUsername(null)
    }, [isLoggedIn]);


    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await fetch('http://localhost:3004/user/verify-session', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    if (data && data.validSession) {
                        setIsLoggedIn(true);
                        setUsername(data.username);  // Set username here
                    } else {
                        setIsLoggedIn(false);
                    }
                } else {
                    setIsLoggedIn(false);
                    throw new Error('Session verification failed');
                }
            } catch (error) {
                console.error(error.message);
                setIsLoggedIn(false);
            }
        };

        verifySession();
    }, []);


    // useEffect(() => {
    //     fetch('http://localhost:3004/user/verify-session', {
    //         method: 'GET',
    //         credentials: 'include'
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //             else {
    //                 setIsLoggedIn(false);
    //                 throw new Error('Session verification failed');
    //             }
    //         })
    //         .then(data => {
    //             console.log(data)
    //             if (data && data.validSession) {
    //                 setIsLoggedIn(true);
    //                 setUsername(data.username);  // Set username here
    //             } else {
    //                 setIsLoggedIn(false);
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error.message)
    //             setIsLoggedIn(false)
    //         })
    // }, []);




    const value = { isLoggedIn, login, logout, username, fetchUsername }


    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>


    );
}
