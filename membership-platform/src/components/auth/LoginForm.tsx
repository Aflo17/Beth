'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { loginSchema, LoginFormData } from '@/lib/validations/auth';

interface LoginFormProps {
  onToggleMode: () => void;
}

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await signIn(data.email, data.password);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="card-gradient rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-warm-bronze-900">Welcome Back</h2>
          <p className="text-warm-bronze-600 mt-2">Sign in to access your premium content</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-bronze-700 mb-2">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="input-field"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-rose-gold-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-warm-bronze-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="input-field pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-bronze-500 hover:text-rose-gold-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-rose-gold-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-rose-gold-50 border border-rose-gold-200 rounded-lg p-4">
              <p className="text-rose-gold-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-warm-bronze-600">
            Don't have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-rose-gold-500 hover:text-rose-gold-600 font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}