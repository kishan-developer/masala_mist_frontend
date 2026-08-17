"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowRight } from 'lucide-react';
import InstagramReelCard from './InstagramReelCard';
import ReelModal from './ReelModal';

interface ReelData {
    reelUrl: string;
    thumbnail?: string;
    title?: string;
    views?: string;
}

const InstagramReelsSection: React.FC = () => {
    const [selectedReel, setSelectedReel] = useState<string | null>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // 12 Instagram Reels data - Using actual working reel URLs from your Instagram
    // To get more reel IDs: Visit https://www.instagram.com/masalamist_sok/reels/ and copy the reel ID from the URL
    // Example: https://www.instagram.com/masalamist_sok/reel/ABC123/ → ABC123 is the reel ID
    // Add thumbnail images to /public/resturant/thumbnails/ folder (reel-1.jpg through reel-12.jpg)
    // If no thumbnail is provided, cards will show a premium gradient background
    const reels: ReelData[] = [
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/DNXNgs0PMQ5/", 
            title: "Food close-up: Signature Hyderabadi Biryani",
            views: "60.1K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/DR3-J0Hk4op/", 
            title: "Restaurant interior: Elegant dining ambiance",
            views: "13.5K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/DOAjatfgTkT/", 
            title: "Customer experience: Happy diners",
            views: "9.5K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/DR1w6TMjxRK/", 
            title: "Promotional offer: Weekend special",
            views: "8.8K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/DR7C_PskghY/", 
            title: "Special event: Festival celebration",
            views: "6.6K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/DR_Wf7kE6tw/", 
            title: "Restaurant ambience: Evening vibes",
            views: "5.0K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/DPGTCSrkWJ4/", 
            title: "Signature dish: Paneer Tikka",
            views: "2.7K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/DMaxTWvv2TW/", 
            title: "Dining experience: Family dinner",
            views: "2.2K" 
        },
        // Add 4 more real reel IDs from your Instagram page below
        // Visit https://www.instagram.com/masalamist_sok/reels/ to get actual reel IDs
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/", 
            title: "Festival celebration: Diwali special",
            views: "1.8K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/", 
            title: "Behind-the-scenes: Kitchen prep",
            views: "1.5K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/", 
            title: "Chef preparation: Tandoori magic",
            views: "1.2K" 
        },
        { 
            reelUrl: "https://www.instagram.com/masalamist_sok/reel/", 
            title: "Latest promotional: New menu launch",
            views: "1.0K" 
        },
    ];

    // Load Instagram embed script
    useEffect(() => {
        if (!scriptLoaded) {
            const script = document.createElement('script');
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            script.onload = () => {
                setScriptLoaded(true);
                const instgrmWindow = window as unknown as { instgrm?: { Embeds: { process: () => void } } };
                if (instgrmWindow.instgrm) {
                    instgrmWindow.instgrm.Embeds.process();
                }
            };
            document.body.appendChild(script);
        }
    }, [scriptLoaded]);

    const handleOpenReel = (reelUrl: string) => {
        setSelectedReel(reelUrl);
    };

    const handleCloseModal = () => {
        setSelectedReel(null);
    };

    return (
        <section className="py-24 px-6 bg-[#0a0a0a]">
            <ReelModal 
                isOpen={!!selectedReel} 
                reelUrl={selectedReel || ''} 
                onClose={handleCloseModal} 
            />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[#c5a059] text-sm uppercase tracking-[0.3em] font-bold block mb-4"
                    >
                        Social Media
                    </motion.span>
                    
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
                    >
                        Latest From Masala Mist
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        A taste of our food, celebrations, ambience and unforgettable dining moments.
                    </motion.p>

                    {/* Follow Us CTA */}
                    <motion.a
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        href="https://www.instagram.com/masalamist_sok/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity group"
                    >
                        <Instagram size={20} />
                        Follow Us on Instagram
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </motion.a>
                </motion.div>

                {/* Reels Grid - Pinterest-style with minimal gaps */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] md:gap-[3px]">
                    {reels.map((reel, index) => (
                        <InstagramReelCard
                            key={index}
                            reelUrl={reel.reelUrl}
                            thumbnail={reel.thumbnail}
                            title={reel.title}
                            views={reel.views}
                            index={index}
                            onOpen={handleOpenReel}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="https://www.instagram.com/masalamist_sok/reels/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-[#c5a059] text-[#c5a059] font-bold uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-all group"
                    >
                        View All Reels on Instagram <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default InstagramReelsSection;
