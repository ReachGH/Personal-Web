"use client";

import { useEffect, useRef } from "react";
import type { MonogramSphereScene } from "@/lib/monogram-sphere";

export function MonogramSphere({ paused }: { paused: boolean }) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(paused);
  const refreshRef = useRef<() => void>(() => {});

  useEffect(() => {
    pausedRef.current = paused;
    refreshRef.current();
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const stage = host.closest(".portrait-stage")!;
    const shell = host.closest<HTMLElement>(".portrait-orbit-shell")!;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let scene: MonogramSphereScene | undefined;
    let inView = false;
    let cancelled = false;
    let failed = false;
    let loading = false;
    let idle: number | undefined;
    let timer: number | undefined;

    const shouldRun = () =>
      inView && !document.hidden && !motion.matches && !pausedRef.current;

    function fail() {
      failed = true;
      scene?.dispose();
      scene = undefined;
      host!.dataset.sphereState = "fallback";
    }

    async function initialise() {
      idle = undefined;
      timer = undefined;
      if (cancelled || !shouldRun() || loading || failed) return;
      loading = true;
      try {
        // No Three.js download for reduced motion or an offscreen portrait.
        const [module] = await Promise.all([
          import("@/lib/monogram-sphere"),
          document.fonts.ready,
        ]);
        if (cancelled || !shouldRun()) return;
        scene = module.createMonogramSphere(host!, fail);
        host!.dataset.sphereState = "ready";
        scene.setActive(shouldRun());
      } catch {
        if (!cancelled) fail();
      } finally {
        loading = false;
      }
    }

    function refresh() {
      shell.dataset.orbitSuspended = String(!inView || document.hidden);
      const running = shouldRun();
      scene?.setActive(running);
      if (!running) {
        if (idle !== undefined) window.cancelIdleCallback(idle);
        if (timer !== undefined) window.clearTimeout(timer);
        idle = timer = undefined;
      } else if (
        !scene &&
        !loading &&
        !failed &&
        idle === undefined &&
        timer === undefined
      ) {
        if (typeof window.requestIdleCallback === "function") {
          idle = window.requestIdleCallback(() => void initialise(), {
            timeout: 1500,
          });
        } else {
          timer = window.setTimeout(() => void initialise(), 0);
        }
      }
    }

    refreshRef.current = refresh;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      refresh();
    });
    observer.observe(stage);
    document.addEventListener("visibilitychange", refresh);
    motion.addEventListener("change", refresh);

    return () => {
      cancelled = true;
      refreshRef.current = () => {};
      observer.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      motion.removeEventListener("change", refresh);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
      scene?.dispose();
    };
  }, []);

  return (
    <span
      ref={hostRef}
      className="monogram-sphere"
      data-sphere-state="fallback"
    >
      <span className="monogram-sphere-fallback">
        r<span>.</span>
      </span>
    </span>
  );
}
