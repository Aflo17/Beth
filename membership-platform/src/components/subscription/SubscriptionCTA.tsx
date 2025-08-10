'use client';

import { useState } from 'react';
import { Loader2, Crown, Check } from 'lucide-react';
import { getStripe } from '@/lib/stripe/client';

export function SubscriptionCTA() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-gradient-to-br from-rose-50 to-amber-100 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-rose-200">
        <div className="text-center mb-8">
          <Crown className="mx-auto mb-4 text-rose-500" size={48} />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unlock Premium Content
          </h2>
          <p className="text-gray-600 text-lg">
            Get unlimited access to our exclusive fitness video library
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/50">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900">$29</div>
            <div className="text-gray-600">per month</div>
          </div>

          <ul className="space-y-3 mb-6">
            {[
              'Unlimited access to all videos',
              'New content added weekly',
              'HD streaming quality',
              'Mobile and desktop access',
              'Cancel anytime',
            ].map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="text-rose-500 mr-3 flex-shrink-0" size={20} />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full btn-primary py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={24} />
              Processing...
            </>
          ) : (
            'Start Subscription'
          )}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Secure payment powered by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}