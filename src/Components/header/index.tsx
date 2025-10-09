"use client"
import React from 'react';
import Link from 'next/link';
import SearchBar from '../search';
import './style.css';


const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="header">
        <div className="header-container">
            <Link href={"/"}><h1 className="header-title">{title}</h1></Link>
            <SearchBar onSearch={(query: string) => { /* handle search here */ }} />
        </div>
        <nav className="header-nav">
            <ul>
                <li><Link href="/Catalogue">Catalogue</Link></li>
                <li><Link href="/Catégories⌄">Catégories⌄</Link></li>
                <li>
                  <Link href="/coup-de-coeur">
                    <img
                      src="/assets/Vector.png"
                      alt="Coup de cœur"
                      className="w-12 h-12 cursor-pointer hover:opacity-80 transition"
                    />
                  </Link>
                </li>

                <li>
                  <Link href="/shopping-basket-2 1">
                    <img
                      src="/assets/shopping-basket-2 1.png"
                      alt="shopping-basket-2 1"
                      className="w-12 h-12 cursor-pointer hover:opacity-80 transition"
                    />
                  </Link>
                </li>

                <li>
                  <Link href="/user 1">
                    <img
                      src="/assets/user 1.png"
                      alt="user 1"
                      className="w-12 h-12 cursor-pointer hover:opacity-80 transition"
                    />
                  </Link>
                </li>
            </ul>

            
        </nav>
    </header>
  );
};

export default Header;
