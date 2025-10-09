"use client"

import React, { useState } from "react"
import "./style.css"
import toast, { Toaster } from 'react-hot-toast';

interface BoutonProps {
  label: string            // le texte du bouton
  onClick?: () => void     // fonction à exécuter au clic
  type?: "button" | "submit" | "reset" // type de bouton (optionnel)
  disabled?: boolean       // pour désactiver le bouton (optionnel)
}

const Bouton: React.FC<BoutonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false
}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    onClick?.()
    setTimeout(() => setClicked(false), 200) // petit effet visuel
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`bouton ${clicked ? "clicked" : ""}`}
    >
      {label}
      <img src="/assets/add-shopping-cart 1.svg" alt="Ajouter au panier" />
    </button>
  )
}

export default Bouton
