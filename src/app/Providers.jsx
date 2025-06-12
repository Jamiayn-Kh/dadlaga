'use client'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'

export default function Providers({children }) {
  return (
    <ThemeProvider defaultTheme='system' attribute="class">
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}