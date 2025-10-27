"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SliderProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

export default function ImageSlider({
  images,
  autoPlay = true,
  interval = 3000,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gestion du slide automatique
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, autoPlay]);

  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg">
      <div className="relative h-64 sm:h-80">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          fill
          className="object-cover transition-opacity duration-700 ease-in-out"
        />
      </div>

      {/* Boutons navigation */}
      <button
        onClick={goToPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full hover:bg-black/60"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full hover:bg-black/60"
      >
        ›
      </button>

      {/* Petits points (indicateurs) */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
