'use client'
import React, { useState, useEffect, useRef } from 'react'
import { auth } from '../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

export default function Avatar() {
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
    <div>
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
      <div ref={dropdownRef} className={`absolute right-[200px] mt-2 z-30 w-48 rounded-md shadow-lg transition-transform duration-300 ${isDropdownOpen ? (user ? 'transform translate-y-[0.1rem] opacity-100' : 'transform translate-y-[5rem] opacity-100') : 'transform -translate-y-[8rem] opacity-0'}`} style={{ pointerEvents: isDropdownOpen ? 'auto' : 'none' }} >
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
  )
}
