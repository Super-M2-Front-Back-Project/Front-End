"use client";

import React from "react";
import "./style.css";
import Image from "next/image";

interface RatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ rating, onRatingChange }) => {
  const cases = [1, 2, 3, 4, 5];

  return (
    <div className="RatingContainer">
      {cases.map((c) => {
        const isActive = c <= rating;

        return (
          <div
            className={isActive ? "heart-active" : "heart-inactive"}
            key={c}
          >
            <Image
              src={isActive ? "/assets/heart.svg" : "/assets/key-from-heart 1.svg"}
              width={20}
              height={20}
              alt={isActive ? "active" : "inactive"}
              onClick={() => onRatingChange(c)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RatingInput;