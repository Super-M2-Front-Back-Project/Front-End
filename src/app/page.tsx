import { EmblaCarousel } from "@/Components/Carousel";
import Header from "@/Components/Header";
import { ProductGrid } from "@/Components/ProductGrid";
import { ProductService } from "@/services/product.service";

export default async function Home() {
  // fetch depuis le back
  const products = await ProductService.getAll();

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
      <Header />
      <EmblaCarousel slides={slides} />
      <ProductGrid products={products} />
    </div>
  );
}
