"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ArrowLeft,
  LogOut,
  Shield,
  Ticket,
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  Percent,
  Clock,
  Hash,
  ToggleRight,
  Play,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface UserData {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  maxAge: number;
  maxUsageLimit: number;
  usageCount: number;
  status: boolean;
  createdAt: string;
  isExpired?: boolean;
}

interface CouponUsage {
  id: string;
  userName: string;
  couponCode: string;
  offer: string;
  usedAt: string;
  status: 'Pending' | 'Executed';
}

const emptyForm = {
  code: '',
  discount: '',
  maxAge: '720',
  maxUsageLimit: '500',
  status: true,
};

const initialUsage: CouponUsage[] = [
  {
    id: 'u1',
    userName: 'Rahul Sharma',
    couponCode: 'WELCOME10',
    offer: '10% OFF',
    usedAt: '12 Aug 2026, 14:30',
    status: 'Executed',
  },
  {
    id: 'u2',
    userName: 'Priya Verma',
    couponCode: 'SAVE100',
    offer: '₹100 OFF',
    usedAt: '12 Aug 2026, 19:15',
    status: 'Pending',
  },
  {
    id: 'u3',
    userName: 'Amit Gupta',
    couponCode: 'DESSERTFREE',
    offer: 'Free Dessert',
    usedAt: '13 Aug 2026, 11:00',
    status: 'Pending',
  },
];

export default function RestaurantDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'coupons' | 'usage'>('coupons');

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponSearch, setCouponSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const [usage, setUsage] = useState<CouponUsage[]>(initialUsage);
  const [usageSearch, setUsageSearch] = useState('');
  const [redeemUser, setRedeemUser] = useState('');
  const [redeemCode, setRedeemCode] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data.success && data.data) {
          setUser(data.data);
        } else {
          router.push('/resturant/rewards/login');
        }
      } catch (error) {
        toast.error('Unable to load user. Please log in again.');
        router.push('/resturant/rewards/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/coupon`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCoupons(data.data || []);
      } else {
        toast.error(data.message || 'Failed to fetch coupons.');
      }
    } catch (error) {
      toast.error('Network error while fetching coupons.');
    }
  };

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'super_admin') {
      fetchCoupons();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        toast.success('Logged out successfully.');
        router.push('/resturant/rewards/login');
      } else {
        toast.error('Logout failed.');
      }
    } catch (error) {
      toast.error('Network error.');
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (coupon: Coupon) => {
    setEditing(coupon);
    setForm({
      code: coupon.code,
      discount: String(coupon.discount),
      maxAge: String(coupon.maxAge),
      maxUsageLimit: String(coupon.maxUsageLimit),
      status: coupon.status,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.discount || !form.maxAge || !form.maxUsageLimit) {
      toast.warn('Please fill all required fields.');
      return;
    }

    const limitNum = Number(form.maxUsageLimit);
    if (isNaN(limitNum) || limitNum < 500 || limitNum > 5000) {
      toast.warn('Coupon max usage limit must be between 500 and 5000.');
      return;
    }
    setSubmitting(true);

    const payload = {
      code: form.code,
      discount: Number(form.discount),
      maxAge: Number(form.maxAge),
      maxUsageLimit: Number(form.maxUsageLimit),
      status: form.status,
    };

    try {
      let res;
      if (editing) {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/coupon/${editing._id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
          }
        );
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/coupon/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || (editing ? 'Coupon updated.' : 'Coupon created.'));
        closeForm();
        fetchCoupons();
      } else {
        toast.error(data.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (coupon: Coupon) => {
    if (!confirm(`Delete coupon ${coupon.code}?`)) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/coupon/${coupon._id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Coupon deleted.');
        fetchCoupons();
      } else {
        toast.error(data.message || 'Delete failed.');
      }
    } catch (error) {
      toast.error('Network error.');
    }
  };

  const filteredCoupons = useMemo(
    () =>
      coupons.filter((c) =>
        c.code.toLowerCase().includes(couponSearch.toLowerCase())
      ),
    [coupons, couponSearch]
  );

  const selectedCoupon = useMemo(
    () => coupons.find((c) => c.code.toLowerCase() === redeemCode.trim().toLowerCase()),
    [coupons, redeemCode]
  );

  const handleExecute = () => {
    if (!redeemUser.trim() || !redeemCode.trim()) {
      toast.warn('Enter user name and coupon code.');
      return;
    }
    if (!selectedCoupon) {
      toast.error('Coupon not found.');
      return;
    }
    if (selectedCoupon.isExpired) {
      toast.error('This coupon has expired.');
      return;
    }
    if (selectedCoupon.usageCount >= selectedCoupon.maxUsageLimit) {
      toast.error('Coupon usage limit reached.');
      return;
    }

    const offer = `${selectedCoupon.discount}% OFF`;
    const now = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setUsage((prev) => [
      ...prev,
      {
        id: `u${Date.now()}`,
        userName: redeemUser.trim(),
        couponCode: selectedCoupon.code,
        offer,
        usedAt: now,
        status: 'Executed',
      },
    ]);

    setCoupons((prev) =>
      prev.map((c) =>
        c._id === selectedCoupon._id ? { ...c, usageCount: c.usageCount + 1 } : c
      )
    );

    toast.success(`Coupon ${selectedCoupon.code} executed for ${redeemUser.trim()}.`);
    setRedeemUser('');
    setRedeemCode('');
  };

  const filteredUsage = useMemo(
    () =>
      usage.filter(
        (u) =>
          u.userName.toLowerCase().includes(usageSearch.toLowerCase()) ||
          u.couponCode.toLowerCase().includes(usageSearch.toLowerCase())
      ),
    [usage, usageSearch]
  );

  const markExecuted = (id: string) => {
    setUsage((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'Executed' as const } : u))
    );
    toast.success('Usage marked as executed.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans flex items-center justify-center">
        <p className="text-[#c5a059] text-lg font-serif">Loading management dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (user.role !== 'admin' && user.role !== 'super_admin') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans flex items-center justify-center p-6">
        <div className="bg-[#161616] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
          <Shield className="mx-auto text-[#c5a059] mb-4" size={48} />
          <h2 className="text-2xl font-serif text-[#c5a059] mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">This dashboard is only for restaurant management.</p>
          <Link
            href="/resturant/rewards"
            className="inline-flex items-center gap-2 text-[#c5a059] hover:text-white font-bold"
          >
            <ArrowLeft size={18} /> Back to Rewards
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-serif text-[#c5a059]">Restaurant Management Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#c5a059] hover:text-white transition-colors font-bold"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 mt-6">
        <div className="bg-gradient-to-br from-[#161616] to-black border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#c5a059]/30 text-[#c5a059] text-xs uppercase tracking-widest">
              <Shield size={12} /> {user.role}
            </span>
            <p className="text-gray-400 text-sm">
              Logged in as <span className="text-white font-medium">{user.fullName}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-2 ${
              activeTab === 'coupons'
                ? 'bg-[#c5a059] text-black'
                : 'border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10'
            }`}
          >
            <Ticket size={16} /> Manage Coupons
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-2 ${
              activeTab === 'usage'
                ? 'bg-[#c5a059] text-black'
                : 'border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10'
            }`}
          >
            <Users size={16} /> Coupon Usage
          </button>
        </div>

        {activeTab === 'coupons' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  value={couponSearch}
                  onChange={(e) => setCouponSearch(e.target.value)}
                  placeholder="Search coupon code..."
                  className="w-full pl-10 pr-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
              <button
                onClick={openCreate}
                className="flex items-center justify-center gap-2 bg-[#c5a059] text-black px-5 py-2 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-all"
              >
                <Plus size={16} /> Add Coupon
              </button>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-black/50 text-[#c5a059] uppercase tracking-widest text-xs">
                    <tr>
                      <th className="px-4 py-3">Code</th>
                      <th className="px-4 py-3">Discount</th>
                      <th className="px-4 py-3">Max Age (hrs)</th>
                      <th className="px-4 py-3">Usage</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCoupons.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          No coupons found.
                        </td>
                      </tr>
                    ) : (
                      filteredCoupons.map((coupon) => (
                        <tr
                          key={coupon._id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-white">{coupon.code}</td>
                          <td className="px-4 py-3">{coupon.discount}%</td>
                          <td className="px-4 py-3">{coupon.maxAge}</td>
                          <td className="px-4 py-3">
                            {coupon.usageCount} / {coupon.maxUsageLimit}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs uppercase ${
                                coupon.status
                                  ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                  : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                              }`}
                            >
                              {coupon.status ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEdit(coupon)}
                                className="p-2 text-[#c5a059] hover:bg-[#c5a059]/10 rounded-lg transition-colors"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(coupon)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#161616] to-black border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-serif text-[#c5a059] mb-4 flex items-center gap-2">
                <Play size={20} /> Execute Coupon
              </h3>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                    User Name
                  </label>
                  <input
                    type="text"
                    value={redeemUser}
                    onChange={(e) => setRedeemUser(e.target.value)}
                    placeholder="Customer name"
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <button
                  onClick={handleExecute}
                  className="flex items-center justify-center gap-2 bg-[#c5a059] text-black px-5 py-2 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-all"
                >
                  <Play size={16} /> Execute
                </button>
              </div>
              {selectedCoupon && (
                <div className="mt-4 p-4 bg-black/50 border border-[#c5a059]/20 rounded-xl text-sm">
                  <p className="text-[#c5a059] font-bold uppercase tracking-widest mb-1">
                    Offer: {selectedCoupon.discount}% OFF
                  </p>
                  <p className="text-gray-400">
                    Usage: {selectedCoupon.usageCount} / {selectedCoupon.maxUsageLimit}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-serif text-[#c5a059]">Usage Details</h3>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  value={usageSearch}
                  onChange={(e) => setUsageSearch(e.target.value)}
                  placeholder="Search user or coupon..."
                  className="w-full pl-10 pr-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-black/50 text-[#c5a059] uppercase tracking-widest text-xs">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Coupon</th>
                      <th className="px-4 py-3">Offer</th>
                      <th className="px-4 py-3">Used At</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsage.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          No usage records found.
                        </td>
                      </tr>
                    ) : (
                      filteredUsage.map((u) => (
                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-medium text-white">{u.userName}</td>
                          <td className="px-4 py-3">{u.couponCode}</td>
                          <td className="px-4 py-3">{u.offer}</td>
                          <td className="px-4 py-3 text-gray-400">{u.usedAt}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs uppercase ${
                                u.status === 'Executed'
                                  ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                  : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                              }`}
                            >
                              {u.status === 'Executed' ? (
                                <CheckCircle2 size={12} />
                              ) : (
                                <Clock size={12} />
                              )}
                              {u.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            {u.status === 'Pending' && (
                              <button
                                onClick={() => markExecuted(u.id)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-[#c5a059] text-black rounded text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
                              >
                                <Play size={12} /> Execute
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#c5a059] rounded-2xl p-6 md:p-8 max-w-lg w-full relative">
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl md:text-2xl font-serif text-[#c5a059] mb-2">
              {editing ? 'Edit Promo Coupon' : 'Create Promo Coupon'}
            </h3>

            {editing && (
              <div className="mb-5 mt-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
                <Info size={16} className="shrink-0 text-amber-400" />
                <span>Notice: When editing an existing promo coupon, only the <strong>Max Usage Limit</strong> can be updated.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm text-gray-300">Coupon Code</label>
                  {editing && <span className="text-[10px] text-gray-500 font-mono">Locked</span>}
                </div>
                <div className="relative">
                  <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    disabled={!!editing}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg text-white uppercase focus:outline-none ${
                      editing ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed text-gray-400' : 'bg-black border-white/10 focus:border-[#c5a059]'
                    }`}
                    placeholder="SUMMER20"
                    required
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm text-gray-300">Discount (%)</label>
                    {editing && <span className="text-[10px] text-gray-500 font-mono">Locked</span>}
                  </div>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={form.discount}
                      onChange={(e) => setForm({ ...form, discount: e.target.value })}
                      disabled={!!editing}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg text-white focus:outline-none ${
                        editing ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed text-gray-400' : 'bg-black border-white/10 focus:border-[#c5a059]'
                      }`}
                      placeholder="20"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm text-gray-300">Max Age (hrs)</label>
                    {editing && <span className="text-[10px] text-gray-500 font-mono">Locked</span>}
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="number"
                      min={1}
                      value={form.maxAge}
                      onChange={(e) => setForm({ ...form, maxAge: e.target.value })}
                      disabled={!!editing}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg text-white focus:outline-none ${
                        editing ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed text-gray-400' : 'bg-black border-white/10 focus:border-[#c5a059]'
                      }`}
                      placeholder="72"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-[#c5a059]">Max Usage Limit</label>
                    {editing && <span className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] px-1.5 py-0.5 rounded font-mono font-bold">Editable</span>}
                  </div>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a059]" size={18} />
                    <input
                      type="number"
                      min={500}
                      max={5000}
                      value={form.maxUsageLimit}
                      onChange={(e) => setForm({ ...form, maxUsageLimit: e.target.value })}
                      placeholder="500"
                      className="w-full pl-10 pr-4 py-2 bg-black border-2 border-[#c5a059] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 font-bold"
                      required
                      autoFocus={!!editing}
                    />
                    <p className="text-[10px] text-[#c5a059] mt-1 font-mono">Limit must be between 500 and 5000</p>
                  </div>
                </div>
                <div className="flex items-end">
                  <label className={`flex items-center gap-3 ${editing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                    <ToggleRight
                      size={22}
                      className={form.status ? 'text-green-500' : 'text-gray-500'}
                    />
                    <input
                      type="checkbox"
                      checked={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.checked })}
                      disabled={!!editing}
                      className="hidden"
                    />
                    <span className="text-sm text-gray-300 select-none">
                      {form.status ? 'Active' : 'Inactive'} {editing && '(Locked)'}
                    </span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#c5a059] text-black py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                <Save size={18} /> {submitting ? 'Saving...' : editing ? 'Update Usage Limit' : 'Create Coupon'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
