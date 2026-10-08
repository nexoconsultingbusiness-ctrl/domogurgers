import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "@/components/ui/icons";
import {
  catalogIsProvisional,
  catalogProducts,
  formatPrice,
} from "@/features/catalog/catalog-data";

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
          {catalogProducts.slice(0, 3).map((item) => (
            <li key={item.id}>
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
                      {formatPrice(item.price)}
                    </data>
                  </div>
                  <p className="burger-card-description">{item.description}</p>
                  <div className="burger-card-bottom">
                    <span>
                      <Star /> Favorita D’omo
                    </span>
                    <Link
                      href={`/catalogo?producto=${item.id}`}
                      aria-label={`Elegir ${item.name} en el catálogo`}
                    >
                      Elegir <ArrowUpRight />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="burger-menu-note">
          <Link className="reference-button" href="/catalogo">
            Ver catálogo y armar pedido <ArrowUpRight />
          </Link>
        </p>
        {catalogIsProvisional && (
          <p className="burger-menu-note">
            Carta provisional · Nombres, ingredientes y precios de ejemplo en
            COP. Imágenes conceptuales.
          </p>
        )}
      </div>
    </section>
  );
}
