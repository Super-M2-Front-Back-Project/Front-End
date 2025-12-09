import { setCookie, getCookie, deleteCookie, hasCookie } from "@/utils/cookies";
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

export const CartService = {
  /**
   * Récupérer le panier de l'utilisateur connecté
   */
  async getCart(user_id: string): Promise<Cart> {
    const res = await fetch(`${API_URL}/cart/get/${user_id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    console.log("RES", res);
    

    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }

    const data = await res.json();
    
    return data || { id: "", user_id: "", items: [] };
  },

  /**
   * Ajouter un article au panier
   */
  async addToCart(data: AddToCartData): Promise<CartItem> {
    const res = await fetch(`${API_URL}/cart/post`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
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
