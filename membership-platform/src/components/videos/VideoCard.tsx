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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
      <div className="relative aspect-video bg-gray-900">
        {video.thumbnail_url ? (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="text-gray-400" size={48} />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <button
            onClick={onPlay}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transform hover:scale-110 transition-transform"
          >
            <Play className="text-gray-900 ml-1" size={24} />
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
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
}