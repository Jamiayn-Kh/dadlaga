"use client";
import { useEffect, useState } from "react";
import Results from "@/components/Results";
import AuthCheck from "@/components/AuthCheck";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("movies");
    if (stored) {
      setMovies(JSON.parse(stored));
    }
  }, []);

  return (
    <AuthCheck>
      <div className="max-w-6xl mx-auto p-3">
        <Results results={movies} />
      </div>
    </AuthCheck>
  );
}