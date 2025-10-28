export const ICON_MAP: Record<string, { src: string; alt: string }> = {
  addCart: {
    src: "/assets/icons/basket-add.svg",
    alt: "Ajouter au panier",
  },
  search: { src: "/assets/icons/search.svg", alt: "Rechercher" },
  like: { src: "/assets/icons/heart.svg", alt: "J'aime" },
  user: { src: "/assets/icons/user.svg", alt: "Utilisateur" },
  eye: { src: "/assets/icons/eye.svg", alt: "Voir" },
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
