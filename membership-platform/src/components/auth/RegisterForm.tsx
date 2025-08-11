'use client';

import { useState } from 'react';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

interface RegisterFormProps {
  onToggleMode: () => void;
}

export function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const { signUp, error } = useAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const { error } = await signUp(email, password);
    if (!error) {
      setRegistrationSuccess(true);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="w-full max-w-md mx-auto animate-fade-in-up">
        <div className="card-gradient rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300">
          <CheckCircle className="mx-auto mb-4 text-rose-gold-500" size={48} />
          <h2 className="text-2xl font-bold text-warm-bronze-900 mb-4">Check Your Email</h2>
          <p className="text-warm-bronze-600 mb-6">
            We've sent you a verification link. Please check your email and click the link to verify your account.
          </p>
          <button
            onClick={onToggleMode}
            className="text-rose-gold-500 hover:text-rose-gold-600 font-medium transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="card-gradient rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-warm-bronze-900">Create Account</h2>
          <p className="text-warm-bronze-600 mt-2">Join to access premium fitness content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-bronze-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-12"
                placeholder="Create a password"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-warm-bronze-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field pr-12"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-bronze-500 hover:text-rose-gold-500 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-rose-gold-600 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-rose-gold-50 border border-rose-gold-200 rounded-lg p-4">
              <p className="text-rose-gold-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={false}
            className="w-full btn-primary py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {false ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-warm-bronze-600">
            Already have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-rose-gold-500 hover:text-rose-gold-600 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}