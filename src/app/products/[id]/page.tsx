// app/products/[id]/page.tsx
import { ProductService } from "@/services/product.service";
import type { Product } from "@/services/product.service";

// If 'description' is missing from Product, extend the type here for now:
type ProductWithDescription = Product & { description: string };
import Header from "@/Components/Header";
import Button from "@/Components/Button";
import Image from "next/image";
import Footer from "@/Components/Footer";
import CustomerReviewavis from "@/Components/CustomerReview";
import Description from "@/Components/Description";
import ProductCard from "@/Components/ProductCard";
type ProductPageProps = {
  params: Promise<{ id: string }>;
};
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productData = await ProductService.getById(id);
  const product: ProductWithDescription = {
    ...productData,
    description: (productData as any).description ?? "",
  };

  console.log("ProductPage props:", { id, product });

  return (
    
    <main style={{ padding: "2rem" }}>
       <Header />
      <h1>Product Detail Page</h1>
      <Image
        src={product.image_url}
        alt={product.name}
        width={400}
        height={400}
      />
      <h2>{product.name}</h2>

      <CustomerReviewavis />
      <Description
        description={product.description}
        title={product.name}
        price={product.price ? `${product.price} €` : undefined}
      />
      <p>Catégorie : {product.category.join(", ") || "—"}</p>
      <Button label="Acheter" />
      <ProductCard product={product} />

      <pre>{JSON.stringify(product, null, 2)}</pre>
      
      <Footer />
    </main>
   
  );
}
