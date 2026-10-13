import type { Metadata } from "next";
import { Catalog } from "@/features/catalog/catalog";
import { catalogSettings } from "@/config/catalog";

export const metadata: Metadata = {
  title: "Catálogo digital",
  description:
    "Explora hamburguesas, perros, picadas, entradas, menú infantil y bebidas DomoBurgers. Agrega un combo y prepara tu pedido por WhatsApp para Maní o Yopal.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo digital | DomoBurgers",
    description:
      "Todo el menú DomoBurgers con ingredientes y precios. Elige tus productos, agrega un combo y arma tu pedido.",
    url: "/catalogo",
  },
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ producto?: string | string[] }>;
}) {
  const { producto } = await searchParams;
  return (
    <Catalog
      whatsAppPhones={catalogSettings.whatsAppPhones}
      initialProductId={typeof producto === "string" ? producto : undefined}
    />
  );
}
