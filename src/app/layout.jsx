

import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import ConditionalLayout from '@/components/ConditionalLayout'
import Providers from './Providers'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          
          
          {/* ConditionalLayout нь Header-ийг зарим хуудсанд харуулахгүй */}
          <ConditionalLayout>
           
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
} 