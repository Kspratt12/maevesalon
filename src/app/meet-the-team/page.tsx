"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
// Instagram SVG icon component
function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

interface TeamMember {
  name: string;
  role?: string;
  instagram?: string;
  image: string;
}

const owners: TeamMember[] = [
  {
    name: "Tiffany Weaver",
    role: "Owner & Artistic Director",
    image: "/images/team/tiffany.png",
  },
  {
    name: "Brie Whalen",
    role: "Managing Partner",
    image: "/images/team/brie.png",
  },
];

const stylists: TeamMember[] = [
  { name: "Tristan", image: "/images/team/tristian.png" },
  { name: "Brittany", image: "/images/team/brittany.png" },
  { name: "Jo", image: "/images/team/jo.png" },
  { name: "Meghan", image: "/images/team/meghan.png" },
  { name: "Jess", image: "/images/team/jess.png" },
  { name: "Britt", image: "/images/team/britt.png" },
  { name: "Carson", image: "/images/team/carson.png" },
  { name: "Hannah", image: "/images/team/hannah.png" },
  { name: "Gracie", image: "/images/team/grace.png" },
  { name: "Lindsey", image: "/images/team/lindsey.png" },
  { name: "Sucel", image: "/images/team/sucel.png" },
  { name: "Alexa", image: "/images/team/alexis.png" },
  { name: "Anna", image: "/images/team/anna.png" },
];

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

function TeamCard({
  member,
  index,
  large,
}: {
  member: TeamMember;
  index: number;
  large?: boolean;
}) {
  const card = useInView(0.05);
  return (
    <div
      ref={card.ref}
      className={`group transition-all duration-700 ${
        card.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden bg-blush aspect-[3/4]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 20vw"}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-gold transition-colors"
            >
              <InstagramIcon size={18} className="text-white" />
            </a>
          )}
        </div>
      </div>
      <div className="mt-4">
        {member.role && (
          <p className="text-xs tracking-elegant uppercase font-body font-light text-gold mb-1">
            {member.role}
          </p>
        )}
        <h3
          className={`font-heading font-medium text-charcoal ${
            large ? "text-xl" : "text-lg"
          }`}
        >
          {member.name}
        </h3>
      </div>
    </div>
  );
}

export default function MeetTheTeam() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/hero.png"
            alt="Maeve Salon"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-charcoal/90" />
        <div className="relative z-10 text-center">
          <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4 animate-fade-in">
            Our Team
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-light text-white animate-fade-in-up">
            Meet the Team
          </h1>
        </div>
      </section>

      {/* Owners Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal mb-4">
              The Owners.
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {owners.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} large />
            ))}
          </div>
        </div>
      </section>

      {/* Stylists Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal mb-4">
              Our Stylist Team.
            </h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {stylists.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-light text-charcoal mb-6">
            Join Our Team
          </h2>
          <p className="text-warm-gray text-base font-body font-light leading-relaxed mb-8">
            We are always looking for talented stylists to join the Maeve
            family. If you are passionate about hair and providing an
            exceptional salon experience, we would love to hear from you.
          </p>
          <a
            href="mailto:info@maevesalon.com"
            className="inline-block px-8 py-3.5 bg-gold text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold-dark transition-all duration-300"
          >
            Inquire About Careers
          </a>
        </div>
      </section>
    </>
  );
}
