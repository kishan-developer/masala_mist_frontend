import React from 'react';

const SpecialOffers = () => {
    return (
        <section id="special-offers" className="py-10 md:py-24 px-4 md:px-6 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-[#c5a059]/20 to-transparent p-5 md:p-12 rounded-3xl border border-[#c5a059]/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="bg-[#c5a059] text-black text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4 inline-block">Exclusive Offer</span>
                            <h2 className="text-4xl font-serif text-white mb-4">Luxury Dining At <span className="text-[#c5a059]">20% Off</span></h2>
                            <p className="text-gray-400 mb-8">Valid for first-time website bookings this month. Experience our Signature Tasting Menu with an exclusive discount.</p>
                            <div className="flex gap-4">
                                <a
                                    href={process.env.NEXT_PUBLIC_DASHBOARD_URL ? `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/register` : "https://dashboard.masalamist.in/register"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white text-black px-4 md:px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition-colors text-center"
                                >
                                    Claim Now
                                </a>
                                <div className="flex flex-col justify-center">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">PROMO CODE</p>
                                    <p className="text-[#c5a059] font-bold">MS-82B04</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-2 md:p-6 rounded-2xl border border-white/5 text-center">
                                <p className="text-md md:text-2xl font-serif text-[#c5a059] font-bold">Happy Hours</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">4 PM - 7 PM DAILY</p>
                            </div>
                            <div className="bg-white/5 p-2 md:p-6 rounded-2xl border border-white/5 text-center">
                                <p className="text-md md:text-2xl font-serif text-[#c5a059] font-bold">Family Deal</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Free Kids Dessert</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
