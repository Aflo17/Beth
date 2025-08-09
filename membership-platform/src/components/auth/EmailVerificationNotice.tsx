'use client';

import { Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

export function EmailVerificationNotice() {
  const { user, signOut } = useAuth();

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="card-gradient rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300">
        <Mail className="mx-auto mb-4 text-rose-gold-500" size={48} />
        <h2 className="text-2xl font-bold text-warm-bronze-900 mb-4">Verify Your Email</h2>
        <p className="text-warm-bronze-600 mb-6">
          We've sent a verification link to <strong>{user?.email}</strong>. 
          Please check your email and click the link to verify your account.
        </p>
        
        <div className="bg-soft-pink-50 border border-soft-pink-200 rounded-lg p-4 mb-6">
          <p className="text-warm-bronze-800 text-sm">
            <strong>Note:</strong> You must verify your email before accessing any content.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full btn-primary py-3 px-4 flex items-center justify-center"
          >
            <RefreshCw className="mr-2" size={20} />
            I've Verified - Refresh
          </button>
          
          <button
            onClick={signOut}
            className="w-full btn-secondary py-3 px-4"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}