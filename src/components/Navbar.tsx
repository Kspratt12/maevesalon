"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Meet the Team", href: "/meet-the-team" },
  { name: "Hair Services", href: "/hair-services" },
  { name: "Nails by Tess", href: "/nails-by-tess" },
  { name: "Online Consultation", href: "/online-consultation" },
  { name: "Bridal", href: "/bridal" },
  { name: "Book Appointment", href: "/book-appointment" },
  { name: "Contact", href: "/contact" },
  { name: "Salon Policy", href: "/salon-policy" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
              <Image
                src="/logo.png"
                alt="Maeve Salon Logo"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="text-center">
              <h1
                className={`font-heading text-xl md:text-2xl font-light transition-colors duration-300 ${
                  scrolled ? "text-charcoal" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic" }}
              >
                Maeve
              </h1>
              <p
                className={`text-[7px] md:text-[8px] tracking-luxe uppercase font-body font-light transition-colors duration-300 ${
                  scrolled ? "text-warm-gray" : "text-white/80"
                }`}
              >
                Salon & Color Bar
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-[11px] tracking-elegant uppercase font-body font-light transition-all duration-300 hover:text-gold elegant-underline ${
                  scrolled ? "text-charcoal" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Phone + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:919-951-7866"
              className={`hidden md:flex items-center gap-2 text-xs tracking-wide transition-colors duration-300 hover:text-gold ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
            >
              <Phone size={14} />
              919.951.7866
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-white z-40 transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src="/logo.png" alt="Maeve Salon Logo" fill className="object-cover" sizes="40px" />
              </div>
              <h2
                className="font-heading text-2xl text-charcoal"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic" }}
              >
                Maeve
              </h2>
            </Link>
            <button onClick={() => setIsOpen(false)} className="p-2 text-charcoal" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-sm tracking-elegant uppercase font-body font-light text-charcoal hover:text-gold transition-colors border-b border-gray-50"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="px-8 py-6 border-t border-gray-100">
            <a href="tel:919-951-7866" className="flex items-center gap-2 text-sm text-gold">
              <Phone size={16} />
              919.951.7866
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
