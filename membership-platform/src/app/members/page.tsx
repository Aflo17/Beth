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

export default function MembersPage() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, subscription, loading } = useAuth();

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show auth forms
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <EmailVerificationNotice />
      </div>
    );
  }

  // Logged in, verified, but no active subscription
  if (!subscription || subscription.status !== 'active') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <SubscriptionCTA />
      </div>
    );
  }

  // Logged in, verified, with active subscription - show video library
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Premium Fitness Videos
            </h1>
            <div className="text-sm text-gray-600">
              Welcome back, {user.email}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <VideoLibrary />
          </div>
          <div className="lg:col-span-1">
            <AccountControls />
          </div>
        </div>
      </main>
    </div>
  );
}