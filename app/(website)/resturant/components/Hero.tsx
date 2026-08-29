'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_IMAGES = [
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787747562/Untitled-1WD_byuovy.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748426/1920_4_vpstf4.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748426/1920_2_aqcxhs.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748426/1920_3_k5dmas.png"
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    };

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {HERO_IMAGES.map((imgUrl, index) => (
                    <div
                        key={imgUrl}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-40 scale-105 animate-pulse-slow' : 'opacity-0 pointer-events-none'
                            }`}
                    >
                        <img
                            src={imgUrl}
                            alt={`Restaurant Ambience ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]"></div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrev}
                aria-label="Previous Slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white/70 hover:text-white hover:bg-black/60 border border-white/10 transition-all hidden md:flex items-center justify-center backdrop-blur-sm"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={goToNext}
                aria-label="Next Slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white/70 hover:text-white hover:bg-black/60 border border-white/10 transition-all hidden md:flex items-center justify-center backdrop-blur-sm"
            >
                <ChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 z-20 hidden md:flex gap-2 justify-center items-center">
                {HERO_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-[#c5a059]' : 'w-2 bg-white/40 hover:bg-white/70'
                            }`}
                    />
                ))}
            </div>

            <div className="relative z-10 text-center px-6 pt-20 max-w-5xl">
                <div className="flex justify-center mb-6">
                    <span className="flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-full text-[#c5a059] text-xs uppercase tracking-widest font-bold">
                        <img src="https://dashboard.masalamist.in/m_logo.png" alt="logo" className='w-20 h-20' />
                    </span>
                </div>
                <h1 className="text-lg md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                    Experience <span className="text-[#c5a059]">Authentic</span> Taste & Luxury Dining
                </h1>
                <p className="text-sm md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                    Experience the authentic flavors of our cuisine, where time-honored recipes meet creative culinary artistry. Every dish is thoughtfully prepared with traditional techniques, genuine flavors, and the freshest ingredients, bringing the true essence of our restaurant to every plate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#reserve" className="bg-[#c5a059] text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#c5a059]/20">
                        Reserve Table
                    </a>
                    <a href="#menu" className="border border-white/20 bg-white/5 backdrop-blur-sm px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        View Menu
                    </a>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <p className="text-[#c5a059] font-serif text-sm md:text-2xl font-bold">11:00 AM - 11:00 PM</p>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Opening Hours</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[#c5a059] font-serif text-sm md:text-2xl font-bold">5000+</p>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Happy Guests</p>
                    </div>
                    <div className="hidden md:block text-center">
                        <p className="text-[#c5a059] font-serif text-sm md:text-2xl font-bold">Award Winning</p>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Chef & Team</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

