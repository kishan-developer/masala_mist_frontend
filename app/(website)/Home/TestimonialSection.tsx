"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  stars: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mahak Minta",
    role: "Local Explorer",
    image: "/reviews/mahak.png",
    stars: 5,
    quote: "Tasty food and a calm, pleasant environment. The staff is very welcoming. Mr. Pankaj Kumar Pal attended to us beautifully—such a kind and professional person. Highly recommend for anyone visiting Sigra!"
  },
  {
    id: 2,
    name: "Neeti Mishra",
    role: "Official Visit",
    image: "/reviews/neeti.png",
    stars: 5,
    quote: "Visited Masala Mist Restaurant during my official visit to Varanasi. I was pleasantly surprised by the delicious food and excellent service. Special thanks to Mr. Pankaj Pal, who was extremely helpful and made our dinner memorable."
  },
  {
    id: 3,
    name: "Amarjeet Rai",
    role: "Business Man",
    image: "/reviews/abul.png",
    stars: 5,
    quote: "If you are in Varanasi and looking for a perfect blend of taste, ambience, and hospitality – Masala Mist Restaurant is the place to be! The signature dishes are a must-try. Truly a 5-star experience in the heart of Kashi."
  },
  {
    id: 4,
    name: "Krishna Raj Singh",
    role: "Business Man",
    image: "/reviews/kshitij.png",
    stars: 5,
    quote: "From the moment we walked in, we were greeted with genuine warmth. The staff didn’t just do their job, they actually cared about making sure we were comfortable. The ambience had that perfect balance—elegant but not intimidating."
  },
  {
    id: 5,
    name: "Prabhat Ojha",
    role: "Food Blogger",
    image: "/reviews/prabal.png",
    stars: 5,
    quote: "From the moment I walked into MASALA MIST, I knew I was in for something special. The atmosphere strikes the perfect balance between cozy and elegant, with warm lighting, tasteful décor, and an inviting aroma from the kitchen."
  }
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section className="py-24 bg-[#fffcf9]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#c5a37f]"></span>
              <p className="text-[#c5a37f] font-medium uppercase tracking-widest text-sm">
                Guest Reviews
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">
              What Our Guests Say
            </h1>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 border border-gray-200 flex text-[#1a1a1a] items-center justify-center rounded-full hover:bg-[#c5a37f] hover:text-white transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 border border-gray-200 flex text-[#1a1a1a] items-center justify-center rounded-full hover:bg-[#c5a37f] hover:text-white transition-all shadow-sm active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="relative overflow-hidden min-h-[450px] md:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-12 items-center"
            >
              {/* Image Side */}
              <div className="relative aspect-square w-full max-w-[350px] mx-auto">
                <div className="absolute inset-0 border-[1px] border-[#c5a37f]/20 rounded-full scale-110 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-[12px] border-white shadow-2xl">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>

              {/* Text Side */}
              <div className="flex flex-col text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      fill={i < current.stars ? "#c5a37f" : "none"}
                      stroke={i < current.stars ? "#c5a37f" : "#ccc"}
                      className="drop-shadow-sm"
                    />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-[#1a1a1a] font-serif leading-relaxed mb-10 italic">
                  "{current.quote}"
                </blockquote>

                <div className="mt-auto">
                  <h4 className="text-2xl font-serif text-[#c5a37f]">{current.name}</h4>
                  <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-2">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden gap-8 justify-center mt-12">
          <button
            onClick={prevTestimonial}
            className="w-14 h-14 border border-gray-200 flex items-center justify-center rounded-full text-[#1a1a1a] active:bg-[#c5a37f] active:text-white transition-all shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="w-14 h-14 border border-gray-200 flex items-center justify-center rounded-full text-[#1a1a1a] active:bg-[#c5a37f] active:text-white transition-all shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}