'use client';

import { Play, Clock } from 'lucide-react';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
  onPlay: () => void;
}

export function VideoCard({ video, onPlay }: VideoCardProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card-gradient rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
      <div className="relative aspect-video bg-gray-900">
        {video.thumbnail_url ? (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="text-warm-bronze-400" size={48} />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <button
            onClick={onPlay}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-rose-gold-500 hover:bg-rose-gold-600 text-white rounded-full p-4 transform hover:scale-110 shadow-lg"
          >
            <Play className="text-white ml-1" size={24} />
          </button>
        </div>

        {video.duration_seconds && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock size={12} className="mr-1" />
            {formatDuration(video.duration_seconds)}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-warm-bronze-900 mb-2 line-clamp-2">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-warm-bronze-600 text-sm line-clamp-3">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
}