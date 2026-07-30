"use client";

import React, { useState } from 'react';
import { Calendar, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const BookingBar = () => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    // Handle your booking logic here
  };

  return (
    <div className="z-100 absolute bottom-4 md:bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl p-4 md:p-4 lg:p-8 flex flex-col lg:flex-row items-center gap-4 md:gap-6 text-gray-800"
      >
        {/* Check In */}
        <div className="flex-1 w-full border-b lg:border-b-0 lg:border-r border-gray-100 pb-4 lg:pb-0 lg:pr-6 relative">
          <label className="text-xs md:text-sm font-semibold mb-2 block">Check In</label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-0 w-4 h-4 md:w-5 md:h-5 text-[#b5946a] pointer-events-none z-10" />
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
              className="w-full pl-7 md:pl-8 pr-4 py-2 md:py-1 bg-transparent focus:outline-none text-gray-500 cursor-pointer text-sm"
              required
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="flex-1 w-full border-b lg:border-b-0 lg:border-r border-gray-100 pb-4 lg:pb-0 lg:pr-6 relative">
          <label className="text-xs md:text-sm font-semibold mb-2 block">Check Out</label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-0 w-4 h-4 md:w-5 md:h-5 text-[#b5946a] pointer-events-none z-10" />
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
              className="w-full pl-7 md:pl-8 pr-4 py-2 md:py-1 bg-transparent focus:outline-none text-gray-500 cursor-pointer text-sm"
              required
            />
          </div>
        </div>

        {/* Guests Select */}
        <div className="flex-1 w-full border-b lg:border-b-0 lg:border-r border-gray-100 pb-4 lg:pb-0 lg:pr-6 relative">
          <label className="text-xs md:text-sm font-semibold mb-2 block">Guests</label>
          <div className="relative flex items-center">
            <User className="absolute left-0 w-4 h-4 md:w-5 md:h-5 text-[#b5946a] pointer-events-none" />
            <select
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              className="w-full pl-7 md:pl-8 pr-6 py-2 md:py-1 bg-transparent focus:outline-none text-gray-500 appearance-none cursor-pointer text-sm"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
            <ChevronDown className="absolute right-0 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Submit Button */}
        <Link href="/rooms"
          type="submit"
          className="w-full lg:w-auto bg-[#b5946a] hover:bg-[#a3835a] text-white px-6 md:px-10 py-3 md:py-5 rounded-lg font-semibold transition-all whitespace-nowrap text-sm md:text-base"
        >
          Check Availability
        </Link>
      </form>
    </div>
  );
};

export default BookingBar;