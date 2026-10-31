"use client";

import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { MonogramSphere } from "@/components/monogram-sphere";

export function PortraitOrbit({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="portrait-orbit-shell" data-orbit-paused={paused}>
      <div className="portrait-stage">
        <span className="portrait-orbit-track" aria-hidden="true" />
        <span className="portrait-orbit-plane" aria-hidden="true">
          <span className="portrait-moon">
            <MonogramSphere paused={paused} />
          </span>
          <span className="portrait-moon-trail" />
          <span className="portrait-moon-trail portrait-moon-trail-faint" />
        </span>
        {children}
      </div>
      <button
        type="button"
        className="orbit-toggle"
        aria-label={paused ? "Play orbit animation" : "Pause orbit animation"}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </div>
  );
}
