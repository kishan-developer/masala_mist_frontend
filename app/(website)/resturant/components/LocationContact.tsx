import React from 'react';
import { Clock, Phone, Instagram, MapPin } from 'lucide-react';

interface InquiryData {
    email: string;
    message: string;
}

interface LocationContactProps {
    inquiryData: InquiryData;
    setInquiryData: (data: InquiryData) => void;
    handleInquirySubmit: (e: React.FormEvent) => void;
    inquiryLoading: boolean;
}

const LocationContact: React.FC<LocationContactProps> = ({
    inquiryData,
    setInquiryData,
    handleInquirySubmit,
    inquiryLoading
}) => {
    return (
        <section id="location-contact" className="py-24 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                <div className="rounded-2xl overflow-hidden h-[500px]">
                    <div className="w-full h-full flex items-center justify-center relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5052.953366837553!2d82.9914422!3d25.318679099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2d4123c9a143%3A0xbd38b03cba9fdde4!2sMasala%20Mist!5e1!3m2!1sen!2sin!4v1787160188000!5m2!1sen!2sin"
                            className="w-full h-full min-h-[300px] md:min-h-[500px] border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                        ></iframe>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl md:text-4xl font-serif text-white mb-8">Reach Out To Us</h2>
                    <div className="grid sm:grid-cols-2 gap-8 mb-12">
                        <div>
                            <p className="text-[#c5a059] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={14} /> Hours of Service</p>
                            <ul className="space-y-2 text-md text-gray-400">
                                <li className="flex justify-between"><span>Mon - Sat</span> <span>11:00 AM - 11:00 PM</span></li>
                                {/* <li className="flex justify-between"><span>Sat - Sun</span> <span>11:00 AM - 01:00 AM</span></li> */}
                                <li className="flex justify-between font-bold text-white mt-4"><span>Kitchen Closes</span> <span>10:30 PM</span></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-[#c5a059] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">Connect Details</p>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-center gap-3"><Phone size={16} className="text-[#c5a059]" />+91 75228 01563</li>
                                <li className="flex items-center gap-3"><Instagram size={16} className="text-[#c5a059]" />info@sandsofkashi.com</li>
                                <li className="flex items-center gap-3"><MapPin size={40} className="text-[#c5a059]" />P.S, Gulab Bhag Colony, Hotel Sands, opp. Sigra, of, Varanasi, Uttar Pradesh 221002</li>
                            </ul>
                        </div>
                    </div>

                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                        <input
                            value={inquiryData.email}
                            style={{ color: "white" }}
                            onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/5 text-white border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#c5a059] transition-all"
                            required
                        />
                        <textarea
                            value={inquiryData.message}
                            onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                            placeholder="Tell us about your event or inquiry"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c5a059] transition-all resize-none"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            disabled={inquiryLoading}
                            className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-[#c5a059] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {inquiryLoading ? "Sending..." : "Send Inquiry"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LocationContact;
