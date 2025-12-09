/**
 * Utilitaires pour gérer les cookies côté client
 */

/**
 * Définir un cookie
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  const maxAge = days * 24 * 60 * 60; // Convertir les jours en secondes
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Récupérer un cookie par son nom
 */
export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }

  return null;
}

/**
 * Supprimer un cookie
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0`;
}

/**
 * Vérifier si un cookie existe
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
