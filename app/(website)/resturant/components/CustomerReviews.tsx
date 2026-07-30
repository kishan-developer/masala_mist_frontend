import React from 'react';
import { Star } from 'lucide-react';

const CustomerReviews = () => {
    const reviews = [
        { name: "Mahak Minta", review: "Tasty food and a calm, pleasant environment. The staff is very welcoming. Mr. Pankaj Kumar Pal attended to us beautifully—such a kind and professional person.", rating: 5 },
        { name: "Neeti Mishra", review: "Visited Masala Mist during my official visit to Varanasi. I was pleasantly surprised by the delicious food and excellent service. Truly a gem near Sigra!", rating: 5 },
        { name: "Abul Bashar", review: "If you are in Varanasi and looking for a perfect blend of taste, ambience, and hospitality – Masala Mist Restaurant is the place to be! 🌟", rating: 5 }
    ];

    return (
        <section id="reviews" className="py-24 px-6 bg-[#0f0f0f] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Our Guests Voice</h2>
                    <div className="flex justify-center gap-1 text-[#c5a059]">
                        <Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} />
                    </div>
                    <p className="mt-2 text-xs text-gray-500 tracking-widest">4.9/5 RATING ON GOOGLE REVIEWS</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((r, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-black border border-white/5 relative">
                            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#c5a059] text-black w-10 h-10 flex items-center justify-center rounded-full font-serif text-2xl font-bold italic">"</div>
                            <p className="text-gray-400 italic mb-6 leading-relaxed">"{r.review}"</p>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#c5a059] to-gray-800 flex items-center justify-center font-bold text-black uppercase">
                                    {r.name.charAt(0)}
                                </div>
                                <div>
                                    <h5 className="text-white font-bold text-sm">{r.name}</h5>
                                    <div className="flex gap-1 text-[#c5a059]">
                                        {[...Array(r.rating)].map((_, i) => <Star key={i} fill="currentColor" size={10} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
