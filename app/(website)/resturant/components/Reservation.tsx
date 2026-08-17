import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface ReservationData {
    name: string;
    guests: string;
    date: string;
    time: string;
    phone: string;
    email: string;
}

interface ReservationProps {
    reservationData: ReservationData;
    setReservationData: (data: ReservationData) => void;
    handleReservationSubmit: (e: React.FormEvent) => void;
    reservationLoading: boolean;
}

const Reservation: React.FC<ReservationProps> = ({
    reservationData,
    setReservationData,
    handleReservationSubmit,
    reservationLoading
}) => {
    return (
        <section id="reserve" className="py-10 md:py-24 px-4 md:px-6 relative text-white">
            <div className="max-w-4xl mx-auto bg-black border border-[#c5a059]/30 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
                <div className="w-full md:w-1/3 bg-[#c5a059] py-5 px-4 md:p-10 flex flex-col justify-between text-white">
                    <div>
                        <h2 className="text-2xl text-3xl font-serif font-bold mb-4">Book A Table</h2>
                        <p className="text-md font-medium mb-8">Secure your experience in advance. We suggest booking 48 hours early for weekends.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Phone size={18} /> <span className="text-md font-bold">+91 75228 01563</span>
                        </div>
                        <button className="flex items-center gap-2 bg-black text-[#c5a059] px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest w-full justify-center">
                            <MessageCircle size={18} /> WhatsApp Booking
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-2/3 p-5 md:p-10 text-white">
                    <form id='form' onSubmit={handleReservationSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-200">Full Name</label>
                            <input
                                type="text"
                                value={reservationData.name}
                                onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white placeholder-gray-400"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-200">Phone Number</label>
                            <input
                                type="tel"
                                value={reservationData.phone}
                                onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white placeholder-gray-400"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-200">Email Address</label>
                            <input
                                type="email"
                                value={reservationData.email}
                                onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white placeholder-gray-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-200">Guests</label>
                            <select
                                value={reservationData.guests}
                                onChange={(e) => setReservationData({ ...reservationData, guests: e.target.value })}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white appearance-none"
                            >
                                <option value="1 Person" className="bg-black text-white">1 Person</option>
                                <option value="2 Persons" className="bg-black text-white">2 Persons</option>
                                <option value="4 Persons" className="bg-black text-white">4 Persons</option>
                                <option value="6+ Persons" className="bg-black text-white">6+ Persons</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-200">Date</label>
                            <input
                                type="date"
                                value={reservationData.date}
                                onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white [color-scheme:dark]"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-200">Time</label>
                            <input
                                type="time"
                                value={reservationData.time}
                                onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c5a059] transition-all text-md text-white [color-scheme:dark]"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={reservationLoading}
                            className="sm:col-span-2 text-sm bg-[#c5a059] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] mt-4 shadow-lg shadow-[#c5a059]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {reservationLoading ? "Processing..." : "Confirm Reservation"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Reservation;
