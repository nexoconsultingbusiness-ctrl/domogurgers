import "server-only";
import { env } from "@/config/env";
import { canIndexSite, resolveSiteUrl } from "@/validations/environment";

export const site = {
  name: "DomoBurgers",
  title: "DomoBurgers | El buen sabor se comparte",
  description:
    "Hamburguesas, recetas propias y momentos para compartir. Conoce la esencia de DomoBurgers, una historia que nació en Maní y crece en Yopal, Casanare.",
  url: resolveSiteUrl(env),
  indexable: canIndexSite(env),
} as const;
