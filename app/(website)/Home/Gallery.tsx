"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

const galleryImages = [
  {
    id: 1,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764978/DSC_0361_uqgmnq.jpg",
    title: "Reception Area",
    category: "sands of kashi",
  },
   {
    id: 7,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764978/DSC_0360_gdf7ab.jpg",
    title: "Waiting Area",
    category: "sands of kashi",
  }, 
  {
    id: 10,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783768649/DSC_0366_shctsq.jpg",
    title: "Restaurant",
    category: "sands of kashi",
  },

  {
    id: 4,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764962/DSC_0303_wazvw6.jpg",
    title: "Lift",
    category: "sands of kashi",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764976/DSC_0293_grffuz.jpg",
    title: "Lobby",
    category: "sands of kashi",
  },



 {
    id: 3,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783765570/DSC_0222_kzr40q.jpg",
    title: "Royal Suite Room",
    category: "Rooms",
  },

  {
    id: 2,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783765559/DSC_0262_yfggis.jpg",
    title: "Standard Room",
    category: "sands of kashi",
  },
 
  
 
 
  {
    id: 8,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764971/DSC_0278_nuj9cm.jpg",
    title: "Executive Room",
    category: "sands of kashi",
  },
   
  { 
    id: 6,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764978/hotel_front_m9mphh.jpg",
    title: "Hotel Front",
    category: "sands of kashi",
  },
  {
    id: 9,
    url: "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764957/1_kbjzjf.jpg",
    title: "Hotel Front",
    category: "sands of kashi",
  }
  
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-[#c5a37f]"></span>
            <p className="text-[#c5a37f] font-medium uppercase tracking-[0.2em] text-sm">
              Gallery
            </p>
            <span className="w-12 h-[1px] bg-[#c5a37f]"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#1a1a1a]">
            Explore Our <span className="text-[#C9A96E]">Beautiful Spaces</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Take a visual tour through our stunning property and facilities
          </p>
        </div>

        {/* Gallery Grid */}
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              onClick={() => setSelectedImage(index)}
            >
              <div
                className={`relative ${index === 0 ? "h-[600px]" : "h-72"
                  }`}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Text Overlay */}
                <div className="absolute bottom- left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">

                  <div className="text-white">
                    <div className="text-xs text-[#C9A96E] mb-1 uppercase tracking-wider">
                      {image.category}
                    </div>
                    <div className="text-lg">{image.title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          />

          {/* Modal Wrapper */}
          <div className="relative h-full flex items-center justify-center p-4 md:p-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Previous Button - Left side */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === 0 ? galleryImages.length - 1 : (prev ?? 0) - 1
                );
              }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Content Wrapper */}
            <div className="relative max-w-6xl w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full flex items-center justify-center">
                <ImageWithFallback
                  src={galleryImages[selectedImage].url}
                  alt={galleryImages[selectedImage].title}
                  className="w-full h-auto max-h-[75vh] md:max-h-[80vh] object-contain rounded-lg"
                />
              </div>

              <div className="text-center mt-4 md:mt-6 text-white">
                <div className="text-xs md:text-sm text-[#C9A96E] uppercase tracking-wider mb-1 md:mb-2">
                  {galleryImages[selectedImage].category}
                </div>
                <div className="text-lg md:text-2xl">{galleryImages[selectedImage].title}</div>
              </div>
            </div>

            {/* Next Button - Right side */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  (prev ?? 0) === galleryImages.length - 1
                    ? 0
                    : (prev ?? 0) + 1
                );
              }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}