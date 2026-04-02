"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone, Sparkles, Palette, Scissors, Gem } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const stylists = [
  "Any Stylist",
  "Alexa Neal",
  "Anna Denton",
  "Bethany Cordial",
  "Brittany Murphy",
  "Brittany Siebelink",
  "Carrie Sparks",
  "Carson Reagan",
  "Claire Hartman",
  "Gracie Hutchens",
  "Hannah Womble",
  "Jess Marano",
  "Jessica Speicher",
  "Jordan Miles",
  "Kirstin Allen",
  "Lindsey Widger",
  "Meghan Marple",
  "Nails By Tess",
  "Sucel Toc",
];

const serviceCategories: Record<string, { name: string; price: string }[]> = {
  "Cut & Style": [
    { name: "Women's Cut - Stylist", price: "from $60" },
    { name: "Women's Cut - Master Stylist", price: "from $75" },
    { name: "Men's Cut", price: "from $45" },
    { name: "Blowout", price: "from $35" },
  ],
  "Color Service": [
    { name: "Re-Touch & Style", price: "from $105" },
    { name: "Full Color & Style", price: "from $155" },
    { name: "Partial Dimensional & Style", price: "from $140" },
    { name: "Full Dimensional & Style", price: "from $155" },
    { name: "Balayage & Style", price: "from $245" },
    { name: "Full Babylights & Style", price: "from $225" },
  ],
  "Smoothing": [
    { name: "Kerasilk Smoothing Treatment", price: "from $350" },
  ],
  "Updo": [
    { name: "Special Occasion Updo", price: "from $100" },
    { name: "Bridal Consultation", price: "Free" },
  ],
  "Nails": [
    { name: "Short and Sweet Mani", price: "from $15" },
    { name: "Builder Gel Mani", price: "from $55" },
    { name: "Gel-X Full Set", price: "from $60" },
    { name: "Acrylic Full Set", price: "from $55" },
  ],
};

const faqs = [
  {
    q: "Do I need a consultation before my first visit?",
    a: "We recommend a consultation for color corrections, extensions, and transformative services. For standard cuts and color, you can book directly. New clients get a complimentary consultation built into their first appointment.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We ask for at least 24 hours notice for cancellations or rescheduling. Cancellations with less than 24 hours notice may result in a 50% charge of the scheduled service. No shows are charged 50% of the service.",
  },
  {
    q: "How do I know which stylist to book with?",
    a: "Each of our 18 stylists brings unique strengths. If you're unsure, book a consultation and we'll match you with the perfect stylist based on your hair goals. You can also check our Meet the Team page to learn more about each stylist.",
  },
  {
    q: "What products do you use?",
    a: "We use premium brands including Goldwell and Redken for color, and Oribe, Kerastase, and Shu Uemura for styling and treatments. All products are available for retail purchase at the salon.",
  },
  {
    q: "Do you offer bridal services on location?",
    a: "Yes! We offer both in-salon and on-location bridal services. Contact us with your wedding date, ceremony time, location, and party size and our bridal coordinator will provide a custom quote.",
  },
  {
    q: "Do gift certificates expire?",
    a: "Gift certificates are valid for up to one year from the date of purchase. They can be used for any service or product at Maeve Salon & Color Bar.",
  },
  {
    q: "What if I'm not happy with my service?",
    a: "Your satisfaction is our priority. Please let us know at the time of service or within 48 hours. We offer complimentary corrective services within 2 weeks of your original appointment.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
            Common Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal">
            Frequently{" "}
            <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic" }} className="text-gold">
              Asked
            </span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-sm font-body font-medium text-charcoal pr-4">
                  {faq.q}
                </span>
                <span className={`text-gold text-xl font-light shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-sm font-body font-light text-warm-gray leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ src, stylist }: { src: string; stylist: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="relative aspect-[9/16] sm:aspect-[3/4] overflow-hidden bg-charcoal cursor-pointer group rounded-sm"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
      />
      {/* Play/Pause button overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
        <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300 shadow-xl">
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white" className="ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>
      {/* Stylist tag */}
      <div className="absolute bottom-3 left-3 right-3">
        <span className="text-[10px] font-body font-medium text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {stylist}
        </span>
      </div>
    </div>
  );
}

function BookingWidget() {
  const [activeTab, setActiveTab] = useState("Cut & Style");
  const [selectedService, setSelectedService] = useState("");
  const tabs = Object.keys(serviceCategories);

  const handleBookNow = () => {
    window.open(
      "https://www.phorest.com/salon/maevesalonandcolorbar/book/service-selection?showSpecialOffers=false",
      "_blank"
    );
  };

  return (
    <section className="relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/Maeve-Salon-02.png"
          alt="Maeve Salon"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-white/95 backdrop-blur-sm shadow-2xl">
          {/* Header with tabs */}
          <div className="p-6 md:p-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-3xl md:text-4xl font-heading font-light text-charcoal">
                Book your service
              </h2>
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setSelectedService(""); }}
                    className={`px-4 py-2 text-xs tracking-wide font-body font-medium border transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-white text-charcoal border-gray-300 hover:border-charcoal"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Service options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 pb-6 border-b border-gray-200">
              {serviceCategories[activeTab]?.map((service) => (
                <label
                  key={service.name}
                  className="flex items-center justify-between py-2 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedService === service.name ? "border-gold" : "border-gray-300 group-hover:border-gold/50"
                    }`}>
                      {selectedService === service.name && (
                        <div className="w-2 h-2 rounded-full bg-gold" />
                      )}
                    </div>
                    <span className="text-sm font-body font-light text-charcoal group-hover:text-gold transition-colors">
                      {service.name}
                    </span>
                  </div>
                  <span className="text-sm font-body font-medium text-charcoal">
                    {service.price}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="p-6 md:p-8 pt-5 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-warm-gray font-body font-light">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-gold" /> Mon-Thu: 9AM-8PM
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-gold" /> Fri: 9AM-6PM
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-gold" /> Sat: 9AM-3PM
                </span>
                <a href="tel:919-951-7866" className="flex items-center gap-1.5 hover:text-gold transition-colors">
                  <Phone size={12} className="text-gold" /> (919) 951-7866
                </a>
              </div>
              <button
                onClick={handleBookNow}
                className="shrink-0 px-10 py-3 bg-charcoal text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const about = useInView();
  const hours = useInView();
  const brands = useInView();
  const cta = useInView();
  const salonGallery = useInView(0.05);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-main.png"
            alt="Maeve Salon & Color Bar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-gold/10 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-gold/5" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-6">
              Apex, North Carolina
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-light text-white mb-2"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic" }}
            >
              Maeve
            </h1>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <p className="text-white/70 text-sm md:text-base tracking-luxe uppercase font-body font-extralight mb-8">
              Salon & Color Bar
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
            <p className="text-white/60 text-sm md:text-base font-body font-light max-w-xl mx-auto leading-relaxed mb-10">
              A luxury hair salon experience above and beyond the rest.
              Featuring Goldwell and Redken color, along with Oribe and
              Kerastase products.
            </p>
          </div>

          <div
            className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animationDelay: "1s", opacity: 0 }}
          >
            <Link
              href="/book-appointment"
              className="group px-8 py-3.5 bg-gold text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold-dark transition-all duration-300 flex items-center gap-2"
            >
              Book Appointment
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/hair-services"
              className="px-8 py-3.5 border border-white/30 text-white text-xs tracking-elegant uppercase font-body font-light hover:border-gold hover:text-gold transition-all duration-300"
            >
              Our Services
            </Link>
          </div>

          <div
            className="animate-fade-in mt-12 flex items-center justify-center gap-2 text-white/40"
            style={{ animationDelay: "1.2s", opacity: 0 }}
          >
            <Phone size={14} />
            <a href="tel:919-951-7866" className="text-sm font-body font-light hover:text-gold transition-colors">
              919.951.7866
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-gold" />
          </div>
        </div>
      </section>

      {/* Book Your Service - Sleek Modern Widget */}
      <BookingWidget />

      {/* About Section */}
      <section className="py-24 bg-white">
        <div
          ref={about.ref}
          className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            about.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Sparkles className="mx-auto text-gold mb-6" size={24} />
          <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal mb-8">
            Welcome to Maeve
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-warm-gray text-lg md:text-2xl font-heading font-light leading-relaxed max-w-3xl mx-auto">
            Maeve Salon and Color Bar is a luxury hair salon located in Apex,
            North Carolina. At Maeve, we are all about providing a safe,
            high-quality salon experience above and beyond the rest.
            Featuring Goldwell and Redken color, along with Oribe and Kerastase
            products.
          </p>
        </div>
      </section>

      {/* Salon Gallery */}
      <section className="py-24 bg-cream">
        <div
          ref={salonGallery.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            salonGallery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
              Our Space
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal">
              Inside Maeve
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "/Maeve-Salon-01.png",
              "/Maeve-Salon-02.png",
              "/Maeve-Salon-03.png",
              "/Maeve-Salon-05.png",
              "/Maeve-Salon-06.png",
              "/hero.png",
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden group"
              >
                <Image
                  src={img}
                  alt={`Maeve Salon interior ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Hair Color",
                desc: "From subtle highlights to bold transformations, our color specialists use Goldwell and Redken to create your perfect shade.",
                href: "/hair-services",
                icon: <Palette size={24} className="text-gold" />,
              },
              {
                title: "Cuts & Styling",
                desc: "Precision cuts and expert styling tailored to complement your unique features and lifestyle.",
                href: "/hair-services",
                icon: <Scissors size={24} className="text-gold" />,
              },
              {
                title: "Nails by Tess",
                desc: "Custom nail art and designs from classic manicures to bold, artistic creations at our nail space inside Maeve.",
                href: "/nails-by-tess",
                icon: <Gem size={24} className="text-gold" />,
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-cream p-10 text-center group hover:shadow-lg transition-all duration-500 border border-transparent hover:border-gold/20"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blush flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-heading font-medium text-charcoal mb-4">
                  {service.title}
                </h3>
                <p className="text-warm-gray text-sm font-body font-light leading-relaxed mb-6">
                  {service.desc}
                </p>
                <Link
                  href={service.href}
                  className="text-gold text-xs tracking-elegant uppercase font-body font-medium hover:text-gold-dark transition-colors inline-flex items-center gap-1 group/link"
                >
                  Learn More
                  <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See Our Work - Horizontal Scroll */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
              Our Work
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal">
              See Our Work
            </h2>
            <p className="text-warm-gray text-sm font-body font-light mt-4">
              Scroll to explore our latest styles and transformations
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-6 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="relative shrink-0 w-56 md:w-64 aspect-[3/4] overflow-hidden snap-center group rounded-sm"
              >
                <Image
                  src={`/hair-pic${i + 1}.png`}
                  alt={`Hair style ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-cream to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-cream to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-24 bg-white">
        <div
          ref={hours.ref}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            hours.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Clock className="mx-auto text-gold mb-6" size={24} />
          <h2 className="text-3xl md:text-4xl tracking-elegant uppercase font-body font-extralight text-charcoal mb-12">
            Hours of Operation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { day: "Monday - Thursday", hours: "9:00AM - 8:00PM" },
              { day: "Friday", hours: "9:00AM - 6:00PM" },
              { day: "Saturday", hours: "9:00AM - 3:00PM" },
            ].map((item) => (
              <div key={item.day} className="p-6">
                <h3 className="text-lg font-heading font-medium text-charcoal mb-2">
                  {item.day}
                </h3>
                <p className="text-warm-gray text-base font-body font-light">
                  {item.hours}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-sm text-warm-gray font-body font-light">
            Closed Sunday
          </div>
        </div>
      </section>

      {/* Instagram Videos / Follow Us */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
              Follow Us
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-light text-charcoal mb-3">
              @maeve.salon
            </h2>
            <a
              href="https://www.instagram.com/maeve.salon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-sm font-body font-light hover:text-gold-dark transition-colors inline-flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Follow us on Instagram
            </a>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { src: "/videos/video2.mp4", stylist: "@lindseywidg__beauty" },
              { src: "/videos/video3.mp4", stylist: "@annadblondin" },
              { src: "/videos/video6.mp4", stylist: "@gorgjesshair_" },
            ].map((video, i) => (
              <VideoCard key={i} src={video.src} stylist={video.stylist} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-gray-50">
        <div
          ref={brands.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            brands.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-warm-gray text-xs tracking-luxe uppercase font-body font-light">
              Proudly Featuring
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {["GOLDWELL", "KERASTASE", "ORIBE", "SHU UEMURA", "REDKEN"].map((brand) => (
              <div
                key={brand}
                className="text-xl md:text-2xl font-heading font-light text-warm-gray/50 hover:text-charcoal transition-colors duration-300 cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Find Us - Map */}
      <section className="py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
              Visit Us
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal">
              Find Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <MapPin className="mx-auto text-gold mb-3" size={20} />
              <p className="text-sm font-body font-light text-warm-gray">
                1121 Apex Peakway<br />Apex, NC 27502
              </p>
            </div>
            <div className="text-center">
              <Phone className="mx-auto text-gold mb-3" size={20} />
              <a href="tel:919-951-7866" className="text-sm font-body font-light text-warm-gray hover:text-gold transition-colors">
                (919) 951-7866
              </a>
            </div>
            <div className="text-center">
              <Clock className="mx-auto text-gold mb-3" size={20} />
              <p className="text-sm font-body font-light text-warm-gray">
                Mon-Thu: 9am-8pm<br />Fri: 9am-6pm | Sat: 9am-3pm
              </p>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps?q=1121+Apex+Peakway,+Apex,+NC+27502&output=embed"
            className="w-full h-72 md:h-96 border-0 grayscale hover:grayscale-0 transition-all duration-500"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Maeve Salon Location"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/hero-main.png" alt="" fill className="object-cover" />
        </div>
        <div
          ref={cta.ref}
          className={`relative z-10 max-w-3xl mx-auto px-4 text-center transition-all duration-1000 ${
            cta.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-light text-white mb-6">
            Ready for a New Look?
          </h2>
          <p className="text-white/60 text-base font-body font-light mb-10 max-w-lg mx-auto">
            Let our talented team of stylists help you achieve the look you have always wanted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-appointment"
              className="group px-10 py-4 bg-gold text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold-dark transition-all duration-300 flex items-center gap-2"
            >
              Book Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gold" />
              <span className="text-white/50 text-sm font-body font-light">
                1121 Apex Peakway, Apex NC 27502
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
