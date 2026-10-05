import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="container status-page">
      <h1>Por aquí no era.</h1>
      <p>
        No encontramos esta página. Vuelve al inicio para conocer DomoBurgers.
      </p>
      <Link className="button-primary" href="/">
        Volver al inicio <ArrowRight />
      </Link>
    </section>
  );
}
