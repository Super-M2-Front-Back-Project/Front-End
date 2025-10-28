"use client";

import React from "react";
import Image from "next/image";
import Bouton from "../Button";
import "./style.css";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string[];
    imageUrl: string;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  product: { name: name, category: categories, imageUrl, price },
}) => {
  return (
    <Link className="container" href="#">
      <div className="thumbnail-container">
        <Image src={imageUrl} alt={name} fill className="thumbnail" />
      </div>
      <div className="product-info">
        <p className="product-title">{name}</p>
        <p className="product-category">
          {categories.map((cat, i) => (i === 0 ? cat : `${cat}`)).join(", ")}
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
