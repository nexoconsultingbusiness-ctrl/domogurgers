import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/config/site";
import "./globals.css";

const montserrat = localFont({
  src: "../assets/fonts/montserrat-latin-variable.woff2",
  variable: "--font-montserrat",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: site.url,
  title: { default: site.title, template: "%s | DomoBurgers" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/images/burger-floating.webp",
        width: 2200,
        height: 1238,
        alt: "DomoBurgers · El buen sabor se comparte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/burger-floating.webp"],
  },
  icons: { icon: [{ url: "/brand/mark.svg", type: "image/svg+xml" }] },
  robots: { index: site.indexable, follow: site.indexable },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url.origin,
    logo: new URL("/brand/logo-black.svg", site.url).href,
    foundingDate: "2020-12-20",
    foundingLocation: { "@type": "Place", name: "Maní, Casanare, Colombia" },
    description: site.description,
  };

  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        <template
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: El sabor de DomoBurgers se presenta mediante la fotografía y composición de la referencia Lovable elegida por el usuario. OWN-WORLD: negro cálido, oro, Arial 900 como se renderiza la referencia, controles rectangulares y tres tarjetas fotográficas con bordes finos; logos originales. STORY: descubrir el menú provisional y encontrar las sedes confirmadas en Maní y Yopal. FIRST VIEWPORT: fotografía cerrada a pantalla completa, titular blanco y oro de 96px a izquierda, navegación compacta arriba y dos acciones abajo. FORM: reproducción de la referencia fijada por el usuario el 5 de octubre de 2026; scroll natural, hero estático y zoom fotográfico sutil. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->",
          }}
        />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        {site.indexable && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
          />
        )}
      </body>
    </html>
  );
}
