import { useState } from "react";

export default function CounterIsland({ title }) {
  const [count, setCount] = useState(0);

  return (
    <article className="astro-demo__counter">
      <div className="astro-demo__counter-copy">
        <h3>{title}</h3>
        <span className="astro-demo__counter-kind">React island</span>
      </div>
      <output className="astro-demo__counter-value" aria-live="polite">
        {count}
      </output>
      <div className="astro-demo__counter-actions">
        <button
          type="button"
          aria-label="Decrease counter"
          onClick={() => setCount((value) => value - 1)}
        >
          −
        </button>
        <button
          type="button"
          aria-label="Increase counter"
          onClick={() => setCount((value) => value + 1)}
        >
          +
        </button>
      </div>
    </article>
  );
}
