"use server";

import { EmblaCarousel } from "@/Components/Carousel";
import Header from "@/Components/Header";
import { ProductGrid } from "@/Components/ProductGrid";
import { ProductService } from "@/services/product.service";
import Button from "@/Components/Button";
import Footer from "@/Components/Footer";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await ProductService.getAll();

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
      <Footer />
    </div>
  );
}
