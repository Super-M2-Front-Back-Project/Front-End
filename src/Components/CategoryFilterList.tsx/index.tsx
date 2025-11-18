"use client";

import React, { useState, useMemo } from "react";

export type Item = {
  id: string;
  name: string;
  category: string;
  price?: number;
};

type CategoryFilterListProps = {
  data?: Item[]; // optionnel pour permettre données internes
  className?: string;
  renderItem?: (item: Item) => React.ReactNode;
};

export default function CategoryFilterList({
  data,
  className = "",
  renderItem,
}: CategoryFilterListProps) {
  // Données internes si aucune donnée passée
  const defaultData: Item[] = [
    { id: "1", name: "Maison", category: "Maison", price: 499 },
    { id: "2", name: "Décoration", category: "Décoration", price: 799 },
    { id: "3", name: "Mobilier", category: "Mobilier", price: 799 },
    { id: "4", name: "Électroménager", category: "Électroménager", price: 599 },
  ];

  const items = data || defaultData;

  // Extraire toutes les catégories uniques
  const categories = useMemo(() => {
    return Array.from(new Set(items.map((d) => d.category)));
  }, [items]);

  // Par défaut, active la première catégorie
  const [category, setCategory] = useState(categories[0] || "");

  // Filtrer les données
  const filteredData = useMemo(() => {
    return items.filter((d) => d.category === category);
  }, [items, category]);

  return (
    <div className={className}>
      {/* Boutons catégories */}
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Liste filtrée */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) =>
          renderItem ? (
            renderItem(item)
          ) : (
            <div key={item.id} className="p-4 bg-white shadow rounded">
              {/* Affichage simplifié, pas de titre */}
            </div>
          )
        )}
      </div>
    </div>
  );
}
