import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Track video play
    const { error: trackError } = await supabase
      .from('video_plays')
      .insert({
        user_id: user.id,
        video_id: videoId,
        played_at: new Date().toISOString(),
        duration_watched: 0, // Will be updated as user watches
      });

    if (trackError) {
      console.error('Error tracking video play:', trackError);
      // Don't fail the request if tracking fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking video play:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}