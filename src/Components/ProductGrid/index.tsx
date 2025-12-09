import React from "react";
import ProductCard from "../ProductCard";

import "./styles.css";

export function ProductGrid({
  products,
}: {
  products: Array<{
    id: string;
    name: string;
    category_id: string | null;
    image_url: string;
    price: number;
  }>;
}) {
  return (
    <div className="product-grid-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
