import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Spark } from "@/components/ui/icons";

export function FlavorScene() {
  return (
    <section
      id="detalles"
      className="flavor-section"
      aria-labelledby="flavor-title"
    >
      <div className="container">
        <div className="flavor-heading" data-reveal>
          <h2 id="flavor-title">
            Lo especial está
            <br />
            en <span>cada detalle.</span>
          </h2>
          <p>
            Mucho sabor.
            <br />
            Toda nuestra esencia.
          </p>
        </div>
        <div className="flavor-composition">
          <figure className="flavor-main" data-reveal>
            <div className="flavor-image-wrap" data-tilt>
              <Image
                src="/images/burger-floating.webp"
                alt="Composición conceptual de una hamburguesa con sus ingredientes suspendidos: pan, queso, carne y tocineta"
                fill
                sizes="(max-width: 767px) 100vw, 72vw"
                className="flavor-image"
              />
              <div className="flavor-photo-label" aria-hidden="true">
                <span>Una experiencia</span>
                <strong>en cada capa.</strong>
              </div>
            </div>
            <figcaption>
              Composición visual de referencia. No representa un producto de la
              carta.
            </figcaption>
          </figure>
          <div className="flavor-aside">
            <div
              className="flavor-seal"
              data-tilt
              aria-label="DomoBurgers, hecho con calidad"
            >
              <Spark />
              <Image
                src="/brand/logo-black.svg"
                width={200}
                height={188}
                alt="D’omo Burgers"
              />
              <span>HECHO CON CALIDAD</span>
            </div>
            <p data-reveal>
              El buen sabor se comparte.
              <br />
              Los buenos momentos, también.
            </p>
            <Link className="button-primary" href="/catalogo">
              Ver catálogo <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
