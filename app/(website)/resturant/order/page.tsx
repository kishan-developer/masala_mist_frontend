"use client";

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  name: string;
  price: string;
  quantity: number;
  category: string;
}

const OrderPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    orderType: 'delivery' as 'delivery' | 'pickup'
  });

  const menuItems = {
    'VEG': [
      { name: 'Paneer Tikka', price: '₹425', desc: 'Char-grilled cottage cheese marinated in smoky tandoori spices and hung curd.' },
      { name: 'Paneer Malai Tikka', price: '₹435', desc: 'Cream-kissed paneer delicately spiced with white pepper, cardamom, and cheese.' },
      { name: 'Paneer Makhmali Tikka', price: '₹435', desc: 'Soft paneer in a velvety saffron-cream marinade, tandoor-roasted to silkiness.' },
      { name: 'Paneer Hariyali Tikka', price: '₹425', desc: 'Cottage cheese in a green herb marinade of mint, coriander, and mild spices.' }
    ],
    'NON-VEG': [
      { name: 'Classic Chicken Tikka', price: '₹465', desc: 'Tender chicken chunks steeped in signature tandoori marinade — smoky and juicy.' },
      { name: 'Chicken Malai Tikka', price: '₹475', desc: 'Creamy melt-in-mouth chicken grilled till golden and soft.' },
      { name: 'Tandoori Chicken (Half)', price: '₹445', desc: 'Bone-in chicken slow-cooked in a clay oven after a long spice marinade.' },
      { name: 'Tandoori Chicken (Full)', price: '₹645', desc: 'Full portion of clay oven roasted chicken with deep tandoori flavors.' },
      { name: 'Chicken Hakka Noodles', price: '₹365', desc: 'Stir-fried noodles with chicken and vegetables in Hakka style.' },
      { name: 'Chicken Fried Rice', price: '₹425', desc: 'Fried rice with chicken and aromatic spices.' }
    ],
    'KEBABS & GRILLS': [
      { name: 'Mutton Seekh Kebab', price: '₹475', desc: 'Minced mutton blended with herbs, flame grilled, juicy and flavorful.' },
      { name: 'Mutton Shami Kebab', price: '₹425', desc: 'Slow-cooked mutton and dal kebabs, crisp outside and tender within.' },
      { name: 'Mutton Chapli Kebab', price: '₹475', desc: 'Mutton with tomato, onion, spices; pan-fried for crisp edges and rich flavor.' },
      { name: 'Chicken Seekh Kebab', price: '₹425', desc: 'Minced chicken with garlic, chillies, and spices charred over live coal.' }
    ],
    'COASTAL BITES': [
      { name: 'Fish Fingers', price: '₹425', desc: 'Golden crispy fish fingers coated in seasoned crumbs and served with dip.' },
      { name: 'Fill-e-Fish Fry', price: '₹425', desc: 'Fish fillet marinated in coastal spices and shallow fried till crisp.' }
    ],
    'CHINESE VEG': [
      { name: 'Hakka Noodles', price: '₹265', desc: 'Stir-fried noodles with vegetables in Hakka style.' },
      { name: 'Fried Rice', price: '₹375', desc: 'Fried rice with mixed vegetables and aromatic spices.' },
      { name: 'Chilli Paneer Gravy/Dry', price: '₹425', desc: 'Paneer in spicy chilli sauce with bell peppers.' },
      { name: 'Veg Manchurian Gravy/Dry', price: '₹375', desc: 'Vegetable dumplings in Indo-Chinese sauce.' },
      { name: 'Crispy Baby Corn', price: '₹375', desc: 'Crispy baby corn in spicy sauce.' }
    ]
  };

  const addToCart = (name: string, price: string, category: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === name);
      if (existing) {
        return prev.map(item => 
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { name, price, quantity: 1, category }];
    });
    toast.success(`${name} added to cart!`);
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.name === name) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setOrderLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant/order-food`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          totalAmount: calculateTotal(),
          ...customerInfo
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Order placed successfully! Check your email for confirmation.");
        setCart([]);
        setCustomerInfo({ name: '', phone: '', email: '', address: '', orderType: 'delivery' });
      } else {
        toast.error(data.message || "Failed to place order.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans">
      <ToastContainer theme="dark" position="bottom-right" />
      
      {/* Header */}
      <div className=" border-b border-white/10 pt-40 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5">
          <Link href="/resturant" className="flex items-center gap-2 text-[#c5a059] hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Restaurant</span>
          </Link>
          <h1 className="text-2xl font-serif text-[#c5a059]">Direct Order</h1>
          <div className="flex items-center gap-2 text-[#c5a059]">
            <ShoppingBag size={20} />
            <span className="font-bold">{cart.length} items</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-8">
        {/* Menu Section */}
        <div className="lg:col-span-2 space-y-8">
          {Object.entries(menuItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-serif text-[#c5a059] mb-6 border-b border-[#c5a059]/30 pb-2">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                  <div key={index} className="bg-black border border-white/10 rounded-xl p-4 hover:border-[#c5a059]/50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold">{item.name}</h3>
                      <span className="text-[#c5a059] font-bold">{item.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                    <button
                      onClick={() => addToCart(item.name, item.price, category)}
                      className="w-full bg-[#c5a059] text-black py-2 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <div className="bg-black border border-white/10 rounded-xl p-6 sticky top-6">
            <h2 className="text-xl font-serif text-[#c5a059] mb-6 border-b border-[#c5a059]/30 pb-2">
              Your Order
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                        <p className="text-[#c5a059] text-sm">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-[#c5a059] hover:text-black transition-all"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-[#c5a059] hover:text-black transition-all"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="w-6 h-6 bg-red-500/20 text-red-500 rounded flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-2"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-[#c5a059]">₹{calculateTotal()}</span>
                  </div>
                </div>
              </>
            )}

            {/* Order Form */}
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Order Type</label>
                <select
                  value={customerInfo.orderType}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, orderType: e.target.value as 'delivery' | 'pickup' })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white appearance-none mt-1"
                >
                  <option value="delivery" className="bg-black text-white">Delivery</option>
                  <option value="pickup" className="bg-black text-white">Pickup</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name *</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white placeholder-gray-400 mt-1"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number *</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white placeholder-gray-400 mt-1"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white placeholder-gray-400 mt-1"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Delivery Address *</label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white placeholder-gray-400 mt-1 resize-none"
                  placeholder="Enter your delivery address"
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={cart.length === 0 || orderLoading}
                className="w-full bg-[#c5a059] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] shadow-lg shadow-[#c5a059]/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderLoading ? "Processing..." : `Place Order - ₹${calculateTotal()}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
