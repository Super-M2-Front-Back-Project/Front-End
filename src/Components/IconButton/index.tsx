"use client";

import React from "react";
import Image from "next/image";

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (variant === "like") {
      setIsActive(!isActive);
      console.log(
        `product_id ${productId} ${
          !isActive ? "ajouté à" : "retiré de"
        } la liste de souhait`
      );
    } else if (variant === "add-to-cart") {
      console.log(`product_id ${productId} ajouté au panier`);
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
