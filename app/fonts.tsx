import { Poppins } from "next/font/google";
import localFont from "next/font/local";

// Poppins
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

// Montserrat
export const montserrat = localFont({
  src: [
    { path: "../public/fonts/Montserrat-Italic-VariableFont_wght.woff2.ttf", weight: "400" },
    { path: "../public/fonts/Montserrat-VariableFont_wght.woff2.ttf", weight: "700" },
  ],
  variable: "--font-montserrat",
});

// Playfair Display
export const playfair = localFont({
  src: [
    { path: "../public/fonts/Geist-VariableFont_wght.woff2.ttf", weight: "400" },
    
  ],
  variable: "--font-playfair",
});

// Raleway
export const raleway = localFont({
  src: [
    { path: "../public/fonts/Raleway-Italic-VariableFont_wght.woff2.ttf", weight: "400" },
    { path: "../public/fonts/Raleway-VariableFont_wght.woff2.ttf", weight: "700" },
  ],
  variable: "--font-raleway",
});