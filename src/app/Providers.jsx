'use client'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'
import { SessionProvider } from 'next-auth/react'

export default function Providers({children }) {
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme='system' attribute="class">
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}