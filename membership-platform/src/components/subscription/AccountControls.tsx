'use client';

import { useState } from 'react';
import { User, CreditCard, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

export function AccountControls() {
  const { user, subscription, signOut } = useAuth();
  const [loadingPortal, setLoadingPortal] = useState(false);

  const handleBillingPortal = async () => {
    setLoadingPortal(true);
    
    try {
      const response = await fetch('/api/billing-portal', {
        method: 'GET',
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      window.location.href = url;
    } catch (error) {
      console.error('Error opening billing portal:', error);
      alert('Unable to open billing portal. Please try again.');
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="card-gradient rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-warm-bronze-900 mb-6 flex items-center">
        <User className="mr-2" size={24} />
        Account Settings
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-soft-pink-50 rounded-lg border border-soft-pink-100">
          <div>
            <p className="font-medium text-warm-bronze-900">Email</p>
            <p className="text-warm-bronze-600">{user?.email}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-warm-bronze-900">Status</p>
            <p className="text-rose-gold-600 capitalize font-medium">{subscription?.status || 'Active'}</p>
          </div>
        </div>

        {subscription && (
          <div className="p-4 bg-rose-gold-50 rounded-lg border border-rose-gold-100">
            <p className="font-medium text-warm-bronze-900 mb-2">Subscription Details</p>
            <p className="text-warm-bronze-700 text-sm">
              Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleBillingPortal}
            disabled={loadingPortal}
            className="flex-1 btn-primary py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {loadingPortal ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Loading...
              </>
            ) : (
              <>
                <CreditCard className="mr-2" size={20} />
                Manage Billing
              </>
            )}
          </button>

          <button
            onClick={signOut}
            className="flex-1 btn-secondary py-3 px-4 flex items-center justify-center"
          >
            <LogOut className="mr-2" size={20} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}