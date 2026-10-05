import { ArrowRight, Spark } from "@/components/ui/icons";

export function BrandRibbon() {
  return (
    <div
      className="brand-ribbon"
      role="group"
      aria-label="Hecho con calidad. Pensado para disfrutar."
    >
      <div className="ribbon-track" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <div className="ribbon-phrase" key={item}>
            <span>HECHO CON CALIDAD</span>
            <Spark />
            <span>PENSADO PARA DISFRUTAR</span>
            <Spark />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section
      id="esencia"
      className="essence-section"
      aria-labelledby="essence-title"
    >
      <div className="container essence-layout">
        <div data-reveal>
          <h2 id="essence-title">
            Más que una
            <br />
            hamburguesa.
            <br />
            <span>Un buen momento.</span>
          </h2>
          <a className="text-link" href="#detalles">
            Conoce nuestra esencia <ArrowRight />
          </a>
        </div>
        <div className="essence-copy">
          <p data-reveal>
            Creemos que lo extraordinario debería estar al alcance de todos. Y
            que los mejores momentos empiezan con algo bueno para compartir.
          </p>
          <dl className="brand-values">
            <div data-reveal>
              <dt>Ingredientes seleccionados</dt>
              <dd>La calidad comienza desde el principio.</dd>
            </div>
            <div data-reveal>
              <dt>Elaboración artesanal</dt>
              <dd>Dedicación en cada detalle.</dd>
            </div>
            <div data-reveal>
              <dt>Recetas propias</dt>
              <dd>Una propuesta con nuestra esencia.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
