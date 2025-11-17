
"use client"; // 🔹 Obligatoire pour activer les hooks côté client
import { EmblaCarousel } from "@/Components/Carousel";
import Header from "@/Components/Header";
import { ProductGrid } from "@/Components/ProductGrid";
import CountryStat from "@/Components/Modal";
import SellerDashboard from "@/Components/SellerDashboard"
import OrderCard from "@/Components/OrderCard";
import CategoryFilterList from "@/Components/CategoryFilterList.tsx";
import CustomerReview from "@/Components/CustomerReview.tsx";
import DoubleRangeSlider from "@/Components/DoubleRangeSlider/DoubleRangeSlider";
import React from "react";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Chaise Scandinave",
      category: ["Meubles", "Chaises"],
      imageUrl: "/product.png",
      price: 79.99,
    },
    {
      id: 2,
      name: "Table Basse Moderne",
      category: ["Meubles", "Tables"],
      imageUrl: "/product.png",
      price: 129.99,
    },
    {
      id: 3,
      name: "Canapé Confortable",
      category: ["Meubles", "Canapés"],
      imageUrl: "/product.png",
      price: 299.99,
    },
    {
      id: 4,
      name: "Lampe de Table Élégante",
      category: ["Éclairage", "Lampes"],
      imageUrl: "/product.png",
      price: 49.99,
    },
    {
      id: 5,
      name: "Tapis Doux",
      category: ["Décoration", "Tapis"],
      imageUrl: "/product.png",
      price: 89.99,
    },
    {
      id: 6,
      name: "Bibliothèque en Bois",
      category: ["Meubles", "Rangements"],
      imageUrl: "/product.png",
      price: 199.99,
    },
    {
      id: 7,
      name: "Fauteuil Relaxant",
      category: ["Meubles", "Fauteuils"],
      imageUrl: "/product.png",
      price: 149.99,
    },
    {
      id: 8,
      name: "Table à Manger Extensible",
      category: ["Meubles", "Tables"],
      imageUrl: "/product.png",
      price: 399.99,
    },
  ];

  const slides = [
    {
      src: "/product.png",
      alt: "Produit 1",
      caption: "Découvrez notre sélection de meubles",
    },
    {
      src: "/product.png",
      alt: "Produit 2",
      caption: "Découvrez notre sélection de meubles",
    },
    {
      src: "/product.png",
      alt: "Produit 3",
      caption: "Découvrez notre sélection de meubles",
    },
    {
      src: "/product.png",
      alt: "Produit 4",
      caption: "Découvrez notre sélection de meubles",
    },
  ];


  return (
    <div className="page-container">
      <Header title={""} />
      <EmblaCarousel slides={slides} />
      <ProductGrid products={products} />
      <CountryStat ></CountryStat>
      <SellerDashboard children={undefined}></SellerDashboard>
      <OrderCard orderId={""} customerName={""} status={"Pending"} total={0} date={""}></OrderCard>
      <CategoryFilterList data={[]}></CategoryFilterList>
      <CategoryFilterList />
      <CustomerReview></CustomerReview>
      <DoubleRangeSlider min={400} max={500}></DoubleRangeSlider>
    </div>
         
  );
}
