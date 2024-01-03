"use client";
import { useRef, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    console.log("You clicked " + ref.current + " times!");
  }

  return (
    <>
      <button onClick={handleClick}>Click me!</button>;
      <br />
      <br />
      <br />
      <p>you pressed y {ref.current}</p>
      <br />
      <br />
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className="w-[40px] bg-slate-300"
        >
          +
        </button>
        <h2>
          <span>you clicked{count}</span>
        </h2>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
          className="w-[40px] bg-slate-300"
        >
          -
        </button>
      </div>
    </>
  );
}
