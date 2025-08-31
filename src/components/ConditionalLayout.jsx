'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Login болон Register хуудсанд Header-ийг харуулахгүй
  const shouldHideHeader = pathname === '/login' || pathname === '/register';

  if (shouldHideHeader) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}