"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ArrowRight } from "@/components/ui/icons";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !container.current?.contains(event.target)
      )
        setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 901px)");
    function onBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [open]);

  return (
    <div className="mobile-navigation" ref={container}>
      <button
        ref={toggle}
        type="button"
        className="nav-toggle"
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
        aria-expanded={open}
        aria-controls="mobile-links"
        onClick={() => setOpen((current) => !current)}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          {open ? (
            <path d="m5 5 14 14M5 19 19 5" />
          ) : (
            <path d="M3 7h18M3 12h18M3 17h18" />
          )}
        </svg>
      </button>
      <nav
        id="mobile-links"
        aria-label="Navegación móvil"
        className="mobile-links"
        hidden={!open}
      >
        <Link href="/#inicio" onClick={() => setOpen(false)}>
          Inicio
        </Link>
        <Link href="/#esencia" onClick={() => setOpen(false)}>
          La experiencia
        </Link>
        <Link href="/catalogo" onClick={() => setOpen(false)}>
          Carta
        </Link>
        <Link href="/#sedes" onClick={() => setOpen(false)}>
          Sedes
        </Link>
        <Link
          href="/catalogo"
          className="mobile-cta"
          onClick={() => setOpen(false)}
        >
          Pedir ahora <ArrowRight />
        </Link>
      </nav>
    </div>
  );
}
