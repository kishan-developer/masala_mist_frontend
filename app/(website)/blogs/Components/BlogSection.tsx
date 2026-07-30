"use client";

import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";

// --- Types ---
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

// --- Mock Data ---
const posts: BlogPost[] = [
  {
    id: 1,
    title: "10 Reasons To Visit Our Luxury Resort This Summer",
    excerpt: "Discover the hidden gems and exclusive summer activities that make our resort the ultimate destination...",
    image: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764963/DSC_0221_ocnztf.jpg",
    category: "Travel",
    date: "June 15, 2026",
    author: "Admin",
  },
  {
    id: 2,
    title: "The Art of Fine Dining: A Look Inside Our Kitchen",
    excerpt: "Meet our world-class chefs and learn the secrets behind our most popular signature dishes...",
    image: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764978/DSC_0361_uqgmnq.jpg",
    category: "Dining",
    date: "June 12, 2026",
    author: "Chef Mike",
  },
  {
    id: 3,
    title: "Wellness & Spa: Finding Your Inner Peace",
    excerpt: "Experience a journey of relaxation with our new holistic spa treatments designed for mind and body...",
    image: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764959/20250502_154228_rw2f0y.jpg",
    category: "Wellness",
    date: "June 10, 2026",
    author: "Sarah J.",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-[#c5a37f] text-white text-[10px] uppercase tracking-widest px-4 py-1 rounded-full font-bold">
                  {post.category}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-[#c5a37f]" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} className="text-[#c5a37f]" />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-4 group-hover:text-[#c5a37f] transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="mt-auto">
                  <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1a1a1a] group/link">
                    Read More 
                    <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform duration-300 text-[#c5a37f]" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Optional: Pagination / View All */}
        <div className="mt-16 text-center">
            <button className="px-10 py-4 text-[#c5a37f] border border-gray-200 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
                View All Posts
            </button>
        </div>
      </div>
    </section>
  );
}