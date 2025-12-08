"use client";

import Header from "@/Components/Header";
import { ProductGrid } from "@/Components/ProductGrid";
import { ProductService, type Product } from "@/services/product.service";
import CategoryFilterList from "@/Components/CategoryFilterList.tsx";
import { OrderBy } from "@/Components/OrderBy";
import { Pagination } from "@/Components/Pagination";
import Footer from "@/Components/Footer";
import styles from "./page.module.css";
import { useState, useEffect, useMemo } from "react";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>("Popularité");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getAll();
        setAllProducts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filtrer par catégories sélectionnées
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category_id || "")
      );
    }

    // Trier selon l'option sélectionnée
    switch (selectedOrder) {
      case "Prix croissant":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Prix décroissant":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Nom A-Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Nom Z-A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Popularité":
      default:
        // Garder l'ordre par défaut
        break;
    }

    return filtered;
  }, [allProducts, selectedCategories, selectedOrder]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles["page-container"]}>
      <Header />
      <CategoryFilterList
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
      />
      <OrderBy
        options={[
          "Popularité",
          "Prix croissant",
          "Prix décroissant",
          "Nom A-Z",
          "Nom Z-A",
        ]}
        selectedOption={selectedOrder}
        onChange={(option) => setSelectedOrder(option)}
      />
      {isLoading ? (
        <div>Chargement des produits...</div>
      ) : (
        <>
          <ProductGrid products={paginatedProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
      <Footer />
    </div>
  );
}
