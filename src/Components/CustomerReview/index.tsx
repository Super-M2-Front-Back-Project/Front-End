"use client";

import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import Image from "next/image";
import "./style.css";

export type Review = {
  id?: string;
  comment: string;
  rating: number;
};

type CustomerReviewProps = {
  onSubmit?: (review: Review) => void;
  className?: string;
  userPseudo?: string;
  productId: string;
};

export default function CustomerReview({
  onSubmit,
  productId,
}: CustomerReviewProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || rating === 0) return;
    const newReview: Review = { comment, rating };
    onSubmit?.(newReview);

    setComment("");
    setRating(0);
  };

  const displayRating = hoveredRating || rating;

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3 className="review-title">Laissez votre avis</h3>
      <div className="rating-container">
        <div className="rating-hearts" onMouseLeave={() => setHoveredRating(0)}>
          {[1, 2, 3, 4, 5].map((heart) => (
            <Image
              key={heart}
              src={
                heart <= displayRating
                  ? "/assets/icons/heart-filled.svg"
                  : "/assets/icons/heart.svg"
              }
              alt="coeur"
              width={40}
              height={40}
              className="heart-icon"
              onClick={() => setRating(heart)}
              onMouseEnter={() => setHoveredRating(heart)}
            />
          ))}
        </div>
      </div>
      <InputField
        label=""
        id="review-comment"
        type="text"
        value={comment}
        onChange={setComment}
        placeholder="Écrivez votre avis ici..."
        required
      />
      <Button label="Envoyer" type="submit" />
    </form>
  );
}
