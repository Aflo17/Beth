'use client';

import { useState } from 'react';
import { Player } from './Player';
import styles from './VideoList.module.css';

interface VideoListProps {
  videos: any[];
  isPreview: boolean;
  onVideoSelect: (video: any) => void;
}

export function VideoList({ videos, isPreview, onVideoSelect }: VideoListProps) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video: any) => {
    if (isPreview) {
      alert('Subscribe to watch full videos');
      return;
    }
    setSelectedVideo(video);
    onVideoSelect(video);
  };

  if (videos.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No videos available</h3>
        <p>Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {selectedVideo && !isPreview && (
        <div className={styles.playerContainer}>
          <Player 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        </div>
      )}
      
      <h2>{isPreview ? 'Preview Content' : 'Video Library'}</h2>
      
      <div className={styles.grid}>
        {videos.map((video) => (
          <div
            key={video.id}
            className={`${styles.videoCard} ${isPreview ? styles.preview : ''}`}
            onClick={() => handleVideoClick(video)}
          >
            <div className={styles.thumbnail}>
              {video.thumbnail_url ? (
                <img src={video.thumbnail_url} alt={video.title} />
              ) : (
                <div className={styles.placeholderThumbnail}>
                  <span>▶</span>
                </div>
              )}
              {isPreview && (
                <div className={styles.previewOverlay}>
                  <span>Preview</span>
                </div>
              )}
            </div>
            
            <div className={styles.content}>
              <h3>{video.title}</h3>
              {video.description && (
                <p>{video.description}</p>
              )}
              {video.duration_seconds && (
                <span className={styles.duration}>
                  {Math.floor(video.duration_seconds / 60)}:{(video.duration_seconds % 60).toString().padStart(2, '0')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}