'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { EmailVerificationNotice } from '@/components/auth/EmailVerificationNotice';
import { SubscriptionCTA } from '@/components/subscription/SubscriptionCTA';
import { VideoLibrary } from '@/components/videos/VideoLibrary';
import { AccountControls } from '@/components/subscription/AccountControls';
import { Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function MembersPage() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, subscription, loading } = useAuth();

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader2 className={`${styles.loadingSpinner} animate-spin`} size={48} />
          <p className={styles.loadingText}>Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show auth forms
  if (!user) {
    return (
      <div className={styles.container}>
        {authMode === 'login' ? (
          <LoginForm onToggleMode={toggleAuthMode} />
        ) : (
          <RegisterForm onToggleMode={toggleAuthMode} />
        )}
      </div>
    );
  }

  // Logged in but email not verified
  if (!user.email_verified) {
    return (
      <div className={styles.container}>
        <EmailVerificationNotice />
      </div>
    );
  }

  // Logged in, verified, but no active subscription
  if (!subscription || subscription.status !== 'active') {
    return (
      <div className={styles.container}>
        <SubscriptionCTA />
      </div>
    );
  }

  // Logged in, verified, with active subscription - show video library
  return (
    <div className="min-h-screen bg-gradient">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>
            Fit With <span className={styles.headerBrand}>Beth</span> - Premium Content
          </h1>
          <div className={styles.headerWelcome}>
            Welcome back, <span className={styles.headerEmail}>{user.email}</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div>
            <VideoLibrary />
          </div>
          <div>
            <AccountControls />
          </div>
        </div>
      </main>
    </div>
  );
}