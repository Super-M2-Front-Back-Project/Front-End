import { ProductService } from "@/services/product.service";
import type { Product } from "@/services/product.service";
import Header from "@/Components/Header";
import Image from "next/image";
import Footer from "@/Components/Footer";
import CustomerReview from "@/Components/CustomerReview";
import styles from "./page.module.css";
import Link from "next/link";
import AddToCartButton from "@/Components/AddToCartButton";
import IconButton from "@/Components/IconButton";

export const dynamic = 'force-dynamic';

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product: Product = await ProductService.getById(id);

  console.log("ProductPage props:", { id, product });

  return (
    <main className={styles["page-container"]}>
      <Header />
      <div className={styles["columns-container"]}>
        <div className={styles["left-column"]}>
          <Image
            src={product.image_url}
            alt={product.name}
            width={800}
            height={800}
            className={styles["product-image"]}
          />
        </div>
        <div className={styles["right-column"]}>
          <h1 className={styles["product-name"]}>{product.name}</h1>
          {product.category && (
            <p className={styles["product-category"]}>
              <Link href={`/categories/${product.category_id}`}>
                {product.category.name}
              </Link>
            </p>
          )}
          {product.seller && (
            <p className={styles["product-seller"]}>
              Vendu par :{" "}
              <Link href={`/sellers/${product.seller.id}`}>
                {product.seller.name}
              </Link>
            </p>
          )}
          <p className={styles["product-description"]}>{product.description}</p>
          <div className={styles["product-actions"]}>
            <AddToCartButton productId={product.id} />
            <IconButton variant="like" productId={product.id} size={40} />
          </div>
          <CustomerReview productId={product.id} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
