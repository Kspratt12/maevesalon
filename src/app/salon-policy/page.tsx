"use client";

import { useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";

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

const policies = [
  {
    title: "Our Service Guarantee",
    content: [
      "We make every attempt to ensure that you are satisfied with your experience at Maeve Salon & Color Bar. In the event that you are not completely satisfied, please let us know at the time of your service or within 48 hours after your service has been performed.",
    ],
  },
  {
    title: "Refund Policy",
    content: [
      "We understand that hair products don't work for everyone. If you don't love your purchase, we are happy to return any retail products you purchased within 14 days of original purchase. A Salon credit will be issued.",
      "All services are non-refundable but we will be more than happy to schedule a corrective service free of charge.",
      "The service must be a mistake from the service provider, not something you might have changed your mind (after the service has been performed). In case of a disagreement, a redo must be validated by management. You have 2 weeks to contact the Salon to receive a complimentary service to adjust any dissatisfaction. Corrective services will not be allowed 2 weeks past initial service date.",
      "It is important you contact the Salon as soon as you are unhappy so we can schedule you As Soon As Possible for a corrective service.",
      "Please keep in mind, using box color or going from Darker to Lighter tones may result in more than one service to achieve your desired result.",
    ],
  },
  {
    title: "24 Hour Cancellation Policy",
    content: [
      "We understand that due to your busy schedule you may have to cancel or change an appointment with us.",
      "In order to respect the time of both our guests and our staff, we simply ask that you notify us of a cancellation or rescheduling at least 24 hours prior to the appointment. Upon cancelling less than 24 hours prior to the appointment, you may be asked to pay 50% of scheduled services.",
    ],
  },
  {
    title: "Late",
    content: [
      "In the event you are running late for your appointment, please call us and we will do our best to accommodate your tardiness. Depending on the circumstance, you may be asked to forgo parts of your service or to reschedule your service all together. This is to ensure our stylists will remain on time for the rest of their guests on their schedules.",
    ],
  },
  {
    title: "No Show",
    content: [
      "If a client is 15 minutes late for an appointment and has not contacted the salon, we will consider this a No Show Appointment. Once a client is marked as a No Show, their card on file will be charged 50% of the service scheduled.",
      "Please be advised if you no show on a re-do reservation, we will not be able to schedule a new appointment.",
    ],
  },
  {
    title: "Gift Certificate Policy",
    content: [],
    bullets: [
      "Gift certificates are valid for up to one year from the date of purchase and must be presented at time of service.",
      "Copies of gift certificates are not acceptable.",
      "Please call Maeve Salon & Color Bar concerning lost gift certificates.",
      "All gift certificates are non-refundable.",
      "Gift certificates are not redeemable for cash.",
      "Gift certificates are valid at Maeve Salon & Color Bar only for all products and services available.",
    ],
  },
  {
    title: "Head Lice",
    content: [
      "It is against Salon Policy to perform services on clients with head lice. If a client has been diagnosed with head lice while receiving a service in the salon we would not be able to complete the service the same day. We would be able to complete the service once the head lice treatment has been completed.",
    ],
  },
];

function PolicySection({ policy, index }: { policy: typeof policies[0]; index: number }) {
  const section = useInView(0.05);
  return (
    <div
      ref={section.ref}
      className={`transition-all duration-700 ${
        section.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <h2 className="text-2xl md:text-3xl font-heading font-light text-charcoal mb-4">
        {policy.title}
      </h2>
      <div className="w-8 h-px bg-gold mb-6" />
      {policy.content.map((paragraph, j) => (
        <p
          key={j}
          className="text-warm-gray text-sm font-body font-light leading-relaxed mb-4"
        >
          {paragraph}
        </p>
      ))}
      {policy.bullets && (
        <ul className="space-y-3 mt-4">
          {policy.bullets.map((bullet, j) => (
            <li
              key={j}
              className="text-warm-gray text-sm font-body font-light leading-relaxed flex items-start gap-3"
            >
              <span className="text-gold mt-1.5 shrink-0">&#8226;</span>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SalonPolicy() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-charcoal/90" />
        <div className="relative z-10 text-center">
          <Shield className="mx-auto text-gold mb-6 animate-fade-in" size={28} />
          <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4 animate-fade-in">
            Maeve Salon
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-light text-white animate-fade-in-up">
            Salon Policies
          </h1>
        </div>
      </section>

      {/* Policies */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {policies.map((policy, i) => (
              <PolicySection key={policy.title} policy={policy} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-warm-gray text-sm font-body font-light leading-relaxed mb-6">
            If you have any questions about our salon policies, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:919-951-7866"
              className="text-gold text-sm font-body font-medium hover:text-gold-dark transition-colors"
            >
              919-951-7866
            </a>
            <span className="hidden sm:inline text-warm-gray/30">|</span>
            <a
              href="mailto:info@maevesalon.com"
              className="text-gold text-sm font-body font-medium hover:text-gold-dark transition-colors"
            >
              info@maevesalon.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
