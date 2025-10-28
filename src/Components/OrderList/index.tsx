// components/OrderList.jsx
"use client"; // nécessaire pour les interactions côté client

import React from "react";

type Order = {
  id: number;
  product: string;
  quantity: number;
};

type OrderListProps = {
  orders?: Order[];
  onDelete?: (id: number) => void;
  onSelect?: (order: Order) => void;
};

const OrderList: React.FC<OrderListProps> = ({ orders = [], onDelete, onSelect }) => {
  if (!orders.length) return <p>Aucune commande disponible.</p>;

  return (
    <div>
      <h2>Liste des commandes</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div onClick={() => onSelect && onSelect(order)}>
              <strong>Commande #{order.id}</strong> - {order.product} - Quantité : {order.quantity}
            </div>
            {onDelete && (
              <button onClick={() => onDelete(order.id)}>
                Supprimer
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
