"use client";
import React from "react";
import Link from "next/link";
import SearchBar from "../Search";
import "./style.css";

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="header">
      <div className="left-container">
        <Link href={"/"}>
          <img className="header-logo" src="/logo.svg" alt="Logo de BLOOP" />
        </Link>
        <SearchBar
          onSearch={(query: string) => {
            /* handle search here */
          }}
        />
      </div>
      <nav className="right-container">
        <ul>
          <li>
            <Link href="/Catalogue">Catalogue</Link>
          </li>
          <li>
            <Link href="/Catégories">Catégories</Link>
          </li>
          <li>
            <Link href="/coup-de-coeur">
              <img
                src="/assets/icons/heart-filled.svg"
                alt="Coup de cœur"
                className="icon-btn"
              />
            </Link>
          </li>

          <li>
            <Link href="/cart">
              <img
                src="/assets/icons/basket.svg"
                alt="Panier"
                className="icon-btn"
              />
            </Link>
          </li>

          <li>
            <Link href="/user">
              <img
                src="/assets/icons/user.svg"
                alt="User Icon"
                className="icon-btn"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
