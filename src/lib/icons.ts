export const ICON_MAP: Record<string, { src: string; alt: string }> = {
  "add-cart": {
    src: "/assets/add-shopping-cart 1.svg",
    alt: "Ajouter au panier",
  },
  search: { src: "/assets/search.svg", alt: "Rechercher" },
  like: { src: "/assets/heart.svg", alt: "J'aime" },
};

export function getIconSrc(name?: string): string | undefined {
  if (!name) return undefined;
  return ICON_MAP[name].src;
}

export function getIconAlt(name?: string): string | undefined {
  if (!name) return undefined;
  return ICON_MAP[name].alt;
}

export default ICON_MAP;
