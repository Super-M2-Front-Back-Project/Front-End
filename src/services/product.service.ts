// en attendant que l'API fournisse des données au format souhaité
export interface ProductFromAPI {
  id: string;
  nom: string;
  description: string;
  prix: number;
  categorie: string | null;
  image_url: string;
}

export interface Product {
  id: string;
  name: string;
  category: string[];
  imageUrl: string;
  price: number;
}

// Données de mock pendant que l'API est désactivée
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Canapé Scandinave 3 Places",
    category: ["Meuble", "Salon"],
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    price: 599.99,
  },
  {
    id: "2",
    name: "Le Petit Prince - Antoine de Saint-Exupéry",
    category: ["Livre", "Fiction"],
    imageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    price: 12.5,
  },
  {
    id: "3",
    name: "Bureau en Bois Massif",
    category: ["Meuble", "Bureau"],
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
    price: 349.0,
  },
];

const USE_MOCK_DATA = true; // Mettre à false pour réactiver l'API

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

    // Mode API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data: { product: ProductFromAPI } = await res.json();
    const p = data.product;

    const product: Product = {
      id: p.id,
      name: p.nom,
      category: p.categorie ? [p.categorie] : [],
      imageUrl: p.image_url,
      price: p.prix,
    };

    return product;
  },

  async getAll(): Promise<Product[]> {
    // Mode mock
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simuler un délai réseau
      return MOCK_PRODUCTS;
    }

    // Mode API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: { products: ProductFromAPI[] } = await res.json();

    const products: Product[] = data.products.map((p) => ({
      id: p.id,
      name: p.nom,
      category: p.categorie ? [p.categorie] : [],
      imageUrl: p.image_url,
      price: p.prix,
    }));

    return products;
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
          p.category.some((cat) => cat.toLowerCase().includes(lowerQuery))
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
      throw new Error("Failed to search products");
    }

    const data: { products: ProductFromAPI[] } = await res.json();

    const products: Product[] = data.products.map((p) => ({
      id: p.id,
      name: p.nom,
      category: p.categorie ? [p.categorie] : [],
      imageUrl: p.image_url,
      price: p.prix,
    }));

    return products;
  },
};
