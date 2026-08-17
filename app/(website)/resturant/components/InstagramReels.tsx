import React from 'react';
import { Instagram, Play, ArrowRight } from 'lucide-react';

const InstagramReels = () => {
    const reels = [
        { url: "https://www.instagram.com/masalamist_sok/reel/DNXNgs0PMQ5/", views: "60.1K" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DR3-J0Hk4op/", views: "13.5K" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DOAjatfgTkT/", views: "9.5K" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DR1w6TMjxRK/", views: "8.8K" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DR7C_PskghY/", views: "6.6K" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DR_Wf7kE6tw/", views: "5.0K" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DPGTCSrkWJ4/", views: "2.7K" },
        { url: "https://www.instagram.com/masalamist_sok/reel/DMaxTWvv2TW/", views: "2.2K" },
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
                            className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] border border-white/10 block"
                        >
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.1)_0%,transparent_50%)] animate-pulse-slow"></div>
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-30"></div>
                            </div>

                            {/* Centered play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-[#c5a059]/10 backdrop-blur-sm border-2 border-[#c5a059]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c5a059]/20 transition-all duration-500 animate-bounce-slow">
                                    <Play size={40} className="text-[#c5a059] fill-[#c5a059] ml-1" />
                                </div>
                            </div>

                            {/* Instagram logo at top */}
                            <div className="absolute top-4 left-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                                    <Instagram size={18} className="text-white" />
                                </div>
                            </div>

                            {/* Bottom gradient overlay with info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-5">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-2 text-white mb-2">
                                        <span className="text-xs font-bold uppercase tracking-widest">@masalamist_sok</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#c5a059]">
                                        <Play size={16} fill="currentColor" />
                                        <span className="text-xl font-bold">{reel.views} views</span>
                                    </div>
                                    <div className="mt-3 text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Watch on Instagram →
                                    </div>
                                </div>
                            </div>

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-[#c5a059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
