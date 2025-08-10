import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, createServiceClient } from '@/lib/supabase-server';
import { checkActiveSubscription } from '@/lib/subscription';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || 'anonymous';
    const rateLimitResult = rateLimit(`signed-url:${ip}`, 10, 60000); // 10 requests per minute
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const supabase = createServerClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user has active subscription
    const hasActiveSubscription = await checkActiveSubscription(user.id);
    
    if (!hasActiveSubscription) {
      return NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      );
    }

    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Get video details using service client
    const serviceSupabase = createServiceClient();
    
    const { data: video, error: videoError } = await serviceSupabase
      .from('videos')
      .select('*')
      .eq('id', videoId)
      .eq('is_published', true)
      .single();

    if (videoError || !video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // Generate signed URL for video (5 minutes expiry)
    const { data: signedUrlData, error: urlError } = await serviceSupabase.storage
      .from('videos-private')
      .createSignedUrl(video.storage_path, 300); // 5 minutes

    if (urlError || !signedUrlData) {
      console.error('Error generating signed URL:', urlError);
      return NextResponse.json(
        { error: 'Failed to generate video URL' },
        { status: 500 }
      );
    }

    // Track video play
    await serviceSupabase
      .from('video_plays')
      .insert({
        user_id: user.id,
        video_id: videoId,
        played_at: new Date().toISOString(),
        duration_watched: 0,
      });

    return NextResponse.json({ signedUrl: signedUrlData.signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}