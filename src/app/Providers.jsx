'use client'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'


export default function Providers({children }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AuthProvider>
        <div className='text-gray-700 dark:text-gray-200 dark:bg-gray-700 min-h-screen select-none transition-colors duration-300'>
        
          {children}
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}