// Types pour les commandes
export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  order_id: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    description?: string;
  };
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  stripe_payment_id?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface CreateOrderData {
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Récupérer le token d'authentification
 */
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const OrderService = {
  /**
   * Créer une nouvelle commande à partir du panier
   */
  async createOrder(data?: CreateOrderData): Promise<Order> {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create order");
    }

    const responseData = await res.json();
    return responseData.order;
  },

  /**
   * Récupérer toutes les commandes de l'utilisateur
   */
  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    return data.orders || [];
  },

  /**
   * Récupérer une commande spécifique par son ID
   */
  async getOrderById(orderId: string): Promise<Order> {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    const data = await res.json();
    return data.order;
  },

  /**
   * Annuler une commande
   */
  async cancelOrder(orderId: string): Promise<void> {
    const res = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to cancel order");
    }
  },
};
