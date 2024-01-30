import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver({
  threshold = 1,
  root = null,
  rootMargin = '0%',
}) {
  const [entry, setEntry] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setEntry(entry), {
      root,
      rootMargin,
      threshold,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [root, rootMargin, threshold]);

  return [observerRef, entry];
}

export default useIntersectionObserver;
