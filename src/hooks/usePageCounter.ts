import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const usePageCounter = () => {
  const [visitCount, setVisitCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const incrementPageViews = async () => {
      try {
        // First, get the current count
        const { data: currentData, error: fetchError } = await supabase
          .from('page_views')
          .select('count')
          .eq('id', 1)
          .single();

        if (fetchError) {
          console.error('Error fetching page views:', fetchError);
          setIsLoading(false);
          return;
        }

        const currentCount = currentData?.count || 0;
        const newCount = currentCount + 1;

        // Update the count in Supabase
        const { error: updateError } = await supabase
          .from('page_views')
          .update({ 
            count: newCount,
            updated_at: new Date().toISOString()
          })
          .eq('id', 1);

        if (updateError) {
          console.error('Error updating page views:', updateError);
          setVisitCount(currentCount); // Show current count even if update failed
        } else {
          setVisitCount(newCount);
        }
      } catch (error) {
        console.error('Error in page counter:', error);
      } finally {
        setIsLoading(false);
      }
    };

    incrementPageViews();
  }, []); // Empty dependency array means this runs once per page load

  return { visitCount, isLoading };
};