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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <User className="mr-2" size={24} />
        Account Settings
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Email</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">Status</p>
            <p className="text-green-600 capitalize">{subscription?.status || 'Active'}</p>
          </div>
        </div>

        {subscription && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-900 mb-2">Subscription Details</p>
            <p className="text-blue-700 text-sm">
              Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleBillingPortal}
            disabled={loadingPortal}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
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
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <LogOut className="mr-2" size={20} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}