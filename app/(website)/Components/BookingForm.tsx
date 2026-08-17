"use client";
 
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import BookingSuccessModal from "./BookingSuccessModal";

interface Room {
  _id: string;
  title: string;
  description: string;
  images: string[];
  amenities: string[];
  features: string[];
  maxGuests: number;
  price: number;
  size: string;
  roomType: string;
}

interface BookingFormProps {
  onSuccess?: () => void;
  initialRoomType?: string;
  rooms?: Room[];
}

export default function BookingForm({ onSuccess, initialRoomType = "", rooms = [] }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [roomType, setRoomType] = useState(initialRoomType);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [openDate, setOpenDate] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Find currently selected room details
  const selectedRoomDetails = rooms?.find((r) => r.title === roomType);

  // Sync selected room type from parent component selection
  useEffect(() => {
    if (initialRoomType) {
      setRoomType(initialRoomType);
    }
  }, [initialRoomType]);

  // Adjust guests count if it exceeds selected room's maximum guest capacity
  useEffect(() => {
    if (selectedRoomDetails && guests > selectedRoomDetails.maxGuests) {
      setGuests(selectedRoomDetails.maxGuests);
    }
  }, [roomType, selectedRoomDetails, guests]);

  // Calculate length of stay (in nights)
  const checkInDate = dateRange[0].startDate;
  const checkOutDate = dateRange[0].endDate;
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Calculate total price
  const pricePerNight = selectedRoomDetails?.price || 0;
  const totalAmount = nights * pricePerNight;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = {
      name,
      email,
      phone,
      roomType,
      roomId: selectedRoomDetails?._id || "",
      checkIn: dateRange[0].startDate.toISOString(),
      checkOut: dateRange[0].endDate.toISOString(),
      guests,
      totalAmount,
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
        setShowSuccessModal(true);
        setName("");
        setEmail("");
        setPhone("");
        setRoomType("");
        setGuests(1);
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
    <div className="bg-[#f8f7f5] p-2  sm:px-4 sm:py-2 rounded-2xl max-w-lg mx-auto">
      <h3 className="text-2xl font-serif text-black text-center mb-4 font-playfair">Book Your Stay</h3>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {/* Name */}
        <div className="">
          <label className="text-[13px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg bg-white border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition text-black"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-[13px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-white border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition text-black"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-[13px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full p-3 rounded-lg bg-white border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition text-black"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="text-[13px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Select Room</label>
          <select
            className="w-full p-3 rounded-lg bg-white text-gray-700 border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition"
            required
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">Choose a Room</option>
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => (
                <option key={room._id} value={room.title}>
                  {room.title} – ₹{room.price}
                </option>
              ))
            ) : (
              <>
                <option value="Standard Room">Standard Room – ₹3500</option>
                <option value="Executive Room">Executive Room – ₹4500</option>
                <option value="Royal Suite Room">Royal Suite Room – ₹5500</option>
              </>
            )}
          </select>
        </div>

        {/* Guests Selector */}
        <div>
          <label className="text-[13px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Guests</label>
          <select
            className="w-full p-3 rounded-lg bg-white text-gray-700 border border-gray-100 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition"
            required
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {Array.from(
              { length: selectedRoomDetails?.maxGuests || 3 },
              (_, i) => i + 1
            ).map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="relative">
          <label className="text-[13px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Select Dates</label>
          <div
            onClick={() => setOpenDate(!openDate)}
            className="w-full p-3 rounded-lg bg-white cursor-pointer border border-gray-100 text-gray-700 hover:border-[#c5a37f] transition"
          >
            {`${dateRange[0].startDate.toDateString()} → ${dateRange[0].endDate.toDateString()}`}
          </div>

          {openDate && (
            <div className="absolute left-0 right-0 z-50 mt-0 bg-white/50 shadow-2xl rounded-lg p-0 flex justify-center overflow-auto max-w-full">
              <DateRange
                editableDateInputs={true}
                onChange={(item: any) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                months={1}
                direction="vertical"
                className="text-sm p-4"
              />
              <button 
                type="button"
                onClick={() => setOpenDate(false)}
                className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full "
              >
                  Close
              </button>
            </div>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="text-[13px] uppercase text-gray-500 block mb-1 tracking-wider font-semibold">Special Request (Optional)</label>
          <textarea
            placeholder="Any special requests?"
            className="w-full p-4 rounded-lg bg-white border border-gray-100 h-24 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#c5a37f] transition"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Pricing Summary */}
        {selectedRoomDetails && (
          <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-2">
            <h4 className="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-2">Price Details</h4>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rate per night</span>
              <span>₹{selectedRoomDetails.price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Nights</span>
              <span>{nights} night{nights > 1 ? "s" : ""}</span>
            </div>
            {guests > 1 && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Guests</span>
                <span>{guests} Guests</span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-2 flex justify-between font-semibold text-lg text-black">
              <span>Total Amount</span>
              <span className="text-[#c5a37f]">₹{totalAmount}</span>
            </div>
          </div>
        )}

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

      {/* Success Modal */}
      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
