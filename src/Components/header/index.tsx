"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../Search";
import Image from "next/image";
import { CategoryService, type Category } from "@/services/category.service";
import "./style.css";

const Header: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const categoriesRef = useRef<HTMLLIElement>(null);

  // Charger les catégories
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="left-container">
        <Link href={"/"}>
          <Image
            height={50}
            width={137}
            className="header-logo"
            src="/logo.svg"
            alt="Logo de BLOOP"
          />
        </Link>
        <SearchBar onSearch={(query: string) => {}} />
      </div>
      <nav className="right-container">
        <ul>
          <li>
            <Link href="/Catalogue">Catalogue</Link>
          </li>
          <li ref={categoriesRef} className="dropdown-container">
            <button
              className="dropdown-trigger"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              Catégories
              <span
                className={`dropdown-arrow ${isCategoriesOpen ? "open" : ""}`}
              >
                ▼
              </span>
            </button>
            {isCategoriesOpen && (
              <div className="dropdown-menu">
                {categories.length === 0 ? (
                  <div className="dropdown-empty">Chargement...</div>
                ) : (
                  categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.id}`}
                      className="category-item"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      {category.icon && (
                        <span className="category-icon">{category.icon}</span>
                      )}
                      <span className="category-name">{category.name}</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </li>
          <li>
            <Link href="/coup-de-coeur">
              <Image
                width={24}
                height={24}
                src="/assets/icons/heart-filled.svg"
                alt="Coup de cœur"
                className="icon-btn"
              />
            </Link>
          </li>

          <li>
            <Link href="/cart">
              <Image
                width={40}
                height={40}
                src="/assets/icons/basket.svg"
                alt="Panier"
                className="icon-btn"
              />
            </Link>
          </li>

          <li>
            <Link href="/user">
              <Image
                width={24}
                height={24}
                src="/assets/icons/user.svg"
                alt="User Icon"
                className="icon-btn"
              />
            </Link>
          </li>
          <p></p>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
