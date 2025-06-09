'use client';

import { PDFViewer } from '@react-pdf/renderer';
import MoviePDF from '@/components/MoviePDF';
// jsPDF болон html2canvas импортуудыг устгана
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react'; // useRef-ийг устгана

export default function MovieDetailPage({ params }) {
  const [result, setResult] = useState(null);
  // pdfRef-ийг устгана
  // const pdfRef = useRef();

  useEffect(() => {
    // Fetch movie data (Та өөрийн TMDB API ашиглана)
    const fetchData = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=42d04d33034643ed721db7ebad1a5df6`);
      const data = await res.json();
      setResult(data);
    };
    fetchData();
  }, [params.id]);

  // handleDownload функцийг устгана
  // const handleDownload = async () => {
  //   const input = pdfRef.current;

  //   const canvas = await html2canvas(input, { scale: 2 });
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF('p', 'pt', 'a4');
  //   const width = pdf.internal.pageSize.getWidth();
  //   const height = (canvas.height * width) / canvas.width;
  //   pdf.addImage(imgData, 'PNG', 0, 0, width, height);
  //   pdf.save(`${result.title || result.name}.pdf`);
  // };

  if (!result) return <div>Түр хүлээнэ үү...</div>;

  return (
    <div className="p-4">
      {/* PDF татах товчлуурыг устгана */}
      {/* <button
        onClick={handleDownload}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        PDF татах
      </button> */}

      {/* Зөвхөн PDFViewer-ийг харуулна */}
      <div /* ref={pdfRef} -ийг устгана */ className="border shadow-lg p-4 bg-white">
        <PDFViewer width="100%" height={600}>
          <MoviePDF result={result} />
        </PDFViewer>
      </div>
    </div>
  );
}