@@ .. @@
-import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
-import { Database } from '@/types/database';
+import { createClient } from '@supabase/supabase-js';

-export const createClient = () => createClientComponentClient<Database>();
+const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
+const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
+
+if (!supabaseUrl || !supabaseAnonKey) {
+  throw new Error('Missing Supabase environment variables');
+}
+
+export const createClient = () => createClient(supabaseUrl, supabaseAnonKey);