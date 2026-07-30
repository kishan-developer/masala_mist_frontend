import React from 'react';
import { Instagram, Play, ArrowRight } from 'lucide-react';

const InstagramReels = () => {
    const reels = [
        { url: "https://www.instagram.com/masalamist_sok/reel/DNXNgs0PMQ5/", views: "60.1K", img: "/resturant/DSC_0366.JPG" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DR3-J0Hk4op/", views: "13.5K", img: "/resturant/DSC_0320.JPG" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DOAjatfgTkT/", views: "9.5K", img: "/resturant/DSC_0322.JPG" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DR1w6TMjxRK/", views: "8.8K", img: "/resturant/DSC_0332.JPG" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DR7C_PskghY/", views: "6.6K", img: "/resturant/DSC_0333.JPG" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DR_Wf7kE6tw/", views: "5.0K", img: "/resturant/DSC_0343.JPG" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DPGTCSrkWJ4/", views: "2.7K", img: "/resturant/DSC_0346.JPG" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DMaxTWvv2TW/", views: "2.2K", img: "/resturant/DSC_0325.JPG" },
    ];

    return (
        <section id="reels" className="py-24 px-6 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#c5a059] text-sm uppercase tracking-[0.3em] font-bold block mb-4">Trending on Instagram</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Viral Reels</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Catch the most popular moments from our kitchen and dining hall. Join our food community on social media.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {reels.map((reel, index) => (
                        <a
                            key={index}
                            href={reel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/5 block"
                        >
                            <img
                                src={reel.img}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                alt={`Instagram Reel ${index + 1}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                                <div className="flex items-center gap-2 text-white mb-2">
                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <Instagram size={14} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">@masalamist_sok</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#c5a059]">
                                    <Play size={14} fill="currentColor" />
                                    <span className="text-lg font-bold">{reel.views}</span>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#c5a059]/20 backdrop-blur-sm border border-[#c5a059]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                <Play size={24} className="text-white fill-white ml-1" />
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="https://www.instagram.com/masalamist_sok/reels/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-[#c5a059] text-[#c5a059] font-bold uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-all group"
                    >
                        Explore More On Instagram <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InstagramReels;
