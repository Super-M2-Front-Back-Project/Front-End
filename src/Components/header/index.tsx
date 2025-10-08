"use client"
import React from 'react';
import Link from 'next/link';
import SearchBar from '../search';


const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="header">
        <h1 className="header-title">{title}</h1>
        <SearchBar onSearch={(query: string) => { /* handle search here */ }} />
        <nav className="header-nav">
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;
