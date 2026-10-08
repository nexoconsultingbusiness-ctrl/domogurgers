import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer id="sedes" className="site-footer">
      <div className="container footer-main">
        <Link
          href="/#inicio"
          className="footer-logo"
          aria-label="DomoBurgers, volver al inicio"
        >
          <Image
            src="/brand/wordmark-white.svg"
            width={165}
            height={85}
            alt="D’omo Burgers"
          />
        </Link>
        <p className="footer-signoff">
          El sabor tiene un origen.
          <br />
          El nuestro está en Casanare.
        </p>
        <nav
          className="footer-navigation"
          aria-label="Navegación del pie de página"
        >
          <Link href="/catalogo">Carta</Link>
          <Link href="/#esencia">La experiencia</Link>
          <Link href="/#sedes">Sedes</Link>
        </nav>
        <Link href="/#inicio" className="back-to-top">
          Volver arriba <ArrowRight />
        </Link>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} DomoBurgers</span>
        <span>Maní & Yopal · Casanare, Colombia</span>
      </div>
    </footer>
  );
}
