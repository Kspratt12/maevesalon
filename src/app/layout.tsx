import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maeve Salon & Color Bar | Luxury Hair Salon in Apex, NC",
  description:
    "Maeve Salon and Color Bar is a luxury hair salon located in Apex, North Carolina. Featuring Goldwell and Redken color, along with Oribe and Kerastase products.",
  keywords:
    "hair salon, Apex NC, luxury salon, color bar, Goldwell, Kerastase, Oribe, bridal hair, hair services, nails, nail art",
  openGraph: {
    title: "Maeve Salon & Color Bar | Luxury Hair Salon in Apex, NC",
    description:
      "A luxury hair salon in Apex, NC providing a safe, high-quality salon experience above and beyond the rest.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${cormorant.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col font-body overflow-x-hidden w-full">
        <Navbar />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
