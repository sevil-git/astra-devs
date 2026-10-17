"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import WorkShowcase from "./work-showcase";
const ArchitecturalScene = dynamic(() => import("./architectural-scene"), {
  ssr: false,
});
import Enquiry from "./enquiry";
import BrandMark from "./brand-mark";
import { useMotionSettings } from "./motion";

const services = [
  {
    title: "Websites",
    hidden: "First impressions. Lasting impact.",
    description:
      "Expressive websites, immersive experiences, and e-commerce. Fast, thoughtful, and built to be remembered.",
  },
  {
    title: "Apps",
    hidden: "From a what if to a daily habit.",
    description:
      "Web apps, mobile apps, and software platforms. Complicated problems, beautifully simple experiences.",
  },
  {
    title: "Automation",
    hidden: "Less busywork. More good work.",
    description:
      "Connect your tools, remove repetitive tasks, and give your team its time back. Let the software handle it.",
  },
  {
    title: "AI & tools",
    hidden: "A little less artificial. A lot more useful.",
    description:
      "Practical AI integrations, custom internal tools, and systems built around the way your business actually works.",
  },
];
const process = [
  {
    number: "01",
    title: "Strategy & discovery",
    detail: "Find the right problem",
    alternate: "Ask better questions",
    hidden: "Before the pixels",
  },
  {
    number: "02",
    title: "Design & prototype",
    detail: "Make the idea tangible",
    alternate: "Move things around",
    hidden: "Until it feels right",
  },
  {
    number: "03",
    title: "Build & connect",
    detail: "Bring it to life",
    alternate: "Make the magic work",
    hidden: "The code does the heavy lifting",
  },
  {
    number: "04",
    title: "Test, launch, evolve",
    detail: "Make a good thing better",
    alternate: "Break it. Fix it. Ship it.",
    hidden: "Then do it all again",
  },
];
const principles = [
  {
    lines: ["Great software", "should feel", "effortless."],
    hidden: ["If it needs", "a manual,", "try again."],
    label: "THE EXPERIENCE",
    caption: "Make the complex feel simple.",
  },
  {
    lines: ["Good code does", "the heavy", "lifting."],
    hidden: ["The best kind", "of magic", "actually works."],
    label: "THE ENGINEERING",
    caption: "Beautiful on the inside, too.",
  },
  {
    lines: ["Build for real", "people.", "Always."],
    hidden: ["Not for awards.", "Not for robots.", "For you."],
    label: "THE PURPOSE",
    caption: "People are the whole point.",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}
function Characters({ text }: { text: string }) {
  return (
    <>
      {[...text].map((char, index) => (
        <span
          className={`character-window ${char === " " ? "character-space" : ""}`}
          key={index}
        >
          <span className="character">{char === " " ? "\u00a0" : char}</span>
        </span>
      ))}
    </>
  );
}
function ScrollText({
  lines,
  secret,
  mirror = false,
  accent = [],
}: {
  lines: string[];
  secret: string[];
  mirror?: boolean;
  accent?: string[];
}) {
  const words = (line: string) =>
    line
      .split(/(\s+)/)
      .map((word, i) =>
        accent.includes(word.replace(/[.,]/g, "")) ? (
          <strong key={i}>{word}</strong>
        ) : (
          <span key={i}>{word}</span>
        ),
      );
  return (
    <div className="maskable-text" data-mask="expand">
      <div
        className={`scroll-copy ${mirror ? "geometry-only" : ""}`}
        data-scroll-copy={!mirror ? "" : undefined}
      >
        {lines.map((line, i) => (
          <span className="copy-line" key={i}>
            <span className="line-ghost">{words(line)}</span>
            <span className="line-ink" aria-hidden="true">
              {words(line)}
            </span>
          </span>
        ))}
      </div>
      {mirror && (
        <div className="alternate-copy">
          {secret.map((line, i) => (
            <span className="copy-line" key={i}>
              {line}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
function RollLink({
  label,
  alternate,
  href,
  onClick,
  active = false,
}: {
  label: string;
  alternate?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const content = (
    <span className="roll-window">
      <span className="roll-normal">{label}</span>
      <span className="roll-alternate" aria-hidden="true">
        {alternate || label}
      </span>
    </span>
  );
  return href ? (
    <a
      className={`roll-link ${active ? "is-active" : ""}`}
      href={href}
      onClick={onClick}
    >
      {content}
    </a>
  ) : (
    <button className="roll-link" onClick={onClick}>
      {content}
    </button>
  );
}

function PageLayer({
  mirror,
  entered,
  activePrinciple,
  onEnquiry,
  openService,
  onService,
}: {
  mirror: boolean;
  entered: boolean;
  activePrinciple: number;
  onEnquiry: () => void;
  openService: number | null;
  onService: (index: number | null) => void;
}) {
  return (
    <>
      <div
        id={!mirror ? "about" : undefined}
        data-section={!mirror ? "about" : undefined}
      >
        <section className="portrait-hero portal-hero">
          {!mirror && entered && <ArchitecturalScene />}
          <div className="hero-center" data-mask="expand">
            <p className="hero-name">
              <span className="hero-eyebrow-rule" aria-hidden="true" />
              <span>ASTRA DEVS</span>
              <span className="hero-descriptor">
                INDEPENDENT SOFTWARE STUDIO
              </span>
            </p>
            <h1
              className="hero-heading"
              aria-label={mirror ? undefined : "Ideas into experiences."}
            >
              {(mirror
                ? ["A little less", "ordinary."]
                : ["Ideas into", "experiences."]
              ).map((line, i) => (
                <span
                  className={`hero-line ${i === 0 ? "hero-opening" : ""}`}
                  key={line}
                  aria-hidden="true"
                >
                  <Characters text={line} />
                </span>
              ))}
            </h1>
            <p className="hero-introduction">
              {mirror
                ? "A little curiosity. A lot of care."
                : "Websites, apps & automations."}
              <br />
              {mirror
                ? "Good ideas deserve a different perspective."
                : "Thoughtfully designed. Beautifully built."}
            </p>
            <a
              className="hero-work-link"
              href="#work"
              tabIndex={mirror ? -1 : undefined}
            >
              <span>Explore our work</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <span className="hero-reveal-hint" aria-hidden="true">
            {mirror ? "A LITTLE LESS ORDINARY." : "HOVER TO SEE ANOTHER SIDE"}
          </span>
          <span className="hero-scene-note" aria-hidden="true">
            A NEW PERSPECTIVE.
          </span>
          <a
            className="hero-scroll"
            href="#studio"
            tabIndex={mirror ? -1 : undefined}
            aria-label="Scroll to about the studio"
          >
            <span>SCROLL TO EXPLORE</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>
        <section className="about-studio" id={!mirror ? "studio" : undefined}>
          <div className="copy-container about-intro">
            <div className="chapter-rule" aria-hidden="true" />
            <Label>01 / THE STUDIO</Label>
            <ScrollText
              mirror={mirror}
              lines={[
                "We build websites, apps,",
                "and automations with a",
                "strong focus on quality",
                "& meaningful impact.",
              ]}
              secret={[
                "A small team. Big ideas.",
                "Curiosity in the details.",
                "Care in every decision,",
                "and code with purpose.",
              ]}
              accent={["websites", "apps", "automations"]}
            />
          </div>
          <div className="capabilities" id={!mirror ? "services" : undefined}>
            <div className="copy-container">
              <Label>WHAT WE DO</Label>
            </div>
            <div className="capability-list">
              {services.map((service, index) => (
                <div
                  className={`capability-row full-row ${openService === index ? "is-open" : ""}`}
                  key={service.title}
                  data-mask="hide"
                >
                  <button
                    className="row-button"
                    onClick={() =>
                      onService(openService === index ? null : index)
                    }
                    aria-expanded={openService === index}
                    aria-label={`${service.title}: ${service.description}`}
                  >
                    <div className="copy-container">
                      <h2 className="oversize-heading">{service.title}</h2>
                      <span className="service-toggle" aria-hidden="true">
                        {openService === index ? "−" : "+"}
                      </span>
                    </div>
                  </button>
                  <div className="row-orange" aria-hidden="true">
                    <div className="copy-container row-reveal-content">
                      <h2>{service.title}</h2>
                      <span
                        className="service-toggle service-toggle-close"
                        aria-hidden="true"
                      >
                        −
                      </span>
                      <p>
                        {service.description}
                        <small>{service.hidden}</small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div data-section={!mirror ? "work" : undefined}>
        <section
          className="experience-section"
          id={!mirror ? "approach" : undefined}
        >
          <div className="work-background portal-echo" aria-hidden="true" />
          <div className="copy-container experience-intro">
            <div className="chapter-rule" aria-hidden="true" />
            <Label>02 / THE PROCESS</Label>
            <ScrollText
              mirror={mirror}
              lines={[
                "From the first what if",
                "to the final little detail.",
                "We bring design and",
                "engineering together",
                "to make things happen.",
              ]}
              secret={[
                "Less passing the buck.",
                "More getting stuck in.",
                "We care about how it",
                "feels, how it works,",
                "and what comes next.",
              ]}
              accent={["design", "engineering"]}
            />
          </div>
          <div className="process-history">
            <div className="copy-container">
              <Label>HOW WE BUILD</Label>
            </div>
            {process.map((row) => (
              <div
                className="history-row full-row"
                key={row.number}
                data-mask="hide"
              >
                <div className="copy-container history-content">
                  <span>{row.number}</span>
                  <h3>{row.title}</h3>
                  <p>{row.detail}</p>
                </div>
                <div className="row-orange" aria-hidden="true">
                  <div className="copy-container history-content">
                    <span>{row.number}</span>
                    <h3>{row.alternate}</h3>
                    <p>{row.hidden}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="selected-work" id={!mirror ? "work" : undefined}>
          <div className="copy-container projects-intro">
            <div className="chapter-rule" aria-hidden="true" />
            <Label>03 / SELECTED WORK</Label>
            <h2 className="work-section-heading">
              Different worlds.
              <br />
              <em>The same care.</em>
            </h2>
            <p className="work-section-intro">
              A storefront. A platform. An interactive playground. A considered
              experience, every time.
            </p>
          </div>
          <div className="copy-container work-showcase-container">
            <WorkShowcase mirror={mirror} />
          </div>
        </section>
        <section className="principles-section">
          <div className="copy-container">
            <div className="chapter-rule" aria-hidden="true" />
            <Label>04 / OUR PRINCIPLES</Label>
            <div className="principles-grid">
              <div className="principles-statements">
                {principles.map((principle, index) => (
                  <article
                    className="principle"
                    data-principle={!mirror ? index : undefined}
                    key={principle.label}
                  >
                    <span className="quote-mark" aria-hidden="true">
                      “
                    </span>
                    <ScrollText
                      mirror={mirror}
                      lines={principle.lines}
                      secret={principle.hidden}
                    />
                    <p className="principle-signature">
                      {principle.label}
                      <span>{principle.caption}</span>
                    </p>
                  </article>
                ))}
              </div>
              <aside
                className="principles-rail"
                aria-label={mirror ? undefined : "Jump to a studio principle"}
              >
                <span
                  className="rail-indicator"
                  style={{ transform: `translateY(${activePrinciple * 100}%)` }}
                >
                  ▸
                </span>
                {principles.map((p, i) => (
                  <button
                    className={`principle-thumb thumb-${i} ${activePrinciple === i ? "is-active" : ""}`}
                    key={p.label}
                    onClick={() =>
                      document
                        .querySelector(`[data-principle="${i}"]`)
                        ?.scrollIntoView({
                          behavior: matchMedia(
                            "(prefers-reduced-motion: reduce)",
                          ).matches
                            ? "instant"
                            : "smooth",
                          block: "center",
                        })
                    }
                    aria-label={p.label}
                    aria-pressed={activePrinciple === i}
                  >
                    <span>
                      <span className="principle-index">0{i + 1}</span>
                    </span>
                  </button>
                ))}
              </aside>
            </div>
          </div>
        </section>
      </div>
      <div data-section={!mirror ? "contact" : undefined}>
        <section className="motto-section">
          <div className="motto-background parallax-media" data-parallax="0.12">
            {!mirror && (
              <img
                src="/images/threshold/threshold-desktop.webp"
                alt=""
                width="1672"
                height="941"
                loading="lazy"
              />
            )}
          </div>
          <div className="motto-center">
            <Label>THE ASTRA APPROACH</Label>
            <h2
              className="motto-heading"
              data-mask="expand"
              aria-label={
                mirror ? "Less noise. More impact." : "Good code feels human."
              }
            >
              {(mirror
                ? ["Less noise.", "More impact."]
                : ["Good code", "feels human."]
              ).map((line, i) => (
                <span className="motto-line" key={i}>
                  <Characters text={line} />
                </span>
              ))}
            </h2>
            <p>Astra devs</p>
          </div>
        </section>
        <section
          className="connect-section"
          id={!mirror ? "contact" : undefined}
        >
          <div className="copy-container contact-invitation">
            <span className="section-label">05 / THE NEXT CHAPTER</span>
            <button onClick={onEnquiry}>
              <span>Let’s make</span>
              <br />
              it happen.
              <Arrow diagonal />
            </button>
            <p>
              A website. A product. A simpler way to work. Every good project
              starts with a conversation.
            </p>
          </div>
          <div className="copy-container connect-grid">
            <div>
              <Label>CONNECT</Label>
              <div className="connect-links">
                <div>
                  <RollLink
                    label="Our work"
                    alternate="The ideas"
                    href="#work"
                  />
                  <RollLink
                    label="Capabilities"
                    alternate="The good stuff"
                    href="#services"
                  />
                  <RollLink
                    label="The studio"
                    alternate="The people"
                    href="#studio"
                  />
                </div>
                <div>
                  <RollLink
                    label="Our approach"
                    alternate="How it happens"
                    href="#approach"
                  />
                  <RollLink
                    label="Start a project"
                    alternate="Make a little magic"
                    onClick={onEnquiry}
                  />
                  <RollLink
                    label="Back to top"
                    alternate="One more time"
                    href="#about"
                  />
                </div>
              </div>
            </div>
            <div className="contact-details">
              <div>
                <span className="contact-detail-label">
                  Have an idea? Say hello.
                </span>
                <a
                  className="contact-email"
                  href="mailto:kalesahil565@gmail.com"
                >
                  kalesahil565@gmail.com <Arrow diagonal />
                </a>
              </div>
              <div>
                <span className="contact-detail-label">
                  Not quite sure yet?
                </span>
                <RollLink
                  label="Start with a brief"
                  alternate="Let’s figure it out"
                  onClick={onEnquiry}
                />
              </div>
            </div>
          </div>
          <p className="end-credit">
            ASTRA DEVS — INDEPENDENT SOFTWARE STUDIO <span>© 2026</span>
          </p>
        </section>
      </div>
    </>
  );
}

export default function Portfolio() {
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [openService, setOpenService] = useState<number | null>(null);
  const { reduced, fine, compact } = useMotionSettings();
  const entrancePlayed = useRef(false);
  const [touchReveal, setTouchReveal] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const audioRef = useRef<{
    context: AudioContext;
    gain: GainNode;
    oscillators: OscillatorNode[];
  } | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maskRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    radius: 0,
    hold: false,
  });
  const radiusTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    let cancelled = false;
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 95,
      duration: 2,
      onUpdate: () => {
        if (progressRef.current)
          progressRef.current.textContent = `${Math.round(counter.value)}%`;
      },
    });
    const timeout = setTimeout(() => finish(), 4000);
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      clearTimeout(timeout);
      tween.kill();
      gsap.to(counter, {
        value: 100,
        duration: 0.35,
        onUpdate: () => {
          if (progressRef.current)
            progressRef.current.textContent = `${Math.round(counter.value)}%`;
        },
        onComplete: () => {
          setReady(true);
        },
      });
    };
    const artwork = new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = matchMedia("(max-width: 767.98px)").matches
        ? "/images/threshold/threshold-mobile.webp"
        : "/images/threshold/threshold-desktop.webp";
    });
    void Promise.all([document.fonts.ready, artwork]).then(finish);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      tween.kill();
    };
  }, []);
  useEffect(() => {
    if (ready) startRef.current?.focus({ preventScroll: true });
  }, [ready]);
  useEffect(() => {
    if (!entered) return;
    const timer = window.setTimeout(
      () => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      },
      reduced ? 0 : 600,
    );
    return () => clearTimeout(timer);
  }, [openService, entered, reduced]);

  useEffect(() => {
    if (!entered || !rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const maskState = maskRef.current;
    const maskLayer = root.querySelector<HTMLElement>(".mask-layer");
    const readingProgress =
      root.querySelector<HTMLElement>(".reading-progress");
    ScrollTrigger.config({ ignoreMobileResize: true });
    const playEntrance = !entrancePlayed.current;
    entrancePlayed.current = true;
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: fine && !reduced,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    const getRadius = (kind: string) =>
      kind === "expand"
        ? Math.max(70, (innerWidth * 225) / 1728)
        : kind === "hide"
          ? 0
          : Math.max(8, (innerWidth * 20) / 1728);
    let currentKind = "";
    const updateMaskTarget = (target: Element | null) => {
      if (!fine || maskRef.current.hold || !target) return;
      const kind = target.closest(
        "a,button,input,textarea,select,dialog,[data-mask='hide']",
      )
        ? "hide"
        : target.closest("[data-mask='expand']")
          ? "expand"
          : "normal";
      if (kind === currentKind) return;
      currentKind = kind;
      radiusTween.current?.kill();
      radiusTween.current = gsap.to(maskRef.current, {
        radius: getRadius(kind),
        duration: reduced ? 0 : kind === "hide" ? 0.3 : 0.6,
        ease: "power3.out",
      });
    };
    lenis.on("scroll", () => {
      ScrollTrigger.update();
      const mask = maskRef.current;
      if (mask.targetX !== -1000)
        updateMaskTarget(document.elementFromPoint(mask.targetX, mask.targetY));
    });
    const move = (event: PointerEvent) => {
      if (!fine || event.pointerType === "touch" || maskRef.current.hold)
        return;
      const cursor = maskRef.current;
      if (cursor.targetX === -1000) {
        cursor.x = event.clientX;
        cursor.y = event.clientY;
      }
      cursor.targetX = event.clientX;
      cursor.targetY = event.clientY;
      updateMaskTarget(event.target as Element);
    };
    const leave = () => {
      currentKind = "";
      if (!maskRef.current.hold) {
        radiusTween.current?.kill();
        radiusTween.current = gsap.to(maskRef.current, {
          radius: 0,
          duration: 0.3,
        });
      }
    };
    let lastMask = "",
      lastProgress = "",
      lastRadius = -1;
    const tick = (time: number, delta: number) => {
      lenis.raf(time * 1000);
      const m = maskRef.current;
      if (fine || m.hold || m.radius > 0.01 || lastRadius !== m.radius) {
        const alpha = reduced
          ? 1
          : 1 - Math.pow(0.001, Math.min(delta / 1000, 0.05));
        m.x += (m.targetX - m.x) * alpha;
        m.y += (m.targetY - m.y) * alpha;
        const values = `${m.x.toFixed(2)},${(m.y + window.scrollY).toFixed(2)},${m.radius.toFixed(2)}`;
        if (values !== lastMask) {
          maskLayer?.style.setProperty("--mask-x", `${m.x.toFixed(2)}px`);
          maskLayer?.style.setProperty(
            "--mask-y",
            `${(m.y + window.scrollY).toFixed(2)}px`,
          );
          maskLayer?.style.setProperty(
            "--mask-radius",
            `${m.radius.toFixed(2)}px`,
          );
          lastMask = values;
        }
        lastRadius = m.radius;
      }
      const progress = lenis.progress.toFixed(5);
      if (progress !== lastProgress) {
        readingProgress?.style.setProperty("--reading-progress", progress);
        lastProgress = progress;
      }
    };
    const anchor = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        "a[href^='#']",
      );
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const section = document.getElementById(href.slice(1));
      if (!section) return;
      event.preventDefault();
      lenis.scrollTo(section, {
        duration: reduced ? 0 : compact ? 0.8 : 1.15,
        offset: 0,
        onComplete: () => {
          if (!section.hasAttribute("tabindex"))
            section.setAttribute("tabindex", "-1");
          section.focus({ preventScroll: true });
        },
      });
      if (location.hash !== href) history.pushState(null, "", href);
    };
    root.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    document.addEventListener("click", anchor);
    gsap.ticker.add(tick);
    const context = gsap.context(() => {
      if (playEntrance) {
        gsap.fromTo(
          ".hero-name",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0 : 0.8,
            delay: reduced ? 0 : 0.35,
            ease: "power3.out",
          },
        );
        gsap.fromTo(
          ".hero-introduction,.hero-work-link",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0 : 0.9,
            delay: reduced ? 0 : compact ? 0.9 : 1.2,
            stagger: reduced ? 0 : 0.09,
            ease: "power3.out",
          },
        );
        const darkCharacters = root.querySelectorAll(
          ".base-layer .hero-heading .character",
        );
        const redCharacters = root.querySelectorAll(
          ".mask-layer .hero-heading .character",
        );
        [darkCharacters, redCharacters].forEach((chars) =>
          gsap.fromTo(
            chars,
            { yPercent: 115, rotationX: 20 },
            {
              yPercent: 0,
              rotationX: 0,
              duration: reduced ? 0 : compact ? 1.05 : 1.4,
              delay: reduced ? 0 : compact ? 0.35 : 0.6,
              stagger: reduced ? 0 : compact ? 0.008 : 0.012,
              ease: "power3.out",
            },
          ),
        );
      }
      root
        .querySelectorAll<HTMLElement>(".base-layer [data-scroll-copy]")
        .forEach((paragraph) => {
          const lines = paragraph.querySelectorAll<HTMLElement>(".line-ink");
          if (reduced) {
            gsap.set(lines, { clipPath: "inset(0% 0% 0% 0%)" });
            return;
          }
          gsap.fromTo(
            lines,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: compact || !fine ? 0.7 : 1,
              stagger: compact || !fine ? 0.08 : 1,
              ease: compact || !fine ? "power3.out" : "none",
              scrollTrigger:
                compact || !fine
                  ? { trigger: paragraph, start: "top 88%", once: true }
                  : {
                      trigger: paragraph,
                      start: "top 90%",
                      end: "bottom 65%",
                      scrub: 0.25,
                    },
            },
          );
        });
      if (!reduced) {
        if (fine && !compact)
          root
            .querySelectorAll<HTMLElement>(".base-layer [data-parallax]")
            .forEach((media) => {
              const amount = Number(media.dataset.parallax || 0);
              gsap.to(media, {
                y: () => media.parentElement!.offsetHeight * amount,
                ease: "none",
                scrollTrigger: {
                  trigger: media.parentElement,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                },
              });
            });
        root
          .querySelectorAll<HTMLElement>(".base-layer .full-row")
          .forEach((row) => {
            gsap.fromTo(
              row.querySelectorAll(".row-button h2,.history-content h3"),
              { yPercent: 80, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: compact ? 0.65 : 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: row, start: "top 96%", once: true },
              },
            );
          });
      }
      root
        .querySelectorAll<HTMLElement>(
          ".base-layer [data-studio-enter],.base-layer [data-project-media]",
        )
        .forEach((element) => {
          if (reduced) return;
          const media = element.hasAttribute("data-project-media");
          gsap.fromTo(
            element,
            { opacity: 0, y: compact ? 18 : media ? 36 : 22 },
            {
              opacity: 1,
              y: 0,
              duration: compact ? 0.7 : media ? 1.2 : 0.95,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 93%", once: true },
            },
          );
        });
      root
        .querySelectorAll<HTMLElement>(".base-layer .chapter-rule")
        .forEach((rule) => {
          if (reduced) return;
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: compact ? 0.8 : 1.4,
              ease: "power3.out",
              scrollTrigger: { trigger: rule, start: "top 92%", once: true },
            },
          );
        });
      root.querySelectorAll<HTMLElement>("[data-section]").forEach((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive)
              setActiveSection(section.dataset.section || "about");
          },
        }),
      );
      root
        .querySelectorAll<HTMLElement>("[data-principle]")
        .forEach((section) =>
          ScrollTrigger.create({
            trigger: section,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              if (self.isActive)
                setActivePrinciple(Number(section.dataset.principle));
            },
          }),
        );
      root
        .querySelectorAll<HTMLElement>(
          ".base-layer .motto-heading,.mask-layer .motto-heading",
        )
        .forEach((heading) =>
          gsap.fromTo(
            heading.querySelectorAll(".character"),
            { yPercent: 105 },
            {
              yPercent: 0,
              duration: reduced ? 0 : 1.2,
              stagger: reduced ? 0 : 0.02,
              ease: "power3.out",
              scrollTrigger: { trigger: heading, start: "top 85%", once: true },
            },
          ),
        );
      ScrollTrigger.refresh();
    }, root);
    let resizeTimer = 0;
    let viewportWidth = innerWidth,
      viewportHeight = innerHeight;
    const resize = () => {
      const widthChanged = innerWidth !== viewportWidth;
      const heightChanged = Math.abs(innerHeight - viewportHeight) > 140;
      if (!widthChanged && !heightChanged) return;
      if (
        !widthChanged &&
        document.activeElement?.matches("input,textarea,select")
      )
        return;
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        viewportWidth = innerWidth;
        viewportHeight = innerHeight;
        lenis.resize();
        ScrollTrigger.refresh();
      }, 180);
    };
    const popstate = () => {
      const section = document.getElementById(location.hash.slice(1));
      if (section) lenis.scrollTo(section, { immediate: true, offset: 0 });
    };
    const focusTimeout = window.setTimeout(
      () => {
        if (playEntrance)
          document.getElementById("main")?.focus({ preventScroll: true });
      },
      reduced ? 0 : 450,
    );
    let disposed = false;
    void document.fonts.ready.then(() => {
      if (!disposed) {
        lenis.resize();
        ScrollTrigger.refresh();
      }
    });
    window.addEventListener("resize", resize);
    window.addEventListener("popstate", popstate);
    return () => {
      disposed = true;
      window.clearTimeout(focusTimeout);
      window.clearTimeout(resizeTimer);
      context.revert();
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(tick);
      root.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      document.removeEventListener("click", anchor);
      window.removeEventListener("resize", resize);
      window.removeEventListener("popstate", popstate);
      radiusTween.current?.kill();
      maskState.radius = 0;
      maskLayer?.style.setProperty("--mask-radius", "0px");
    };
  }, [entered, reduced, fine, compact]);

  useEffect(() => {
    if (enquiryOpen) {
      lenisRef.current?.stop();
      return;
    }
    const timer = setTimeout(
      () => lenisRef.current?.start(),
      reduced ? 0 : 280,
    );
    return () => clearTimeout(timer);
  }, [enquiryOpen, reduced, fine, compact, entered]);
  useEffect(
    () => () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      audioRef.current?.oscillators.forEach((o) => o.stop());
      audioRef.current?.context.close();
    },
    [],
  );
  useEffect(() => {
    const release = () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (!maskRef.current.hold) return;
      maskRef.current.hold = false;
      setTouchReveal(false);
      radiusTween.current?.kill();
      radiusTween.current = gsap.to(maskRef.current, {
        radius: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    };
    const visibility = () => {
      if (document.hidden) release();
    };
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const openEnquiry = () => {
    setEnquiryOpen(true);
  };
  const reveal = (active: boolean, element?: HTMLElement) => {
    const mask = maskRef.current;
    mask.hold = active;
    setTouchReveal(active);
    if (active) {
      const r = element?.getBoundingClientRect();
      mask.targetX = mask.x = r ? r.left + r.width / 2 : innerWidth / 2;
      mask.targetY = mask.y = r ? r.top + r.height / 2 : innerHeight / 2;
    }
    radiusTween.current?.kill();
    radiusTween.current = gsap.to(mask, {
      radius: active ? Math.max(innerWidth, innerHeight) * 1.3 : 0,
      duration: reduced ? 0 : active ? 0.8 : 0.45,
      ease: "power3.out",
    });
  };
  const toggleSound = async () => {
    try {
      if (!audioRef.current) {
        const context = new AudioContext();
        const gain = context.createGain();
        gain.gain.value = 0;
        gain.connect(context.destination);
        const oscillators = [55, 82.4069, 110, 164.8138].map((frequency, i) => {
          const oscillator = context.createOscillator();
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          oscillator.detune.value = i % 2 ? 3 : -3;
          oscillator.connect(gain);
          oscillator.start();
          return oscillator;
        });
        audioRef.current = { context, gain, oscillators };
      }
      await audioRef.current.context.resume();
      audioRef.current.gain.gain.setTargetAtTime(
        soundOn ? 0 : 0.015,
        audioRef.current.context.currentTime,
        0.5,
      );
      setSoundOn(!soundOn);
    } catch {
      setSoundOn(false);
    }
  };

  return (
    <div
      className={`motion-site ${entered ? "has-entered" : ""} ${touchReveal ? "touch-revealed" : ""}`}
      ref={rootRef}
    >
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div
        className={`intro-screen ${ready ? "is-ready" : ""}`}
        role={!entered ? "dialog" : undefined}
        aria-modal={!entered ? true : undefined}
        aria-label={!entered ? "Enter Astra devs" : undefined}
        aria-hidden={entered}
      >
        <div className="intro-brand">
          <BrandMark
            className="intro-mark"
            interactive
            active={!entered}
            intro
          />
          <span>ASTRA DEVS</span>
        </div>
        <button
          className="intro-enter"
          ref={startRef}
          disabled={!ready}
          onClick={() => {
            window.scrollTo(0, 0);
            setEntered(true);
          }}
        >
          <span
            className="intro-progress"
            ref={progressRef}
            aria-hidden={ready}
          >
            0%
          </span>
          <span className="intro-start">START</span>
        </button>
      </div>
      <header className="fixed-header" inert={!entered}>
        <a className="fixed-logo" href="#about" aria-label="Astra devs home">
          <BrandMark interactive active={entered} />
          <span className="header-wordmark" aria-hidden="true">
            astra devs
          </span>
        </a>
        <nav className="fixed-navigation" aria-label="Main navigation">
          {["about", "work", "contact"].map((section) => (
            <RollLink
              key={section}
              label={section.toUpperCase()}
              href={`#${section}`}
              active={activeSection === section}
            />
          ))}
        </nav>
      </header>
      <main id="main" className="layer-root" tabIndex={-1} inert={!entered}>
        <div className="base-layer">
          <PageLayer
            mirror={false}
            entered={entered}
            activePrinciple={activePrinciple}
            onEnquiry={openEnquiry}
            openService={openService}
            onService={setOpenService}
          />
        </div>
        <div className="mask-layer" aria-hidden="true" inert>
          <PageLayer
            mirror
            entered={entered}
            activePrinciple={activePrinciple}
            onEnquiry={() => {}}
            openService={openService}
            onService={() => {}}
          />
        </div>
      </main>
      <footer className="fixed-footer" inert={!entered}>
        <div className="footer-shortcuts">
          <a href="#work" aria-label="Explore our work">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 9h18M7 7h.1m3 0h.1" />
            </svg>
          </a>
          <a href="#services" aria-label="Explore our services">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 18" />
            </svg>
          </a>
          <button onClick={openEnquiry} aria-label="Start a project">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 5 9 8 9-8" />
            </svg>
          </button>
        </div>
        <button
          className="sound-toggle"
          onClick={toggleSound}
          aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
          aria-pressed={soundOn}
        >
          <span>SOUND</span>
          <span className={soundOn ? "selected" : ""}>ON</span>
          <span className={!soundOn ? "selected" : ""}>OFF</span>
          <i className={soundOn ? "sound-bars is-on" : "sound-bars"}>
            <b />
            <b />
            <b />
            <b />
          </i>
        </button>
      </footer>
      <button
        className="touch-hold"
        aria-label="Hold to reveal the alternate page"
        aria-pressed={touchReveal}
        onPointerDown={(e) => {
          const target = e.currentTarget;
          target.setPointerCapture(e.pointerId);
          holdTimer.current = setTimeout(() => reveal(true, target), 500);
        }}
        onPointerUp={() => {
          if (holdTimer.current) clearTimeout(holdTimer.current);
          reveal(false);
        }}
        onLostPointerCapture={() => {
          if (holdTimer.current) clearTimeout(holdTimer.current);
          reveal(false);
        }}
        onBlur={() => {
          if (holdTimer.current) clearTimeout(holdTimer.current);
          reveal(false);
        }}
        onContextMenu={(e) => e.preventDefault()}
        onPointerCancel={() => {
          if (holdTimer.current) clearTimeout(holdTimer.current);
          reveal(false);
        }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            reveal(true, e.currentTarget);
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") reveal(false);
        }}
        inert={!entered}
      >
        <svg className="hold-ring" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path
              id="hold-circle"
              d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0"
            />
          </defs>
          <text>
            <textPath href="#hold-circle">
              HOLD TO REVEAL · HOLD TO REVEAL ·{" "}
            </textPath>
          </text>
        </svg>
        <svg className="hold-hand" viewBox="0 0 32 32" aria-hidden="true">
          <path
            d="M11 18V7a2 2 0 0 1 4 0v9-4a2 2 0 0 1 4 0v4-2a2 2 0 0 1 4 0v3-1a2 2 0 0 1 4 0v7c0 5-3 8-8 8-3 0-5-2-7-4l-6-6a2 2 0 0 1 3-3l3 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Enquiry open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
