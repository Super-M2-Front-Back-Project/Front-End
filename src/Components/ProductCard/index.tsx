"use client";

import React from "react";
import Image from "next/image";
import Bouton from "../Button";
import "./style.css";
import Link from "next/link";
import IconButton from "../IconButton";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string[];
    image_url: string;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  product: { id: id, name: name, category: categories, image_url, price },
}) => {
  console.log("ProductCard props:", { id, name, categories, image_url, price });
  return (
    <Link className="container" href={`/products/${id}`}>
      <div className="thumbnail-container">
        <Image src={image_url} alt={name} fill className="thumbnail" />
      </div>
      <div className="product-info">
        <p className="product-title">{name}</p>
        <p className="product-category">
          {categories.map((cat, i) => (i === 0 ? cat : `${cat}`)).join(", ")}
        </p>
        <div className="product-actions">
          <div className="buttons-group">
            <Bouton
              label="Voir"
              onClick={() => console.log("Produit ajouté au panier")}
              iconName="eye"
            />
            <div onClick={(e) => e.stopPropagation()}>
              <IconButton variant="like" productId={id} />
            </div>
          </div>
          <p className="product-price">{price.toFixed(2)} €</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
