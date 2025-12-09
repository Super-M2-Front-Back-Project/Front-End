import { setCookie, getCookie, deleteCookie, hasCookie } from "@/utils/cookies";
import { getUserIdFromToken } from "@/utils/jwt";

// Types pour le panier
export interface CartItem {
  id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export interface Cart {
  // id: string;
  // user_id: string;
  items: CartItem[];
}

export interface AddToCartData {
  product_id: string;
  quantity: number;
}

export interface UpdateCartItemData {
  product_id: string;
  quantity: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Récupérer le token d'authentification
 */
const getAuthHeaders = (): HeadersInit => {
  const token = getCookie("token");
  console.log("Token", token);

  if (!token) {
    throw new Error("Authentication required");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Extraire le sub (user_id) du JWT
 */
const getUserIdFromJWT = (): string => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("Authentication required");
  }
  const userId = getUserIdFromToken(token);
  if (!userId) {
    throw new Error("Invalid token: missing user ID");
  }
  return userId;
};

export const CartService = {
  /**
   * Récupérer le panier de l'utilisateur connecté
   * Le user_id (sub) est extrait du JWT et envoyé dans l'URL
   */
  async getCart(): Promise<Cart> {
    const userId = getUserIdFromJWT();
    const res = await fetch(`${API_URL}/cart/get/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    console.log("RES", res);

    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }

    const data = await res.json();
    console.log("Cart data:", data);

    // Le backend peut renvoyer soit un objet directement, soit { items: [...] }
    if (data.items) {
      return data;
    }
    return { items: data || [] };
  },

  /**
   * Ajouter un article au panier
   * Le user_id (sub) est extrait du JWT et envoyé dans le body
   */
  async addToCart(data: AddToCartData): Promise<CartItem> {
    const userId = getUserIdFromJWT();
    const res = await fetch(`${API_URL}/cart/post`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        user_id: userId,
        item_id: data.product_id,
        quantity: data.quantity,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to add to cart");
    }

    const responseData = await res.json();
    return responseData.item;
  },

  /**
   * Mettre à jour la quantité d'un article dans le panier
   */
  async updateCartItem(data: UpdateCartItemData): Promise<CartItem> {
    const res = await fetch(`${API_URL}/cart/update`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update cart item");
    }

    const responseData = await res.json();
    return responseData.item;
  },

  /**
   * Supprimer un article du panier
   */
  async removeCartItem(productId: string): Promise<void> {
    const res = await fetch(`${API_URL}/cart/delete/item`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to remove cart item");
    }
  },

  /**
   * Vider complètement le panier
   */
  async clearCart(): Promise<void> {
    const res = await fetch(`${API_URL}/cart/delete/all`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to clear cart");
    }
  },
};
