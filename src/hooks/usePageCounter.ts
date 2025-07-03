import { useState, useEffect } from 'react';

export const usePageCounter = () => {
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    // Get current count from localStorage (starts at 0 if not exists)
    const currentCount = localStorage.getItem('fitwithbeth-visit-count');
    let count = currentCount ? parseInt(currentCount, 10) : 0;
    
    // Increment the count for this visit
    count += 1;
    
    // Store the new count
    localStorage.setItem('fitwithbeth-visit-count', count.toString());
    
    // Update state to show the new count
    setVisitCount(count);
  }, []); // Empty dependency array means this runs once per page load

  return visitCount;
};