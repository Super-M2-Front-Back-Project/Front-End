"use client";

import Header from "@/Components/Header";
import { ProductGrid } from "@/Components/ProductGrid";
import { ProductService } from "@/services/product.service";
import CategoryFilterList from "@/Components/CategoryFilterList.tsx";
import { OrderBy } from "@/Components/OrderBy";
import { Pagination } from "@/Components/Pagination";
import Footer from "@/Components/Footer";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<string>("Popularité");
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        ProductService.getAll().then(setProducts);
    }, []);

    return (
        <div className={styles["page-container"]}>
            <Header />
            <CategoryFilterList />
            <OrderBy
                options={["Popularité", "Prix croissant", "Prix décroissant", "Nom A-Z", "Nom Z-A"]}
                selectedOption={selectedOrder}
                onChange={(option) => setSelectedOrder(option)}
            />
            <ProductGrid products={products} />
            <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={(page) => setCurrentPage(page)}
            />
            <Footer />
        </div>
    );
}

