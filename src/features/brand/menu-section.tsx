import Image from "next/image";
import { ArrowUpRight, Star } from "@/components/ui/icons";

// The reference supplies visual examples, not a confirmed commercial menu.
const sampleMenu = [
  {
    name: "D'omo Doble",
    label: "La favorita",
    description:
      "Doble smash, cheddar, cebolla caramelizada y salsa de la casa.",
    price: 32900,
    image: "/images/menu-doble.webp",
    alt: "Imagen conceptual de una hamburguesa doble con cheddar y cebolla caramelizada",
  },
  {
    name: "Bacon Royal",
    label: "Irresistible",
    description:
      "Carne a la parrilla, bacon crocante, cheddar, pepinillos y salsa D'omo.",
    price: 29900,
    image: "/images/menu-bacon.webp",
    alt: "Imagen conceptual de una hamburguesa con bacon, cheddar y pepinillos",
  },
  {
    name: "Crispy Chicken",
    label: "Nuevo",
    description:
      "Pollo extra crocante, lechuga fresca, pepinillos y salsa cremosa.",
    price: 27900,
    image: "/images/menu-pollo.webp",
    alt: "Imagen conceptual de una hamburguesa de pollo crocante con lechuga y pepinillos",
  },
] as const;

const priceFormat = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function MenuSection() {
  return (
    <section id="carta" className="burger-menu" aria-labelledby="menu-title">
      <div className="reference-container">
        <div className="burger-menu-heading" data-reveal>
          <div>
            <p className="burger-menu-label">Elige tu próxima favorita</p>
            <h2 id="menu-title">Nuestras burgers</h2>
          </div>
          <p className="burger-menu-intro">
            Preparadas al momento, con carne jugosa y pan brioche dorado.
          </p>
        </div>
        <ul className="burger-menu-grid" role="list">
          {sampleMenu.map((item) => (
            <li key={item.name}>
              <article className="burger-card">
                <div className="burger-card-photo">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) calc(100vw - 64px), (max-width: 1023px) calc((100vw - 66px) / 3), (max-width: 1439px) calc((100vw - 98px) / 3), 448px"
                  />
                  <span className="burger-card-label">{item.label}</span>
                </div>
                <div className="burger-card-copy">
                  <div className="burger-card-title">
                    <h3>{item.name}</h3>
                    <data className="burger-card-price" value={item.price}>
                      {priceFormat.format(item.price).replace(/\s/g, "")}
                    </data>
                  </div>
                  <p className="burger-card-description">{item.description}</p>
                  <div className="burger-card-bottom">
                    <span>
                      <Star /> Favorita D’omo
                    </span>
                    <a
                      href="#sedes"
                      aria-label={`Ver sedes de DomoBurgers para ${item.name}`}
                    >
                      <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="burger-menu-note">
          Carta provisional · Nombres, ingredientes y precios de ejemplo en COP.
          Imágenes conceptuales.
        </p>
      </div>
    </section>
  );
}
