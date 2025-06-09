'use client';
import Image from 'next/image';
import { FiThumbsUp } from 'react-icons/fi';
import { useRef } from 'react';
import Link from 'next/link'; // Link компонентийг импорт хийнэ


export default function Card({ result }) {
  const detailRef = useRef();

  return (
    // Link компонентоор картын бүх хэсгийг орооно
    <Link href={`/movie/${result.id}`} className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
      <div ref={detailRef} className='bg-white p-4 rounded-lg'>
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            result.backdrop_path || result.poster_path
          }`}
          width={500}
          height={300}
          className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'
          alt='Movie poster'
        />
        <div className='p-2'>
          <p className='line-clamp-2 text-md'>{result.overview}</p>
          <h2 className='text-lg font-bold truncate'>
            {result.title || result.name}
          </h2>
          <p className='flex items-center'>
            {result.release_date || result.first_air_date}
            <FiThumbsUp className='h-5 mr-1 ml-3' />
            {result.vote_count}
          </p>
        </div>
      </div>
    </Link>
  );
}