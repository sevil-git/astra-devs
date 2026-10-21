"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import gsap from "gsap";

function Shortcut({ label, href, children }: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  const symbol = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = symbol.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const reset = () => {
      gsap.killTweensOf(node);
      gsap.set(node, { x: 0, y: 0 });
    };
    preference.addEventListener("change", reset);
    return () => {
      preference.removeEventListener("change", reset);
      gsap.killTweensOf(node);
    };
  }, []);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    gsap.to(symbol.current, {
      x: (event.clientX - bounds.left - bounds.width / 2) * .85,
      y: (event.clientY - bounds.top - bounds.height / 2) * .85,
      duration: .35,
      ease: "power3.out",
      overwrite: true,
    });
  };
  const release = () => {
    gsap.to(symbol.current, {
      x: 0, y: 0,
      duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : .8,
      ease: "elastic.out(1, .4)",
      overwrite: true,
    });
  };
  const props = {
    className: "footer-shortcut",
    "aria-label": label,
    onPointerMove: move,
    onPointerLeave: release,
    onPointerCancel: release,
    onBlur: release,
    "data-mask": "hide",
  };
  const content = <span ref={symbol} className="shortcut-symbol">{children}</span>;
  return <li><a {...props} href={href} target={href.startsWith("https:") ? "_blank" : undefined}
    rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}>{content}</a></li>;
}

export default function FooterControls({ entered, soundOn, onToggleSound }: {
  entered: boolean;
  soundOn: boolean;
  onToggleSound: () => void;
}) {
  return (
    <footer className="fixed-footer" inert={!entered}>
      <nav className="footer-shortcuts" aria-label="Social profiles">
        <ul>
          <Shortcut href="https://example.com/astra-devs/github" label="GitHub (placeholder profile)">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 20v-3.1c-3.8.8-5-1.6-5-1.6M15 20v-3.4c0-1 .3-1.7.8-2.2 2.6-.3 5.2-1.2 5.2-5.6 0-1.2-.4-2.2-1.1-3 .1-.3.5-1.5-.1-3.1 0 0-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C8.6 2.4 7.6 2.7 7.6 2.7c-.6 1.6-.2 2.8-.1 3.1-.7.8-1.1 1.8-1.1 3 0 4.4 2.6 5.3 5.2 5.6-.5.5-.8 1.2-.8 2.2V20" />
            </svg>
          </Shortcut>
          <Shortcut href="https://example.com/astra-devs/instagram" label="Instagram (placeholder profile)">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
            </svg>
          </Shortcut>
          <Shortcut href="https://example.com/astra-devs/linkedin" label="LinkedIn (placeholder profile)">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 9v11M10 20V9h4v2c1-2.5 6-3 6 2v7M14 20v-6" />
              <circle cx="5" cy="4.5" r="1.4" fill="currentColor" stroke="none" />
            </svg>
          </Shortcut>
          <Shortcut href="mailto:hello@astradevs.agency" label="Email Astra devs">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 5 9 8 9-8" />
            </svg>
          </Shortcut>
        </ul>
      </nav>
      <button className="sound-toggle" type="button" data-sound-on={soundOn}
        data-mask="hide" onClick={onToggleSound}
        aria-label={soundOn ? "Turn sound off" : "Turn sound on"} aria-pressed={soundOn}>
        <span className="sound-label" aria-hidden="true">SOUND</span>
        <span className="sound-state-window" aria-hidden="true">
          <span className="sound-state-track"><span>ON</span><span>OFF</span></span>
        </span>
      </button>
    </footer>
  );
}
