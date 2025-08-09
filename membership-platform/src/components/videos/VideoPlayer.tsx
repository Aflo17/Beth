'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react';
import { Video } from '@/types';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSignedUrl();
    trackVideoPlay();
  }, [video.id]);

  const fetchSignedUrl = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/videos/signed-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId: video.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load video');
      }

      setVideoUrl(data.signedUrl);
    } catch (err) {
      console.error('Error fetching signed URL:', err);
      setError('Failed to load video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const trackVideoPlay = async () => {
    try {
      await fetch('/api/videos/track-play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId: video.id }),
      });
    } catch (err) {
      console.error('Error tracking video play:', err);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (loading) {
    return (
      <div className="relative bg-black aspect-video flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <div className="text-center text-white">
          <Loader2 className="animate-spin mx-auto mb-4" size={48} />
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-red-50 aspect-video flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <div className="text-center text-red-700">
          <p className="mb-4">{error}</p>
          <button
            onClick={fetchSignedUrl}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-player">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-colors"
      >
        <X size={24} />
      </button>

      <video
        ref={videoRef}
        src={videoUrl || undefined}
        className="w-full h-auto"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="video-controls">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-gray-300 transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex-1 flex items-center space-x-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="flex-1 h-1 bg-gray-600 rounded-lg cursor-pointer"
            >
              <div
                className="h-full bg-blue-500 rounded-lg"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>

          <button
            onClick={handleFullscreen}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h2>
        {video.description && (
          <p className="text-gray-600">{video.description}</p>
        )}
      </div>
    </div>
  );
}