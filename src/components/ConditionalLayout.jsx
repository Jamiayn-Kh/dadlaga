'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Login болон Register хуудсанд Header-ийг харуулахгүй
  const shouldHideHeader = pathname === '/login' || pathname === '/register';

  if (shouldHideHeader) {
    return <>{children}</>;
  }

  return (
    <main className="max-w-6xl mx-auto">
      <Navbar />
      {children}
    </main>
  );
}