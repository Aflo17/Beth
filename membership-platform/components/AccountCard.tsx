'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './AccountCard.module.css';

interface AccountCardProps {
  user: any;
  subscription: any;
}

export function AccountCard({ user, subscription }: AccountCardProps) {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleBillingPortal = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/billing/create-portal', {
        method: 'POST',
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
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h3>Account</h3>
      
      <div className={styles.info}>
        <div className={styles.field}>
          <label>Email</label>
          <span>{user.email}</span>
        </div>
        
        <div className={styles.field}>
          <label>Status</label>
          <span className={styles.status}>
            {subscription ? subscription.status : 'No subscription'}
          </span>
        </div>
        
        {subscription && (
          <div className={styles.field}>
            <label>Next billing</label>
            <span>{new Date(subscription.current_period_end).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      
      <div className={styles.actions}>
        {subscription && (
          <button
            onClick={handleBillingPortal}
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Loading...' : 'Manage Billing'}
          </button>
        )}
        
        <button
          onClick={handleSignOut}
          className={`${styles.button} ${styles.secondary}`}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}