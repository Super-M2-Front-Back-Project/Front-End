import { EmblaCarousel } from "@/Components/Carousel";
import Header from "@/Components/Header";
import { ProductGrid } from "@/Components/ProductGrid";
import Select from "@/Components/Select";
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

  const [selectedOption, setSelectedOption] = React.useState<string>("");

  return (
    <div className="page-container">
      <Header />
      <EmblaCarousel slides={slides} />
      <ProductGrid products={products} />
        <Select
        label="Option"
        options={[
          { value: "Option1", label: "Option1" },
          { value: "Option2", label: "Option2" },
          { value: "Option3", label: "Option3" },
        ]}
        value={selectedOption}
        placeholder="Choisissez une Option"
        onChange={(value) => {
          console.log("Option sélectionnée :", value);
          setSelectedOption(value);
        }}
      />

      {/* Pour afficher la valeur choisie */}
      <p>Option choisie : {selectedOption}</p>
    </div>
  );
}
