import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";

export function Header() {
  return (
    <header className="site-header reference-header">
      <div className="reference-container reference-header-inner">
        <Link
          href="/#inicio"
          className="reference-brand"
          aria-label="DomoBurgers, inicio"
        >
          <Image
            src="/brand/logo-white.svg"
            width={90}
            height={84}
            alt="D’omo Burgers"
          />
        </Link>
        <nav className="reference-navigation" aria-label="Navegación principal">
          <Link href="/catalogo">Menú</Link>
          <Link href="/#sedes">Sedes</Link>
          <Link
            className="reference-button reference-header-cta"
            href="/catalogo"
          >
            Pedir ahora <ArrowUpRight />
          </Link>
        </nav>
        <Link
          className="reference-button reference-mobile-menu"
          href="/catalogo"
        >
          Ver menú
        </Link>
      </div>
    </header>
  );
}
