"use client";

import { useEffect, useRef, type ReactNode } from "react";

const LAST_FRAME = 64;
const CLOSE_PORTION = 0.85;
const BITMAP_LIMIT = 10;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const frameUrl = (index: number) =>
  `/images/hero-sequence/frame-${String(index).padStart(3, "0")}.webp`;

/** Keep the full sequence compressed; decode only the neighborhood of the scroll. */
function createFrameStore(
  step: number,
  onChange: () => void,
  onFailure: () => void,
) {
  const controller = new AbortController();
  const blobs = new Map<number, Blob>();
  const bitmaps = new Map<number, ImageBitmap>();
  const fetching = new Set<number>();
  const decoding = new Set<number>();
  const queue: number[] = [];
  let disposed = false;
  let activeFetches = 0;
  let target = 0;

  const fail = () => {
    if (!disposed) onFailure();
  };

  const pumpDecodes = () => {
    if (disposed) return;
    const neighborhood = [
      target,
      target + step,
      target - step,
      target + 2 * step,
      target - 2 * step,
    ];
    for (const index of neighborhood) {
      if (decoding.size >= 2) break;
      if (index < 0 || index > LAST_FRAME || bitmaps.has(index)) continue;
      const blob = blobs.get(index);
      if (!blob || decoding.has(index)) continue;
      decoding.add(index);
      void createImageBitmap(blob)
        .then((bitmap) => {
          if (disposed) {
            bitmap.close();
            return;
          }
          bitmaps.set(index, bitmap);
          while (bitmaps.size > BITMAP_LIMIT) {
            const oldest = bitmaps.keys().next().value;
            if (oldest === undefined) break;
            bitmaps.get(oldest)?.close();
            bitmaps.delete(oldest);
          }
          onChange();
        })
        .catch(fail)
        .finally(() => {
          decoding.delete(index);
          pumpDecodes();
        });
    }
  };

  const pumpFetches = () => {
    while (!disposed && activeFetches < 4 && queue.length) {
      const index = queue.shift();
      if (index === undefined || blobs.has(index) || fetching.has(index))
        continue;
      fetching.add(index);
      activeFetches += 1;
      void fetch(frameUrl(index), { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error("Hero frame unavailable");
          return response.blob();
        })
        .then((blob) => {
          if (disposed) return;
          blobs.set(index, blob);
          pumpDecodes();
        })
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === "AbortError"))
            fail();
        })
        .finally(() => {
          fetching.delete(index);
          activeFetches -= 1;
          pumpFetches();
        });
    }
  };

  const prioritize = (index: number) => {
    if (index < 0 || index > LAST_FRAME || blobs.has(index)) return;
    const position = queue.indexOf(index);
    if (position !== -1) queue.splice(position, 1);
    if (!fetching.has(index)) queue.unshift(index);
  };

  // The opening frame leads; the remaining requests never exceed four at once.
  for (let index = 0; index <= LAST_FRAME; index += step) queue.push(index);

  return {
    start: pumpFetches,
    request(index: number) {
      target = index;
      prioritize(index + step);
      prioritize(index - step);
      prioritize(index);
      pumpFetches();
      pumpDecodes();
      const bitmap = bitmaps.get(index);
      if (bitmap) {
        // Insertion order is the LRU order, not the original frame order.
        bitmaps.delete(index);
        bitmaps.set(index, bitmap);
        return { index, bitmap };
      }
      let nearest: { index: number; bitmap: ImageBitmap } | undefined;
      for (const [candidate, image] of bitmaps) {
        if (
          !nearest ||
          Math.abs(candidate - index) < Math.abs(nearest.index - index)
        ) {
          nearest = { index: candidate, bitmap: image };
        }
      }
      return nearest;
    },
    dispose() {
      disposed = true;
      controller.abort();
      queue.length = 0;
      for (const bitmap of bitmaps.values()) bitmap.close();
      bitmaps.clear();
      blobs.clear();
    },
  };
}

/** A native sticky stage adds a short scroll runway without intercepting input. */
export function HeroScroll({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = root?.querySelector<HTMLElement>(".hero");
    const canvas = root?.querySelector<HTMLCanvasElement>(
      ".hero-animation-canvas",
    );
    const context = canvas?.getContext("2d", { alpha: true });
    if (!root || !stage || !canvas || !context || !window.createImageBitmap)
      return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    const otherInitialHash = Boolean(
      window.location.hash && window.location.hash !== "#inicio",
    );
    let hasSeenHeroOutside = false;
    let disposed = false;
    let frame = 0;
    let firstFrameReady = false;
    let stageHeight = stage.offsetHeight;
    let distance = 0;
    let paintedFrame = -1;
    let store: ReturnType<typeof createFrameStore> | undefined;

    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(render);
    };

    const release = () => {
      const oldHeight = root.offsetHeight;
      const oldScrollY = window.scrollY;
      const wasBelow = stage.getBoundingClientRect().top < 0;
      root.removeAttribute("data-scroll-ready");
      root.removeAttribute("data-canvas-ready");
      root.removeAttribute("data-hero-frame");
      root.style.removeProperty("--hero-progress");
      root.style.removeProperty("--hero-close-progress");
      root.style.removeProperty("--hero-exit-progress");
      root.style.removeProperty("--hero-scroll-distance");
      root.style.removeProperty("--hero-stage-height");
      distance = 0;
      firstFrameReady = false;
      paintedFrame = -1;
      // A live preference change below the hero keeps the same content in view.
      const removedHeight = oldHeight - root.offsetHeight;
      if (wasBelow && removedHeight > 0) {
        window.scrollTo({
          top: oldScrollY - removedHeight,
          behavior: "instant",
        });
      }
    };

    const stop = () => {
      store?.dispose();
      store = undefined;
      release();
    };

    function render() {
      frame = 0;
      if (disposed || motion.matches || !store || document.hidden) return;
      const bounds = root!.getBoundingClientRect();
      const headerHeight =
        document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      if (bounds.bottom <= headerHeight) hasSeenHeroOutside = true;
      const mayExpand =
        (!otherInitialHash ||
          window.location.hash === "#inicio" ||
          hasSeenHeroOutside) &&
        bounds.top < window.innerHeight &&
        bounds.bottom > headerHeight;

      if (firstFrameReady && !distance && mayExpand) {
        stageHeight = stage!.offsetHeight;
        distance = Math.round(stageHeight * (compact.matches ? 0.65 : 0.8));
        root!.style.setProperty("--hero-stage-height", `${stageHeight}px`);
        root!.style.setProperty("--hero-scroll-distance", `${distance}px`);
        root!.dataset.scrollReady = "true";
      }

      const progress = distance ? clamp(-bounds.top / distance) : 0;
      const closeProgress = clamp(progress / CLOSE_PORTION);
      const exitProgress = clamp(
        (progress - CLOSE_PORTION) / (1 - CLOSE_PORTION),
      );
      root!.style.setProperty("--hero-progress", progress.toFixed(4));
      root!.style.setProperty(
        "--hero-close-progress",
        closeProgress.toFixed(4),
      );
      root!.style.setProperty("--hero-exit-progress", exitProgress.toFixed(4));
      const step = compact.matches ? 2 : 1;
      const index = Math.round((closeProgress * LAST_FRAME) / step) * step;
      const image = store.request(index);
      if (
        !image ||
        image.index === paintedFrame ||
        (!firstFrameReady && image.index !== 0)
      )
        return;
      if (canvas!.width !== image.bitmap.width)
        canvas!.width = image.bitmap.width;
      if (canvas!.height !== image.bitmap.height)
        canvas!.height = image.bitmap.height;
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.drawImage(image.bitmap, 0, 0);
      paintedFrame = image.index;
      root!.dataset.heroFrame = String(image.index);
      root!.dataset.canvasReady = "true";
      if (!firstFrameReady) {
        firstFrameReady = true;
        schedule();
      }
    }

    const start = () => {
      stop();
      if (motion.matches || disposed) return;
      store = createFrameStore(compact.matches ? 2 : 1, schedule, stop);
      store.start();
      schedule();
    };

    const resize = () => {
      const height = stage.offsetHeight;
      if (height === stageHeight) return;
      const previousStageHeight = stageHeight;
      const previousDistance = distance;
      const previousScrollY = window.scrollY;
      const wasBelow = stage.getBoundingClientRect().top < 0;
      stageHeight = height;
      if (distance) {
        distance = Math.round(height * (compact.matches ? 0.65 : 0.8));
        root.style.setProperty("--hero-stage-height", `${height}px`);
        root.style.setProperty("--hero-scroll-distance", `${distance}px`);
        if (wasBelow) {
          window.scrollTo({
            top:
              previousScrollY +
              height -
              previousStageHeight +
              distance -
              previousDistance,
            behavior: "instant",
          });
        }
      }
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("hashchange", schedule);
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", start);
    compact.addEventListener("change", start);
    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("hashchange", schedule);
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", start);
      compact.removeEventListener("change", start);
      stop();
    };
  }, []);

  return (
    <div className="hero-track" id="inicio" ref={rootRef}>
      {children}
    </div>
  );
}
