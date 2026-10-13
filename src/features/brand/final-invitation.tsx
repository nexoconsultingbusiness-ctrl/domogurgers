import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

export function FinalInvitation() {
  return (
    <section className="invitation-section" aria-labelledby="invitation-title">
      <div className="container invitation-layout">
        <div data-reveal>
          <h2 id="invitation-title">
            Los buenos
            <br />
            momentos tienen
            <br />
            <span>buen sabor.</span>
          </h2>
          <p>De nuestra tierra. Con todo el corazón.</p>
          <Link className="button-primary" href="/catalogo">
            Armar mi pedido <ArrowRight />
          </Link>
        </div>
        <figure className="invitation-image" data-reveal>
          <Image
            src="/images/domos-compartir.webp"
            width={1673}
            height={940}
            alt="Composición de hamburguesas, papas, salchipapas y bebidas de DomoBurgers para compartir"
            quality={90}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <figcaption>Imagen conceptual de marca.</figcaption>
        </figure>
      </div>
    </section>
  );
}
