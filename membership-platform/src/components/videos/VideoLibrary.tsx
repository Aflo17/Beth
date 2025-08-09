'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/types';
import { VideoCard } from './VideoCard';
import { VideoPlayer } from './VideoPlayer';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Play } from 'lucide-react';

export function VideoLibrary() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setVideos(data || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-rose-gold-500" size={48} />
          <p className="text-warm-bronze-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-gold-50 border border-rose-gold-200 rounded-lg p-6">
        <p className="text-rose-gold-700">{error}</p>
        <button
          onClick={fetchVideos}
          className="mt-4 btn-primary px-4 py-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <Play className="mx-auto mb-4 text-warm-bronze-400" size={48} />
        <h3 className="text-xl font-semibold text-warm-bronze-900 mb-2">No Videos Available</h3>
        <p className="text-warm-bronze-600">Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {selectedVideo && (
        <div className="card-gradient rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <VideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-warm-bronze-900 mb-6">Video Library</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}