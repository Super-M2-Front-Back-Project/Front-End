"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../Search";
import Image from "next/image";
import { CategoryService, type Category } from "@/services/category.service";
import { AuthService, type User } from "@/services/auth.service";
import "./style.css";

import PopUp from "../Pop-Up";
import AuthProfileForm from "../auth";
import UserProfile from "../UserProfile";
import CartList from "../Cart";
import WishlistPopup from "../Wishlist";
import { OPEN_LOGIN_POPUP_EVENT, requestLoginPopup } from "@/utils/authEvents";

interface PopUpProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const Header: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const categoriesRef = useRef<HTMLLIElement>(null);

  const [popUp, setPopUp] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [popUpProps, setPopUpProps] = useState<PopUpProps>({
    title: "",
    content: <div />,
    onClose: () => setPopUp(false),
  });

  const setTitle = (title: string) => {
    setPopUpProps((prevProps) => ({
      ...prevProps,
      title: title,
    }));
  };

  // Charger l'utilisateur si connecté
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const currentUser = await AuthService.me();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur:", error);
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  // Charger les catégories
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      setErrorCategories(null);
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
        setErrorCategories(
          error instanceof Error ? error.message : "Erreur inconnue"
        );
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

  // Écouter les demandes d'ouverture de la popup de connexion
  useEffect(() => {
    const handleOpenLoginPopup = () => {
      if (!user) {
        setPopUpProps({
          title: "",
          content: (
            <AuthProfileForm
              setTitle={setTitle}
              onSubmit={() => {
                AuthService.me().then(setUser).catch(console.error);
                setPopUp(false);
              }}
            />
          ),
          onClose: () => setPopUp(false),
        });
        setPopUp(true);
      }
    };

    window.addEventListener(OPEN_LOGIN_POPUP_EVENT, handleOpenLoginPopup);
    return () =>
      window.removeEventListener(OPEN_LOGIN_POPUP_EVENT, handleOpenLoginPopup);
  }, [user]);

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
            <Link href="/products">Catalogue</Link>
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
                {isLoadingCategories ? (
                  <div className="dropdown-empty">Chargement...</div>
                ) : errorCategories ? (
                  <div className="dropdown-empty">
                    Erreur: {errorCategories}
                  </div>
                ) : categories.length === 0 ? (
                  <div className="dropdown-empty">Aucune catégorie</div>
                ) : (
                  categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.id}`}
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
            <Image
              width={24}
              height={24}
              src="/assets/icons/heart-filled.svg"
              alt="Wishlist"
              className="icon-btn"
              onClick={() => {
                if (!AuthService.isAuthenticated()) {
                  requestLoginPopup();
                  return;
                }
                setPopUpProps({
                  title: "Ma liste de souhaits",
                  content: <WishlistPopup />,
                  onClose: () => setPopUp(false),
                });
                setPopUp(true);
              }}
            />
          </li>

          <li>
            <Image
              width={40}
              height={40}
              src="/assets/icons/basket.svg"
              alt="Panier"
              className="icon-btn"
              onClick={() => {
                setPopUpProps({
                  title: "Mon panier",
                  content: <CartList />,
                  onClose: () => setPopUp(false),
                });
                setPopUp(true);
              }}
            />
          </li>

          <li>
            <Image
              width={24}
              height={24}
              src="/assets/icons/user.svg"
              alt="User Icon"
              className="icon-btn"
              onClick={() => {
                if (user) {
                  // Si l'utilisateur est connecté, afficher son profil
                  setPopUpProps({
                    title: "Mon compte",
                    content: (
                      <UserProfile
                        user={user}
                        onLogout={async () => {
                          await AuthService.logout();
                          setUser(null);
                          setPopUp(false);
                          window.location.reload();
                        }}
                      />
                    ),
                    onClose: () => setPopUp(false),
                  });
                } else {
                  // Sinon, afficher le formulaire de connexion
                  setPopUpProps({
                    title: "",
                    content: (
                      <AuthProfileForm
                        setTitle={setTitle}
                        onSubmit={() => {
                          // Recharger l'utilisateur après connexion
                          AuthService.me().then(setUser).catch(console.error);
                          setPopUp(false);
                        }}
                      />
                    ),
                    onClose: () => setPopUp(false),
                  });
                }
                setPopUp(true);
              }}
            />
          </li>
          {popUp && (
            <PopUp
              title={popUpProps.title}
              content={popUpProps.content}
              onClose={popUpProps.onClose}
            />
          )}
          <p></p>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
