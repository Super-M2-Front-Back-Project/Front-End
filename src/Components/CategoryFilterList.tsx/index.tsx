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
  filterLabel?: string;
  className?: string;
  renderItem?: (item: Item) => React.ReactNode;
};

export default function CategoryFilterList({
  data,
  filterLabel = "Filter by Category",
  className = "",
  renderItem,
}: CategoryFilterListProps) {
  // Données internes si aucune donnée passée
  const defaultData: Item[] = [
    { id: "1", name: "Maison", category: "Maison", price: 499 },
    { id: "2", name: "Décoration", category: "Décoration", price: 799 },
    { id: "3", name: "Mobilier", category: "Mobilier", price: 799 },



   
  ];

  const items = data || defaultData;

  const [category, setCategory] = useState("all");

  // Extraire toutes les catégories uniques
  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((d) => d.category)));
    return ["all", ...cats];
  }, [items]);

  // Filtrer les données
  const filteredData = useMemo(() => {
    if (category === "all") return items;
    return items.filter((d) => d.category === category);
  }, [items, category]);

  return (
    <div className={className}>
      {/* Filtre catégories */}
      <div className="mb-4 w-56">
        <label className="block mb-1 font-medium text-gray-700">{filterLabel}</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Liste filtrée */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) =>
          renderItem ? (
            renderItem(item)
          ) : (
            <div key={item.id} className="p-4 bg-white shadow rounded">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-gray-700 font-semibold">{item.price} €</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
