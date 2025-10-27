"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/Components/header";
import Bouton from "@/Components/boutons";
import toast, { Toaster } from 'react-hot-toast';
import InputField from "@/Components/InputField/InputField";
import ProductCard from "@/Components/Card";
import { useState } from "react";
export default function Home() {
  const [email, setEmail] = useState("");

  const handleChange = (value: string) => {
    setEmail(value);
  };

  return (
    <div className={styles.page}>
      <Toaster />
      <Header title="Bloop" />
      <InputField label="Email" id="email" type="email" value={email} onChange={handleChange} placeholder="Entrez votre email" required />
      <ProductCard title="Produit 1" description="Description du produit 1" price={29.99} imageUrl="https://img.over-blog-kiwi.com/1/46/83/86/20200325/ob_7f420b_lecture-scenario.png" onClick={() => toast('Produit 1 ajouté au panier')} />

    </div>
  );
}
