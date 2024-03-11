import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// import debounce from './utils/debounce';
// /**
//  * useDimensions - A hook to measure DOM nodes and return their dimensions.
//  *
//  * @returns {array} - A tuple containing a ref, dimensions, and node.
//  */
// function useDimensions(
//   liveMeasure = true,
//   delay = 250,
//   initialDimensions = {}
// ) {
//   const [dimensions, setDimensions] = useState(initialDimensions);
//   const [node, setNode] = useState(null);
//   const isMounted = useRef(false); // Ref to track the mounted state

//   const ref = useCallback((newNode) => {
//     setNode(newNode);
//   }, []);

//   const measure = () => {
//     if (node && isMounted.current) {
//       window.requestAnimationFrame(() => {
//         const newDimensions = node.getBoundingClientRect();
//         setDimensions(newDimensions);
//       });
//     }
//   };

//   // Debounce the measure function directly
//   const debouncedMeasure = useCallback(debounce(measure, delay), [
//     measure,
//     delay,
//   ]);

//   useEffect(() => {
//     isMounted.current = true; // Set isMounted to true when the component mounts

//     if (!node) return;

//     let resizeObserver;
//     if (liveMeasure && 'ResizeObserver' in window) {
//       resizeObserver = new ResizeObserver(debouncedMeasure);
//       resizeObserver.observe(node);
//     }

//     window.addEventListener('resize', debouncedMeasure);
//     window.addEventListener('scroll', debouncedMeasure);

//     return () => {
//       if (resizeObserver) resizeObserver.disconnect();
//       window.removeEventListener('resize', debouncedMeasure);
//       window.removeEventListener('scroll', debouncedMeasure);
//       isMounted.current = false; // Set isMounted to false when the component unmounts
//     };
//   }, [node, liveMeasure, debouncedMeasure]);

//   return [ref, dimensions, node];
// }

// export default useDimensions;

const useDimensions = () => {
  // State to store the dimensions
  const [rect, setRect] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  // Callback to update dimensions
  const handleResize = useCallback(() => {
    if (ref.current) {
      setRect({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, []);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(handleResize);
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [handleResize]);

  return [ref, rect];
};

export default useDimensions;
