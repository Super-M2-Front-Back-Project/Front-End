"use client";

import Header from "@/Components/header";
import Bouton from "@/Components/boutons";
import toast, { Toaster } from "react-hot-toast";
import InputField from "@/Components/InputField";
import ProductCard from "@/Components/Card";
import { EmblaCarousel } from "@/Components/EmblaCarousel";
import Login from "./auth/login/page";
import SignUp from "./auth/sign-up/page";
import Footer from "@/Components/Footer";
import ButtonProps from "@/Components/AddToCartButton";
import OrderList from "@/Components/OrderList";
import ProfileCard from "@/Components/ProfileCard";
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
<ProductCard title="Produit 1" description="Description du produit 1" price={29.99} imageUrl="https://img.over-blog-kiwi.com/1/46/83/86/20200325/ob_7f420b_lecture-scenario.png" onClick={() => toast('Produit 1 ajouté au panier')} />
<EmblaCarousel />
<Login />
<SignUp />
<Footer />
<ButtonProps>Ajouter au panier</ButtonProps>
<OrderList></OrderList>
<ProfileCard profile={null}></ProfileCard>
</div>
);
}
