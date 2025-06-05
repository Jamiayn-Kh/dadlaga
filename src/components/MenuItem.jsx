'use client';
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function MenuItem({title, address, Icon}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Profile хуудсыг хамгаалах
  const handleClick = (e) => {
    if (title === 'profile' && !isAuthenticated) {
      e.preventDefault();
      alert('Профайл хэсэгт орохын тулд эхлээд нэвтэрнэ үү!');
      router.push('/login');
      return;
    }
  };

  return (
    <Link 
      href={address} 
      className='hover:text-amber-500 flex items-center gap-1'
      onClick={handleClick}
    >
        <Icon className="text-2xl sm:hidden"/>
        <p className='uppercase hidden sm:inline text-sm'>{title}</p>
    </Link>
  )
}