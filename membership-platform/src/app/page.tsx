'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to members page
    router.push('/members');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto mb-4 text-rose-gold-500" size={48} />
        <p className="text-warm-bronze-600">Redirecting to member portal...</p>
      </div>
    </div>
  );
}