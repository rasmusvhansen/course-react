import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { findMovies } from './services/movies';
import { MovieSearch } from './MovieSearch';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-5xl bg-slate-200 border-x-2 border-slate-600 h-screen overflow-auto mx-auto px-8 py-8">
      <h1 className="h">Find movies</h1>
      <MovieSearch></MovieSearch>
    </div>
  );
}

export default App;
