"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X size={20} className="text-white" />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + images.length) % images.length); }}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/80 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % images.length); }}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/80 transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-[90vw] h-[85vh] sm:w-[80vw] sm:h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`Photo ${index + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs font-body font-light">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
