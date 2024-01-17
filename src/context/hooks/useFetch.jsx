import { useState, useEffect, useRef } from 'react';

const cache = {};

const useFetch = (url) => {
  const cacheKey = url;
  const [data, setData] = useState(cache[cacheKey] || null);
  const [loading, setLoading] = useState(!cache[cacheKey]);
  const [error, setError] = useState(null);
  const cancelRequest = useRef(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        if (cache[cacheKey]) {
          setData(cache[cacheKey]);
          setLoading(false);
        } else {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Network response was not ok');
          const result = await response.json();
          cache[cacheKey] = result;
          if (cancelRequest.current) return;
          setData(result);
        }
      } catch (e) {
        if (cancelRequest.current) return;
        setError(e);
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        if (cancelRequest.current) return;
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to set cancelRequest.current to true
    // This will ignore the fetchData process if the component unmounts
    return () => {
      cancelRequest.current = true;
    };
  }, [url, cacheKey]);

  return { data, loading, error };
};

export default useFetch;
