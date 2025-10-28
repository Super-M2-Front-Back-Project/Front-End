"use client";

import Header from "@/Components/header";
import Bouton from "@/Components/boutons";
import toast, { Toaster } from "react-hot-toast";
import InputField from "@/Components/InputField";
import ProductCard from "@/Components/ProductCard";
import { useState } from "react";
export default function Home() {
  const [email, setEmail] = useState("");

  const handleChange = (value: string) => {
    setEmail(value);
  };

  return (
    <div className="page-container">
      <Toaster />
      <Header title="Bloop" />
      <InputField
        label="Adresse e-mail"
        id="email"
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Entrez votre email"
        required
      />
      <ProductCard
        title="Produit 1"
        categories={["Catégorie A"]}
        price={29.99}
        imageUrl="/product.png"
      />

      <Bouton
        label="Ajouter au panier"
        iconName="addCart"
        onClick={() => toast("Produit 1 ajouté au panier")}
      />
    </div>
  );
}
