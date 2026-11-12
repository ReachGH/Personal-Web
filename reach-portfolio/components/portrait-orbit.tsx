"use client";

import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { MonogramSphere } from "@/components/monogram-sphere";

import styles from "./portrait-orbit.module.css";
import { cn } from "@/lib/classnames";

// Sample the same ellipse as the moon. Size and opacity follow its depth,
// including the joins between the front and back halves.
const orbitDashes = Array.from({ length: 96 }, (_, index) => {
  const angle = (index / 96) * Math.PI * 2;
  const depth = Math.sin(angle);
  const x = 500 + 560 * Math.cos(angle);
  const y = 576 + 480 * depth;
  const tangentX = -560 * depth;
  const tangentY = 480 * Math.cos(angle);
  const halfLength = 7 + 2 * depth;
  const factor = halfLength / Math.hypot(tangentX, tangentY);
  const dx = tangentX * factor;
  const dy = tangentY * factor;
  // Trigonometric results can differ in their last bits between Node and the
  // browser. Serialize to fixed precision so SVG attributes hydrate identically.
  return {
    path: `M ${(x - dx).toFixed(3)} ${(y - dy).toFixed(3)} L ${(x + dx).toFixed(3)} ${(y + dy).toFixed(3)}`,
    width: (2.8 + 0.8 * depth).toFixed(3),
    opacity: (0.28 + 0.12 * depth).toFixed(3),
    front: index <= 48,
  };
});

function OrbitTrack({ front = false }: { front?: boolean }) {
  return (
    <svg
      className={cn(
        styles["portrait-orbit-track"],
        front ? styles["portrait-orbit-track-front"] : "",
      )}
      viewBox="0 0 1000 1200"
      aria-hidden="true"
      data-ui={`portrait-orbit-track${front ? " portrait-orbit-track-front" : ""}`}
    >
      {orbitDashes.map((dash, index) =>
        dash.front === front ? (
          <path
            key={index}
            d={dash.path}
            strokeWidth={dash.width}
            opacity={dash.opacity}
          />
        ) : null,
      )}
    </svg>
  );
}

export function PortraitOrbit({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={styles["portrait-orbit-shell"]}
      data-orbit-shell
      data-orbit-paused={paused}
      data-ui="portrait-orbit-shell"
    >
      <div
        className={styles["portrait-stage"]}
        data-orbit-stage
        data-ui="portrait-stage"
      >
        <OrbitTrack />
        <OrbitTrack front />
        <span className={styles["portrait-orbit-plane"]} aria-hidden="true">
          <span className={styles["portrait-moon"]} data-ui="portrait-moon">
            <MonogramSphere paused={paused} />
          </span>
          <span
            className={styles["portrait-moon-trail"]}
            data-ui="portrait-moon-trail"
          />
          <span
            className={cn(
              styles["portrait-moon-trail"],
              styles["portrait-moon-trail-faint"],
            )}
            data-ui="portrait-moon-trail portrait-moon-trail-faint"
          />
        </span>
        {children}
      </div>
      <button
        type="button"
        className={styles["orbit-toggle"]}
        aria-label={paused ? "Play orbit animation" : "Pause orbit animation"}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </div>
  );
}
