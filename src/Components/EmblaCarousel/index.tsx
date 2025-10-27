"use client";

import React, {useCallback} from "react";
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
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <img
              src="https://fr.mypet.com/wp-content/uploads/sites/10/2024/02/chat-saviez-vous.png"
              alt="Slide 1"
            />
          </div>
          <div className="embla__slide">
            <img
              src="https://img.over-blog-kiwi.com/1/46/83/86/20200325/ob_7f420b_lecture-scenario.png"
              alt="Slide 2"
            />
          </div>
        </div>
      </div>
      <button
        onClick={scrollPrev}
        aria-label="Précédent"
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-2xl font-bold"
      >
        ‹
      </button>

      <button
        onClick={scrollNext}
        aria-label="Suivant"
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-2xl font-bold"
      >
        ›
      </button>
    </div>
  );
}
