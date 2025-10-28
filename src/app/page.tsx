"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/Components/Header";
import Bouton from "@/Components/boutons";
import toast, { Toaster } from "react-hot-toast";
import InputField from "@/Components/InputField";
import { EmblaCarousel } from "@/Components/EmblaCarousel";
import Footer from "@/Components/Footer";
import ButtonProps from "@/Components/AddToCartButton";
import OrderList from "@/Components/OrderList";
import ProfileCard from "@/Components/ProfileCard";
import PanelContainer from "@/Components/PanelContainer";
import SearchBarProps from "@/Components/Search";
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
<InputField label="Email" id="email" type="email" value={email} onChange={handleChange} placeholder="Entrez votre email" required />
<InputField label="nom" id="nom" type="text" value={email} onChange={handleChange} placeholder="Entrez votre nom" required />
<InputField label="Prénom" id="prenom" type="text" value={email} onChange={handleChange} placeholder="Entrez votre prénom" required />
<InputField label="password" id="password" type="password" value={email} onChange={handleChange} placeholder="Entrez votre password" required />
<EmblaCarousel />

<Footer />
<ButtonProps>Ajouter au panier</ButtonProps>
<OrderList></OrderList>
<ProfileCard profile={null}></ProfileCard>
<PanelContainer title="Mon Panel">
  <div>Contenu du panel</div>
</PanelContainer>
</div>
);
}
