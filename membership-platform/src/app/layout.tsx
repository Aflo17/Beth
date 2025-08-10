import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Premium Fitness Videos - Membership Platform',
  description: 'Access exclusive fitness content with our secure membership platform',
  keywords: 'fitness, videos, membership, premium, workout',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}