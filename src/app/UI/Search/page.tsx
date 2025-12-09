"use client";
import React, { useState } from "react";
interface SearchProps {
  placeholder?: string;
  apiUrl: string; // URL de l'API à appeler
}

const Search: React.FC<SearchProps> = ({ placeholder = "Rechercher...", apiUrl }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction appelée quand on tape dans la barre
  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.trim().length < 2) {
      // si moins de 2 lettres → on efface
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}?q=${encodeURIComponent(value)}`);
      if (!response.ok) throw new Error("Erreur lors de la recherche");

      const data = await response.json();
      setResults(data.results || data); // selon ton format API
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Fenêtre de résultats */}
      {(loading || results.length > 0 || error) && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {loading && <div style={{ padding: "8px" }}>Chargement...</div>}
          {error && <div style={{ padding: "8px", color: "red" }}>{error}</div>}
          {!loading &&
            !error &&
            results.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom:
                    i !== results.length - 1 ? "1px solid #eee" : "none",
                }}
                onClick={() => {
                  setQuery(item.name || item);
                  setResults([]);
                }}
              >
                {item.name || item}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
