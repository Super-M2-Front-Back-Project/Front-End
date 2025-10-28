"use client";

import React, { useState } from "react";
import "./style.css";
import ICON_MAP from "@/lib/icons";
import Image from "next/image";

interface BoutonProps {
  label: string; // le texte du bouton
  onClick?: () => void; // fonction à exécuter au clic
  type?: "button" | "submit" | "reset"; // type de bouton (optionnel)
  disabled?: boolean; // pour désactiver le bouton (optionnel)
  iconName?: string;
}

const Bouton: React.FC<BoutonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  iconName,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick?.();
    setTimeout(() => setClicked(false), 200); // petit effet visuel
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`bouton ${clicked ? "clicked" : ""}`}
    >
      {label}
      {iconName && ICON_MAP[iconName]?.src ? (
        <Image
          width={24}
          height={24}
          className="icon"
          src={ICON_MAP[iconName].src}
          alt={ICON_MAP[iconName].alt || iconName}
        />
      ) : null}
    </button>
  );
};

export default Bouton;
