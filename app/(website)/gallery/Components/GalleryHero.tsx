"use client";

import React from "react";

export default function GalleryHero() {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('./room_1.jpg')`, // Replace with your actual gallery hero image
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-[0.8]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-tight animate-fade-in">
          Gallery
        </h1>
        
        {/* Hero Description */}
        <p className="text-white/90 text-sm md:text-base lg:text-lg font-light tracking-widest max-w-2xl mx-auto leading-relaxed uppercase">
          where every image tells a story of luxury, comfort, and unparalleled hospitality
        </p>
      </div>

      {/* Bottom fade transition to the gallery grid */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" /> */}
    </section>
  );
}