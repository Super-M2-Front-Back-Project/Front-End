"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./style.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">  
            <div className="container">
                <Image
                    height={50}
                    width={136}
                    className="header-logo"
                    src="/logo_alt.svg"
                    alt="Logo de BLOOP"
                />
                <Link href="/" className="link">Acceuil</Link>
                <Link href="/catalogue" className="link">Catalogue</Link>
            </div>
        </footer>
    );
}

export default Footer;