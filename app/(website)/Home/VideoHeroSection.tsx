"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoHeroSection() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden group">
      {/* Background Image / Video Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/drmpv5vne/image/upload/v1783764978/DSC_0361_uqgmnq.jpg')`, // Replace with your image path
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>  

      {/* Centered Play Button Area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="relative w-40 h-40 flex items-center justify-center group/btn">
          
          {/* Rotating Text Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="fill-white text-[8px] uppercase tracking-[0.2em] font-medium">
                <textPath xlinkHref="#circlePath">
                  Watch Full Video • Watch Now • Watch Full Video • Watch Now •
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Central Play Icon */}
          <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110">
            <Play className="text-white fill-white ml-1" size={24} />
          </div>

        </button>
      </div>

      {/* Floating Scroll Top Button (Bottom Right) */}
      <div className="absolute bottom-8 right-8">
        <button className="w-10 h-10 bg-[#c5a37f] text-white flex items-center justify-center rounded-sm hover:bg-[#b48f6a] transition-colors">
          <span className="rotate-[-45deg] border-t-2 border-l-2 border-white w-2 h-2" />
        </button>
      </div>
    </section>
  );
}