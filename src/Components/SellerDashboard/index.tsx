"use client";

import React from "react";
import Link from "next/link";

export type DashboardItem = {
  label: string;
  href?: string;
};

export type SellerDashboardProps = {
  breadcrumbs?: DashboardItem[];
  children: React.ReactNode;
};

export default function SellerDashboard({ breadcrumbs = [], children }: SellerDashboardProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="font-semibold text-lg mb-6">Vendeur</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/seller" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/seller/products" className="hover:text-blue-600">Produits</Link>
          <Link href="/seller/orders" className="hover:text-blue-600">Commandes</Link>
          <Link href="/seller/settings" className="hover:text-blue-600">Paramètres</Link>
        </nav>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <span className="font-medium">Espace Vendeur</span>
          <button className="text-sm text-red-500">Déconnexion</button>
        </header>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="text-sm mb-4 text-gray-600 p-6 pt-4">
            <ol className="flex items-center gap-2">
              {breadcrumbs.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {item.href ? (
                    <Link href={item.href} className="hover:underline">{item.label}</Link>
                  ) : (
                    <span className="text-gray-400">{item.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <span>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Zone de contenu */}
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
