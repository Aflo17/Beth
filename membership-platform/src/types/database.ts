export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          email_verified: boolean;
          stripe_customer_id: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          email_verified?: boolean;
          stripe_customer_id?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          email_verified?: boolean;
          stripe_customer_id?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          storage_path: string;
          duration_seconds: number | null;
          thumbnail_url: string | null;
          pricing_tier_required: string;
          is_published: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          storage_path: string;
          duration_seconds?: number | null;
          thumbnail_url?: string | null;
          pricing_tier_required?: string;
          is_published?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          storage_path?: string;
          duration_seconds?: number | null;
          thumbnail_url?: string | null;
          pricing_tier_required?: string;
          is_published?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_subscription_id: string;
          status: string;
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_subscription_id: string;
          status: string;
          current_period_start: string;
          current_period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_subscription_id?: string;
          status?: string;
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      video_audit: {
        Row: {
          id: string;
          admin_id: string;
          action_type: string;
          video_id: string | null;
          details: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action_type: string;
          video_id?: string | null;
          details?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action_type?: string;
          video_id?: string | null;
          details?: any | null;
          created_at?: string;
        };
      };
      video_plays: {
        Row: {
          id: string;
          user_id: string;
          video_id: string;
          played_at: string;
          duration_watched: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_id: string;
          played_at?: string;
          duration_watched?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          video_id?: string;
          played_at?: string;
          duration_watched?: number;
        };
      };
      page_views: {
        Row: {
          id: number;
          count: number;
          updated_at: string;
        };
        Insert: {
          id: number;
          count?: number;
          updated_at?: string;
        };
        Update: {
          id?: number;
          count?: number;
          updated_at?: string;
        };
      };
    };
  };
}