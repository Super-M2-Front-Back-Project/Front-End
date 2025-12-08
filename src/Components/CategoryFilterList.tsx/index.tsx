"use client";

import React, { useState, useEffect } from "react";
import { CategoryService, type Category } from "@/services/category.service";
import "./style.css";

type CategoryFilterListProps = {
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
  className?: string;
};

export default function CategoryFilterList({
  selectedCategories: externalSelected,
  onCategoryChange,
  className = "",
}: CategoryFilterListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(externalSelected || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (externalSelected) {
      setSelectedCategories(externalSelected);
    }
  }, [externalSelected]);

  const handleCategoryClick = (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((c) => c !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelected);
    onCategoryChange?.(newSelected);
  };

  if (isLoading) {
    return <div className="checkbox-list-container">Chargement...</div>;
  }

  return (
    <div className={"checkbox-list-container"}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`checkbox-list-item ${selectedCategories.includes(cat.id) ? "selected" : ""}`}
          onClick={() => handleCategoryClick(cat.id)}
        >
          {cat.icon && <span className="category-icon">{cat.icon}</span>}
          {cat.name}
        </button>
      ))}
    </div>
  );
}
