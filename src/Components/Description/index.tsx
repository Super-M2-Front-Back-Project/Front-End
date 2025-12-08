"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

export interface DescriptionProps {
  title?: string;
  description: string;
  price?: string;
  image?: StaticImageData; // On remplace imageSrc par image importée
  className?: string;
}

export default function Description({
  title = "",
  description,
  price = "432€",
  image,
  className = "",
}: DescriptionProps) {
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <section className={`space-y-3 ${className}`}>
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}

      {/* Étoiles interactives */}
      <div className="flex space-x-1 text-yellow-500 text-xl cursor-pointer">
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1;
          return (
            <span
              key={i}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
            >
              {starValue <= (hoverRating || rating) ? "★" : "☆"}
            </span>
          );
        })}
      </div>

      {/* Description et prix */}
      <p className="text-base leading-relaxed">{description}</p>
      {price && <p className="text-lg font-bold text-gray-800">Prix : {price}</p>}
      {rating > 0 && <p className="text-sm text-gray-600">Vous avez noté : {rating}/5</p>}

      {/* Image importée */}
      {image && (
        <div className="w-40 h-40 relative mt-4">
          <Image
            src={image}
            alt={title || "Produit"}
            fill
            className="object-contain"
          />
        </div>
      )}
    </section>
  );
}
