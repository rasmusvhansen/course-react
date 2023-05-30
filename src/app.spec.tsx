import { TMDBResult } from './services/movies';

// eslint-disable-next-line no-multi-assign
const fetchMock = (global.fetch = vi.fn());
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFetch = (data: any) => fetchMock.mockResolvedValue({ json: () => Promise.resolve(data) } as Response);
const mockFindMovies = (movieResult: TMDBResult) => mockFetch(movieResult);

mockFindMovies({
  page: 1,
  total_pages: 5,
  total_results: 90,
  results: [
    {
      id: 1,
      title: 'Title 1',
      overview: 'Overview 1',
      vote_average: 1.5,
      poster_path: 'poster1.jpg'
    }
  ]
});

describe('App', () => {
  it('should work', () => {
    expect(1).toBe(1);
  });
});

export {};
