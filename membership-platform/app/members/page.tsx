import { createServerClient } from '@/lib/supabase-server';
import { getUserSubscription } from '@/lib/subscription';
import { MemberShell } from '@/components/MemberShell';

export default async function MembersPage() {
  const supabase = createServerClient();
  
  // Get current session
  const { data: { session } } = await supabase.auth.getSession();
  
  let user = null;
  let subscription = null;
  let videos = [];
  
  if (session?.user) {
    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    user = profile;
    
    if (user) {
      // Get subscription
      subscription = await getUserSubscription(user.id);
      
      // Get published videos (preview for non-subscribers, full list for subscribers)
      const { data: videoData } = await supabase
        .from('videos')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(subscription ? 50 : 3); // Limit preview to 3 videos
      
      videos = videoData || [];
    }
  }
  
  return (
    <MemberShell 
      user={user}
      subscription={subscription}
      videos={videos}
    />
  );
}