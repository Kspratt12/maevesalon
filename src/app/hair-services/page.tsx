"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

interface ServiceItem {
  name: string;
  price: string;
  note?: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  services: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: "Color & Blowdry",
    description: "Featuring Goldwell and Redken color for stunning, long-lasting results.",
    services: [
      { name: "Re-Touch & Style", price: "from $105" },
      { name: "Color Gloss & Style", price: "from $100" },
      { name: "Full Color & Style", price: "from $155" },
      { name: "Partial Dimensional & Style", price: "from $140" },
      { name: "Full Dimensional & Style", price: "from $155" },
      { name: "Partial Balayage & Style", price: "from $195" },
      { name: "Full Balayage & Style", price: "from $245" },
      { name: "Partial Babylights & Style", price: "from $175" },
      { name: "Full Babylights & Style", price: "from $225" },
      { name: "Hi-Lift Blonde & Style", price: "from $200" },
    ],
  },
  {
    title: "Color & Cut",
    description: "Full color service combined with a precision cut.",
    services: [
      { name: "Re-Touch & Cut", price: "from $145" },
      { name: "Color Gloss & Cut", price: "from $115" },
      { name: "Full Color & Cut", price: "from $200" },
      { name: "Partial Dimensional & Cut", price: "from $175" },
      { name: "Full Dimensional & Cut", price: "from $195" },
      { name: "Partial Balayage & Cut", price: "from $230" },
      { name: "Full Balayage & Cut", price: "from $280" },
      { name: "Full Babylights & Cut", price: "from $265" },
      { name: "Hi-Lift Blonde & Cut", price: "from $265" },
    ],
  },
  {
    title: "Cuts & Styling",
    description: "Precision cuts and expert styling tailored to your unique features.",
    services: [
      { name: "Women's Cut", price: "from $60" },
      { name: "Men's Cut", price: "from $45", note: "New clients" },
      { name: "Bang Trim", price: "Complimentary", note: "With select services" },
      { name: "Blowdry Style - Short Hair", price: "from $35" },
      { name: "Blowdry Style - Medium Hair", price: "from $40" },
      { name: "Blowdry Style - Long Hair", price: "from $55" },
      { name: "Special Occasion Updo", price: "from $100" },
    ],
  },
  {
    title: "Treatments & Extensions",
    description: "Specialty services to enhance and transform your hair.",
    services: [
      { name: "Kerasilk Smoothing Treatment", price: "from $350" },
      { name: "Extension Consultation", price: "$50" },
      { name: "Halo Extension Consultation", price: "$30" },
      { name: "Transformative Service", price: "Upon Consultation" },
    ],
  },
  {
    title: "Waxing",
    description: "Quick and precise waxing services.",
    services: [
      { name: "Eyebrow Shaping", price: "$22" },
      { name: "Eyebrow Tinting", price: "$25" },
      { name: "Lip Wax", price: "$15" },
      { name: "Chin Wax", price: "$12" },
      { name: "Full Face Wax", price: "$40" },
    ],
  },
];

function ServiceSection({ category, index }: { category: ServiceCategory; index: number }) {
  const section = useInView(0.05);
  return (
    <div
      ref={section.ref}
      className={`transition-all duration-700 ${
        section.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-8">
        <h3 className="text-3xl font-heading font-light text-charcoal mb-2">
          {category.title}
        </h3>
        <p className="text-warm-gray text-sm font-body font-light">
          {category.description}
        </p>
        <div className="w-8 h-px bg-gold mt-4" />
      </div>
      <div className="space-y-0">
        {category.services.map((service) => (
          <a
            key={service.name}
            href="https://www.phorest.com/salon/maevesalonandcolorbar/book/service-selection?showSpecialOffers=false"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-4 border-b border-gray-100 group hover:border-gold/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-body font-light text-charcoal group-hover:text-gold transition-colors">
                {service.name}
              </span>
              {service.note && (
                <span className="text-xs text-warm-gray">
                  ({service.note})
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-body font-light text-gold">
                {service.price}
              </span>
              <span className="text-[10px] font-body font-medium text-gold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wide">
                Book
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function HairServices() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/hero.png"
            alt="Hair Services at Maeve Salon"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-charcoal/90" />
        <div className="relative z-10 text-center">
          <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4 animate-fade-in">
            Our Expertise
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-light text-white animate-fade-in-up">
            Hair Services
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-warm-gray text-base font-body font-light leading-relaxed">
            At Maeve Salon & Color Bar, we offer a comprehensive range of
            hair services designed to help you look and feel your best. All
            services include a consultation to ensure we understand your
            vision and goals.
          </p>
          <p className="text-xs text-warm-gray/60 font-body font-light mt-4">
            *Prices listed are starting prices only and are subject to change.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {serviceCategories.map((category, i) => (
            <ServiceSection key={category.title} category={category} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-light text-white mb-6">
            Ready to Book?
          </h2>
          <p className="text-white/60 text-base font-body font-light mb-10">
            Schedule your appointment today and let our talented team create
            the perfect look for you.
          </p>
          <Link
            href="/book-appointment"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-gold text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold-dark transition-all duration-300"
          >
            Book Your Appointment
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
