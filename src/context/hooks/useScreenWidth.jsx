import { useEffect, useState } from 'react';

export default function useScreenWidth() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Example breakpoint
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth < 1024
  ); // Example breakpoint
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < 1440); // Example breakpoint

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768); // Update based on your responsive breakpoint
      setIsMediumScreen(window.innerWidth < 1024); // Update based on your responsive breakpoint
      setIsLargeScreen(window.innerWidth < 1440); // Update based on your responsive breakpoint
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isSmallScreen, isMediumScreen, isLargeScreen };
}
