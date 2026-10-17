"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useMotionSettings() {
  const [settings, setSettings] = useState({
    reduced: false,
    fine: false,
    compact: false,
  });
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const compact = matchMedia("(max-width: 767.98px)");
    const update = () =>
      setSettings({
        reduced: reduced.matches,
        fine: fine.matches,
        compact: compact.matches,
      });
    update();
    [reduced, fine, compact].forEach((query) =>
      query.addEventListener("change", update),
    );
    return () =>
      [reduced, fine, compact].forEach((query) =>
        query.removeEventListener("change", update),
      );
  }, []);
  return settings;
}

/* Keep the native top layer and focus trap alive until the exit finishes. */
export function useDialogMotion(
  ref: RefObject<HTMLDialogElement | null>,
  open: boolean,
) {
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || (!open && !dialog.open)) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const existing = dialog.getAnimations();
    const style = getComputedStyle(dialog);
    const from = {
      opacity: dialog.open ? style.opacity : "0",
      transform: dialog.open ? style.transform : "translateY(24px) scale(.985)",
    };
    existing.forEach((animation) => animation.cancel());
    if (open && !dialog.open) {
      previousFocus.current = document.activeElement as HTMLElement;
      dialog.showModal();
    }
    dialog.dataset.motion = open ? "opening" : "closing";
    const finish = () => {
      dialog.style.removeProperty("opacity");
      dialog.style.removeProperty("transform");
      if (open) dialog.dataset.motion = "open";
      else {
        dialog.close();
        delete dialog.dataset.motion;
        previousFocus.current?.focus({ preventScroll: true });
      }
    };
    const animation = dialog.animate(
      [
        from,
        open
          ? { opacity: "1", transform: "translateY(0) scale(1)" }
          : { opacity: "0", transform: "translateY(14px) scale(.99)" },
      ],
      {
        duration: preference.matches ? 0 : open ? 520 : 260,
        easing: open ? "cubic-bezier(.16,1,.3,1)" : "cubic-bezier(.4,0,1,1)",
        fill: "both",
      },
    );
    animation.onfinish = () => {
      finish();
      animation.cancel();
    };
    const motionChange = () => {
      if (animation.playState === "running") animation.finish();
    };
    preference.addEventListener("change", motionChange);
    return () => {
      if (animation.playState === "running" && dialog.open)
        animation.commitStyles();
      animation.cancel();
      preference.removeEventListener("change", motionChange);
    };
  }, [open, ref]);
  useEffect(() => {
    const dialog = ref.current;
    return () => {
      dialog?.getAnimations().forEach((animation) => animation.cancel());
      dialog?.close();
    };
  }, [ref]);
}
