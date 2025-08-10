'use client';

import { useState } from 'react';
import { LoginCard } from '../../components/LoginCard';
import { SubscribeCTA } from '../../components/SubscribeCTA';
import { VideoList } from '../../components/VideoList';
import { AccountCard } from '../../components/AccountCard';
import styles from '../../components/MemberShell.module.css';

interface MemberShellProps {
  user: any;
  subscription: any;
  videos: any[];
}

export function MemberShell({ user, subscription, videos }: MemberShellProps) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Not logged in
  if (!user) {
    return (
      <div className={styles.container}>
        <LoginCard />
      </div>
    );
  }

  // Not verified
  if (!user.email_verified) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Email Verification Required</h2>
          <p>Please check your email and verify your account before accessing content.</p>
        </div>
      </div>
    );
  }

  // No active subscription
  if (!subscription || subscription.status !== 'active') {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <SubscribeCTA />
            <div className={styles.previewSection}>
              <h3>Preview Content</h3>
              <VideoList videos={videos} isPreview={true} onVideoSelect={setSelectedVideo} />
            </div>
          </div>
          <div>
            <AccountCard user={user} subscription={subscription} />
          </div>
        </div>
      </div>
    );
  }

  // Active subscriber
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Premium Content</h1>
        <p>Welcome back, {user.email}</p>
      </header>
      
      <div className={styles.grid}>
        <div>
          <VideoList videos={videos} isPreview={false} onVideoSelect={setSelectedVideo} />
        </div>
        <div>
          <AccountCard user={user} subscription={subscription} />
        </div>
      </div>
    </div>
  );
}