import { ArrowRight, Star } from "@/components/ui/icons";
import styles from "./testimonials.module.css";

// Comentarios y nombres transcritos de la referencia aportada por el usuario.
const testimonials = [
  {
    name: "Camila R.",
    location: "Yopal",
    quote:
      "La D’omo Doble es otra cosa. La carne jugosa, el pan suave y esa salsa... volví al día siguiente.",
  },
  {
    name: "Andrés M.",
    location: "Maní",
    quote:
      "Por fin una hamburguesa de verdad en Casanare. El bacon crocante y el queso derretido, perfectos.",
  },
  {
    name: "Laura G.",
    location: "Yopal",
    quote:
      "Pedí la Crispy Chicken y quedé enamorada. Crocante por fuera, tierna por dentro. Muy recomendada.",
  },
];

export function Testimonials() {
  return (
    <section
      id="opiniones"
      className={styles.section}
      aria-labelledby="testimonials-title"
    >
      <div className="reference-container">
        <div className={styles.heading} data-reveal>
          <div>
            <p className={styles.label}>Lo que dicen</p>
            <h2 id="testimonials-title">Opiniones reales</h2>
          </div>
          <p className={styles.intro}>
            Nada nos llena más que ver a la gente volver por otra burger.
          </p>
        </div>
        <div
          className={styles.scroller}
          role="region"
          aria-label="Comentarios de clientes"
          tabIndex={0}
        >
          <ul className={styles.list} role="list">
            {testimonials.map(({ name, location, quote }) => (
              <li className={styles.card} key={name}>
                <figure>
                  <svg
                    className={styles.quoteIcon}
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
                    <path d="M3 21c3 0 7-3 7-8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2c0 2-1 3-3 4ZM15 21c3 0 7-3 7-8V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2c0 2-1 3-3 4Z" />
                  </svg>
                  <div
                    className={styles.rating}
                    role="img"
                    aria-label="5 de 5 estrellas"
                  >
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} />
                    ))}
                  </div>
                  <blockquote>
                    <p>“{quote}”</p>
                  </blockquote>
                  <figcaption>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.location}>{location}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.swipeHint}>
          Desliza para ver más <ArrowRight />
        </p>
      </div>
    </section>
  );
}
