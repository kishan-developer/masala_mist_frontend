"use client";

import React from "react";

export default function RoomDetailHero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/drmpv5vne/image/upload/v1783764963/DSC_0221_ocnztf.jpg')`, // Replace with your actual deluxe room image
        }}
      >
        {/* Dark Overlay for Text Readability - Matching the Reference */}
        <div className="absolute inset-0 bg-black/50 backdrop-brightness-[0.7]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-tight">
          Deluxe Room
        </h1>
        
        {/* Room Description */}
        <p className="text-white/90 text-sm md:text-base lg:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
          A step up from the standard room, often with better views, more space, and additional amenities.
        </p>
      </div>

      {/* Bottom Gradient for section transition */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" /> */}
    </section>
  );
}