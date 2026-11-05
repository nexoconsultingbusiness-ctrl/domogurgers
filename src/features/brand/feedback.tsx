import { catalogSettings } from "@/config/catalog";
import { FeedbackForm } from "./feedback-form";
import styles from "./feedback.module.css";

export function Feedback() {
  return (
    <section
      id="comentarios"
      className={styles.section}
      aria-labelledby="feedback-title"
    >
      <div className={`reference-container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.label}>Tu opinión cuenta</p>
          <h2 id="feedback-title">
            Déjanos tu
            <span>comentario.</span>
          </h2>
          <p className={styles.description}>
            ¿Probaste alguna de nuestras burgers? Cuéntanos qué te pareció, qué
            te gustaría ver en el menú o simplemente salúdanos. Leemos todo.
          </p>
          <p className={styles.note}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
            </svg>
            Tus comentarios nos ayudan a mejorar cada día.
          </p>
        </div>
        <FeedbackForm phone={catalogSettings.whatsAppPhones.yopal} />
      </div>
    </section>
  );
}
