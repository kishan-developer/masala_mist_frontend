"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, CheckCircle, Info, AlertCircle } from 'lucide-react';

export default function RewardsRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode] = useState('+91');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const validatePassword = (value: string) => {
    return value.length >= 6 && value.length <= 11;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFullNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    let hasErr = false;
    if (!fullName || fullName.trim().length < 2) {
      setFullNameError('Please enter a valid full name (min 2 characters).');
      hasErr = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      hasErr = true;
    }
    if (!/^\d{10}$/.test(phone) || phone.startsWith('0')) {
      setPhoneError('Phone must be 10 digits and cannot start with 0.');
      hasErr = true;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be 6 to 11 characters long.');
      hasErr = true;
    }

    if (hasErr) {
      toast.warn('Please fix the errors in the form.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, purpose: 'registration' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('OTP sent to your email.');
        setStep('otp');
        setCountdown(60);
      } else {
        const msg = data.message || 'Failed to send OTP.';
        const lower = msg.toLowerCase();
        if (lower.includes('email') || lower.includes('already exists') || lower.includes('already registered')) {
          setEmailError(msg);
        } else if (lower.includes('phone')) {
          setPhoneError(msg);
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      toast.warn('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: `${countryCode}${phone}`,
          password,
          otp,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => router.push('/resturant/rewards/dashboard'), 1500);
      } else {
        const msg = data.message || 'Registration failed.';
        const lower = msg.toLowerCase();
        if (lower.includes('email') || lower.includes('already exists') || lower.includes('already registered')) {
          setEmailError(msg);
          setStep('form');
        } else if (lower.includes('phone')) {
          setPhoneError(msg);
          setStep('form');
        }
        toast.error(msg);
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, purpose: 'registration' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('OTP resent.');
        setCountdown(60);
      } else {
        toast.error(data.message || 'Failed to resend OTP.');
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
          <h1 className="text-2xl font-serif text-[#c5a059]">Customer Register</h1>
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
            <h2 className="text-3xl font-serif text-[#c5a059]">Create Account</h2>
            <p className="text-gray-400 text-sm mt-1">Join our rewards program</p>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'form' ? 'bg-[#c5a059] text-black' : 'bg-green-500/20 text-green-500'}`}>
              {step === 'otp' ? <CheckCircle size={16} /> : '1'}
            </div>
            <div className={`w-16 h-1 ${step === 'otp' ? 'bg-[#c5a059]' : 'bg-white/10'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 'otp' ? 'bg-[#c5a059] text-black' : 'bg-white/10 text-gray-400'}`}>
              2
            </div>
          </div>

          {step === 'form' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 ${fullNameError ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (fullNameError) setFullNameError('');
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                      fullNameError ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                {fullNameError && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} className="shrink-0 text-red-400" /> {fullNameError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${emailError ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                  <input
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <div className="relative flex gap-2">
                  <span className="flex items-center px-3 bg-black border border-white/10 rounded-lg text-gray-300 text-sm">
                    {countryCode}
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                      if (phoneError) setPhoneError('');
                    }}
                    className={`w-full pl-4 pr-4 py-3 bg-black border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all ${
                      phoneError ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10 focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]'
                    }`}
                    placeholder="9876543210"
                    required
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} className="shrink-0 text-red-400" /> {phoneError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${passwordError ? 'text-red-400' : 'text-gray-400'}`} size={18} />
                  <input
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
                {passwordError && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} className="shrink-0 text-red-400" /> {passwordError}
                  </p>
                )}
                {/* Password Requirement Notice Info Box */}
                <div className="mt-2.5 p-3.5 bg-[#121212] border border-[#c5a059]/30 rounded-lg text-xs text-gray-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-[#c5a059]">
                    <Info size={14} className="shrink-0 text-[#c5a059]" /> Password Requirement:
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    <span className="text-[#c5a059] font-bold">*</span> Password must be between <span className="text-white font-bold">6 and 11 characters</span> long.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c5a059] text-black py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] text-center tracking-widest"
                  placeholder="123456"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c5a059] text-black py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-400">Resend OTP in {countdown}s</p>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={loading}
                    className="text-[#c5a059] text-sm hover:text-white font-medium disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/resturant/rewards/login" className="text-[#c5a059] hover:text-white font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
