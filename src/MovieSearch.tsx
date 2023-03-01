import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { findByGenre, findMovies, GenreResult, Genres, getGenres, Movie, SearchResult } from './services/movies';
import { Spinner } from './Spinner';
import { range } from './util';

export function MovieSearch() {
  const [searchResult, setSearchResult] = useState<SearchResult | GenreResult | 'Loading'>();
  const [genres, setGenres] = useState<Genres>([]);
  useEffect(() => {
    const get = async () => {
      const genreResult = await getGenres();
      setGenres(genreResult);
    };
    get();
  }, []);

  const search = async (queryOrGenreId: string | number, page = 1) => {
    setSearchResult('Loading');
    const result = await (typeof queryOrGenreId === 'string' ? findMovies(queryOrGenreId, page) : findByGenre(queryOrGenreId, page));
    setSearchResult(result);
  };

  return (
    <>
      <GenreList genres={genres} onGenreClick={search} />
      <Search onSearch={search} />
      {searchResult === 'Loading' && (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      )}
      {typeof searchResult === 'object' && (
        <div className="pt-4 flex flex-col">
          <Pagination
            page={searchResult.page}
            totalPages={searchResult.totalPages}
            onPageChange={p => search(searchResult.query, p)}
          ></Pagination>
          <Movies movies={searchResult.movies} />
          <Pagination
            page={searchResult.page}
            totalPages={searchResult.totalPages}
            onPageChange={p => search(searchResult.query, p)}
          ></Pagination>
        </div>
      )}
    </>
  );
}

export function GenreList({ genres, onGenreClick }: { genres: Genres; onGenreClick: (genreId: number) => void }) {
  return (
    <div className="space-x-2 space-y-2 mb-4">
      {genres.map(g => (
        <button key={g.id} type="button" className="btn btn-secondary btn-xs" onClick={() => onGenreClick(g.id)}>
          {g.name}
        </button>
      ))}
    </div>
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

function Pagination({ onPageChange, totalPages, page }: { totalPages: number; page: number; onPageChange: (p: number) => void }) {
  return totalPages > 1 ? (
    <div className="btn-group self-end">
      {range(1, totalPages).map(p => (
        <button key={p} className={classNames('btn', { 'btn-active': p === page })} onClick={() => onPageChange(p)}>
          {p}
        </button>
      ))}
    </div>
  ) : null;
}

export function Movies({ movies }: { movies: Movie[] | undefined }) {
  return <div className="grid grid-cols-3 gap-4 mt-4">{movies && movies.map(m => <MovieTile m={m} key={m.id} />)}</div>;
}

export function MovieTile({ m }: { m: Movie }) {
  return (
    <a href={m.link} target="_blank" className="shadow-xl group relative w-[300px] overflow-hidden">
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
