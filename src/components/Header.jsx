'use client';
import React, { useState } from 'react'
import MenuItem from './MenuItem'
import {AiFillHome} from 'react-icons/ai'
import {BsFillInfoCircleFill} from 'react-icons/bs'
import {FaUser, FaSignOutAlt, FaSignInAlt, FaCloudUploadAlt, FaBars, FaTimes} from 'react-icons/fa'
import Link from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href={'/'} className="flex items-center">
              <span className='text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent'>
                PDFviewer
              </span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <MenuItem title="home" address="/" Icon={AiFillHome}/>
            <MenuItem title="about" address="/about" Icon={BsFillInfoCircleFill}/>
            {isAuthenticated && (
              <>
                <MenuItem title="profile" address="/profile" Icon={FaUser}/>
                <MenuItem title="documents" address="/documents" Icon={BsFillInfoCircleFill}/>
                {user?.role === "ADMIN" && (
                  <MenuItem title="my content" address="/upload" Icon={FaCloudUploadAlt}/>
                )}
              </>
            )}
          </nav>

          {/* Right side - Auth, Dark Mode & Mobile Menu */}
          <div className="flex items-center space-x-4">
            
            {/* Dark Mode Toggle */}
            <div className="block">
              <DarkModeSwitch />
            </div>
            
            {/* Authentication */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Сайн байна уу, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 font-medium"
                  title="Гарах"
                >
                  <FaSignOutAlt />
                  <span>Гарах</span>
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium"
              >
                <FaSignInAlt />
                <span>Нэвтрэх</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900">
              
              {/* Mobile Dark Mode Toggle */}
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Харанхуй горим:</span>
                <DarkModeSwitch />
              </div>
              
              <Link 
                href="/" 
                className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <AiFillHome className="mr-3" />
                Home
              </Link>
              <Link 
                href="/about" 
                className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BsFillInfoCircleFill className="mr-3" />
                About
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    href="/profile" 
                    className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUser className="mr-3" />
                    Profile
                  </Link>
                  <Link 
                    href="/documents" 
                    className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BsFillInfoCircleFill className="mr-3" />
                    Documents
                  </Link>
                  {user?.role === "ADMIN" && (
                    <Link 
                      href="/upload" 
                      className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaCloudUploadAlt className="mr-3" />
                      My Content
                    </Link>
                  )}
                  
                  {/* Mobile logout */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Гарах
                  </button>
                </>
              )}
              
              {!isAuthenticated && (
                <Link 
                  href="/login" 
                  className="flex items-center px-3 py-2 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaSignInAlt className="mr-3" />
                  Нэвтрэх
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}