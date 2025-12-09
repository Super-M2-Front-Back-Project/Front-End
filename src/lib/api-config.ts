// Configuration de l'URL de l'API
// En production, utilise le proxy Next.js (/api) pour éviter les problèmes de Mixed Content
// En développement, utilise l'URL de l'API directement

export function getApiUrl(): string {
  // Si on est côté client et en production, utilise le proxy Next.js
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    return '/api';
  }

  // Sinon, utilise l'URL configurée ou le proxy local
  return process.env.NEXT_PUBLIC_API_URL || '/api';
}
