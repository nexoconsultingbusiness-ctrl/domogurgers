export type CatalogCategory = "res" | "pollo";

export type CatalogProduct = {
  id: string;
  category: CatalogCategory;
  name: string;
  label: string;
  description: string;
  price: number;
  image: string;
  alt: string;
};

// These products preserve the site's existing examples, pending the real menu.
export const catalogIsProvisional = true;

export const catalogCategories = [
  { id: "all", label: "Todas" },
  { id: "res", label: "De res" },
  { id: "pollo", label: "De pollo" },
] as const;

export const catalogProducts: readonly CatalogProduct[] = [
  {
    id: "domo-doble",
    category: "res",
    name: "D'omo Doble",
    label: "La favorita",
    description:
      "Doble smash, cheddar, cebolla caramelizada y salsa de la casa.",
    price: 32900,
    image: "/images/menu-doble.webp",
    alt: "Imagen conceptual de una hamburguesa doble con cheddar y cebolla caramelizada",
  },
  {
    id: "bacon-royal",
    category: "res",
    name: "Bacon Royal",
    label: "Irresistible",
    description:
      "Carne a la parrilla, bacon crocante, cheddar, pepinillos y salsa D'omo.",
    price: 29900,
    image: "/images/menu-bacon.webp",
    alt: "Imagen conceptual de una hamburguesa con bacon, cheddar y pepinillos",
  },
  {
    id: "crispy-chicken",
    category: "pollo",
    name: "Crispy Chicken",
    label: "Nuevo",
    description:
      "Pollo extra crocante, lechuga fresca, pepinillos y salsa cremosa.",
    price: 27900,
    image: "/images/menu-pollo.webp",
    alt: "Imagen conceptual de una hamburguesa de pollo crocante con lechuga y pepinillos",
  },
];

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price).replace(/\s/g, "");
}
