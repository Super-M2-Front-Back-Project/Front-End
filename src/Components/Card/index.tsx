"use client";

import React from "react";
import "./style.css";

interface ProductCardProps {
  title: string;
  description?: string;
  price: number;
  imageUrl: string;
  onClick?: () => void; // optionnel, pour ajouter un clic sur la carte
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  onClick = () => {},
}) => {
  return (
    <div
      className="product-card"
      onClick={onClick}
    >
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
        <p className="text-purple-600 font-bold mt-2">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
