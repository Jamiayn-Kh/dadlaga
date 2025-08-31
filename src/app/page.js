"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            PDF Viewer системд{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              тавтай морил
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            PDF баримтуудаа хялбар ашиглаж, хадгалж, харах боломжтой платформ
          </p>
          
          {!isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Баримтуудыг харахын тулд эхлээд нэвтэрнэ үү
              </p>
              <Link 
                href="/login" 
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Нэвтрэх
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Баримтуудыг харах бол доорх товчлуурыг дарна уу
              </p>
              <Link 
                href="/documents" 
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Баримтуудыг харах
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-6">📄</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">PDF харах</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                PDF баримтуудыг шууд вэб дээр харах боломжтой. Google Docs Viewer ашиглан хурдан, найдвартай харах.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-6">🔍</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Хялбар хайлт</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Баримтуудаа хялбар хайж олох боломжтой. Нэр, тайлбараар хайх, эрэмбэлэх.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-6">📊</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Статистик</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Хамгийн их уншсан баримтуудыг харах. Top Rated функцээр тренд баримтуудыг ол.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-6">🔐</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Хандалтын эрх</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Хэрэглэгчийн эрхээр хандалт удирдах. Админ эрхтэй хэрэглэгч PDF нэмэх, устгах.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-6">📱</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Responsive дизайн</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Бүх төхөөрөмж дээр сайн харагдах responsive дизайн. Mobile, tablet, desktop дэмжлэг.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Хурдан ажиллагаа</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Next.js ашиглан хурдан, найдвартай ажиллагаа. AWS S3 дээр найдвартай хадгалалт.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Одоо эхлэх үү?
              </h2>
              <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
                PDF баримтуудаа хялбар ашиглаж эхлэхийн тулд бүртгүүлээрэй эсвэл нэвтэрнэ үү.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/register" 
                  className="bg-white text-amber-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Бүртгүүлэх
                </Link>
                <Link 
                  href="/login" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-amber-600 transition-colors font-semibold"
                >
                  Нэвтрэх
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}