"use client";

import React, { useState, useEffect } from "react";
import "./style.css";
import ProductCardHorizontal from "../ProductCardHorizontal";
import Button from "../Button";
import { CartService, Cart } from "@/services/cart.service";
import { AuthService } from "@/services/auth.service";

const CartList: React.FC = () => {
  const [user, setUser] = useState<null | {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    birthdate?: string;
    street?: string;
    postal_code?: string;
    city?: string;
    phone?: string;
  }>(null);

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  const [cartItems, setCartItems] = useState<Cart>({ items: [] });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await CartService.getCart(
          "eb4bef7e-e85a-4395-8302-ee2e6ad894f6"
        );
        setCartItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
      }
    };

    fetchCartItems();
  }, []);

  console.log("items", cartItems);

  if (isLoading) {
    return <div>Chargement du panier...</div>;
  }

  return (
    <div className="cart-container">
      {cartItems.items.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        cartItems.items.map((item) => (
          <ProductCardHorizontal
            key={item.id} // toujours ajouter un key dans un map
            product={{
              id: item.product?.id || "1",
              name: item.product?.name || "Produit Exemple",
              category_id: "Meuble",
              price: item.product?.price || 19.99,
              image_url: item.product?.image_url || "/example.jpg",
              category: ["Catégorie 1"],
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
