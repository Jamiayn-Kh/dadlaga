"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [topRatedDocuments, setTopRatedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTopRated, setShowTopRated] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        console.log('Loading documents...');
        const res = await fetch('/api/documents');
        console.log('Documents API response status:', res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log('Documents loaded:', data);
          setDocuments(data);
          
          // Top rated documents (most viewed) - энгийн жишээ
          // Бодит системд API-аас view count-тай баримтуудыг авах хэрэгтэй
          const sortedByViews = [...data].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
          setTopRatedDocuments(sortedByViews.slice(0, 5)); // Top 5
        } else {
          console.error('Documents API error:', res.status, res.statusText);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDocuments();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Устгахдаа итгэлтэй байна уу?')) return;
    
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: user?.role })
      });
      
      if (res.ok) {
        setDocuments(docs => docs.filter(doc => doc.id !== id));
        setTopRatedDocuments(docs => docs.filter(doc => doc.id !== id));
        alert('Баримт амжилттай устгагдлаа');
      } else {
        const data = await res.json();
        alert(data.error || 'Устгах үед алдаа гарлаа');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Устгах үед алдаа гарлаа');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const currentDocuments = showTopRated ? topRatedDocuments : documents;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Баримтууд
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {showTopRated ? 'Хамгийн их уншсан баримтууд' : 'Бүх баримтууд'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowTopRated(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  !showTopRated 
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                Бүх баримтууд
              </button>
              <button
                onClick={() => setShowTopRated(true)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  showTopRated 
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                Top Rated
              </button>
            </div>
          </div>
        </div>
        
        {!isAuthenticated && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Баримтуудыг харахын тулд нэвтрэх хэрэгтэй.
            </div>
          </div>
        )}

        {showTopRated && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Хамгийн их уншсан баримтууд ({topRatedDocuments.length} баримт)
            </div>
          </div>
        )}
        
        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentDocuments.map((doc) => (
            <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* PDF Thumbnail */}
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(doc.url)}&embedded=true`}
                  title={doc.title}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
             
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {doc.title}
                </h3>
                {doc.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
                    {doc.description}
                  </p>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                  <p>Файл: {doc.originalName || doc.fileName}</p>
                  <p>Хэмжээ: {Math.round(doc.size / 1024)} KB</p>
                  {showTopRated && (
                    <p className="text-amber-600 dark:text-amber-400 font-semibold">
                      Уншилт: {doc.viewCount || 0} удаа
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/document/${doc.id}`}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 text-sm font-medium"
                  >
                    Үзэх
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Устгах
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {currentDocuments.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {showTopRated ? 'Одоогоор уншилтын статистик байхгүй байна' : 'Одоогоор баримт байхгүй байна'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {showTopRated ? 'Баримтуудыг уншиж эхлээд статистик харах боломжтой' : 'Эхний баримтаа нэмж эхлээрэй'}
            </p>
            {user?.role === 'ADMIN' && !showTopRated && (
              <Link 
                href="/upload" 
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 font-medium"
              >
                Эхний баримтаа нэмэх
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
