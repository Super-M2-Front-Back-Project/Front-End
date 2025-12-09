"use client";

import React from "react";
import Image from "next/image";
import { CartService } from "@/services/cart.service";
import { WishlistService } from "@/services/wishlist.service";
import { AuthService } from "@/services/auth.service";
import { requestLoginPopup } from "@/utils/authEvents";

interface IconButtonProps {
  variant: "like" | "add-to-cart";
  productId: string | number;
  size?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant,
  productId,
  size = 24,
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Charger l'état initial pour la wishlist
  React.useEffect(() => {
    if (variant === "like" && AuthService.isAuthenticated()) {
      WishlistService.isInWishlist(String(productId))
        .then(setIsActive)
        .catch(() => setIsActive(false));
    }
  }, [variant, productId]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (variant === "like") {
      if (isLoading) return;

      // Vérifier si l'utilisateur est connecté
      if (!AuthService.isAuthenticated()) {
        requestLoginPopup();
        return;
      }

      setIsLoading(true);
      try {
        if (isActive) {
          // Retirer de la wishlist
          await WishlistService.removeFromWishlist(String(productId));
          setIsActive(false);
          console.log(`Produit ${productId} retiré de la wishlist`);
          // Émettre un événement pour notifier le changement
          window.dispatchEvent(new CustomEvent("wishlistChanged"));
        } else {
          // Ajouter à la wishlist
          await WishlistService.addToWishlist({
            product_id: String(productId),
          });
          setIsActive(true);
          console.log(`Produit ${productId} ajouté à la wishlist`);
          // Émettre un événement pour notifier le changement
          window.dispatchEvent(new CustomEvent("wishlistChanged"));
        }
      } catch (error) {
        console.error("Erreur lors de la gestion de la wishlist:", error);
        // Si l'erreur est liée à l'authentification, ouvrir la popup
        if (error instanceof Error && error.message.includes("Authentication required")) {
          requestLoginPopup();
        }
      } finally {
        setIsLoading(false);
      }
    } else if (variant === "add-to-cart") {
      if (isLoading) return;

      // Vérifier si l'utilisateur est connecté
      if (!AuthService.isAuthenticated()) {
        requestLoginPopup();
        return;
      }

      setIsLoading(true);
      try {
        await CartService.addToCart({
          product_id: String(productId),
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
    }
  };

  const getIconSrc = () => {
    if (variant === "like") {
      return isActive || isHovered
        ? "/assets/icons/heart-filled.svg"
        : "/assets/icons/heart.svg";
    } else {
      return "/assets/icons/add-to-cart-colored.svg";
    }
  };

  const getAltText = () => {
    if (variant === "like") {
      return isActive ? "Retirer des favoris" : "Ajouter aux favoris";
    } else {
      return "Ajouter au panier";
    }
  };

  return (
    <Image
      src={getIconSrc()}
      alt={getAltText()}
      width={size}
      height={size}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer", transition: "transform 0.2s" }}
    />
  );
};

export default IconButton;
