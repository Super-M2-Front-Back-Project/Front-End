"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css"; // <-- asegúrate de crear este archivo con estilos básicos

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  );
}
