/*
  # Membership Platform Database Schema

  1. Tables
    - `profiles` - User profiles with subscription info
    - `videos` - Video content with access control
    - `subscriptions` - Stripe subscription tracking
    - `video_audit` - Admin action logging
    - `video_plays` - Video viewing analytics

  2. Security
    - Enable RLS on all tables
    - Strict policies for data access
    - Admin-only access for sensitive operations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  email_verified boolean DEFAULT false,
  stripe_customer_id text UNIQUE,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  storage_path text NOT NULL,
  duration_seconds integer,
  thumbnail_url text,
  pricing_tier_required text DEFAULT 'basic',
  is_published boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id text UNIQUE NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid')),
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Video audit table
CREATE TABLE IF NOT EXISTS video_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES profiles(id),
  action_type text NOT NULL CHECK (action_type IN ('upload', 'publish', 'unpublish', 'delete', 'update')),
  video_id uuid REFERENCES videos(id),
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Video plays table
CREATE TABLE IF NOT EXISTS video_plays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  played_at timestamptz DEFAULT now(),
  duration_watched integer DEFAULT 0
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_plays ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id AND email_verified = true);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Videos policies
CREATE POLICY "videos_select_published" ON videos
  FOR SELECT USING (
    is_published = true 
    AND EXISTS (
      SELECT 1 FROM subscriptions s 
      WHERE s.user_id = auth.uid() 
      AND s.status = 'active'
      AND s.current_period_end > NOW()
    )
  );

CREATE POLICY "videos_admin_all" ON videos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
      AND p.email_verified = true
    )
  );

-- Subscriptions policies
CREATE POLICY "subscriptions_select_own" ON subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "subscriptions_admin_all" ON subscriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
      AND p.email_verified = true
    )
  );

-- Video audit policies (admin only)
CREATE POLICY "video_audit_admin_all" ON video_audit
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
      AND p.email_verified = true
    )
  );

-- Video plays policies
CREATE POLICY "video_plays_select_own" ON video_plays
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "video_plays_insert_own" ON video_plays
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "video_plays_admin_all" ON video_plays
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
      AND p.email_verified = true
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(is_published);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_video_plays_user_video ON video_plays(user_id, video_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();