import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 598);

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth <= 598);
    };

    window.addEventListener('resize', updateView);
    return () => {
      window.removeEventListener('resize', updateView);
    };
  }, []);

  return isMobileView;
};

export default useWindowSize;
