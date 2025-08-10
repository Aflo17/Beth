import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database';

export const createClient = () => {
  // For development, return a mock client if no env vars are set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables not set. Using mock client for development.');
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ error: { message: 'Please configure Supabase credentials' } }),
        signUp: () => Promise.resolve({ error: { message: 'Please configure Supabase credentials' } }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
        insert: () => Promise.resolve({ error: null }),
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ error: { message: 'Please configure Supabase credentials' } }),
          createSignedUrl: () => Promise.resolve({ error: { message: 'Please configure Supabase credentials' } }),
          remove: () => Promise.resolve({ error: null }),
        }),
      },
    } as any;
  }
  
  return createClientComponentClient<Database>();
};