"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Info, AlertCircle, X } from 'lucide-react';

export default function RewardsLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successModalData, setSuccessModalData] = useState<{ user?: any } | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (successModalData) {
      const timer = setTimeout(() => {
        setSuccessModalData(null);
        router.push('/resturant/rewards/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successModalData, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Please enter your email address.');
      toast.warn('Please enter your email address.');
      return;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      toast.warn('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || 'Login successful!');
        const loggedUser = data.data?.user || data.user || { email, fullName: 'Valued Customer' };
        setSuccessModalData({ user: loggedUser });
      } else {
        const msg = data.message || 'Login failed';
        const lower = msg.toLowerCase();
        if (lower.includes('email') || lower.includes('no account') || lower.includes('not found')) {
          setEmailError(msg);
        } else if (lower.includes('password') || lower.includes('incorrect') || lower.includes('credential')) {
          setPasswordError(msg);
        } else {
          setEmailError(msg);
        }
        toast.error(msg);
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans pb-24">
      <ToastContainer theme="dark" position="bottom-right" />

      <div className="border-b border-white/10 pt-24 md:pt-40 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5">
          <Link
            href="/resturant/rewards"
            className="flex items-center gap-2 text-[#c5a059] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Rewards</span>
          </Link>
          <h1 className="text-2xl font-serif text-[#c5a059]">Customer Login</h1>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 mt-10">
        <div className="bg-gradient-to-br from-[#161616] to-black border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="Sands of Kashi"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#c5a059] p-1 bg-black"
            />
            <h2 className="text-3xl font-serif text-[#c5a059]">Welcome Back</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to view your rewards</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${emailError ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                    emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]'
                  }`}
                  placeholder="you@example.com"
                  required
                />
              </div>
              {emailError && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5 font-medium">
                  <AlertCircle size={14} className="shrink-0 text-red-400" /> {emailError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${passwordError ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  className={`w-full pl-10 pr-12 py-3 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                    passwordError ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]'
                  }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError ? (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5 font-medium">
                  <AlertCircle size={14} className="shrink-0 text-red-400" /> {passwordError}
                </p>
              ) : (
                <div className="mt-2.5 p-3 bg-[#121212] border border-[#c5a059]/30 rounded-lg text-xs text-gray-300">
                  <div className="flex items-center gap-1.5 font-semibold text-[#c5a059] mb-1">
                    <Info size={14} className="shrink-0" /> Password Requirement Notice:
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Password must be between <span className="text-white font-medium">6 and 11 characters</span> long.
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c5a059] text-black py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/resturant/rewards/register" className="text-[#c5a059] hover:text-white font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Congratulations Modal on Login Success */}
      {successModalData && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300"
          onClick={() => {
            setSuccessModalData(null);
            router.push('/resturant/rewards/dashboard');
          }}
        >
          <div
            className="bg-[#141414] border border-[#c5a059] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl shadow-[#c5a059]/20 relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => {
                setSuccessModalData(null);
                router.push('/resturant/rewards/dashboard');
              }}
              className="absolute top-3 right-3 text-white bg-black/70 hover:bg-black p-2 rounded-full backdrop-blur-md transition-colors z-20"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Video at Top */}
            <div className="relative w-full h-fit bg-black overflow-hidden">
              <video
                src="https://res.cloudinary.com/drmpv5vne/video/upload/v1787154024/logo_animation_cm0ggf.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
            </div>

            {/* Content Section */}
            <div className="p-6 text-center space-y-4">
              {/* Congratulation Message */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-serif text-[#c5a059] font-bold">
                  Congratulations!
                </h3>
                <p className="text-white font-medium text-sm sm:text-base">
                  You have successfully logged in.
                </p>
              </div>

              {/* Short Instructions */}
              <p className="text-gray-300 text-xs sm:text-sm bg-white/5 p-3 rounded-xl border border-white/10">
                Welcome back to Masala Mist Rewards! Access your exclusive offers and rewards.
              </p>

              {/* Account Details */}
              <div className="bg-[#0a0a0a] border border-[#c5a059]/30 rounded-xl p-4 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Logged In Account
                </span>
                <p className="text-[#c5a059] font-mono font-bold tracking-widest text-xl sm:text-2xl truncate">
                  {successModalData.user?.fullName || successModalData.user?.name || 'Welcome Back'}
                </p>
                <div className="h-px bg-[#c5a059]/20 w-16 mx-auto my-2" />
                <p className="text-white font-serif text-sm sm:text-base font-semibold truncate">
                  {successModalData.user?.email || email}
                </p>
                <p className="text-gray-400 text-xs">
                  Status: <span className="text-white font-medium">Active Member</span>
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSuccessModalData(null);
                    router.push('/resturant/rewards/dashboard');
                  }}
                  className="w-full bg-[#c5a059] text-black py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-white transition-all shadow-lg shadow-[#c5a059]/20"
                >
                  Go to Rewards Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
