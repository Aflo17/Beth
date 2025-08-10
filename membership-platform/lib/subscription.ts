import { createServerClient } from './supabase-server';

export async function checkActiveSubscription(userId: string): Promise<boolean> {
  try {
    const supabase = createServerClient();
    
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('status, current_period_end')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error || !subscription) {
      return false;
    }

    // Check if subscription is still active (not expired)
    const now = new Date();
    const periodEnd = new Date(subscription.current_period_end);
    
    return periodEnd > now;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
}

export async function getUserSubscription(userId: string) {
  try {
    const supabase = createServerClient();
    
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) {
      return null;
    }

    return subscription;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}