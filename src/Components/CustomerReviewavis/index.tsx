"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

export type Review = {
  id: string;
  user: string;
  rating: number; // 1 à 5
  comment: string;
};

type ReviewListProps = {
  reviews?: Review[]; // rendu optionnel
  className?: string;
};

export default function ReviewList({ reviews, className = "" }: ReviewListProps) {
  // Avis par défaut si aucun avis n'est fourni
  const defaultReviews: Review[] = [
    {
      id: "1",
      user: "Alice",
      rating: 5,
      comment: "Produit excellent, je recommande !",
    },
    {
      id: "2",
      user: "Karim",
      rating: 4,
      comment: "Très bon rapport qualité-prix.",
    },
    {
      id: "3",
      user: "Nadia",
      rating: 3,
      comment: "Correct, mais peut être amélioré.",
    },
  ];

  const reviewList = reviews && reviews.length > 0 ? reviews : defaultReviews;

  return (
    <div className={`space-y-4 ${className}`}>
      {reviewList.map((review) => (
        <div
          key={review.id}
          className="p-4 bg-white shadow rounded border border-gray-200"
        >
          {/* Nom utilisateur */}
          <h4 className="font-semibold text-lg text-gray-800">
            {review.user}
          </h4>

          {/* Étoiles */}
          <div className="flex items-center mt-1 mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                size={18}
                className={index < review.rating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>

          {/* Commentaire */}
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
