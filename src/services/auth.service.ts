import { setCookie, getCookie, deleteCookie, hasCookie } from "@/utils/cookies";
import { getUserIdFromToken, getEmailFromToken, getRoleFromToken, decodeJWT } from "@/utils/jwt";

// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  street?: string;
  postal_code?: string;
  city?: string;
  birthdate?: string;
  address?: string;
  role_id: string;
  created_at: string;
  role?: {
    id: string;
    name: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  street?: string;
  postal_code?: string;
  city?: string;
  birthdate?: string;
  address?: string;
  role?: "CLIENT" | "VENDEUR" | "ADMIN";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  session?: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthService = {
  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    console.log("REGISTER");
    
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to register");
    }

    return res.json();
  },

  /**
   * Connexion d'un utilisateur
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to login");
    }

    const authData = await res.json();

    // Stocker le token dans un cookie
    if (authData.token) {
      setCookie("token", authData.token, 7); // 7 jours
    }

    return authData;
  },

  /**
   * Déconnexion d'un utilisateur
   */
  async logout(): Promise<void> {
    const token = getCookie("token");

    if (!token) {
      return;
    }

    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } finally {
      // Supprimer le token du cookie même si la requête échoue
      deleteCookie("token");
    }
  },

  /**
   * Récupérer les informations de l'utilisateur connecté
   */
  async me(): Promise<User> {
    const token = getCookie("token");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // Si le token est invalide, le supprimer
      if (res.status === 401) {
        deleteCookie("token");
      }
      throw new Error("Failed to fetch user");
    }

    const data = await res.json();
    return data.user;
  },

  /**
   * Demander un email de réinitialisation de mot de passe
   */
  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to send reset email");
    }

    return res.json();
  },

  /**
   * Réinitialiser le mot de passe avec un token
   */
  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to reset password");
    }

    return res.json();
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return hasCookie("token");
  },

  /**
   * Récupérer le token
   */
  getToken(): string | null {
    return getCookie("token");
  },

  /**
   * Récupérer l'userId depuis le JWT
   */
  getUserId(): string | null {
    const token = this.getToken();
    return token ? getUserIdFromToken(token) : null;
  },

  /**
   * Récupérer l'email depuis le JWT
   */
  getUserEmail(): string | null {
    const token = this.getToken();
    return token ? getEmailFromToken(token) : null;
  },

  /**
   * Récupérer le rôle depuis le JWT
   */
  getUserRole(): string | null {
    const token = this.getToken();
    return token ? getRoleFromToken(token) : null;
  },

  /**
   * Récupérer toutes les infos du JWT décodé
   */
  getJWTPayload(): ReturnType<typeof decodeJWT> {
    const token = this.getToken();
    return token ? decodeJWT(token) : null;
  },
};
