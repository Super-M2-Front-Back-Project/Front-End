"use client";

import React, { useState } from "react";
import "./style.css";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

interface SearchBarProps {
  placeholder?: string;
  data: Product[]; // données sur lesquelles rechercher
  className?: string;
}

export default function SearchBarWithPanel({
  placeholder = "Rechercher...",
  data,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  // Filtrer les produits en fonction de la saisie
  const handleChange = (value: string) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
    } else {
      const filtered = data.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(
      data.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className={`search-bar-container ${className}`} style={{ position: "relative" }}>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <img src="/assets/icons/search.svg" alt="Rechercher" />
        </button>
      </form>

      {/* Panel dynamique en dessous */}
      {results.length > 0 && (
        <div
          className="search-panel"
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 10,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {results.map((product) => (
            <div
              key={product.id}
              className="search-panel-item"
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setQuery(product.name);
                setResults([]);
              }}
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
              )}
              <div>
                <strong>{product.name}</strong>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>{product.price} €</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
