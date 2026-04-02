"use client";

import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/Maeve-Salon-01.png"
            alt="Maeve Salon"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-charcoal/90" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-light text-white animate-fade-in-up">
            Contact
          </h1>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left */}
            <div>
              <h2 className="text-3xl font-heading font-light text-charcoal mb-8">
                Get in Touch
              </h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs tracking-elegant uppercase font-body font-medium text-gold mb-3">
                    Address
                  </h4>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                    <div className="text-sm font-body font-light text-warm-gray">
                      <p>1121 Apex Peakway</p>
                      <p>Apex, North Carolina 27502</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs tracking-elegant uppercase font-body font-medium text-gold mb-3">
                    Contact Us
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="tel:919-951-7866"
                      className="flex items-center gap-3 text-sm font-body font-light text-warm-gray hover:text-gold transition-colors"
                    >
                      <Phone size={18} className="text-gold shrink-0" />
                      (919) 951-7866
                    </a>
                    <a
                      href="mailto:info@maevesalon.com"
                      className="flex items-center gap-3 text-sm font-body font-light text-warm-gray hover:text-gold transition-colors"
                    >
                      <Mail size={18} className="text-gold shrink-0" />
                      info@maevesalon.com
                    </a>
                  </div>
                </div>
                <div>
                  <Link
                    href="/book-appointment"
                    className="group inline-flex items-center gap-2 text-sm font-body font-medium text-gold hover:text-gold-dark transition-colors"
                  >
                    Schedule an Appointment
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right - Hours */}
            <div>
              <h2 className="text-3xl font-heading font-light text-charcoal mb-8">
                Hours
              </h2>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-gold mt-0.5 shrink-0" />
                <div className="space-y-4 text-sm font-body font-light text-warm-gray">
                  <div>
                    <p className="text-charcoal font-medium">Mon - Thurs</p>
                    <p>9am - 8pm</p>
                  </div>
                  <div>
                    <p className="text-charcoal font-medium">Friday</p>
                    <p>9am - 6pm</p>
                  </div>
                  <div>
                    <p className="text-charcoal font-medium">Saturday</p>
                    <p>9am - 3pm</p>
                  </div>
                  <div>
                    <p className="text-charcoal font-medium">Sunday</p>
                    <p>Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <iframe
              src="https://www.google.com/maps?q=1121+Apex+Peakway,+Apex,+NC+27502&output=embed"
              className="w-full h-80 md:h-96 border-0 grayscale hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maeve Salon Location"
            />
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-light text-charcoal mb-4">
            Careers
          </h2>
          <p className="text-warm-gray text-sm font-body font-light mb-6">
            Interested in joining the Maeve team? Send us your resume.
          </p>
          <a
            href="mailto:info@maevesalon.com?subject=Career Inquiry"
            className="inline-block px-8 py-3.5 bg-gold text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold-dark transition-all duration-300"
          >
            Apply Now
          </a>
        </div>
      </section>
    </>
  );
}
