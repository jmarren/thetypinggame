'use client'

import React, { createContext, useState, useEffect, useContext } from 'react';



type FormDataType = {
    username: string;
    password: string;
};

type UserData = {
    username: string;
    email: string;
};

export interface AuthContextType {
    isLoggedIn: boolean;
    login: (formData: FormDataType) => void;
    logout: () => void;
    username: string | null;
    fetchUsername: () => void;
    email: string | null;
}
export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => useContext<AuthContextType | null>(AuthContext);

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    const fetchUsername = async () => {
        try {
            const response = await fetch(`https://mechanicalturk.one/api/user/get-username-with-token`, {
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
            setEmail(data.email);
            setIsLoggedIn(true)
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    }


    const login = async (formData: FormDataType) => {
        try {
            const response = await fetch(`https://mechanicalturk.one/api/user/login`, {
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


            const data: UserData = await response.json();
            if (response.ok) {
                // Set the username in your AuthContext
                setUsername(data.username);
                setEmail(data.email)
                setIsLoggedIn(true)
            } else {
                // Handle login failure
                console.error('Login failed:', data);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };



    // const login = () => {
    //     setIsLoggedIn(true)
    // }

    const logout = () => {
        fetch(`https://mechanicalturk.one/api/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    // console.log('successfully logged out');
                }
            })
            .catch(error => console.error('there was an error when logging out: ', error))

        setUsername(null)
        setIsLoggedIn(false)
    }


    useEffect(() => {
        if (!isLoggedIn) {
            setEmail(null)
            setUsername(null)
        }
    }, [isLoggedIn]);


    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await fetch(`https://mechanicalturk.one/api/user/verify-session`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data: UserData = await response.json();
                    if (data) {
                        setIsLoggedIn(true);
                        setUsername(data.username);  // Set username here
                        setEmail(data.email)

                    } else {
                        setIsLoggedIn(false);
                    }
                } else {
                    setIsLoggedIn(false);
                    throw new Error('Session verification failed');
                }
            } catch (error) {
                console.error(error);
                setIsLoggedIn(false);
            }
        };

        verifySession();
    }, []);




    const value = { isLoggedIn, login, logout, username, fetchUsername, email }


    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>


    );
}
