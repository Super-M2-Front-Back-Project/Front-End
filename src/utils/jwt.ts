/**
 * Utilitaires pour décoder les JWT côté client
 */

export interface JWTPayload {
  sub?: string; // User ID (standard JWT claim)
  userId?: string; // Deprecated, use sub
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

/**
 * Décoder un JWT sans vérification de signature
 * ATTENTION : Ne vérifie PAS la signature, uniquement pour lire les données côté client
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Décoder la partie payload (partie 2)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    return JSON.parse(decoded);
  } catch (error) {
    console.error('Erreur lors du décodage du JWT:', error);
    return null;
  }
}

/**
 * Extraire l'userId du JWT (utilise sub, le claim standard JWT)
 */
export function getUserIdFromToken(token: string): string | null {
  const payload = decodeJWT(token);
  // Priorité à sub (standard JWT), fallback sur userId pour compatibilité
  return payload?.sub ?? payload?.userId ?? null;
}

/**
 * Extraire l'email du JWT
 */
export function getEmailFromToken(token: string): string | null {
  const payload = decodeJWT(token);
  return payload?.email ?? null;
}

/**
 * Extraire le rôle du JWT
 */
export function getRoleFromToken(token: string): string | null {
  const payload = decodeJWT(token);
  return payload?.role ?? null;
}

/**
 * Vérifier si le token est expiré
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload?.exp) return true;

  return Date.now() >= payload.exp * 1000;
}
