import { getCookie } from "@/utils/cookies";
import { getUserIdFromToken } from "@/utils/jwt";
import { getApiUrl } from '@/lib/api-config';

// Types pour la wishlist
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  added_at: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    description?: string;
  };
}

export interface AddToWishlistData {
  product_id: string;
}

const getAPI_URL = () => getApiUrl();

/**
 * Récupérer le token d'authentification
 */
const getAuthHeaders = (): HeadersInit => {
  const token = getCookie("token");
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

export const WishlistService = {
  /**
   * Récupérer la wishlist de l'utilisateur connecté
   * Le user_id (sub) est extrait du JWT et envoyé dans l'URL
   */
  async getWishlist(): Promise<WishlistItem[]> {
    const userId = getUserIdFromJWT();
    const res = await fetch(`${getAPI_URL()}/wishlist/get/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    const data = await res.json();
    console.log("Wishlist data:", data);

    // Le backend peut renvoyer soit un tableau directement, soit { wishlist: [...] }
    if (Array.isArray(data)) {
      return data;
    }
    return data.wishlist || [];
  },

  /**
   * Ajouter un produit à la wishlist
   * Le user_id (sub) est extrait du JWT et envoyé dans le body
   */
  async addToWishlist(data: AddToWishlistData): Promise<WishlistItem> {
    const userId = getUserIdFromJWT();
    const res = await fetch(`${getAPI_URL()}/wishlist/post`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        user_id: userId,
        item_id: data.product_id,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to add to wishlist");
    }

    const responseData = await res.json();
    return responseData.item;
  },

  /**
   * Supprimer un produit de la wishlist
   * Le user_id est extrait du JWT par le backend (claim 'sub')
   */
  async removeFromWishlist(productId: string): Promise<void> {
    const res = await fetch(`${getAPI_URL()}/wishlist/delete`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to remove from wishlist");
    }
  },

  /**
   * Vérifier si un produit est dans la wishlist
   */
  async isInWishlist(productId: string): Promise<boolean> {
    try {
      const wishlist = await this.getWishlist();
      return wishlist.some((item) => item.product_id === productId);
    } catch {
      return false;
    }
  },
};
