import Link from "next/link";
import { ArrowUpRight, Star } from "@/components/ui/icons";
import {
  catalogIsProvisional,
  featuredProducts,
  formatPrice,
} from "@/features/catalog/catalog-data";
import { ProductImage } from "@/features/catalog/product-image";

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
            Conoce los ingredientes, elige tu burger y agrégale un combo de
            papas y bebida.
          </p>
        </div>
        <ul className="burger-menu-grid" role="list">
          {featuredProducts.map((item) => (
            <li key={item.id}>
              <article className="burger-card">
                <div className="burger-card-photo">
                  {/* Landscape sources need extra pixels to cover a 4:3 frame. */}
                  <ProductImage
                    product={item}
                    sizes="(max-width: 639px) calc(133.34vw - 53.34px), (max-width: 767px) calc(133.34vw - 85.34px), (max-width: 1023px) calc((133.34vw - 88px) / 3), (max-width: 1439px) calc((133.34vw - 130.67px) / 3), 598px"
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
                      <Star /> D’omo Burgers
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
