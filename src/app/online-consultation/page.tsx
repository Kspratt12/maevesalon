"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle, CheckCircle } from "lucide-react";

export default function OnlineConsultation() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentHair: "",
    desiredResult: "",
    colorHistory: "",
    allergies: "",
    lifestyle: "",
    preferredStylist: "",
    additionalNotes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Online Consultation Request");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nCurrent Hair: ${formData.currentHair}\nDesired Result: ${formData.desiredResult}\nColor History: ${formData.colorHistory}\nAllergies/Sensitivities: ${formData.allergies}\nLifestyle: ${formData.lifestyle}\nPreferred Stylist: ${formData.preferredStylist}\n\nAdditional Notes: ${formData.additionalNotes}`
    );
    window.location.href = `mailto:info@maevesalon.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const stylists = [
    "No Preference",
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
    "Sucel Toc",
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/Maeve-Salon-03.png"
            alt="Maeve Salon Consultation"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-charcoal/90" />
        <div className="relative z-10 text-center">
          <MessageCircle className="mx-auto text-gold mb-6 animate-fade-in" size={28} />
          <p className="text-gold text-xs tracking-luxe uppercase font-body font-light mb-4 animate-fade-in">
            Virtual Consultation
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-light text-white animate-fade-in-up">
            Online Consultation
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-light text-charcoal mb-8">
              Let&apos;s Talk About Your Hair Goals
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <p className="text-warm-gray text-base font-body font-light leading-relaxed max-w-2xl mx-auto mb-4">
              Not sure where to start? Our online consultation service allows
              you to connect with one of our expert stylists from the comfort
              of your home. Share your hair goals, inspiration photos, and any
              concerns - and we will create a personalized plan just for you.
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-cream p-8 md:p-12 mb-16 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-medium text-charcoal mb-6 text-center">
              How It Works
            </h3>
            <div className="space-y-6">
              {[
                { step: "01", title: "Submit Your Consultation", desc: "Fill out the form below with your hair history, goals, and inspiration." },
                { step: "02", title: "Stylist Review", desc: "A member of our team will carefully review your submission." },
                { step: "03", title: "Personalized Plan", desc: "We will reach out with a customized service plan and pricing." },
                { step: "04", title: "Book Your Visit", desc: "Schedule your appointment with your recommended stylist." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-gold text-2xl font-heading font-light shrink-0 w-10">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-body font-medium text-charcoal mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm font-body font-light text-warm-gray">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Form */}
          {submitted ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <CheckCircle className="mx-auto text-gold mb-6" size={48} />
              <h3 className="text-3xl font-heading font-light text-charcoal mb-4">
                Thank You!
              </h3>
              <p className="text-warm-gray text-base font-body font-light">
                Your consultation request has been prepared. Please send the email
                that opened to complete your submission. One of our stylists will
                review it and reach out within 1-2 business days.
              </p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-heading font-light text-charcoal mb-8 text-center">
                Consultation Form
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors"
                      placeholder="(919) 555-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                      Preferred Stylist
                    </label>
                    <select
                      name="preferredStylist"
                      value={formData.preferredStylist}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">Select a stylist</option>
                      {stylists.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hair Details */}
                <div>
                  <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                    Describe Your Current Hair *
                  </label>
                  <textarea
                    name="currentHair"
                    required
                    value={formData.currentHair}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Color, length, texture, condition..."
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                    Desired Result *
                  </label>
                  <textarea
                    name="desiredResult"
                    required
                    value={formData.desiredResult}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="What look are you hoping to achieve? Feel free to describe inspiration photos."
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                    Color History
                  </label>
                  <textarea
                    name="colorHistory"
                    value={formData.colorHistory}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Have you colored your hair before? Box color, salon color, bleach, etc."
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                    Allergies or Sensitivities
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Any known allergies to hair products or chemicals?"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                    Lifestyle & Maintenance
                  </label>
                  <textarea
                    name="lifestyle"
                    value={formData.lifestyle}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="How much time do you spend styling? How often can you visit the salon?"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-elegant uppercase font-body font-medium text-charcoal mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 text-sm font-body font-light text-charcoal bg-white focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Anything else you'd like us to know?"
                  />
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 px-10 py-4 bg-gold text-white text-xs tracking-elegant uppercase font-body font-medium hover:bg-gold-dark transition-all duration-300"
                  >
                    Submit Consultation
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
