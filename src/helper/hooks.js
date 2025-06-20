import { useState, useEffect } from 'react';

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsTablet(window.innerWidth <= 1024);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isTablet;
} 