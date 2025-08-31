'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaShieldAlt, FaEdit, FaSignOutAlt } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }
  }, [isAuthenticated, authLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Хэрэглэгчийн мэдээлэл
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Таны бүртгэлийн мэдээлэл болон тохиргоонууд
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user?.username || 'Хэрэглэгч'}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <FaShieldAlt className={`w-4 h-4 ${user?.role === 'ADMIN' ? 'text-red-500' : 'text-green-500'}`} />
                      <span className={`text-sm font-medium ${user?.role === 'ADMIN' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {user?.role === 'ADMIN' ? 'Админ' : 'Энгийн хэрэглэгч'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => router.push('/profile/edit')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  <FaEdit />
                  <span>Засах</span>
                </button>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <FaUser className="w-5 h-5 text-amber-500" />
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Хэрэглэгчийн нэр
                      </label>
                    </div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {user?.username || 'Мэдээлэл байхгүй'}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <FaEnvelope className="w-5 h-5 text-amber-500" />
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        И-мэйл хаяг
                      </label>
                    </div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {user?.email || 'Мэдээлэл байхгүй'}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <FaCalendar className="w-5 h-5 text-amber-500" />
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Бүртгүүлсэн огноо
                    </label>
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('mn-MN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Мэдээлэл байхгүй'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Хурдан үйлдлүүд
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/documents')}
                  className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <span>Баримтууд харах</span>
                  <span>→</span>
                </button>
                
                {user?.role === 'ADMIN' && (
                  <button
                    onClick={() => router.push('/upload')}
                    className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <span>PDF нэмэх</span>
                    <span>→</span>
                  </button>
                )}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <span>Гарах</span>
                  <FaSignOutAlt />
                </button>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Хэрэглэгчийн статистик
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Эрх:</span>
                  <span className={`font-medium ${user?.role === 'ADMIN' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {user?.role === 'ADMIN' ? 'Админ' : 'Энгийн'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Статус:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Идэвхтэй</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Нэвтэрсэн:</span>
                  <span className="text-gray-900 dark:text-white font-medium">Тийм</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}