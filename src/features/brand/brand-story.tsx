import Image from "next/image";
import { ArrowRight, Pin, Spark } from "@/components/ui/icons";

export function BrandStory() {
  return (
    <section
      id="historia"
      className="story-section"
      aria-labelledby="story-title"
    >
      <div className="container story-layout">
        <div className="story-art" data-reveal>
          <span className="story-outline" aria-hidden="true">
            DE AQUÍ.
            <br />
            CON ALMA.
          </span>
          <div className="story-emblem" data-tilt>
            <div className="emblem-top">
              <span>DE NUESTRA TIERRA</span>
              <Spark />
            </div>
            <Image
              src="/brand/logo-gold.svg"
              width={267}
              height={247}
              alt="D’omo Burgers"
              className="story-logo"
            />
            <div className="emblem-bottom">
              <span>CON TODO EL CORAZÓN</span>
              <span>DESDE 2020</span>
            </div>
          </div>
        </div>
        <div className="story-copy">
          <h2 id="story-title" data-reveal>
            De Maní.
            <br />
            Para <span>compartir.</span>
          </h2>
          <p data-reveal>
            El 20 de diciembre de 2020, el sueño de Charly Dorazio tomó forma en
            Maní, Casanare. Una idea sencilla: hacer las cosas con calidad y
            crear algo diferente.
          </p>
          <p data-reveal>
            Hoy nuestra historia también se escribe en Yopal. Crecemos con la
            misma dedicación del primer día y con más ganas de compartir lo que
            somos.
          </p>
          <a className="text-link" href="#origen">
            Una historia que sigue creciendo <ArrowRight />
          </a>
        </div>
      </div>
      <div
        id="origen"
        className="container origins"
        aria-label="Origen de nuestras sedes"
      >
        <div data-reveal>
          <Pin />
          <div>
            <h3>Maní</h3>
            <p>Donde todo comenzó.</p>
          </div>
          <time dateTime="2020-12-20">20 DIC 2020</time>
        </div>
        <div data-reveal>
          <Pin />
          <div>
            <h3>Yopal</h3>
            <p>Un nuevo capítulo.</p>
          </div>
          <time dateTime="2025-02-15">15 FEB 2025</time>
        </div>
      </div>
    </section>
  );
}
