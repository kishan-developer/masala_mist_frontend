"use client";

import { Instagram } from "lucide-react";

interface InstagramReel {
  id: number;
  link: string;
}

// Ensure these links end with a trailing slash so we can append 'embed'
const instaReels: InstagramReel[] = [
  { id: 1, link: "https://www.instagram.com/reel/DWG6XkFCNiS/" },
  { id: 2, link: "https://www.instagram.com/reel/DVbrJVFFPt7/" },
  { id: 3, link: "https://www.instagram.com/reel/DUBMIJwjrWe/" },
  { id: 4, link: "https://www.instagram.com/reel/DT4kwVGAEgC/" },
  { id: 5, link: "https://www.instagram.com/reel/DTtAL0ukm8H/" },
  { id: 6, link: "https://www.instagram.com/reel/DTc8PDzgHwL/" },
  { id: 7, link: "https://www.instagram.com/reel/DS8GUchjoF1/" },
  { id: 8, link: "https://www.instagram.com/reel/DSrLV0oD77Y/" }
];

export default function InstagramGallery() {
  return (
    <section className="py-20 bg-[#fffcf9]">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-[1px] bg-[#c5a37f]"></span>
            <p className="text-[#c5a37f] font-medium uppercase tracking-[0.2em] text-xs md:text-sm">
              Featured Reels
            </p>
            <span className="w-10 h-[1px] bg-[#c5a37f]"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4">
            Follow on Instagram
          </h1>
          <a 
            href="https://www.instagram.com/sandsofkashi/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1a1a1a] hover:text-[#c5a37f] font-medium transition-colors border-b border-[#1a1a1a] pb-1 hover:border-[#c5a37f]"
          >
            <Instagram size={18} /> @sandsofkashi
          </a>
        </div>

        {/* Video Reels Grid */}
        {/* 2 Rows of 4 on Desktop (lg), 2 on tablet (sm), 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instaReels.map((reel) => (
            <div 
              key={reel.id} 
              className="w-full bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex justify-center"
            >
              <iframe
                src={`${reel.link}embed/`}
                width="100%"
                height="560"
                className="border-none bg-transparent"
                scrolling="no"
                allow="encrypted-media"
                loading="lazy"
                title={`Instagram Reel ${reel.id}`}
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}