"use client";

import React, { useEffect } from "react";
import { Instagram } from "lucide-react";

interface ReelItem {
  id: number;
  link: string;
}

const instaReels: ReelItem[] = [
  { id: 1, link: "https://www.instagram.com/reel/DNXNgs0PMQ5/" },
  { id: 2, link: "https://www.instagram.com/reel/DR3-J0Hk4op/" },
  { id: 3, link: "https://www.instagram.com/reel/DOAjatfgTkT/" },
  { id: 4, link: "https://www.instagram.com/reel/DR1w6TMjxRK/" },
  { id: 5, link: "https://www.instagram.com/reel/DR7C_PskghY/" },
  { id: 6, link: "https://www.instagram.com/reel/DR_Wf7kE6tw/" },
  { id: 7, link: "https://www.instagram.com/reel/DPGTCSrkWJ4/" },
  { id: 8, link: "https://www.instagram.com/reel/DMaxTWvv2TW/" },
];

export default function InstagramReelsSection() {
  useEffect(() => {
    // Process Instagram embeds on client render
    const processEmbeds = () => {
      const windowWithInsta = window as unknown as { instgrm?: { Embeds: { process: () => void } } };
      if (windowWithInsta.instgrm) {
        windowWithInsta.instgrm.Embeds.process();
      }
    };

    // Load embed script if not already present
    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = processEmbeds;
      document.body.appendChild(script);
    } else {
      processEmbeds();
    }
  }, []);

  return (
    <section className="py-20 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-[1px] bg-[#c5a059]"></span>
            <p className="text-[#c5a059] font-medium uppercase tracking-[0.2em] text-xs md:text-sm font-bold">
              Featured Reels
            </p>
            <span className="w-10 h-[1px] bg-[#c5a059]"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Follow Masala Mist on Instagram
          </h1>
          <a 
            href="https://www.instagram.com/masalamist_sok/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c5a059] hover:text-white font-medium transition-colors border-b border-[#c5a059]/40 pb-1 hover:border-white text-base"
          >
            <Instagram size={18} /> @masalamist_sok
          </a>
        </div>

        {/* Video Reels Grid - Pure Reels Only (No captions) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instaReels.map((reel) => (
            <div 
              key={reel.id} 
              className="w-full bg-[#141414] rounded-2xl border border-white/10 overflow-hidden flex justify-center p-1 shadow-2xl hover:border-[#c5a059]/50 transition-all"
            >
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink={`${reel.link}`}
                data-instgrm-version="14"
                style={{
                  background: '#000',
                  border: '0',
                  borderRadius: '12px',
                  margin: '0',
                  maxWidth: '540px',
                  minWidth: '280px',
                  padding: '0',
                  width: '100%',
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a
                    href={`${reel.link}`}
                    style={{
                      background: '#000',
                      lineHeight: '0',
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  </a>
                </div>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
