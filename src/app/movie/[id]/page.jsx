// 'use client';

// import { PDFViewer } from '@react-pdf/renderer';
// import MoviePDF from '@/components/MoviePDF';
// import { useEffect, useState } from 'react';
// import { use } from 'react';
// import { useAuth } from '@/contexts/AuthContext';

// export default function MovieDetailPage({ params }) {
//   const [result, setResult] = useState(null);
//   const { user, isAuthenticated } = useAuth();
//   const movieId = use(params).id;

//   useEffect(() => {
//     const fetchData = async () => {
//       // const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=42d04d33034643ed721db7ebad1a5df6`);
//       // const data = await res.json();
//       // setResult(data);

//       // 🔵 Хэрэглэгч login хийгдсэн бол watch_history-д хадгална
//       if (isAuthenticated && user) {
//         console.log('User:', user);
//         try {
//           const response = await fetch("/api/watch/add", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ 
//               movieId: parseInt(movieId),
//               userEmail: user.email 
//             }),
//           });
//           const data = await response.json();
//           console.log('Watch history response:', data);
//         } catch (error) {
//           console.error("Watch history хадгалах үед алдаа:", error);
//         }
//       } else {
//         console.log('No user session found');
//       }
//     };

//     fetchData();
//   }, [movieId, isAuthenticated, user]);

//   if (!result) return <div>Түр хүлээнэ үү...</div>;

//   return (
//     <div className="p-4">
//       <div className="border shadow-lg p-4 bg-white">
//         <PDFViewer width="100%" height={600}>
//           <MoviePDF result={result} />
//         </PDFViewer>
//       </div>
//     </div>
//   );
// }



'use client';

import { PDFViewer } from '@react-pdf/renderer';
import MoviePDF from '@/components/MoviePDF';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function MovieDetailPage() {
  const params = useParams();
  const [result, setResult] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const movieId = params.id;

  useEffect(() => {
    // LocalStorage-оос контентуудыг уншиж тухайн id-тайг нь олно
    const stored = localStorage.getItem('movies');
    if (stored) {
      const movies = JSON.parse(stored);
      const movie = movies.find((m) => String(m.id) === String(movieId));
      setResult(movie);
    }
  }, [movieId]);

  useEffect(() => {
    // watch_history-д бүртгэх
    if (isAuthenticated && user && result) {
      fetch("/api/watch/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: parseInt(movieId),
          userEmail: user.email,
        }),
      }).catch((err) => {
        console.error("Watch history хадгалах үед алдаа:", err);
      });
    }
  }, [isAuthenticated, user, movieId, result]);

  if (!result) return <div>Түр хүлээнэ үү...</div>;

  return (
    <div className="p-4">
      <div className="border shadow-lg p-4 bg-white">
        <PDFViewer width="100%" height={600}>
          <MoviePDF result={result} />
        </PDFViewer>
      </div>
    </div>
  );
}
