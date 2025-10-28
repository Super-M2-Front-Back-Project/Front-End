"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import "./style.css";

export function EmblaCarousel() {
  // Le ref doit être appliqué au viewport, pas à un slide
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="carousel">
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container">
          <div className="carousel-slide">
            <Image fill src="product.png" alt="Slide 1" />
          </div>
        </div>
      </div>
      <button
        onClick={scrollPrev}
        aria-label="Précédent"
        className="carousel-btn carousel-btn-prev"
      >
        ‹
      </button>

      <button
        onClick={scrollNext}
        aria-label="Suivant"
        className="carousel-btn carousel-btn-next"
      >
        ›
      </button>
    </div>
  );
}
