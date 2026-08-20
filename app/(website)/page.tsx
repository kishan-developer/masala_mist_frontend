"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Menu,
    X,
    User
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import components
import Hero from './resturant/components/Hero';
import About from './resturant/components/About';
import SignatureDishes from './resturant/components/SignatureDishes';
import FullMenu from './resturant/components/FullMenu';
import InstagramReels from './resturant/components/InstagramReels';
import InstagramReelsSection from './resturant/components/InstagramReelsSection';
import WhyChooseUs from './resturant/components/WhyChooseUs';
import CustomerReviews from './resturant/components/CustomerReviews';
import Reservation from './resturant/components/Reservation';
import SpecialOffers from './resturant/components/SpecialOffers';
import OnlineOrdering from './resturant/components/OnlineOrdering';
import LocationContact from './resturant/components/LocationContact';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
    name: string;
    desc: string;
    price: string;
}

type MenuData = {
    [key: string]: MenuItem[];
};

const Page = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('VEG');

    const [reservationLoading, setReservationLoading] = useState(false);
    const [inquiryLoading, setInquiryLoading] = useState(false);

    const [reservationData, setReservationData] = useState({
        name: '',
        phone: '',
        email: '',
        guests: '1 Person',
        date: '',
        time: ''
    });

    const [inquiryData, setInquiryData] = useState({
        email: '',
        message: ''
    });

    const handleReservationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reservationData.name || !reservationData.date || !reservationData.time) {
            toast.warn("Please fill in all reservation details.");
            return;
        }
        setReservationLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant/reservation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Table reservation confirmed! Check your email for details.");
                setReservationData({ name: '', phone: '', email: '', guests: '1 Person', date: '', time: '' });
            } else {
                toast.error(data.message || "Failed to send reservation request.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setReservationLoading(false);
        }
    };

    const handleInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inquiryData.email || !inquiryData.message) {
            toast.warn("Please provide both email and message.");
            return;
        }
        setInquiryLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant/inquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inquiryData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Inquiry sent successfully! Check your email for confirmation.");
                setInquiryData({ email: '', message: '' });
            } else {
                toast.error(data.message || "Failed to send inquiry.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setInquiryLoading(false);
        }
    };

    // Handle scroll for sticky header effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP Scroll Animations
    useEffect(() => {
        // Hero section animations
        gsap.from("#hero h1", {
            scrollTrigger: {
                trigger: "#hero",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from("#hero p", {
            scrollTrigger: {
                trigger: "#hero",
                start: "top 70%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        // About section
        gsap.from("#about .grid > div:first-child", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from("#about .grid > div:last-child", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
            },
            x: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        });

        // Signature dishes - GSAP animation removed

        // Menu section - GSAP animation removed

        // Instagram reels - GSAP animation removed

        // Why choose us - GSAP animation removed

        // Reviews
        gsap.from("#reviews .grid > div", {
            scrollTrigger: {
                trigger: "#reviews",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out"
        });

        // Reservation section
        gsap.from("#reserve > div", {
            scrollTrigger: {
                trigger: "#reserve",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Special offers
        gsap.from("#special-offers > div > div", {
            scrollTrigger: {
                trigger: "#special-offers",
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Online ordering - GSAP animation removed

        // Location section
        gsap.from("#location-contact .grid > div", {
            scrollTrigger: {
                trigger: "#location-contact",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power3.out"
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const menuCategories = [
        'VEG',
        'NON-VEG',
        'KEBABS & GRILLS',
        'COASTAL BITES',
        'CHINESE VEG'
    ];



    const vegItems = [
        {
            name: 'Mutton Rara',
            price: '₹595',
            img: 'https://res.cloudinary.com/drmpv5vne/image/upload/v1783768771/Motton_Rara_ob1uje.avif',
            desc: 'Succulent mutton pieces slow-cooked in a rich, spicy, and flavorful gravy with a blend of aromatic spices, delivering a hearty and indulgent dish.'
        },
        {
            name: 'Chicken Hyderabadi',
            price: '₹425',
            img: 'https://res.cloudinary.com/drmpv5vne/image/upload/v1783768766/Chicken_Hyderabadi_k5vjps.avif',
            desc: 'Tender chicken pieces cooked in a rich, spicy, and aromatic Hyderabadi-style gravy, infused with traditional spices for a bold and flavorful experience.'
        },
        {
            name: 'Paneer Hyderabadi',
            price: '₹385',
            img: 'https://res.cloudinary.com/drmpv5vne/image/upload/v1783768774/Paneer_hydrabady_d60max.avif',
            desc: 'Soft paneer cubes cooked in a rich, spicy, and aromatic Hyderabadi-style gravy, blending traditional spices for a bold and flavorful experience.'
        },

        {
            name: 'Paneer Butter Masala',
            price: '₹425',
            img: 'https://res.cloudinary.com/drmpv5vne/image/upload/v1783768773/Paneer_Butter_Masala_kt7few.avif',
            desc: 'Cottage cheese in a green herb marinade of mint, coriander, and mild spices.'
        },
        {
            name: 'Crispy Baby Corn',
            price: '₹425',
            img: 'https://res.cloudinary.com/drmpv5vne/image/upload/v1783768768/Crispy_Baby_Corn_pr9cox.avif',
            desc: 'Char-grilled cottage cheese marinated in smoky tandoori spices and hung curd.'
        },
        {
            name: 'Chilli Chicken Dry',
            price: '₹435',
            img: 'https://res.cloudinary.com/drmpv5vne/image/upload/v1783768767/Chilli_Chicken_Dry_ushhme.avif',
            desc: 'Cream-kissed paneer delicately spiced with white pepper, cardamom, and cheese.'
        },
        {
            name: 'Paneer Lababdar',
            price: '₹435',
            img: 'https://res.cloudinary.com/drmpv5vne/image/upload/v1783768775/Paneer_Lababdar_vt3vok.avif',
            desc: 'Soft paneer in a velvety saffron-cream marinade, tandoor-roasted to silkiness.'
        },
        {
            name: 'Veg Manchurian Gravy',
            price: '₹365',
            img: 'https://res.cloudinary.com/drmpv5vne/image/upload/v1783768775/Veg_Manchurian_Gravy_r81utk.avif',
            desc: 'Soft vegetable dumplings simmered in a tangy, spicy, and flavorful Indo-Chinese sauce, creating a bold and satisfying dish. Perfect with fried rice, noodles, or as a standalone delight.'
        }
    ]

    const menuData = {
        'VEG': [
            {
                name: 'Paneer Tikka',
                price: '₹425',
                desc: 'Char-grilled cottage cheese marinated in smoky tandoori spices and hung curd.'
            },
            {
                name: 'Paneer Malai Tikka',
                price: '₹435',
                desc: 'Cream-kissed paneer delicately spiced with white pepper, cardamom, and cheese.'
            },
            {
                name: 'Paneer Makhmali Tikka',
                price: '₹435',
                desc: 'Soft paneer in a velvety saffron-cream marinade, tandoor-roasted to silkiness.'
            },
            {
                name: 'Paneer Hariyali Tikka',
                price: '₹425',
                desc: 'Cottage cheese in a green herb marinade of mint, coriander, and mild spices.'
            }
        ],

        'NON-VEG': [
            {
                name: 'Classic Chicken Tikka',
                price: '₹465',
                desc: 'Tender chicken chunks steeped in signature tandoori marinade — smoky and juicy.'
            },
            {
                name: 'Chicken Malai Tikka',
                price: '₹475',
                desc: 'Creamy melt-in-mouth chicken grilled till golden and soft.'
            },
            {
                name: 'Tandoori Chicken (Half)',
                price: '₹445',
                desc: 'Bone-in chicken slow-cooked in a clay oven after a long spice marinade.'
            },
            {
                name: 'Tandoori Chicken (Full)',
                price: '₹645',
                desc: 'Full portion of clay oven roasted chicken with deep tandoori flavors.'
            },

            // Chinese Non-Veg Items
            { name: 'Chicken Hakka Noodles', price: '₹365', desc: '' },
            { name: 'Chicken Schezwan Chilli Garlic Noodles', price: '₹385', desc: '' },
            { name: 'Chicken Fried Rice', price: '₹425', desc: '' },
            { name: 'Chicken Spring Roll', price: '₹385', desc: '' },
            { name: 'Chilli Chicken Gravy/Dry', price: '₹435', desc: '' },
            { name: 'Chicken Lollipop', price: '₹425', desc: '' }
        ],

        'KEBABS & GRILLS': [
            {
                name: 'Mutton Seekh Kebab',
                price: '₹475',
                desc: 'Minced mutton blended with herbs, flame grilled, juicy and flavorful.'
            },
            {
                name: 'Mutton Shami Kebab',
                price: '₹425',
                desc: 'Slow-cooked mutton and dal kebabs, crisp outside and tender within.'
            },
            {
                name: 'Mutton Chapli Kebab',
                price: '₹475',
                desc: 'Mutton with tomato, onion, spices; pan-fried for crisp edges and rich flavor.'
            },
            {
                name: 'Mutton Galawati Kebab',
                price: '₹475',
                desc: 'Nawabi kebab so soft it melts at the slightest touch.'
            },
            {
                name: 'Chicken Seekh Kebab',
                price: '₹425',
                desc: 'Minced chicken with garlic, chillies, and spices charred over live coal.'
            }
        ],

        'COASTAL BITES': [
            {
                name: 'Fish Fingers',
                price: '₹425',
                desc: 'Golden crispy fish fingers coated in seasoned crumbs and served with dip.'
            },
            {
                name: 'Fill-e-Fish Fry',
                price: '₹425',
                desc: 'Fish fillet marinated in coastal spices and shallow fried till crisp.'
            }
        ],

        'CHINESE VEG': [
            { name: 'Hakka Noodles', price: '₹265', desc: '' },
            { name: 'Schezwan Chilli Garlic Noodles', price: '₹285', desc: '' },
            { name: 'Fried Rice', price: '₹375', desc: '' },
            { name: 'Spring Roll', price: '₹325', desc: '' },
            { name: 'Honey Chilli Potato', price: '₹225', desc: '' },
            { name: 'Chilli Paneer Gravy/Dry', price: '₹425', desc: '' },
            { name: 'Veg Manchurian Gravy/Dry', price: '₹375', desc: '' },
            { name: 'Crispy Baby Corn', price: '₹375', desc: '' },
            { name: 'American Corn Salt & Pepper', price: '₹285', desc: '' },
            { name: 'Chilli Mushroom', price: '₹375', desc: '' }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#c5a059] selection:text-black">
            <ToastContainer theme="dark" position="bottom-right" />

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 text-2xl font-serif">
                    <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
                    <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
                    <a href="#reserve" onClick={() => setMobileMenuOpen(false)} className="text-[#c5a059]">Reservations</a>
                    <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8"><X size={32} /></button>
                </div>
            )}

            <a
                href={process.env.NEXT_PUBLIC_DASHBOARD_URL ? `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/login` : "http://localhost:3000/login"}
                target='_blank'
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-8 right-8 z-50 w-fit px-5 py-2.5 border border-[#b5946a] bg-[#b5946a] font-serif uppercase text-black font-bold text-xs rounded-md hover:bg-[#a38255] hover:text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-center"
            >
                <User size={15} />
                <span>Login</span>
            </a>

            {/* Components */}
            <Hero />
            <About />
            <SignatureDishes vegItems={vegItems} />
            <FullMenu menuCategories={menuCategories} menuData={menuData} />
            {/* <InstagramReels /> */}
            {/* <InstagramReelsSection /> */}
            <WhyChooseUs />
            <CustomerReviews />
            <Reservation
                reservationData={reservationData}
                setReservationData={setReservationData}
                handleReservationSubmit={handleReservationSubmit}
                reservationLoading={reservationLoading}
            />
            <SpecialOffers />
            <OnlineOrdering />
            <LocationContact
                inquiryData={inquiryData}
                setInquiryData={setInquiryData}
                handleInquirySubmit={handleInquirySubmit}
                inquiryLoading={inquiryLoading}
            />

            {/* Styles for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                    }
                    @keyframes pulse-slow {
                    0%, 100% { transform: scale(1.05); }
                    50% { transform: scale(1.1); }
                    }
                    .animate-pulse-slow {
                    animation: pulse-slow 15s infinite ease-in-out;
                    }
                    @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                    }
                    .animate-bounce-slow {
                    animation: bounce-slow 4s infinite ease-in-out;
                    }
                    html {
                    scroll-behavior: smooth;
                    }

                    input {
                    color: white;
                    }
                `}}
            />
        </div>
    );
};

export default Page;