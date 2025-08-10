'use client';

import { useState } from 'react';
import styles from './SubscribeCTA.module.css';

export function SubscribeCTA() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2>Unlock Premium Content</h2>
      <p>Get unlimited access to our exclusive fitness video library</p>
      
      <div className={styles.pricing}>
        <div className={styles.price}>$29</div>
        <div className={styles.period}>per month</div>
      </div>
      
      <ul className={styles.features}>
        <li>Unlimited access to all videos</li>
        <li>New content added weekly</li>
        <li>HD streaming quality</li>
        <li>Cancel anytime</li>
      </ul>
      
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'Processing...' : 'Start Subscription'}
      </button>
      
      <p className={styles.secure}>Secure payment powered by Stripe</p>
    </div>
  );
}