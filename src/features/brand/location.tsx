import Image from "next/image";
import { ArrowUpRight, Pin } from "@/components/ui/icons";
import styles from "./location.module.css";

// Google Maps embed supplied by the Share dialog for the user's exact place.
const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d993.1154724628925!2d-72.3896697!3d5.3462448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6b0c526c9c54f9%3A0x6915a9700d90fab2!2sCra.%2029%20%2316-11%2C%20Yopal%2C%20Casanare!5e0!3m2!1ses-419!2sco!4v1793900072119!5m2!1ses-419!2sco";

// Directions use the place's pin, not the camera center in the shared URL.
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=5.3464423%2C-72.3891041";

export function Location() {
  return (
    <section
      id="sedes"
      className={styles.section}
      aria-labelledby="location-title"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 id="location-title">
            Encuéntranos
            <br />
            en <span>Yopal.</span>
          </h2>
          <address className={styles.address}>
            <Pin />
            <div>
              <strong>D’omo Burgers · Yopal</strong>
              <span>Carrera 29 #16-11</span>
              <span>Yopal, Casanare</span>
            </div>
          </address>
          <a
            className={`button-primary ${styles.directions}`}
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cómo llegar a D’omo Burgers Yopal en Google Maps (abre otra pestaña)"
          >
            Cómo llegar <ArrowUpRight />
          </a>
        </div>
        <Image
          className={styles.facade}
          src="/images/domos-fachada.webp"
          width={941}
          height={1672}
          alt="Fachada de D’omo Burgers con su aviso luminoso y la entrada al restaurante"
          quality={90}
          sizes="(max-width: 371px) 104px, (max-width: 571px) 28vw, (max-width: 767px) 160px, (max-width: 1199px) 220px, 240px"
        />
        <iframe
          className={styles.map}
          title="Ubicación de D’omo Burgers en Yopal, Carrera 29 #16-11"
          src={mapEmbedUrl}
          width="720"
          height="440"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}
