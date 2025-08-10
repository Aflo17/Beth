import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    
    // Get video metadata from published videos view
    const { data: video, error } = await supabase
      .from('videos')
      .select('id, title, description, duration_seconds, thumbnail_url, created_at')
      .eq('is_published', true)
      .eq('title', slug) // Assuming slug matches title for now
      .single();

    if (error || !video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ video });
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}