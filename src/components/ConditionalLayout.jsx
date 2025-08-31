'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Бүх хуудсанд Header-ийг харуулах
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}