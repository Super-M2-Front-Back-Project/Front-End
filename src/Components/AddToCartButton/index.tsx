"use client";

import React, { useState } from "react";
import Button from "@/Components/Button";
import { CartService } from "@/services/cart.service";
import { AuthService } from "@/services/auth.service";
import { requestLoginPopup } from "@/utils/authEvents";

interface AddToCartButtonProps {
  productId: string;
  label?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  label = "Ajouter au panier",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading) return;

    // Vérifier si l'utilisateur est connecté
    if (!AuthService.isAuthenticated()) {
      requestLoginPopup();
      return;
    }

    setIsLoading(true);
    try {
      await CartService.addToCart({
        product_id: productId,
        quantity: 1,
      });
      console.log(`Produit ${productId} ajouté au panier avec succès`);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      // Si l'erreur est liée à l'authentification, ouvrir la popup
      if (error instanceof Error && error.message.includes("Authentication required")) {
        requestLoginPopup();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      label={isLoading ? "Ajout..." : label}
      iconName="addCart"
      onClick={handleAddToCart}
      disabled={isLoading}
    />
  );
};

export default AddToCartButton;
