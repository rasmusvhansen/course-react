import { movies as staticMovies } from './dummydata';
import { Movie } from './services/movies';

export function MovieSearch() {
  return (
    <div className="pt-4 flex flex-col">
      <Movies movies={staticMovies} />
    </div>
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
