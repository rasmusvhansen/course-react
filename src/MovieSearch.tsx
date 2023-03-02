import { useState } from 'react';
import { findMovies, Movie, SearchResult } from './services/movies';
import { Spinner } from './Spinner';

export function MovieSearch() {
  const [searchResult, setSearchResult] = useState<SearchResult | 'Loading'>();

  const search = async (query: string, page = 1) => {
    setSearchResult('Loading');
    const result = await findMovies(query, page);
    setSearchResult(result);
  };

  return (
    <>
      <Search onSearch={search} />
      {searchResult === 'Loading' && (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      )}
      {typeof searchResult === 'object' && (
        <div className="pt-4 flex flex-col">
          <Movies movies={searchResult.movies} />
        </div>
      )}
    </>
  );
}

function Search({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch(query);
      }}
    >
      <input type="search" className="input" placeholder="Search for movies" value={query} onInput={e => setQuery(e.currentTarget.value)} />
    </form>
  );
}

export function Movies({ movies }: { movies: Movie[] | undefined }) {
  return <div className="grid grid-cols-3 gap-4 mt-4">{movies && movies.map(m => <MovieTile m={m} key={m.id} />)}</div>;
}

export function MovieTile({ m }: { m: Movie }) {
  return (
    <a href={m.link} target="_blank" rel="noreferrer" className="shadow-xl group relative w-[300px] overflow-hidden">
      {m.poster && <img className="group-hover:opacity-10" src={m.poster} alt={m.description} />}
      <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 p-4 ">
        <h3>
          {m.title} [{m.releaseYear}] [{m.rating.toFixed(1)}]
        </h3>
        <p>{m.description}</p>
      </div>
    </a>
  );
}
