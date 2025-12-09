// Structure finale de l'API
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string | null;
  image_url: string;
  quantity: number;
  is_active: boolean;
  seller_id?: string;
  category?: {
    id: string;
    name: string;
    description?: string;
  };
  seller?: {
    id: string;
    name: string;
    description?: string;
  };
}

// Données de mock pendant que l'API est désactivée
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Canapé Scandinave 3 Places",
    description: "Canapé confortable de style scandinave",
    category_id: "1",
    image_url:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    price: 599.99,
    quantity: 10,
    is_active: true,
  },
  {
    id: "2",
    name: "Le Petit Prince - Antoine de Saint-Exupéry",
    description: "Livre classique de la littérature française",
    category_id: "2",
    image_url:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    price: 12.5,
    quantity: 50,
    is_active: true,
  },
  {
    id: "3",
    name: "Bureau en Bois Massif",
    description: "Bureau robuste en bois massif",
    category_id: "1",
    image_url:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
    price: 349.0,
    quantity: 5,
    is_active: true,
  },
];

const USE_MOCK_DATA = false; // API activée

export const ProductService = {
  async getById(id: string): Promise<Product> {
    // Mode mock
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simuler un délai réseau
      const product = MOCK_PRODUCTS.find((p) => p.id === id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    }

    console.log(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

    // Mode API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
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
        `Failed to fetch product (${res.status}): ${errorText || res.statusText}`
      );
    }

    const data = await res.json();
    return data.product || data;
  },

  async getAll(): Promise<Product[]> {
    // Mode mock
    if (USE_MOCK_DATA) {
      console.log("Fetching products from mock data...");
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simuler un délai réseau
      return MOCK_PRODUCTS;
    }

    console.log("Fetching products from API...");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return [];
    }

    // Mode API
    const res = await fetch(`${apiUrl}/products`, {
      next: { revalidate: 60 },
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
        `Failed to fetch products (${res.status}): ${errorText || res.statusText}`
      );
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.products || [];
  },

  async search(query: string): Promise<Product[]> {
    // Mode mock
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simuler un délai réseau
      const lowerQuery = query.toLowerCase().trim();

      if (!lowerQuery) {
        return [];
      }

      return MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          (p.category_id && p.category_id.toLowerCase().includes(lowerQuery))
      );
    }

    // Mode API
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/products/search?q=${encodeURIComponent(query)}`,
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
        `Failed to search products (${res.status}): ${errorText || res.statusText}`
      );
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  },
};
