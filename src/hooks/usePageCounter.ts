import { useState, useEffect } from 'react';

export const usePageCounter = () => {
  const [visitCount, setVisitCount] = useState<number>(() => {
    // Initialize with current count from localStorage
    const currentCount = localStorage.getItem('fitwithbeth-visit-count');
    return currentCount ? parseInt(currentCount, 0) : 0;
  });

  useEffect(() => {
    // Check if we've already counted this session
    const sessionKey = 'fitwithbeth-session-counted';
    const hasCountedThisSession = sessionStorage.getItem(sessionKey);
    
    if (!hasCountedThisSession) {
      // Get current count from localStorage
      const currentCount = localStorage.getItem('fitwithbeth-visit-count');
      let count = currentCount ? parseInt(currentCount, 0) : 0;
      
      // Increment the count
      count += 1;
      
      // Store the new count
      localStorage.setItem('fitwithbeth-visit-count', count.toString());
      
      // Mark this session as counted
      sessionStorage.setItem(sessionKey, 'true');
      
      // Update state
      setVisitCount(count);
    }
    // If session already counted, we already have the correct count from initialization
  }, []);

  return visitCount;
};