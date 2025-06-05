import React from 'react'
import NavbarItem from './NavbarItem'


export default function Navbar() {
  return (
    <div className='flex bg-amber-200 dark:!bg-gray-800 p-4 lg:text-lg
    justify-center gap-6 transition-colors duration-300'>
        
        <NavbarItem title="Trending" 
        param="fetchTrending"/>
        <NavbarItem title="Top Rated" 
        param="fetchTrending"/>
        

    </div>
  )
}
