import React from 'react';
import { ShoppingBag, Utensils } from 'lucide-react';
import Link from 'next/link';

const OnlineOrdering = () => {
    return (
        <section id="online-ordering" className="py-10 md:py-24 px-4 md:px-6 bg-[#0f0f0f]">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Can&apos;t Come To Us?</h2>
                <p className="text-gray-500 mb-12 uppercase tracking-[0.2em] text-xs">We&apos;ll bring the experience to you</p>

                <div className="flex md:flex-row flex-wrap justify-center gap-8">
                    <div className="bg-black p-8 rounded-3xl border border-white/5 w-64 hover:border-[#c5a059] transition-all group">
                        <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full mx-auto mb-6 flex items-center justify-center text-[#c5a059] group-hover:scale-110 transition-transform">
                            <ShoppingBag />
                        </div>
                        <h4 className="text-white font-bold mb-4">Direct Order</h4>
                        <Link href="/resturant/order">
                            <button className="w-full py-2 bg-white text-black rounded-lg text-xs font-black uppercase tracking-widest">Order On Website</button>
                        </Link>
                    </div>
                    <div className="bg-black p-8 rounded-3xl border border-white/5 w-64 hover:border-[#f30] transition-all group">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-6 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                            <Utensils />
                        </div>
                        <h4 className="text-white font-bold mb-4">Zomato</h4>
                        <a href="https://www.zomato.com/varanasi/masala-mist-sands-of-kashi-shastri-nagar" target="_blank" rel="noopener noreferrer">
                            <button
                                className="w-full py-2 bg-[#f30] text-white rounded-lg text-xs font-black uppercase tracking-widest"
                            >
                                Order Now
                            </button>
                        </a>
                    </div>
                    <div className="bg-black p-8 rounded-3xl border border-white/5 w-64 hover:border-[#fc0] transition-all group">
                        <div className="w-16 h-16 bg-orange-400/10 rounded-full mx-auto mb-6 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                            <Utensils />
                        </div>
                        <h4 className="text-white font-bold mb-4">Swiggy</h4>
                        <a href="https://www.swiggy.com/city/varanasi/masala-mist-sigra-rest1133630" target="_blank" rel="noopener noreferrer">
                            <button className="w-full py-2 bg-orange-500 text-white rounded-lg text-xs font-black uppercase tracking-widest">Order Now</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OnlineOrdering;
