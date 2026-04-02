"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Phone, Mail } from "lucide-react";

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

const steps = [
  {
    number: "01",
    title: "Initial Contact",
    image: "/step1-bridal.png",
    content: (
      <>
        <p className="text-warm-gray text-sm font-body font-light leading-relaxed mb-4">
          Call{" "}
          <a href="tel:919-951-7866" className="text-gold hover:text-gold-dark transition-colors font-medium">
            919-951-7866
          </a>{" "}
          or email us at{" "}
          <a href="mailto:info@maevesalon.com" className="text-gold hover:text-gold-dark transition-colors font-medium">
            info@maevesalon.com
          </a>{" "}
          to see if your date/time is open.
        </p>
        <p className="text-warm-gray text-sm font-body font-light leading-relaxed">
          Be sure to have your ceremony time, location of where you would like us to
          travel to and the approximate number of services needed for your wedding day.
          Our bridal coordinator will then confirm if our team is available!
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Review",
    image: "/step2-bridal.png",
    content: (
      <p className="text-warm-gray text-sm font-body font-light leading-relaxed">
        Once our bridal coordinator reviews your details and confirms we have stylists
        who are open on your date, a quote and information about our hair and makeup
        services will be shared. Your email address will then be requested and our
        information will also be emailed to you.
      </p>
    ),
  },
  {
    number: "03",
    title: "Trial",
    image: "/step3-bridal.png",
    content: (
      <p className="text-warm-gray text-sm font-body font-light leading-relaxed">
        As the bride, we offer a trial for your hair and makeup needs. Fee applied. Our
        sessions are held at either Maeve Salon or in some cases we may travel to you
        for your trial depending on your wedding destination. Each appointment is
        scheduled for two hours to ensure we accomplish the look which best suits your
        style. Trials may be done either before or after you book your wedding with us
        at Maeve Salon.
      </p>
    ),
  },
  {
    number: "04",
    title: "Booking Requirements",
    image: "/step4-bridal.png",
    content: (
      <p className="text-warm-gray text-sm font-body font-light leading-relaxed">
        Maeve Salon requires a signing of our contract and payment based on the total
        amount of services needed on the wedding day to book.
      </p>
    ),
  },
  {
    number: "05",
    title: "Your Wedding is Booked!",
    image: "/step5-bridal.png",
    content: (
      <p className="text-warm-gray text-sm font-body font-light leading-relaxed">
        Once we receive your contract/payment, either before or after your trial, your
        details will be reviewed and a confirmation will be sent to you within 5-7 days.
        Payment is due two weeks before your wedding date. If at anytime changes are
        made at a later date, a new confirmation will be sent reflecting those changes.
      </p>
    ),
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const card = useInView(0.05);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={card.ref}
      className={`transition-all duration-700 ${
        card.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}>
        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl font-heading font-light text-gold/30">
              {step.number}
            </span>
            <div className="h-px flex-1 bg-gold/20" />
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-light text-charcoal mb-6">
            {step.title}
          </h3>
          {step.content}
        </div>
      </div>
    </div>
  );
}

export default function Bridal() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/bridal.png"
            alt="Bridal Services at Maeve Salon"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-charcoal/90" />
        <div className="relative z-10 text-center px-4">
          <Heart className="mx-auto text-gold mb-6 animate-fade-in" size={28} />
          <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4 animate-fade-in">
            Your Special Day
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-light text-white animate-fade-in-up">
            Bridal Services
          </h1>
          <p className="text-white/50 text-sm font-body font-light mt-6 max-w-lg mx-auto animate-fade-in">
            Let us help make your wedding day as beautiful as your love story
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-light text-charcoal mb-8">
            Making Your Day Perfect
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-warm-gray text-base font-body font-light leading-relaxed mb-6">
            At Maeve Salon & Color Bar, we understand that your wedding day is
            one of the most important days of your life. Our bridal team
            specializes in creating stunning, long-lasting styles that will
            keep you looking flawless from the ceremony to the last dance.
          </p>
          <p className="text-warm-gray text-base font-body font-light leading-relaxed">
            We offer in-salon and on-location services for the bride and
            entire bridal party.
          </p>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
              How It Works
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal">
              Your Bridal Journey
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-6" />
          </div>

          <div className="space-y-20 md:space-y-28">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Heart className="mx-auto text-gold mb-6" size={24} />
          <h2 className="text-4xl font-heading font-light text-white mb-6">
            Ready to Start Planning?
          </h2>
          <p className="text-white/60 text-base font-body font-light mb-10">
            Contact us to check availability for your special day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="tel:919-951-7866"
              className="group px-10 py-4 bg-gold text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold-dark transition-all duration-300 flex items-center gap-2"
            >
              <Phone size={14} />
              Call 919.951.7866
            </a>
            <a
              href="mailto:info@maevesalon.com"
              className="px-10 py-4 border border-white/30 text-white text-xs tracking-elegant uppercase font-body font-light hover:border-gold hover:text-gold transition-all duration-300 flex items-center gap-2"
            >
              <Mail size={14} />
              Email Us
            </a>
          </div>
          <Link
            href="/book-appointment"
            className="group inline-flex items-center gap-2 text-gold text-xs tracking-elegant uppercase font-body font-medium hover:text-gold-light transition-colors"
          >
            Or Book Online
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
