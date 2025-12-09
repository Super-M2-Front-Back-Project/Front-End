import { getApiUrl } from '@/lib/api-config';

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

// Données de mock pendant que l'API est désactivée
const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Meubles" },
  { id: "2", name: "Livres" },
  { id: "3", name: "Décoration" },
  { id: "4", name: "Électronique" },
  { id: "5", name: "Vêtements" },
  { id: "6", name: "Jouets" },
  { id: "7", name: "Sports" },
  { id: "8", name: "Jardin" },
];

const USE_MOCK_DATA = false; // API activée

export const CategoryService = {
  async getAll(): Promise<Category[]> {
    // Mode mock
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return MOCK_CATEGORIES;
    }

    // Mode API
    const res = await fetch(`${getApiUrl()}/categories`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", {
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        body: errorText,
      });
      throw new Error(
        `Failed to fetch categories (${res.status}): ${errorText || res.statusText}`
      );
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.categories || [];
  },

  async getById(id: string): Promise<Category | null> {
    // Mode mock
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return MOCK_CATEGORIES.find((c) => c.id === id) || null;
    }

    // Mode API
    const res = await fetch(
      `${getApiUrl()}/categories/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", {
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        body: errorText,
      });
      throw new Error(
        `Failed to fetch category (${res.status}): ${errorText || res.statusText}`
      );
    }

    const data = await res.json();
    return data.category || data || null;
  },
};
