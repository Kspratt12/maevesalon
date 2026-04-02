"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

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

interface ServiceCategory {
  title: string;
  services: { name: string; description?: string; price: string; note?: string }[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: "Manicures",
    services: [
      {
        name: "Short and Sweet",
        description: "Nails trimmed and reshaped, cuticle remover and trimming, finish with cuticle oil",
        price: "$15",
      },
      {
        name: "A Little Extra Love",
        description: "Nails trimmed and reshaped, cuticle remover and trimming, hand massage with lotion, finish with cuticle oil, and a warm towel",
        price: "$25",
      },
      {
        name: "The Whole Package",
        description: "Nails trimmed and reshaped, cuticle work, lavender sugar scrub, massage with lotion, Mask upgrade, finish with cuticle oil, and a warm towel",
        price: "$35",
      },
      {
        name: "Gel Polish Add-On",
        price: "$15",
      },
    ],
  },
  {
    title: "Gel Services",
    services: [
      {
        name: "Builder Gel Mani",
        description: "Full set overlay (natural nails) or with tips (price varies) with builder gel base color of your choice",
        price: "$55",
      },
      {
        name: "Builder Gel Fill In",
        description: "A fill on grow out of builder gel with same base color as original set (does not include solid gel color of your choice)",
        price: "$45",
      },
      {
        name: "Gel-X Full Set",
        description: "Full set of short, medium, long, or xtra long (price varies depending on length) and a solid color gel of your choice (longer nails require builder overlay to ensure durability of your set)",
        price: "$60",
      },
      {
        name: "Gel-X Fill In",
        description: "A fill on grow out of Gel-X with a builder gel base color of your choice (does not include solid gel color of your choice)",
        price: "$50",
      },
    ],
  },
  {
    title: "Acrylic Services",
    services: [
      {
        name: "Acrylic Full Set",
        description: "Full set of short, medium, long, or xtra long acrylics with acrylic base color of your choice",
        price: "$55",
      },
      {
        name: "Acrylic French/Ombre",
        description: "Full set of short, medium, long, or xtra long (price varies depending on length) acrylic french or ombre",
        price: "$65",
      },
      {
        name: "Acrylic Fill In",
        description: "Fill in on grow out of acrylic with same base color as the original set",
        price: "$40",
      },
    ],
  },
  {
    title: "Nail Art",
    services: [
      {
        name: "Cat-Eye Gel Polish",
        description: "Gel polish that creates a shimmery, dimensional effect, resembling a cat's eye using a magnet",
        price: "$10",
      },
      {
        name: "Chrome",
        description: "A fine pigment that creates a smooth, reflective, mirror-like finish on top of gel polish",
        price: "$10",
      },
      {
        name: "Tier 1 Nail Art",
        description: "Polka dots, dotted flower, simple line work, max. 3 nails",
        price: "$5+",
      },
      {
        name: "Tier 2 Nail Art",
        description: "Full gel frenchies, blossom gel, intermediate line work, max. 8 rhinestones, max. 4 charms, max. 5 nails",
        price: "$10+",
      },
      {
        name: "Tier 3 Nail Art",
        description: "Aura nails, 10 different designs on each nail, complex line work, junk nails, 3D flowers, etc.",
        price: "$15+",
      },
    ],
  },
  {
    title: "Extras",
    services: [
      {
        name: "Soak Off",
        description: "Removal of gel mani, builder gel mani, gel-x, and acrylic with acetone",
        price: "$15",
        note: "If your previous salon used MMA monomer your soak off will be an up charge. MMA is not safe for nails, is illegal in the US, and is much more difficult to remove.",
      },
      {
        name: "Cutdown / Re-Shape",
        description: "Cutting down length and/or changing the shape of your set",
        price: "$5",
      },
      {
        name: "Long / XXL Length",
        price: "$10",
      },
    ],
  },
];

const galleryImages = Array.from({ length: 11 }, (_, i) => `/nail${i + 1}.png`);

export default function NailsByTess() {
  const bio = useInView();
  const gallery = useInView(0.05);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/nail1.png"
            alt="Nails by Tess"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-charcoal/95" />
        <div className="relative z-10 text-center">
          <Sparkles className="mx-auto text-gold mb-6 animate-fade-in" size={28} />
          <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4 animate-fade-in">
            Nail Services
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-light text-white animate-fade-in-up">
            Nails by Tess
          </h1>
        </div>
      </section>

      {/* About Tess */}
      <section className="py-24 bg-white">
        <div
          ref={bio.ref}
          className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            bio.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/nail2.png"
                alt="Tess Butler - Nail Artist"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
                About
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal mb-6">
                Tess Butler
              </h2>
              <div className="w-12 h-px bg-gold mb-8" />
              <p className="text-warm-gray text-base font-body font-light leading-relaxed mb-6">
                Tess is a passionate and creative nail artist, specializing in detailed
                nail art and custom designs that let her clients express their unique
                style. With a love for creativity and a focus on quality, Tess turns each
                set of nails into a personalized work of art.
              </p>
              <p className="text-warm-gray text-base font-body font-light leading-relaxed mb-6">
                She's thrilled to open her nail space at Maeve Salon & Color Bar, where
                she's created a welcoming and inspiring environment for self-care, beauty,
                and artistry. Whether you're looking for clean classics or bold, artistic
                designs, Tess is here to make your nails your favorite form of
                self-expression.
              </p>
              <p className="text-warm-gray text-base font-body font-light leading-relaxed mb-8">
                Come visit Tess at Maeve and treat yourself to a nail experience that's
                all about you.
              </p>
              <a
                href="https://www.instagram.com/nails.by.tess.b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-sm font-body font-medium hover:text-gold-dark transition-colors"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Follow @nails.by.tess.b
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nail Gallery */}
      <section className="py-24 bg-cream">
        <div
          ref={gallery.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            gallery.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4">
              Portfolio
            </p>
            <h2 className="text-4xl font-heading font-light text-charcoal">
              Nail Gallery
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Nail design ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Menu */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Sparkles className="mx-auto text-gold mb-6" size={24} />
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal">
              Nail Services
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-6" />
          </div>

          <div className="space-y-16">
            {serviceCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-2xl font-heading font-light text-charcoal mb-2">
                  {category.title}
                </h3>
                <div className="w-8 h-px bg-gold mb-6" />
                <div className="space-y-0">
                  {category.services.map((service) => (
                    <a
                      key={service.name}
                      href="https://www.phorest.com/salon/maevesalonandcolorbar/book/service-selection?showSpecialOffers=false"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-5 border-b border-gray-100 group hover:border-gold/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="text-sm font-body font-medium text-charcoal group-hover:text-gold transition-colors">
                            {service.name}
                          </span>
                          {service.description && (
                            <p className="text-xs font-body font-light text-warm-gray mt-1 leading-relaxed">
                              {service.description}
                            </p>
                          )}
                          {service.note && (
                            <p className="text-xs font-body font-light text-warm-gray/70 mt-2 italic">
                              *{service.note}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-body font-medium text-gold">
                            {service.price}
                          </span>
                          <span className="text-[10px] font-body font-medium text-gold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wide">
                            Book
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="mx-auto text-gold mb-6" size={24} />
          <h2 className="text-4xl font-heading font-light text-white mb-6">
            Book Your Nail Appointment
          </h2>
          <p className="text-white/60 text-base font-body font-light mb-10">
            Treat yourself to a nail experience that's all about you.
          </p>
          <Link
            href="/book-appointment"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-gold text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold-dark transition-all duration-300"
          >
            Book Now
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
