"use client";

import Image from "next/image";
import { Calendar, Phone, MapPin, Clock } from "lucide-react";

export default function BookAppointment() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/Maeve-Salon-05.png"
            alt="Maeve Salon"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-charcoal/90" />
        <div className="relative z-10 text-center">
          <Calendar className="mx-auto text-gold mb-6 animate-fade-in" size={28} />
          <h1 className="text-5xl md:text-7xl font-heading font-light text-white animate-fade-in-up">
            Book Appointment
          </h1>
        </div>
      </section>

      {/* Booking Widget */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-light text-charcoal mb-4">
              Schedule Your Visit
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-warm-gray text-base font-body font-light max-w-xl mx-auto">
              Use our online booking system below to schedule your appointment,
              or call us directly.
            </p>
          </div>

          {/* Phorest Booking Embed */}
          <div className="bg-cream p-2 sm:p-4 md:p-8 mb-16">
            <iframe
              src="https://www.phorest.com/salon/maevesalonandcolorbar/book/service-selection?showSpecialOffers=false"
              className="w-full border-0 rounded"
              style={{ height: "700px" }}
              title="Book an appointment at Maeve Salon & Color Bar"
              allow="payment"
              loading="lazy"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <Phone className="mx-auto text-gold mb-3" size={20} />
              <h4 className="text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                Call Us
              </h4>
              <a
                href="tel:919-951-7866"
                className="text-sm font-body font-light text-warm-gray hover:text-gold transition-colors"
              >
                (919) 951-7866
              </a>
            </div>
            <div className="text-center">
              <MapPin className="mx-auto text-gold mb-3" size={20} />
              <h4 className="text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                Visit Us
              </h4>
              <p className="text-sm font-body font-light text-warm-gray">
                1121 Apex Peakway
                <br />
                Apex, NC 27502
              </p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto text-gold mb-3" size={20} />
              <h4 className="text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                Hours
              </h4>
              <p className="text-sm font-body font-light text-warm-gray">
                Mon-Thu: 9am-8pm
                <br />
                Fri: 9am-6pm | Sat: 9am-3pm
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
