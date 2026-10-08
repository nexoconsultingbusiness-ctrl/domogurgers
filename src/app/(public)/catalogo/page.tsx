import type { Metadata } from "next";
import { Catalog } from "@/features/catalog/catalog";
import { catalogSettings } from "@/config/catalog";

export const metadata: Metadata = {
  title: "Catálogo digital",
  description:
    "Elige tus hamburguesas DomoBurgers, arma tu carrito y prepara tu pedido por WhatsApp para Maní o Yopal.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo digital | DomoBurgers",
    description:
      "Tus burgers favoritas en un solo pedido. Explora el menú y arma tu carrito.",
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
