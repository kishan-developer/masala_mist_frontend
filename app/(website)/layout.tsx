import type { Metadata } from "next";
import { Geist, Raleway } from "next/font/google";
import Header from "./Components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import "./globals.css";

import { Playfair_Display } from "next/font/google";
import Footer from "./Components/Footer";
import { Montserrat } from "next/font/google";
import ChatBot from "./Components/ChatBot";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const ICON_URL = "https://res.cloudinary.com/drmpv5vne/image/upload/v1787144253/masala_mist_logo.png_xufdkj.jpg";

export const metadata: Metadata = {
  title: "Masala Mist",
  description: "Masala Mist Resturant in Varanasi | Varanasi Resturant",
  icons: {
    icon: ICON_URL,
    shortcut: ICON_URL,
    apple: ICON_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={ICON_URL} />
        <link rel="shortcut icon" href={ICON_URL} />
        <link rel="apple-touch-icon" href={ICON_URL} />
      </head>
      <body
        className={`${playfair.className} ${montserrat.className} antialiased`}
      >
        <Header />
        {children}
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}

