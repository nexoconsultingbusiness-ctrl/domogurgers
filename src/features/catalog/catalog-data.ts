import menuData from "./menu-data.json";

export type CatalogCategory = (typeof menuData.categories)[number]["id"];

export type CatalogProduct = {
  id: string;
  category: CatalogCategory;
  name: string;
  label: string;
  description: string;
  ingredients: readonly string[];
  notes: string;
  price: number;
  image: string | null;
  imagePreview?: string;
  imagePosition?: string;
  alt: string;
};

// The printed menu supplies recipes and prices; photographs are matched by name.
// Null images reserve space for products whose photographs are still pending.
export const catalogIsProvisional = false;
export const catalogSections = menuData.categories;

export const catalogCategories = [
  { id: "all", label: "Todo el menú" },
  ...catalogSections,
];

export const catalogProducts: readonly CatalogProduct[] = menuData.products.map(
  (product) => ({
    ...product,
    label:
      catalogSections.find((category) => category.id === product.category)
        ?.label ?? "",
    description: product.ingredients.length
      ? `${product.ingredients.join(", ")}.`
      : "",
    notes: "notes" in product ? (product.notes ?? "") : "",
    alt: product.name,
  }),
);

export const featuredProducts = ["tradicional", "bacon-cheese", "pollo-crispy"]
  .map((id) => catalogProducts.find((product) => product.id === id))
  .filter((product): product is CatalogProduct => Boolean(product));

export const catalogCombo = menuData.combo;
export type ComboBeverage =
  "coca-cola" | "ginger" | "soda" | "cerveza-nacional";

export function isComboBeverage(value: unknown): value is ComboBeverage {
  return catalogCombo.beverages.some((beverage) => beverage.id === value);
}

export function getComboLabel(beverage: ComboBeverage): string {
  return `Combo: papas + ${catalogCombo.beverages.find((option) => option.id === beverage)!.label}`;
}

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price).replace(/\s/g, "");
}
