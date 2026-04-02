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
    title: "Color Services",
    description: "Featuring Goldwell and Redken color for stunning, long-lasting results.",
    services: [
      { name: "Re-Touch & Style", price: "Starting at $125" },
      { name: "Full Color & Style", price: "Starting at $170" },
      { name: "Partial Dimensional & Style", price: "Starting at $225" },
      { name: "Full Dimensional & Style", price: "Starting at $235" },
      { name: "Balayage & Style", price: "Starting at $250" },
      { name: "Transformative Service", price: "Upon Consultation" },
    ],
  },
  {
    title: "Cut & Style",
    description: "Precision cuts and expert styling tailored to your unique features.",
    services: [
      { name: "Haircuts", price: "$50 - $90", note: "Price depends on stylist" },
    ],
  },
  {
    title: "Additional Services",
    description: "Specialty services to enhance and transform your hair.",
    services: [
      { name: "Extensions", price: "Upon Consultation" },
      { name: "Kerasilk Smoothing Treatment", price: "Starting at $350" },
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
          <div
            key={service.name}
            className="flex items-center justify-between py-4 border-b border-gray-100 group hover:border-gold/30 transition-colors"
          >
            <div>
              <span className="text-sm font-body font-light text-charcoal group-hover:text-gold transition-colors">
                {service.name}
              </span>
              {service.note && (
                <span className="text-xs text-warm-gray ml-2">
                  ({service.note})
                </span>
              )}
            </div>
            <span className="text-sm font-body font-light text-gold">
              {service.price}
            </span>
          </div>
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
            src="/images/hero.png"
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
