'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Navbar from './Navbar';
import SearchBox from './SearchBox';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Login болон register хуудсан дээр header харуулахгүй
  const hideLayout = pathname === '/login' || pathname === '/register';

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      
      <Navbar />
      <SearchBox />
      {children}
    </>
  );
}