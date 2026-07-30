"use client";

import { Car, Wind, Coffee, Wifi, CreditCard, X, Ban, User, Languages, Utensils, Clock, Luggage, HeadphonesIcon, Shirt, ArrowUp, Dumbbell, Flower2, Dog, Bed } from "lucide-react";

interface AmenityItem {
  name: string;
  free?: boolean;
}

interface FacilityCategory {
  title: string;
  icon: React.ReactNode;
  items: AmenityItem[];
}

const facilities: FacilityCategory[] = [
  {
    title: "Popular amenities",
    icon: <Wifi className="w-6 h-6 text-[#AB8A63]" />,
    items: [
      { name: "Parking", free: true },
      { name: "Air conditioning" },
      { name: "Breakfast", free: true },
      { name: "Wi-Fi", free: true },
      { name: "Internet (Wi-Fi)", free: true },
    ],
  },
  {
    title: "Policies & payments",
    icon: <CreditCard className="w-6 h-6 text-[#AB8A63]" />,
    items: [
      { name: "Smoke-free property" },
      { name: "Credit cards accepted" },
      { name: "Debit cards accepted" },
      { name: "Cash accepted" },
    ],
  },
   {
    title: "Services",
    icon: <Clock className="w-6 h-6 text-[#AB8A63]" />,
    items: [
      { name: "Front desk (24-hour)" },
      { name: "Baggage storage" },
      { name: "Concierge" },
      { name: "Full-service laundry" },
      { name: "Lift" },
    ],
  },
 
  // {
  //   title: "Pools",
  //   icon: <X className="w-6 h-6 text-[#AB8A63]" />,
  //   items: [
  //     { name: "No pools" },
  //     { name: "No hot tub" },
  //   ],
  // },
  {
    title: "Parking & transport",
    icon: <Car className="w-6 h-6 text-[#AB8A63]" />,
    items: [
      { name: "Parking", free: true },
    ],
  },
  {
    title: "Accessibility",
    icon: <User className="w-6 h-6 text-[#AB8A63]" />,
    items: [
      { name: "Not accessible" },
    ],
  },
  {
    title: "Languages spoken",
    icon: <Languages className="w-6 h-6 text-[#AB8A63]" />,
    items: [
      { name: "English" },
      { name: "Hindi" },
    ],
  },
  {
    title: "Food and drink",
    icon: <Utensils className="w-6 h-6 text-[#AB8A63]" />,
    items: [
      { name: "Restaurant" },
      { name: "Table service" },
      { name: "Room service" },
      { name: "Breakfast", free: true },
    ],
  },
 
  {
    title: "Pets",
    icon: <Dog className="w-6 h-6 text-[#AB8A63]" />,
    items: [
      { name: "No pets allowed" },
    ],
  },
 
];

export default function HotelFacilities() {
  return (
    <section className="bg-[#000000]/60 relative bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('https://res.cloudinary.com/drmpv5vne/image/upload/v1783764970/DSC_0252_cirqen.jpg')" }}>
      {/* <div className="absolute inset-0 bg-[#000000]/60 z-10"></div> */}
      <div className="flex p-20 md:p-40 w-full items-center justify-center bg-[#000000]/60">
        <div className="max-w-7xl mx-auto text-center z-20 ">


          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-[#c5a37f]"></span>
              <p className="text-[#ffffff] font-medium uppercase tracking-[0.2em] text-sm">
                Facilities
              </p>
              <span className="w-12 h-[1px] bg-[#c5a37f]"></span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-[#ffffff]">
              Hotel Facilities
            </h1>
            {/* <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Take a visual tour through our stunning property and facilities
          </p> */}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((category, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200"
              >
                <div className="mb-6 flex items-center gap-3">
                  {category.icon}
                  <h3 className="text-xl text-[#AB8A63] font-semibold">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.items.map((amenity, amenityIdx) => (
                    <li key={amenityIdx} className="flex items-center justify-between text-gray-700 text-sm">
                      <span>{amenity.name}</span>
                      {amenity.free && (
                        <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded-full">FREE</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h1 className=" mt-10 text-center text-[#ffffff] font-bold text-1xl md:text-1xl">Note : Extra Person @ ₹1200.00/- *Rates are subject to change</h1>

        </div>
      </div>
    </section>
  );
}
