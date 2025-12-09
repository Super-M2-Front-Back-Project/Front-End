"use client";

import React, { useState, useEffect } from "react";
import "./style.css";
import ProductCardHorizontal from "../ProductCardHorizontal";
import Button from "../Button";
import { CartService, Cart } from "@/services/cart.service";
import { AuthService } from "@/services/auth.service";

const CartList: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart>({ items: [] });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCartItems = async () => {
    try {
      if (AuthService.isAuthenticated()) {
        const items = await CartService.getCart();
        setCartItems(items);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du panier:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Écouter les changements de panier pour rafraîchir la liste
  useEffect(() => {
    const handleCartChange = () => {
      fetchCartItems();
    };

    window.addEventListener("cartChanged", handleCartChange);
    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  console.log("items", cartItems);

  if (isLoading) {
    return <div className="cart-loading">Chargement du panier...</div>;
  }

  return (
    <div className="cart-container">
      {cartItems.items.length === 0 ? (
        <p className="cart-empty">Votre panier est vide.</p>
      ) : (
        cartItems.items.map((item) => (
          <ProductCardHorizontal
            key={item.id}
            product={{
              id: item.product?.id || "1",
              name: item.product?.name || "Produit Exemple",
              description: "",
              category_id: null,
              price: item.product?.price || 19.99,
              image_url: item.product?.image_url || "/example.jpg",
              quantity: item.quantity,
              is_active: true,
            }}
            onClick={() => console.log("Produit cliqué", item.product?.name)}
          />
        ))
      )}
      {cartItems.items.length > 0 && (
        <Button
          label="Passer à la caisse"
          onClick={() => console.log("Caisse")}
        />
      )}
    </div>
  );
};

export default CartList;
