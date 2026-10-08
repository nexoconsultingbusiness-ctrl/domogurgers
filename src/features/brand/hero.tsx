import Image from "next/image";
import { ArrowDown, Pin } from "@/components/ui/icons";

export function Hero() {
  return (
    <section
      id="inicio"
      className="reference-hero"
      aria-labelledby="hero-title"
    >
      <div className="reference-hero-scene" aria-hidden="true">
        <Image
          src="/images/burger-reference-hero.webp"
          alt=""
          fill
          preload
          sizes="(max-aspect-ratio: 16/9) 164svh, 100vw"
          className="reference-hero-photo"
        />
        <div className="reference-hero-shade" />
      </div>
      <div className="reference-container reference-hero-content">
        <div className="reference-hero-copy">
          <p className="reference-hero-label">
            <span aria-hidden="true" /> Hechas para antojar
          </p>
          <h1 id="hero-title">
            Sabor que
            <br />
            <span>No se olvida.</span>
          </h1>
          <p className="reference-hero-description">
            Ingredientes escogidos, recetas propias y mucho fuego. Esto no es
            solo una hamburguesa.
          </p>
          <div className="reference-hero-actions">
            <a className="reference-button" href="/catalogo">
              Descubre el menú <ArrowDown />
            </a>
            <a
              className="reference-button reference-button-outline"
              href="#sedes"
            >
              <Pin /> Encuéntranos
            </a>
          </div>
        </div>
      </div>
      <p className="reference-hero-origin">
        Maní · Yopal <span aria-hidden="true" /> Casanare
      </p>
    </section>
  );
}
