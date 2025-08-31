import React from 'react'

export default function page() {
  return (
    <div className='max-w-6xl mx-auto p-6 space-y-6'>
        <h1 className='text-3xl font-bold text-amber-600 mb-6'>Системийн тухай</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className='text-xl font-semibold mb-4'>PDF Viewer систем</h2>
          <p className="text-gray-700 mb-4">
            Энэ бол PDF баримтуудыг хялбар ашиглаж, хадгалж, харах боломжтой веб систем юм. 
            Next.js болон Tailwind CSS ашиглан хийгдсэн энэхүү систем нь хэрэглэгчдэд 
            PDF баримтуудыг шууд вэб дээр харах боломжийг олгодог.
          </p>
          
          <h3 className='text-lg font-semibold mb-3'>Үндсэн онцлогууд:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>PDF баримтуудыг шууд вэб дээр харах</li>
            <li>Хэрэглэгчийн эрхээр хандалт удирдах</li>
            <li>Админ эрхтэй хэрэглэгч PDF нэмэх, устгах</li>
            <li>Баримт харах статистик хадгалах</li>
            <li>Хамгийн их уншсан баримтуудыг эрэмбэлэх</li>
            <li>Хялбар хайлтын боломж</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className='text-xl font-semibold mb-4'>Технологиуд:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS</li>
            <li><strong>Backend:</strong> Next.js API Routes</li>
            <li><strong>Database:</strong> PostgreSQL, Prisma ORM</li>
            <li><strong>File Storage:</strong> AWS S3</li>
            <li><strong>Authentication:</strong> Custom JWT-based auth</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className='text-xl font-semibold mb-4'>Хэрэглэгчийн эрхүүд:</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-green-600">Энгийн хэрэглэгч:</h4>
              <p className="text-gray-700">PDF баримтуудыг харах, хайх боломжтой</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600">Админ хэрэглэгч:</h4>
              <p className="text-gray-700">PDF баримт нэмэх, устгах, бүх статистик харах боломжтой</p>
            </div>
          </div>
        </div>
    </div>
  )
}
