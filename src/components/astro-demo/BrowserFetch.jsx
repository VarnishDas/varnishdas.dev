import { useEffect, useState } from "react";

export default function BrowserFetch() {
  const [post, setPost] = useState(null);
  const [hasError, setHasError] = useState(false);

  // Fetch data in the browser.
  useEffect(() => {
    let isMounted = true;

    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then((data) => {
        if (isMounted) setPost(data);
      })
      .catch(() => {
        if (isMounted) setHasError(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <article className="astro-demo__fetch-card" aria-live="polite">
      <div className="astro-demo__fetch-status">
        <span className="astro-demo__live-dot" aria-hidden="true" />
        {hasError
          ? "Could not load the example data."
          : post
            ? "Data loaded in browser"
            : "Loading..."}
      </div>
      {post && (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      )}
      <span className="astro-demo__fetch-source">jsonplaceholder.typicode.com</span>
    </article>
  );
}
