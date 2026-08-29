'use client';

import React from 'react';
import { Instagram, Play, ArrowUpRight, Eye } from 'lucide-react';

const REELS_DATA = [
    {
        url: "https://www.instagram.com/masalamist_sok/reel/DNXNgs0PMQ5/",
        views: "60.1K",
        title: "Signature Delights & Special Gravies",
        thumbnail: "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748719/1080_5_zd9lbi.png"
    },
    {
        url: "https://www.instagram.com/masalamist_sok/reel/DR3-J0Hk4op/",
        views: "13.5K",
        title: "Chef's Special Preparation",
        thumbnail: "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748716/1080_1_xgqmym.png"
    },
    {
        url: "https://www.instagram.com/masalamist_sok/reel/DOAjatfgTkT/",
        views: "9.5K",
        title: "Luxury Dining Ambience",
        thumbnail: "https://res.cloudinary.com/drmpv5vne/image/upload/v1787747562/Untitled-1WD_byuovy.png"
    },
    {
        url: "https://www.instagram.com/masalamist_sok/reel/DR1w6TMjxRK/",
        views: "8.8K",
        title: "Tandoori Secrets & Spices",
        thumbnail: "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748716/1080_4_k0nrpt.png"
    },
    {
        url: "https://www.instagram.com/masalamist_sok/reel/DR7C_PskghY/",
        views: "6.6K",
        title: "Authentic Coastal Bites",
        thumbnail: "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748716/1080_2_gosv2s.png"
    },
    {
        url: "https://www.instagram.com/masalamist_sok/reel/DR_Wf7kE6tw/",
        views: "5.0K",
        title: "Behind the Scenes Kitchen",
        thumbnail: "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748716/1080_3_v1npab.png"
    },
    {
        url: "https://www.instagram.com/masalamist_sok/reel/DPGTCSrkWJ4/",
        views: "2.7K",
        title: "Weekend Special Vibes",
        thumbnail: "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748426/1920_4_vpstf4.png"
    },
    {
        url: "https://www.instagram.com/masalamist_sok/reel/DMaxTWvv2TW/",
        views: "2.2K",
        title: "Guests & Celebrations",
        thumbnail: "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748426/1920_2_aqcxhs.png"
    }
];

const InstagramReels = () => {
    return (
        <section id="reels" className="py-24 px-6 bg-[#080808] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <Instagram size={14} /> @masalamist_sok
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                        Trending <span className="text-[#c5a059]">Instagram Reels</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Watch our latest viral moments, mouth-watering kitchen highlights, and dining experiences directly from our Instagram feed.
                    </p>
                </div>

                {/* Reels Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {REELS_DATA.map((reel, index) => (
                        <a
                            key={index}
                            href={reel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#121212] border border-white/10 block transition-all duration-500 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1"
                        >
                            {/* Thumbnail */}
                            <img
                                src={reel.thumbnail}
                                alt={reel.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/95 transition-all duration-300"></div>

                            {/* Instagram Icon Badge */}
                            <div className="absolute top-3 left-3 z-10">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <Instagram size={16} className="text-white" />
                                </div>
                            </div>

                            {/* Arrow Top Right */}
                            <div className="absolute top-3 right-3 z-10">
                                <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>

                            {/* Center Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#c5a059] group-hover:text-black group-hover:border-[#c5a059] transition-all duration-300">
                                    <Play size={24} className="fill-current ml-0.5" />
                                </div>
                            </div>

                            {/* Bottom Reel Content */}
                            <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end">
                                <div className="flex items-center gap-1.5 text-[#c5a059] text-xs font-bold mb-1">
                                    <Eye size={13} />
                                    <span>{reel.views} views</span>
                                </div>
                                <h3 className="text-white font-serif text-xs md:text-sm font-semibold line-clamp-2 group-hover:text-[#c5a059] transition-colors">
                                    {reel.title}
                                </h3>
                                <p className="text-gray-400 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                                    Watch on Instagram →
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-14 text-center">
                    <a
                        href="https://www.instagram.com/masalamist_sok/reels/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-pink-500/20 active:scale-95"
                    >
                        <Instagram size={18} />
                        View All Reels @masalamist_sok
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InstagramReels;
