"use client";

import { EmblaCarousel } from "@/Components/Carousel";
import Header from "@/Components/Header";
import { ProductGrid } from "@/Components/ProductGrid";
import { ProductService } from "@/services/product.service";
import Button from "@/Components/Button";
import Footer from "@/Components/Footer";
import styles from "./page.module.css";
import Wishlist from "@/Components/Wishlist";
export default async function Home() {
  const products = await ProductService.getAll();

  console.log("Products in Home page:", products);

  const slides = [
    { src: "/product.png", alt: "Produit 1", caption: "Découvrez nos meubles" },
    { src: "/product.png", alt: "Produit 2", caption: "Découvrez nos meubles" },
    { src: "/product.png", alt: "Produit 3", caption: "Découvrez nos meubles" },
    { src: "/product.png", alt: "Produit 4", caption: "Découvrez nos meubles" },
  ];

  return (
    <div className={styles["page-container"]}>
      <Header />
      <EmblaCarousel slides={slides} />
      <ProductGrid products={products} />
      <Button
        label="Voir l’intégralité du catalogue"
        onClick={() => alert("Catalogue complet")}
        iconName="eye"
      />
      <Wishlist
        products={products.slice(0, 3).map((product, index) => ({
          id: index,
          title: product.name,
          price: product.price.toFixed(2),
          image: product.image_url,
        }))}
        onClose={() => alert("Fermer la wishlist")}
        onAddAllToCart={() => alert("Ajouter tous les produits au panier")}
      />

      
      <Footer />
    </div>
  );
}
