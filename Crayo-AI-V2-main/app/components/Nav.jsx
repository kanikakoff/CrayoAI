'use client'
import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';

export default function Nav() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMainMenuOpen, setMainMenuOpen] = useState(false);
    const [user] = useAuthState(auth);
    const dropdownRef = useRef(null);
    const userMenuButtonRef = useRef(null);
    const router = useRouter();


    const signout = () => {
        auth.signOut().then(() => {
            router.push('/');
            setDropdownOpen(false); // Close the dropdown menu
        });
    }

    const toggleDropdown = () => {
        { user ? setDropdownOpen(prevState => !prevState) : '' }
    };

    const toggleMainMenu = () => {
        setMainMenuOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            userMenuButtonRef.current &&
            !userMenuButtonRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <nav className="bg-slate-100 fixed w-full z-50 dark:bg-slate-800">
            <div className="max-w-screen-xl flex relative flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://i.ibb.co/xHLX9DL/image-removebg-preview.png" className="h-10 rounded-lg" alt="Crayo Ai Logo" />
                    <span className="self-center font-bold text-2xl whitespace-nowrap bg-gradient-to-r from-white to-white text-transparent bg-clip-text">Crayo Ai</span>
                </a>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <button onClick={() => router.push('/chat')} className='px-3 py-1 mr-6 rounded-xl bg-gradient-to-r from-purple-500 font-semibold to-blue-500 hover:from-blue-500 hover:to-purple-500 hover:scale-105 shadow-xl transition duration-300 ease-in-out'>Chat Bot</button>
                    ) : (<div className='mr-4'>
                        <a className='hover:text-cyan-300' href="/login">Login</a>
                        <span className='cursor-default'>&nbsp;/&nbsp;</span>
                        <a className='hover:text-cyan-300' href="/signup">Signup</a>
                    </div>)}
                    <button
                        type="button"
                        ref={userMenuButtonRef}
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={isDropdownOpen}
                        onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}>
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={user?.photoURL || 'https://api-private.atlassian.com/users/2c882e24bc48682e111ab7e75ef6a9ec/avatar'} alt="" />
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    <div ref={dropdownRef} className={`absolute right-0 mt-2 z-30 w-48 rounded-md shadow-lg transition-transform duration-300 ${isDropdownOpen ? (user ? 'transform translate-y-[8rem] opacity-100' : 'transform translate-y-[5rem] opacity-100') : 'transform -translate-y-[8rem] opacity-0'}`} style={{ pointerEvents: isDropdownOpen ? 'auto' : 'none' }} >
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow divide-y divide-gray-100 dark:divide-gray-600">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{user?.displayName}</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
                            </div>
                            {user ? (
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={signout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" onClick={() => router.push('/login')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Sign in
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
