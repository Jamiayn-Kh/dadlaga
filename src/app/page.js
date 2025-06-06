import Results from '@/components/Results';
import AuthCheck from '@/components/AuthCheck';

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  // Authentication шалгалт client-side дээр хийх
  return (
    <AuthCheck>
      <HomePage searchParams={searchParams} />
    </AuthCheck>
  );
}

async function HomePage({ searchParams }) {
  const genre = searchParams.genre || 'fetchTrending';
  
  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === 'fetchTopRated' ? `/movie/top_rated` : `/trending/all/week`
    }?api_key=${API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const results = data.results;

  return (
    <div className="max-w-6xl mx-auto p-3">
      <Results results={results} />
    </div>
  );
}