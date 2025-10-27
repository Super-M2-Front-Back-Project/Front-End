"use client";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="footer">  
            <div className="container">
                <h2>Bloop</h2>
                <Link href="/" className="link">Acceuil</Link>
                <Link href="/catalogue" className="link">Catalogue</Link>
            </div>
        </footer>
    );
}

export default Footer;