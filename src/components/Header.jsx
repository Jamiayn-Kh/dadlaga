'use client';
import React from 'react'
import MenuItem from './MenuItem'
import {AiFillHome} from 'react-icons/ai'
import {BsFillInfoCircleFill} from 'react-icons/bs'
import {FaUser, FaSignOutAlt, FaSignInAlt, FaCloudUploadAlt} from 'react-icons/fa'
import Link from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
        <div className="flex gap-4 items-center">
           
            <MenuItem title="home" address="/" Icon={AiFillHome}/>
            <MenuItem title="about" address="/about" Icon={BsFillInfoCircleFill}/>
            {isAuthenticated && (
              <MenuItem title="profile" address="/profile" Icon={FaUser}/>
            )}
            
            {isAuthenticated&&(
              <MenuItem title="my content" address="/upload" Icon={FaCloudUploadAlt}/>
            )}
        </div>
        <div className='flex items-center gap-4'>
            <DarkModeSwitch />
            
            {/* Authentication бүрэлдэхүүн хэсэг */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
                  Сайн байна уу, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  title="Гарах"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Гарах</span>
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                <FaSignInAlt />
                <span className="hidden sm:inline">Нэвтрэх</span>
              </Link>
            )}
       
            <Link href={'/'} className="flex gap-1 items-center">
                <span className='text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg text-white'>
                    IMDb
                </span>
            </Link>
        </div>
    </div>
  )
}