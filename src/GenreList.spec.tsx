import { render, screen } from '@testing-library/react';
import { GenreList } from './MovieSearch';
import { Genres } from './services/movies';

const genres: Genres = [
  {
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Horror'
  },
  {
    id: 3,
    name: 'Animation'
  }
];

describe('GenreList', () => {
  it('should render all genres passed in', async () => {
    const clickFn = vitest.fn();
    render(<GenreList genres={genres} onGenreClick={clickFn} />);

    const genreButtons = screen.getAllByRole('button');
    expect(genreButtons).toHaveLength(3);
    expect(genreButtons.map(gb => gb.textContent)).toEqual(['Action', 'Horror', 'Animation']);
  });

  it('should respond to click with genre id', async () => {
    const clickFn = vitest.fn();
    render(<GenreList genres={genres} onGenreClick={clickFn} />);

    const genreButtons = screen.getAllByRole('button');
    genreButtons.at(1)?.click();
    expect(clickFn).toHaveBeenCalledWith(2);
  });
});
