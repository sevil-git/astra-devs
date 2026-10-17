"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export type HoldStage = "idle" | "charging" | "revealed";

export default function HoldReveal({ enabled, onStageChange }: {
  enabled: boolean;
  onStageChange: (stage: HoldStage, button: HTMLButtonElement) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const charge = useRef<gsap.core.Tween | null>(null);
  const phaseRef = useRef<HoldStage>("idle");
  const pointer = useRef<number | null>(null);
  const keyboard = useRef(false);
  const [phase, setPhase] = useState<HoldStage>("idle");

  const finish = useCallback(() => {
    const button = buttonRef.current;
    charge.current?.kill();
    if (button && phaseRef.current !== "idle") onStageChange("idle", button);
    phaseRef.current = "idle";
    setPhase("idle");
    if (progressRef.current) {
      gsap.to(progressRef.current, { strokeDashoffset: 100, duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.25, overwrite: true });
    }
    const captured = pointer.current;
    pointer.current = null;
    keyboard.current = false;
    if (captured !== null && button?.hasPointerCapture(captured)) button.releasePointerCapture(captured);
  }, [onStageChange]);

  const begin = (immediate = false) => {
    const button = buttonRef.current;
    if (!enabled || !button || phaseRef.current !== "idle") return;
    charge.current?.kill();
    phaseRef.current = "charging";
    setPhase("charging");
    onStageChange("charging", button);
    const reveal = () => {
      if (phaseRef.current !== "charging") return;
      phaseRef.current = "revealed";
      setPhase("revealed");
      onStageChange("revealed", button);
      navigator.vibrate?.(12);
    };
    if (immediate) {
      gsap.set(progressRef.current, { strokeDashoffset: 0 });
      reveal();
    } else {
      gsap.set(progressRef.current, { strokeDashoffset: 100 });
      charge.current = gsap.to(progressRef.current, {
        strokeDashoffset: 0, duration: 0.55, ease: "none", onComplete: reveal,
      });
    }
  };

  useEffect(() => {
    const cancel = () => finish();
    const visibility = () => { if (document.hidden) finish(); };
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMode = matchMedia("(hover: hover) and (pointer: fine)");
    window.addEventListener("blur", cancel);
    window.addEventListener("pagehide", cancel);
    window.addEventListener("resize", cancel);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", cancel);
    pointerMode.addEventListener("change", cancel);
    return () => {
      charge.current?.kill();
      window.removeEventListener("blur", cancel);
      window.removeEventListener("pagehide", cancel);
      window.removeEventListener("resize", cancel);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", cancel);
      pointerMode.removeEventListener("change", cancel);
    };
  }, [finish]);

  useEffect(() => {
    if (enabled || phaseRef.current === "idle") return;
    const frame = requestAnimationFrame(finish);
    return () => cancelAnimationFrame(frame);
  }, [enabled, finish]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className="touch-hold"
      data-phase={phase}
      aria-label="Hold to reveal the other side. Release to return."
      aria-describedby="hold-reveal-help"
      aria-pressed={phase === "revealed"}
      inert={!enabled}
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0 || pointer.current !== null) return;
        event.preventDefault();
        pointer.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);
        begin();
      }}
      onPointerUp={event => { if (pointer.current === event.pointerId) finish(); }}
      onPointerCancel={finish}
      onLostPointerCapture={event => { if (pointer.current === event.pointerId) finish(); }}
      onBlur={finish}
      onContextMenu={event => event.preventDefault()}
      onKeyDown={event => {
        if (event.key !== " " && event.key !== "Enter") return;
        event.preventDefault();
        if (event.repeat || keyboard.current) return;
        keyboard.current = true;
        begin();
      }}
      onKeyUp={event => {
        if (event.key === " " || event.key === "Enter") { event.preventDefault(); finish(); }
      }}
      onClick={event => {
        // Assistive technology can toggle without having to sustain a gesture.
        if (event.detail === 0 && !keyboard.current && pointer.current === null) {
          if (phaseRef.current === "idle") begin(true);
          else finish();
        }
      }}
    >
      <span className="hold-echo" aria-hidden="true" />
      <svg className="hold-ring" viewBox="0 0 100 100" aria-hidden="true">
        <defs><path id="astra-hold-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" /></defs>
        <text><textPath href="#astra-hold-circle">HOLD TO REVEAL · THE OTHER SIDE · </textPath></text>
      </svg>
      <svg className="hold-progress" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="hold-track" cx="50" cy="50" r="47" />
        <circle ref={progressRef} cx="50" cy="50" r="47" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
      </svg>
      <span className="hold-core" aria-hidden="true">
        <svg className="hold-hand" viewBox="0 0 32 32">
          <path d="M11 18V7a2 2 0 0 1 4 0v9-4a2 2 0 0 1 4 0v4-2a2 2 0 0 1 4 0v3-1a2 2 0 0 1 4 0v7c0 5-3 8-8 8-3 0-5-2-7-4l-6-6a2 2 0 0 1 3-3l3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="hold-caption" aria-hidden="true">{phase === "revealed" ? "Release to return" : phase === "charging" ? "Keep holding…" : "Hold to reveal"}</span>
      <span id="hold-reveal-help" className="hold-sr-only">Hold for a moment to reveal playful text. Release anywhere to return. Screen reader users can activate to toggle.</span>
      <span className="hold-sr-only" role="status">{phase === "revealed" ? "Alternate view revealed." : ""}</span>
    </button>
  );
}
