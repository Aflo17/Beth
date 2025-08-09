'use client';

import { Mail, RefreshCw } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

export function EmailVerificationNotice() {
  const { user, signOut } = useAuth();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <Mail className="mx-auto mb-4 text-blue-500" size={48} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to <strong>{user?.email}</strong>. 
          Please check your email and click the link to verify your account.
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> You must verify your email before accessing any content.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <RefreshCw className="mr-2" size={20} />
            I've Verified - Refresh
          </button>
          
          <button
            onClick={signOut}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}