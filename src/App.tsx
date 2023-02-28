import { useEffect, useState } from 'react';
import { MovieSearch } from './MovieSearch';

function App() {
  return (
    <div className="max-w-5xl bg-slate-200 border-x-2 border-slate-600 h-screen overflow-auto mx-auto px-8 py-8">
      <PlayGround />
      {/* <h1>Find movies</h1>
      <MovieSearch></MovieSearch> */}
    </div>
  );
}

export default App;

function PlayGround() {
  const stringData = 'Some string';
  const moreComplexData = { a: 'Prop A', b: 'Prop B', items: [7, 9, 13] };
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-4">
      <p>JSX/TSX works just like html</p>
      <p className="bg-orange-300">Except css class is named className due to class being a reserved word</p>
      <p>Dynamic data can be rendered by enclosing in single curly braces: {stringData}</p>
      <p>
        Any JS/TS expression can be written inside the curly braces, so accessing nested properties or mapping over an array is no problem:{' '}
        {moreComplexData.a} | {moreComplexData.b} |{' '}
        {moreComplexData.items.map(n => (
          <span key={n} style={{ fontSize: `${n * 2}px` }}>
            {n}
          </span>
        ))}
      </p>
      <p>
        A React component is simply a function that (optionally) accepts props and returns a JSX.Element. A component rerenders whenever its
        props change or when its internal state changes. The rerender includes rerendering its children
      </p>
      <p>{count}</p>
    </div>
  );
}
