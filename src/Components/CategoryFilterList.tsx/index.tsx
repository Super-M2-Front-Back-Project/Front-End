"use client";

import React, { useState, useMemo } from "react";
import "./style.css";

export type Item = {
  id: string;
  name: string;
  category: string;
  price?: number;
};

type CategoryFilterListProps = {
  data?: Item[];
  className?: string;
  renderItem?: (item: Item) => React.ReactNode;
};

export default function CategoryFilterList({
  data,
  className = "",
  renderItem,
}: CategoryFilterListProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ["Maison", "Décoration", "Mobilier", "Électroménager"];

  return (
    <div className={"checkbox-list-container"}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`checkbox-list-item ${selectedCategories.includes(cat) ? "selected" : ""}`}
          value={cat}
          onClick={() => {
            if (selectedCategories.includes(cat)) {
              setSelectedCategories(selectedCategories.filter((c) => c !== cat));
            } else {
              setSelectedCategories([...selectedCategories, cat]);
            }
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
