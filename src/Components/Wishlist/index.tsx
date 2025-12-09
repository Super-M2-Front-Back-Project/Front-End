"use client";

import React from "react";
import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

type WishlistProps = {
  products: Product[];
  onClose: () => void;
  onAddAllToCart: () => void;
};

export const Wishlist: React.FC<WishlistProps> = ({ products, onClose, onAddAllToCart }) => {
  return (
    <div className="fixed top-16 right-4 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-blue-700 font-bold text-lg">Vos produits likés</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <FaTimes />
        </button>
      </div>

      {/* Product list */}
      <div className="flex flex-col gap-4 mb-4 max-h-64 overflow-y-auto">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="text-gray-800">{product.title}</p>
                <p className="text-pink-500 font-semibold">{product.price} €</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-pink-500 hover:text-pink-700">
                <FaHeart />
              </button>
              <button className="text-blue-700 hover:text-blue-900">
                <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer button */}
      <button
        onClick={onAddAllToCart}
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 flex items-center justify-center gap-2"
      >
        Ajouter tous les produits au panier <FaShoppingCart />
      </button>
    </div>
  );
};
export default Wishlist;