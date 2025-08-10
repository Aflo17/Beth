'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Player.module.css';

interface PlayerProps {
  video: any;
  onClose: () => void;
}

export function Player({ video, onClose }: PlayerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetchSignedUrl();
  }, [video.id]);

  const fetchSignedUrl = async () => {
    try {
      setLoading(true);
      setError('');

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <div className={styles.loading}>
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <div className={styles.error}>
          <p>Error: {error}</p>
          <button onClick={fetchSignedUrl} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{video.title}</h3>
        <button onClick={onClose} className={styles.closeButton}>×</button>
      </div>
      
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className={styles.video}
          onLoadStart={() => setLoading(false)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
      {video.description && (
        <div className={styles.description}>
          <p>{video.description}</p>
        </div>
      )}
    </div>
  );
}