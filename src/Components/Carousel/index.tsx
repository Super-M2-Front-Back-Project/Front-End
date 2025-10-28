"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Button from "../Button";
import "./style.css";

export type Slide = {
  src: string;
  alt: string;
  caption?: string;
};

type EmblaCarouselProps = {
  slides: Slide[];
};

export function EmblaCarousel({ slides }: EmblaCarouselProps) {
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
          {slides.map((slide, idx) => (
            <div className="carousel-slide" key={idx}>
              <Image
                src={slide.src}
                alt={slide.alt}
                className="carousel-image"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="carousel-actions">
                <div className="carousel-caption">{slide.caption}</div>
                <Button secondary label="Découvrir →" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        aria-label="Précédent"
        className="carousel-btn carousel-btn-prev"
      >
        <Image
          width={60}
          height={60}
          src="/assets/icons/prev.svg"
          alt="Précédent"
        />
      </button>

      <button
        onClick={scrollNext}
        aria-label="Suivant"
        className="carousel-btn carousel-btn-next"
      >
        <Image
          width={60}
          height={60}
          src="/assets/icons/next.svg"
          alt="Suivant"
        />
      </button>
    </div>
  );
}
