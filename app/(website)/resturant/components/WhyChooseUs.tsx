import React from 'react';
import { Star, Clock, Utensils, Users, Calendar, Award } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        { icon: <Star />, title: "Premium Quality", desc: "Only the finest A-grade ingredients sourced globally." },

        { icon: <Utensils />, title: "Hygienic Kitchen", desc: "Open kitchen concept with 5-star safety certifications." },
        { icon: <Users />, title: "Family-Friendly", desc: "Dedicated spaces and menus for children and large families." },
        { icon: <Calendar />, title: "Easy Reservations", desc: "Book your favorite table in just three clicks online." },

    ];

    return (
        <section id="why-choose-us" className="py-24 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                {features.map((item, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:bg-gradient-to-b hover:from-[#c5a059]/10 transition-all">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] mb-6">
                            {item.icon}
                        </div>
                        <h4 className="text-xl font-serif text-white mb-3">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
