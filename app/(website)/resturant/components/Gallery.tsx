'use client';

import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const GALLERY_IMAGES = [
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748719/1080_5_zd9lbi.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748716/1080_1_xgqmym.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748716/1080_4_k0nrpt.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748716/1080_2_gosv2s.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748716/1080_3_v1npab.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787747562/Untitled-1WD_byuovy.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748426/1920_4_vpstf4.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748426/1920_2_aqcxhs.png",
    "https://res.cloudinary.com/drmpv5vne/image/upload/v1787748426/1920_3_k5dmas.png"
];

const Gallery = () => {
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setActiveImageIndex(index);
    };

    const closeLightbox = () => {
        setActiveImageIndex(null);
    };

    const nextImage = () => {
        if (activeImageIndex !== null) {
            setActiveImageIndex((activeImageIndex + 1) % GALLERY_IMAGES.length);
        }
    };

    const prevImage = () => {
        if (activeImageIndex !== null) {
            setActiveImageIndex((activeImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
        }
    };

    return (
        <section id="gallery" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span className="flex items-center justify-center gap-2 text-[#c5a059] text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-3">
                        <Camera size={16} /> Photo Gallery
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                        A Visual Feast of <span className="text-[#c5a059]">Flavours & Ambience</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Step inside Masala Mist through our gallery. Explore our elegant restaurant interiors, vibrant dining spaces, beautifully crafted dishes, and the fresh ingredients that bring every experience to life.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GALLERY_IMAGES.map((imgUrl, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-[#121212] transition-all duration-500 hover:border-[#c5a059]/50 hover:shadow-xl hover:shadow-[#c5a059]/10"
                        >
                            <img
                                src={imgUrl}
                                alt={`Masala Mist Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-300"></div>

                            {/* Hover Expand Icon */}
                            <div className="absolute inset-0 p-6 flex items-end justify-end z-10">
                                <span className="w-10 h-10 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                    <Maximize2 size={18} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {activeImageIndex !== null && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn">
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                        aria-label="Close Lightbox"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation - Prev */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                        aria-label="Previous Image"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* Navigation - Next */}
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                        aria-label="Next Image"
                    >
                        <ChevronRight size={28} />
                    </button>

                    {/* Image Container */}
                    <div className="max-w-5xl max-h-[85vh] relative flex flex-col items-center justify-center">
                        <img
                            src={GALLERY_IMAGES[activeImageIndex]}
                            alt={`Gallery Image ${activeImageIndex + 1}`}
                            className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
                        />
                        <div className="mt-4 text-center">
                            <p className="text-gray-400 text-xs tracking-widest uppercase">
                                {activeImageIndex + 1} of {GALLERY_IMAGES.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
