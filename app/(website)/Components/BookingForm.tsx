"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface BookingFormProps {
  onSuccess?: () => void;
  initialRoomType?: string;
}

export default function BookingForm({ onSuccess, initialRoomType = "" }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [roomType, setRoomType] = useState(initialRoomType);
  const [loading, setLoading] = useState(false);

  const [openDate, setOpenDate] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = {
      name,
      email,
      phone,
      roomType,
      checkIn: dateRange[0].startDate.toISOString(),
      checkOut: dateRange[0].endDate.toISOString(),
      message,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/public/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking Request Sent to Server Successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setRoomType("");
        setMessage("");
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Form Submit Error:", error);
      toast.error("Failed to send booking request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f7f5] p-6 sm:p-8 rounded-2xl w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-serif text-black text-center mb-8 font-playfair">Book Your Stay</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-[10px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-4 rounded-lg bg-white border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition text-black"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-[10px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 rounded-lg bg-white border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition text-black"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-[10px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full p-4 rounded-lg bg-white border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition text-black"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="text-[10px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Select Room</label>
          <select
            className="w-full p-4 rounded-lg bg-white text-gray-700 border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition"
            required
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">Choose a Room</option>
            <option value="Standard Room">Standard Room – ₹3500</option>
            <option value="Executive Room">Executive Room – ₹4500</option>
            <option value="Royal Suite Room">Royal Suite Room – ₹5500</option>
          </select>
        </div>

        {/* Date Picker */}
        <div className="relative">
          <label className="text-[10px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Select Dates</label>
          <div
            onClick={() => setOpenDate(!openDate)}
            className="w-full p-4 rounded-lg bg-white cursor-pointer border border-gray-100 text-gray-700 hover:border-[#c5a37f] transition"
          >
            {`${dateRange[0].startDate.toDateString()} → ${dateRange[0].endDate.toDateString()}`}
          </div>

          {openDate && (
            <div className="absolute left-0 right-0 z-50 mt-2 bg-white shadow-2xl rounded-lg p-2 flex justify-center overflow-auto max-w-full">
              <DateRange
                editableDateInputs={true}
                onChange={(item: any) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                months={1}
                direction="vertical"
                className="text-sm"
              />
              <button 
                type="button"
                onClick={() => setOpenDate(false)}
                className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-200"
              >
                  Close
              </button>
            </div>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="text-[10px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Special Request (Optional)</label>
          <textarea
            placeholder="Any special requests?"
            className="w-full p-4 rounded-lg bg-white border border-gray-100 h-24 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-4 rounded-lg text-white font-semibold tracking-wide transition-all duration-300 ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-[#1a1a1a] hover:bg-[#c5a37f] hover:shadow-lg active:scale-95"
          }`}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
