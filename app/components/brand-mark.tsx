"use client";

import { useEffect, useRef } from "react";

/** The A doubles as a tiny observant character. Motion stays in the SVG. */
export default function BrandMark({
  className = "",
  interactive = false,
  active = true,
  intro = false,
  revealStage = "idle",
}: {
  className?: string;
  interactive?: boolean;
  active?: boolean;
  intro?: boolean;
  revealStage?: "idle" | "charging" | "revealed";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const mark = ref.current;
    if (!mark || !interactive || !active || revealStage !== "idle") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const reset = () => {
      for (const property of [
        "--gaze-x",
        "--gaze-y",
        "--mark-x",
        "--mark-y",
        "--mark-tilt",
      ])
        mark.style.removeProperty(property);
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = mark.getBoundingClientRect();
        const dx = event.clientX - box.left - box.width / 2;
        const dy = event.clientY - box.top - box.height / 2;
        const distance = Math.hypot(dx, dy) || 1;
        const near = Math.max(0, 1 - distance / 180);
        mark.style.setProperty("--gaze-x", `${(dx / distance) * 2}px`);
        mark.style.setProperty("--gaze-y", `${(dy / distance) * 1.4}px`);
        mark.style.setProperty("--mark-x", `${dx * near * 0.14}px`);
        mark.style.setProperty("--mark-y", `${dy * near * 0.14}px`);
        mark.style.setProperty(
          "--mark-tilt",
          `${(dx / distance) * near * 12}deg`,
        );
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    reduced.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      reduced.removeEventListener("change", reset);
      reset();
    };
  }, [interactive, active, revealStage]);

  return (
    <span
      ref={ref}
      className={`brand-mark ${intro ? "brand-mark-intro" : ""} ${interactive ? "brand-mark-interactive" : ""} ${className}`}
      aria-hidden="true"
      data-reveal-phase={revealStage}
      onPointerDown={() => {
        if (
          !interactive ||
          !active ||
          revealStage !== "idle" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const svg = ref.current?.querySelector("svg");
        svg?.getAnimations().forEach((animation) => animation.cancel());
        svg?.animate(
          [
            { transform: "rotate(0deg) scale(1)" },
            { transform: "rotate(-16deg) scale(0.9, 1.08)", offset: 0.25 },
            { transform: "rotate(12deg) scale(1.06, 0.94)", offset: 0.55 },
            { transform: "rotate(-5deg) scale(1)", offset: 0.8 },
            { transform: "rotate(0deg) scale(1)" },
          ],
          { duration: 650, easing: "cubic-bezier(.2,.8,.3,1)" },
        );
      }}
    >
      <svg width="64" height="64" viewBox="0 0 64 64" focusable="false">
        <g className="mark-body">
          <circle cx="32" cy="32" r="30" fill="currentColor" />
          <path
            className="mark-a"
            d="M10 56 28 10h8l18 46H41l-3.4-11H26.4L23 56H10Z"
            fill="#0d0d0d"
          />
          <g className="mark-face">
            <rect
              x="23.5"
              y="28"
              width="17"
              height="9"
              rx="4.5"
              fill="currentColor"
            />
            <g className="mark-gaze">
              <g className="mark-blink">
                <ellipse cx="28.5" cy="32.5" rx="1.8" ry="2.4" fill="#0d0d0d" />
                <ellipse
                  className="mark-right-eye"
                  cx="35.5"
                  cy="32.5"
                  rx="1.8"
                  ry="2.4"
                  fill="#0d0d0d"
                />
              </g>
            </g>
            <path className="mark-smile" d="M28 40q4 4 8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </g>
          <path
            className="mark-spark"
            d="m49 7 1.8 4.2L55 13l-4.2 1.8L49 19l-1.8-4.2L43 13l4.2-1.8L49 7Z"
            fill="#eb5939"
          />
        </g>
      </svg>
    </span>
  );
}
