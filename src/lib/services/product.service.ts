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

export const ProductService = {
  async getById(id: string): Promise<Product> {
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
};
