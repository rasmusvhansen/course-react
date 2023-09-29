# Cheatsheet for React Course

[The official React documentation](https://react.dev/learn#components) is outstanding, so I advise you to get to know it. I will link to it throughout this cheatsheet.

I have tried to summarize the most important bits below especially where usage of TypeScript introduces some differences to the official documentation.

## Components in TypeScript

A [component](https://react.dev/learn#components) in React is a function that starts with a capital letter and return tsx. Tsx is an html-like syntax that makes it easy to create DOM elements combined with TypeScript. We will focus on the TypeScript variant tsx.

A component takes a single `props` argument which contains the properties the component will use for rendering and behaviour. In most cases the `props` argument is [destructured](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) into its parts for easy access. The following three examples are fully equivalent:

```typescript
// Props argument in its most basic form with corresponding TS type information
function MyComponent(props: { title: string; length: number }) {
  return (
    <>
      <h1>{props.title}</h1>
      <p>Length: {props.length}</p>
    </>
  );
}

// Same as above but individual properties extracted by desctructuring.
// This is the most common way
function MyComponent({ title, length }: { title: string; length: number }) {
  return (
    <>
      <h1>{title}</h1>
      <p>Length: {length}</p>
    </>
  );
}

type MyComponentProps = { title: string; length: number };

// Same as above using destructuring but the type has been extracted to a
// 'MyComponentProps' type for reuse elsewhere
function MyComponent({ title, length }: MyComponentProps) {
  return (
    <>
      <h1>{title}</h1>
      <p>Length: {length}</p>
    </>
  );
}
```

## Events in React TypeScript

If your custom component needs to expose an event handler such as `onClick`, `onSearch` etc. it can be done like in the section ["Sharing data between components"](https://react.dev/learn#sharing-data-between-components).

Using TypeScript to do the same looks something like this:

```typescript
// Notice the typing of the onClick event. We specify that it takes no arguments and
// returns nothing (void)
function MyButton({ count, onClick }: {count: number: onClick: () => void}) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```
