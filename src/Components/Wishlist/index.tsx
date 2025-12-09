"use client";

import React, { useState, useEffect } from "react";
import "./style.css";
import ProductCardHorizontal from "../ProductCardHorizontal";
import { WishlistService, WishlistItem } from "@/services/wishlist.service";
import { AuthService } from "@/services/auth.service";

const WishlistPopup: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchWishlistItems = async () => {
    try {
      if (AuthService.isAuthenticated()) {
        const items = await WishlistService.getWishlist();
        setWishlistItems(items);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  // Écouter les changements de wishlist pour rafraîchir la liste
  useEffect(() => {
    const handleWishlistChange = () => {
      fetchWishlistItems();
    };

    window.addEventListener("wishlistChanged", handleWishlistChange);
    return () => {
      window.removeEventListener("wishlistChanged", handleWishlistChange);
    };
  }, []);

  if (isLoading) {
    return <div className="wishlist-loading">Chargement de la wishlist...</div>;
  }

  return (
    <div className="wishlist-container">
      {wishlistItems.length === 0 ? (
        <p className="wishlist-empty">Votre liste de souhaits est vide.</p>
      ) : (
        wishlistItems.map((item) => (
          <ProductCardHorizontal
            key={item.id}
            product={{
              id: item.product?.id || item.product_id,
              name: item.product?.name || "Produit",
              category_id: null,
              price: item.product?.price || 0,
              image_url: item.product?.image_url || "/example.jpg",
              category: [],
            }}
            onClick={() => console.log("Produit cliqué", item.product?.name)}
          />
        ))
      )}
    </div>
  );
};

export default WishlistPopup;
