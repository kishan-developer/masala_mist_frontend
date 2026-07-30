"use client";

import Image from "next/image";
import React from "react";
import { BedDouble, Bell } from "lucide-react";

export default function AboutLuxurySection() {
  return (
    <section className="w-full py-20 px-6 flex justify-center">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">

        {/* Left Section */}
        <div className="bg-white w-full md:w-1/2 p-10 relative">
          <p className="text-sm tracking-widest text-gray-400">ABOUT US</p>

          <h2 className="text-4xl font-semibold leading-tight mt-4 text-gray-900">
            Evolution of <br /> Hospitality From
            <span className="block italic text-[#b69b6d] font-serif">
              Inns to Luxury <br /> Resorts
            </span>
          </h2>

          <p className="text-gray-500 mt-4 leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit.
          </p>

          <button className="mt-8 px-8 py-3 bg-[#0f1c30] text-white rounded shadow hover:bg-[#18283d] transition">
            BOOK NOW
          </button>

          {/* Circle Badge */}
          <div className="absolute top-1/2 right-[-35px] -translate-y-1/2 hidden md:block">
            <div className="w-20 h-20 rounded-full border-[6px] border-[#b69b6d] bg-white flex items-center justify-center text-[#0f1c30] font-semibold text-xs text-center leading-tight">
              LUXURY <br /> STAY
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#0f1c30] w-full md:w-1/2 p-10 rounded-r-xl">
          {/* Image */}
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/room.jpg" // Replace with your image
              alt="Luxury Room"
              width={800}
              height={500}
              className="object-cover"
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            
            <div className="flex items-start gap-4">
              <BedDouble className="text-white w-8 h-8" />
              <div>
                <h4 className="text-white font-semibold">Your Text Here</h4>
                <p className="text-gray-300 text-sm">
                  Sed ut perspiciatis unde omnis iste natus error sit amet
                  doloremque laudantium.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Bell className="text-white w-8 h-8" />
              <div>
                <h4 className="text-white font-semibold">Your Text Here</h4>
                <p className="text-gray-300 text-sm">
                  Sed ut perspiciatis unde omnis iste natus error sit amet
                  doloremque laudantium.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
