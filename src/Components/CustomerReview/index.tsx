"use client";

import React, { useState } from "react";
import * as fa from "react-icons/fa";
import RatingInput from "../RatingInput";

export type Review = {
  id?: string;
  name: string;
  comment: string;
  rating: number; // 1 à 5
};

type CustomerReviewProps = {
  onSubmit?: (review: Review) => void;
  className?: string;
};

export default function CustomerReview({ onSubmit, className = "" }: CustomerReviewProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment || rating === 0) return;
    const newReview: Review = { name, comment, rating };
    onSubmit?.(newReview);

    setName("");
    setComment("");
    setRating(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 bg-white shadow rounded flex flex-col gap-4 ${className}`}
    >
      <h3 className="text-lg font-semibold">Leave a Review</h3>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
        required
      />

      <textarea
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={4}
        required
      />

      {/* ❤️ Rating with hearts */}
      <div className="flex items-center gap-2">
        {/*
        {[1, 2, 3, 4, 5].map((heart) => (
          <fa.FaHeart
            key={heart}
            size={24}
            className={`cursor-pointer ${
              heart <= rating ? "text-red-500" : "text-gray-300"
            }`}
            onClick={() => setRating(heart)}
          />
        ))}
        */}

        <RatingInput />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}

