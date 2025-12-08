"use client";

import React from "react";

export type OrderCardProps = {
  orderId: string;
  customerName: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  date: string;
  onClick?: (orderId: string) => void;
  className?: string;
};

export default function OrderCard({
  orderId,
  customerName,
  status,
  total,
  date,
  onClick,
  className = "",
}: OrderCardProps) {
  // Définir couleur du statut
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  }[status];

  return (
    <div
      className={`cursor-pointer border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition ${className}`}
      onClick={() => onClick?.(orderId)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Commande #{orderId}</span>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor}`}>
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-1">Client : {customerName}</div>
      <div className="text-sm text-gray-600 mb-1">Total : {total.toLocaleString()} €</div>
      <div className="text-sm text-gray-400">Date : {date}</div>
    </div>
  );
}
