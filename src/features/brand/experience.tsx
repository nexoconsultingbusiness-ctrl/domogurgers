import Image from "next/image";
import { Spark } from "@/components/ui/icons";
import styles from "./experience.module.css";

const values = [
  {
    title: "Al fuego",
    description:
      "Cada carne pasa por la parrilla al momento de tu pedido. Nada precocido.",
    icon: (
      <path d="M12 3c1 5 6 6 6 12a6 6 0 0 1-12 0c0-2 1-4 3-6 0 3 1 4 3 4 2-3-2-5 0-10Z" />
    ),
  },
  {
    title: "Recetas propias",
    description:
      "Salsas y combinaciones creadas en casa, probadas una y otra vez.",
    icon: (
      <path d="m20.8 4.6 0 0a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
  },
  {
    title: "De Casanare",
    description: "Orgullosamente llaneros: dos sedes, la misma esencia.",
    icon: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    title: "Sin atajos",
    description: "Si no nos encanta a nosotros, no sale de la cocina.",
    icon: (
      <path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1.1 6.2-5.7-3-5.7 3 1.1-6.2L3.1 9.6l6.1-.9L12 3Z" />
    ),
  },
];

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
      className={styles.section}
      aria-labelledby="essence-title"
    >
      <div className="reference-container">
        <div className={styles.layout}>
          <div className={styles.copy} data-reveal>
            <p className={styles.label}>Nuestra historia</p>
            <h2 id="essence-title" className={styles.title}>
              Nacimos del
              <span>
                fuego y el
                <br />
                antojo.
              </span>
            </h2>
            <p>
              D’omo nació en Casanare con una idea simple: hacer hamburguesas
              que la gente recuerde. Empezamos con una parrilla, recetas propias
              y la terquedad de no conformarnos con lo común.
            </p>
            <p>
              Hoy estamos en Maní y Yopal, pero la esencia es la misma:
              ingredientes escogidos, pan dorado al momento y una salsa que
              nadie ha podido copiar.
            </p>
          </div>
          <figure className={styles.image} data-reveal>
            <Image
              src="/images/domos-interior.webp"
              width={1672}
              height={941}
              alt="Interior de D’omo Burgers con mesas de madera, sillas negras e iluminación cálida"
              quality={90}
              sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 64px), (max-width: 1439px) 50vw, 680px"
            />
            <figcaption>Interior de D’omo Burgers.</figcaption>
          </figure>
        </div>
        <dl className={styles.values}>
          {values.map(({ title, description, icon }) => (
            <div className={styles.value} key={title} data-reveal>
              <dt>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icon}
                </svg>
                {title}
              </dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
