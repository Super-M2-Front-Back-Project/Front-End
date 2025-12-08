// app/products/[id]/page.tsx
import { ProductService } from "@/services/product.service";
import type { Product } from "@/services/product.service";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product: Product = await ProductService.getById(id);

  console.log("ProductPage props:", { id, product });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Product Detail Page</h1>

      <h2>{product.name}</h2>
      <p>Catégorie : {product.category.join(", ") || "—"}</p>
      <p>Prix : {product.price} €</p>

      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
}
