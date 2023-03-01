import { z } from 'zod';

const API_KEY = '1f6c2a0c19216b40ace14c9e85600368';

export async function findMovies(query: string, currentPage = 1): Promise<SearchResult> {
  const json = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${currentPage}&include_adult=false&query=${query}`
  );
  return await parseMovieResult(json, query);
}

export async function getGenres() {
  const json = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&include_adult=false`);
  const res = TMDBGenreSchema.parse(await json.json());
  console.log(res);
  return res.genres;
}

export async function findByGenre(genreId: number, currentPage = 1): Promise<SearchResult> {
  const json = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&with_genres=${genreId}&sort_by=popularity.desc&page=${currentPage}`
  );
  return await parseMovieResult(json, genreId);
}

async function parseMovieResult(json: Response, queryOrGenreId: string | number): Promise<SearchResult> {
  const { results, page, total_pages, total_results } = TMDBResultSchema.parse(await json.json());
  return {
    movies: results.map(toMovie).filter(m => !!m.poster),
    page,
    totalPages: Math.min(10, total_pages),
    results: total_results,
    queryOrGenreId
  };
}

function toMovie(m: TMDBMovie): Movie {
  return {
    id: m.id,
    link: `https://www.themoviedb.org/movie/${m.id}`,
    title: m.title,
    description: m.overview,
    releaseYear: +m.release_date.slice(0, 4),
    rating: m.vote_average,
    poster: m.poster_path && `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${m.poster_path}`
  };
}

export interface Movie {
  id: number;
  link: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  poster: string | null;
}

export interface SearchResult {
  results: number;
  totalPages: number;
  page: number;
  movies: Movie[];
  queryOrGenreId: string | number;
}

const TMDBMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  vote_average: z.number(),
  poster_path: z.string().nullable()
});

const TMDBResultSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(TMDBMovieSchema)
});

const TMDBGenreSchema = z.object({ genres: z.array(z.object({ id: z.number(), name: z.string() })) });

type TMDBResult = z.infer<typeof TMDBResultSchema>;
type TMDBMovie = z.infer<typeof TMDBMovieSchema>;
type TMDBGenreResult = z.infer<typeof TMDBGenreSchema>;
export type Genres = TMDBGenreResult['genres'];
