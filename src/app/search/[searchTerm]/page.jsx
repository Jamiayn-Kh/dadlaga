import Results from '@/components/Results';

const API_KEY = process.env.API_KEY;

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;
  
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div className="max-w-6xl mx-auto p-3">
      <h2 className="text-2xl font-bold mb-4">Search Results for: {searchTerm}</h2>
      <Results results={results} />
    </div>
  );
}