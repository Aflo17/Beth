export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  stripe_customer_id?: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  storage_path: string;
  duration_seconds?: number;
  thumbnail_url?: string;
  pricing_tier_required: string;
  is_published: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface VideoAudit {
  id: string;
  admin_id: string;
  action_type: 'upload' | 'publish' | 'unpublish' | 'delete' | 'update';
  video_id?: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface VideoPlay {
  id: string;
  user_id: string;
  video_id: string;
  played_at: string;
  duration_watched: number;
}

export interface AuthState {
  user: User | null;
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
}