"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProductService, type Product } from "@/services/product.service";
import ProductCardHorizontal from "../ProductCardHorizontal";
import "./style.css";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBarWithPanel({
  placeholder = "Rechercher...",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recherche en temps réel avec debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 0) {
        setIsLoading(true);
        try {
          const searchResults = await ProductService.search(query);
          setResults(searchResults);
          setShowDropdown(true);
        } catch (error) {
          console.error("Erreur de recherche:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setShowDropdown(false);
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className={`search-container ${className}`}>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          onFocus={() => query.trim() && setShowDropdown(true)}
        />
        <button type="submit" className="search-button">
          <img src="/assets/icons/search.svg" alt="Rechercher" />
        </button>
      </form>

      {showDropdown && (
        <div className="search-dropdown">
          {isLoading ? (
            <div className="search-dropdown-loading">Recherche...</div>
          ) : results.length > 0 ? (
            <div className="search-results-list">
              {results.map((product) => (
                <ProductCardHorizontal
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="search-dropdown-empty">Aucun résultat trouvé</div>
          )}
        </div>
      )}
    </div>
  );
}
