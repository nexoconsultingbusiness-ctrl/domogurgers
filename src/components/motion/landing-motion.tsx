"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Optional motion over content that is visible in the server-rendered page. */
export function LandingMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let disposed = false;
    let disposeMotion: (() => void) | undefined;
    let rebuildMotion: (() => void) | undefined;
    let headerFrame = 0;
    const revealed = new WeakSet<HTMLElement>();
    const header = document.querySelector<HTMLElement>(".site-header");
    const originalHeaderState = header?.getAttribute("data-scrolled");
    const queries = {
      motion: window.matchMedia("(prefers-reduced-motion: no-preference)"),
      desktop: window.matchMedia("(min-width: 1024px)"),
      finePointer: window.matchMedia("(hover: hover) and (pointer: fine)"),
    };

    const updateHeader = () => {
      headerFrame = 0;
      if (header) header.dataset.scrolled = String(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!headerFrame) headerFrame = requestAnimationFrame(updateHeader);
    };
    const onPreferenceChange = () => rebuildMotion?.();
    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    Object.values(queries).forEach((query) =>
      query.addEventListener("change", onPreferenceChange),
    );

    const initializeMotion = async () => {
      const { gsap } = await import("gsap");
      if (disposed) return;

      // Native observers keep browser scroll independent of animation-library
      // refreshes when device preferences or viewport breakpoints change.
      rebuildMotion = () => {
        disposeMotion?.();
        disposeMotion = undefined;
        if (disposed || !queries.motion.matches) return;
        const desktop = queries.desktop.matches;
        const cleanups: (() => void)[] = [];
        const context = gsap.context(() => {}, root);

        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const node = entry.target as HTMLElement;
              observer.unobserve(node);
              revealed.add(node);
              context.add(() => {
                gsap.fromTo(
                  node,
                  {
                    y: desktop ? 36 : 18,
                    clipPath: desktop ? "inset(0 0 12% 0)" : "inset(0 0 0% 0)",
                  },
                  {
                    y: 0,
                    clipPath: "inset(0 0 0% 0)",
                    duration: desktop ? 0.85 : 0.55,
                    ease: "power3.out",
                    immediateRender: false,
                    clearProps: "clipPath",
                  },
                );
              });
            }
          },
          { rootMargin: "0px 0px -10% 0px" },
        );
        cleanups.push(() => observer.disconnect());
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
          if (
            revealed.has(node) ||
            node.getBoundingClientRect().top < window.innerHeight * 0.9
          ) {
            revealed.add(node);
          } else {
            observer.observe(node);
          }
        });

        if (desktop) {
          const layers = Array.from(
            root.querySelectorAll<HTMLElement>("[data-parallax]"),
            (node) => {
              const requested = Number(node.dataset.parallax);
              const distance =
                Number.isFinite(requested) && requested !== 0
                  ? gsap.utils.clamp(-36, 36, requested)
                  : 22;
              context.add(() => gsap.set(node, { y: 0 }));
              return {
                node,
                distance,
                setY: gsap.quickSetter(node, "y", "px"),
              };
            },
          );
          let parallaxFrame = 0;
          const renderParallax = () => {
            parallaxFrame = 0;
            if (document.hidden) return;
            for (const layer of layers) {
              const bounds = (
                layer.node.parentElement ?? layer.node
              ).getBoundingClientRect();
              if (bounds.bottom < 0 || bounds.top > window.innerHeight)
                continue;
              const progress = gsap.utils.clamp(
                0,
                1,
                (window.innerHeight - bounds.top) /
                  (window.innerHeight + bounds.height),
              );
              layer.setY(-layer.distance + progress * layer.distance * 2);
            }
          };
          const scheduleParallax = () => {
            if (!parallaxFrame)
              parallaxFrame = requestAnimationFrame(renderParallax);
          };
          window.addEventListener("scroll", scheduleParallax, {
            passive: true,
          });
          window.addEventListener("resize", scheduleParallax, {
            passive: true,
          });
          document.addEventListener("visibilitychange", scheduleParallax);
          scheduleParallax();
          cleanups.push(() => {
            cancelAnimationFrame(parallaxFrame);
            window.removeEventListener("scroll", scheduleParallax);
            window.removeEventListener("resize", scheduleParallax);
            document.removeEventListener("visibilitychange", scheduleParallax);
          });
        }

        if (desktop && queries.finePointer.matches) {
          root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((node) => {
            let pointerFrame = 0;
            let pointerX = 0;
            let pointerY = 0;
            let rotateX: ReturnType<typeof gsap.quickTo>;
            let rotateY: ReturnType<typeof gsap.quickTo>;
            context.add(() => {
              rotateX = gsap.quickTo(node, "rotationX", {
                duration: 0.4,
                ease: "power3.out",
              });
              rotateY = gsap.quickTo(node, "rotationY", {
                duration: 0.4,
                ease: "power3.out",
              });
            });
            const renderTilt = () => {
              pointerFrame = 0;
              const bounds = node.getBoundingClientRect();
              if (!bounds.width || !bounds.height || document.hidden) return;
              const x = gsap.utils.clamp(
                -1,
                1,
                ((pointerX - bounds.left) / bounds.width - 0.5) * 2,
              );
              const y = gsap.utils.clamp(
                -1,
                1,
                ((pointerY - bounds.top) / bounds.height - 0.5) * 2,
              );
              rotateX(-y * 3);
              rotateY(x * 3);
            };
            const onPointerMove = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") return;
              pointerX = event.clientX;
              pointerY = event.clientY;
              if (!pointerFrame)
                pointerFrame = requestAnimationFrame(renderTilt);
            };
            const resetTilt = () => {
              cancelAnimationFrame(pointerFrame);
              pointerFrame = 0;
              rotateX(0);
              rotateY(0);
            };
            node.addEventListener("pointermove", onPointerMove, {
              passive: true,
            });
            node.addEventListener("pointerleave", resetTilt);
            node.addEventListener("pointercancel", resetTilt);
            cleanups.push(() => {
              cancelAnimationFrame(pointerFrame);
              node.removeEventListener("pointermove", onPointerMove);
              node.removeEventListener("pointerleave", resetTilt);
              node.removeEventListener("pointercancel", resetTilt);
            });
          });
        }

        disposeMotion = () => {
          cleanups.forEach((cleanup) => cleanup());
          context.revert();
        };
      };
      rebuildMotion();
    };

    void initializeMotion().catch(() => disposeMotion?.());
    return () => {
      disposed = true;
      cancelAnimationFrame(headerFrame);
      window.removeEventListener("scroll", onScroll);
      Object.values(queries).forEach((query) =>
        query.removeEventListener("change", onPreferenceChange),
      );
      disposeMotion?.();
      if (header) {
        if (originalHeaderState === null || originalHeaderState === undefined) {
          header.removeAttribute("data-scrolled");
        } else {
          header.setAttribute("data-scrolled", originalHeaderState);
        }
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="landing-motion">
      {children}
    </div>
  );
}
