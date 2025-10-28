"use client";

import React from "react";
import Image from "next/image";
import Bouton from "../boutons";
import "./style.css";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  categories: string[];
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  categories,
  imageUrl,
}) => {
  return (
    <Link className="container" href="#">
      <div className="thumbnail-container">
        <Image src={imageUrl} alt={title} fill className="thumbnail" />
      </div>
      <div className="product-info">
        <p className="product-title">{title}</p>
        <p className="product-category">
          {categories.map((cat, i) => (i === 0 ? cat : `, ${cat}`)).join(", ")}
        </p>
        <div className="product-actions">
          <Bouton
            label="Voir"
            onClick={() => console.log("Produit ajouté au panier")}
            iconName="eye"
          />
          <p className="product-price">{price.toFixed(2)} €</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
