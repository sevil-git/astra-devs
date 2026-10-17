"use client";

import { useEffect, useRef } from "react";
import { projects } from "../data/projects";

export default function WorkGallery({
  active,
  onChange,
  onOpen,
  mirror,
}: {
  active: number;
  onChange: (index: number) => void;
  onOpen: (index: number) => void;
  mirror: boolean;
}) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const tiltFrame = useRef(0);
  const swipe = useRef<{ x: number; y: number; time: number } | null>(null);
  const suppressClickUntil = useRef(0);
  useEffect(() => () => cancelAnimationFrame(tiltFrame.current), []);
  return (
    <div className="work-gallery" data-mask="hide">
      <div
        className="gallery-tabs"
        role="tablist"
        aria-label="Selected projects"
      >
        {projects.map((project, index) => (
          <button
            ref={(element) => {
              tabs.current[index] = element;
            }}
            key={project.name}
            role="tab"
            id={mirror ? undefined : `project-tab-${index}`}
            aria-controls={mirror ? undefined : `project-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => onChange(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight")
                next = (index + 1) % projects.length;
              else if (event.key === "ArrowLeft")
                next = (index + projects.length - 1) % projects.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = projects.length - 1;
              else return;
              event.preventDefault();
              onChange(next);
              tabs.current[next]?.focus({ preventScroll: true });
            }}
          >
            <span className="gallery-tab-number">0{index + 1}</span>
            <span>{project.name}</span>
            <span className="gallery-tab-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className="gallery-panels">
      {projects.map((project, index) => (
        <div
          key={project.name}
          role="tabpanel"
          className={`gallery-panel ${active === index ? "is-active" : ""}`}
          inert={active !== index}
          aria-hidden={active !== index}
          id={mirror ? undefined : `project-panel-${index}`}
          aria-labelledby={mirror ? undefined : `project-tab-${index}`}
        >
          <button
            className={`gallery-stage gallery-${project.theme}`}
            onClick={(event) => {
              if (performance.now() < suppressClickUntil.current) { event.preventDefault(); return; }
              onOpen(index);
            }}
            onPointerDown={(event) => {
              if (event.pointerType === "touch") swipe.current = { x: event.clientX, y: event.clientY, time: performance.now() };
            }}
            onPointerCancel={() => { swipe.current = null; }}
            onPointerUp={(event) => {
              const start = swipe.current;
              swipe.current = null;
              if (!start) return;
              const dx = event.clientX - start.x;
              const dy = event.clientY - start.y;
              if (Math.abs(dx) > 48 && Math.abs(dy) < Math.abs(dx) * .65 && performance.now() - start.time < 800) {
                suppressClickUntil.current = performance.now() + 500;
                onChange((active + (dx < 0 ? 1 : projects.length - 1)) % projects.length);
              }
            }}
            aria-label={`Explore ${project.name} ${project.type}`}
            onPointerMove={(event) => {
              if (
                event.pointerType === "touch" ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
              )
                return;
              const stage = event.currentTarget;
              const box = stage.getBoundingClientRect();
              const x = event.clientX, y = event.clientY;
              cancelAnimationFrame(tiltFrame.current);
              tiltFrame.current = requestAnimationFrame(() => {
              stage.style.setProperty(
                "--gallery-rx",
                `${((y - box.top) / box.height - 0.5) * -4}deg`,
              );
              stage.style.setProperty(
                "--gallery-ry",
                `${((x - box.left) / box.width - 0.5) * 5}deg`,
              );
              });
            }}
            onPointerLeave={(event) => {
              cancelAnimationFrame(tiltFrame.current);
              event.currentTarget.style.setProperty("--gallery-rx", "0deg");
              event.currentTarget.style.setProperty("--gallery-ry", "0deg");
            }}
          >
            <span className="gallery-stage-top">
              <span>SELECTED PROJECT / 0{index + 1}</span>
              <span>{project.type}</span>
            </span>
            <span className="gallery-browser">
              <span className="gallery-browser-chrome">
                <span aria-hidden="true">● ● ●</span>
                <span>{project.name.toLowerCase()} / live experience</span>
                <span aria-hidden="true">↗</span>
              </span>
              <img
                src={project.image}
                alt={`${project.name} homepage`}
                width="1265"
                height="712"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="gallery-open" aria-hidden="true">
              EXPLORE PROJECT <span>↗</span>
            </span>
          </button>
          <div className="gallery-caption">
            <div>
              <span className="gallery-caption-type">{project.type}</span>
              <h2>{project.headline}</h2>
            </div>
            <div>
              <p>{project.description}</p>
              <button className="line-button" onClick={() => onOpen(index)}>
                PROJECT DETAILS <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
      {!mirror && <span className="gallery-swipe-hint">SWIPE TO EXPLORE <span aria-hidden="true">↔</span></span>}
    </div>
  );
}
