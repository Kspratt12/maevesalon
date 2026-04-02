import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#e8e8e8] text-charcoal">
      {/* Main Footer */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CONTACT heading */}
        <h2 className="text-2xl md:text-3xl font-heading font-light text-charcoal/70 tracking-wide mb-10">
          CONTACT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left - Address & Contact */}
          <div className="space-y-8">
            <div>
              <h4 className="text-xs tracking-luxe uppercase font-body font-medium text-charcoal/60 mb-3">
                Address
              </h4>
              <p className="text-sm font-heading font-light text-charcoal/70 leading-relaxed">
                1121 Apex Peakway<br />
                Apex, North Carolina 27502
              </p>
            </div>
            <div>
              <h4 className="text-xs tracking-luxe uppercase font-body font-medium text-charcoal/60 mb-3">
                Contact Us
              </h4>
              <div className="space-y-2">
                <a
                  href="tel:919-951-7866"
                  className="block text-sm font-heading font-light text-charcoal/70 hover:text-gold transition-colors underline"
                >
                  919-951-7866
                </a>
                <a
                  href="mailto:info@maevesalon.com"
                  className="block text-sm font-heading font-light text-charcoal/70 hover:text-gold transition-colors underline"
                >
                  info@maevesalon.com
                </a>
              </div>
            </div>
          </div>

          {/* Right - Hours */}
          <div>
            <h4 className="text-xs tracking-luxe uppercase font-body font-medium text-charcoal/60 mb-3">
              Hours
            </h4>
            <div className="space-y-3 text-sm font-heading font-light text-charcoal/70">
              <div>
                <p className="text-charcoal/80">Mon - Thurs :</p>
                <p>9am - 8pm</p>
              </div>
              <div>
                <p className="text-charcoal/80">Fri :</p>
                <p>9am - 6pm</p>
              </div>
              <div>
                <p className="text-charcoal/80">Sat :</p>
                <p>9am - 3pm</p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-3 text-sm font-heading font-light text-charcoal/70 hover:text-gold transition-colors group"
              >
                Schedule an Appointment
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Careers */}
        <div className="border-t border-charcoal/10 pt-8 mb-8">
          <a
            href="mailto:info@maevesalon.com?subject=Career Inquiry"
            className="text-lg font-heading font-light text-charcoal/50 tracking-wide hover:text-gold transition-colors"
          >
            CAREERS
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal/40 font-heading font-light">
            &copy; {new Date().getFullYear()} Maeve Salon & Color Bar
          </p>
          <div className="flex items-center gap-6">
            {/* Facebook - bold outlined */}
            <a
              href="https://www.facebook.com/maevesalon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/50 hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* Instagram - bold outlined */}
            <a
              href="https://www.instagram.com/maeve.salon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/50 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Pinterest - bold outlined */}
            <a
              href="https://www.pinterest.com/maevesalon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/50 hover:text-gold transition-colors"
              aria-label="Pinterest"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12a4 4 0 118 0c0 2.5-1.5 4.5-3 6l-1 4" />
                <path d="M9.5 14.5L11 18" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
