import { useState, useEffect } from 'react';

export const usePageCounter = () => {
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    // Get current count from localStorage
    const currentCount = localStorage.getItem('fitwithbeth-visit-count');
    let count = currentCount ? parseInt(currentCount, 10) : 0;
    
    // Increment the count
    count += 1;
    
    // Store the new count
    localStorage.setItem('fitwithbeth-visit-count', count.toString());
    
    // Update state
    setVisitCount(count);
  }, []);

  return visitCount;
};