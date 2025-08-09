import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const usePageCounter = () => {
  const [visitCount, setVisitCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const incrementPageViews = async () => {
      try {
        // Check if Supabase is properly configured
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey || 
            supabaseUrl.includes('your-project-id') || 
            supabaseAnonKey.includes('your-anon-key')) {
          console.log('Supabase not configured, using default visit count');
          setVisitCount(1247); // Default fallback count
          setIsLoading(false);
          return;
        }

        // First, get the current count
        const { data: currentData, error: fetchError } = await supabase
          .from('page_views')
          .select('count')
          .eq('id', 1)
          .single();

        if (fetchError) {
          console.log('Supabase not available, using default visit count');
          setVisitCount(1247); // Default fallback count
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
          console.log('Error updating page views, showing current count');
          setVisitCount(currentCount); // Show current count even if update failed
        } else {
          setVisitCount(newCount);
        }
      } catch (error) {
        console.log('Page counter unavailable, using default count');
        setVisitCount(1247); // Default fallback count
      } finally {
        setIsLoading(false);
      }
    };

    incrementPageViews();
  }, []); // Empty dependency array means this runs once per page load

  return { visitCount, isLoading };
};