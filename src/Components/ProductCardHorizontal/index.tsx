"use client";

import React from "react";
import Image from "next/image";
import "./style.css";

import IconButton from "../IconButton";

interface ProductCardHorizontalProps {
  product: {
    id: string;
    name: string;
    category_id: string | null;
    image_url: string;
    price: number;
    image_url: string;
    category: string[];
  };
  onClick: () => void;
}

export default function ProductCardHorizontal({
  product,
  onClick,
}: ProductCardHorizontalProps) {
  return (
    <div className="product-card-horizontal" onClick={onClick}>
      <div className="product-card-horizontal-image">
        <Image
          src={product.image_url}
          alt={product.name}
          width={96}
          height={96}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="product-card-horizontal-info">
        <div className="product-card-horizontal-name">{product.name}</div>
        <div className="product-card-horizontal-category">
          {product.category_id || "Non catégorisé"}
        </div>
      </div>
      <div className="product-card-horizontal-actions">
        <div className="product-card-horizontal-price">
          {product.price.toFixed(2)}€
        </div>
        <div className="btns-container" onClick={(e) => e.stopPropagation()}>
          <IconButton variant="like" productId={product.id} />
          <IconButton variant="add-to-cart" productId={product.id} />
        </div>
      </div>
    </div>
  );
}
