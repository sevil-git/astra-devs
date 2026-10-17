"use client";

import { useCallback, useEffect, useRef, useState, type RefObject, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import WorkShowcase from "./work-showcase";
const ArchitecturalScene = dynamic(() => import("./architectural-scene"));
import Enquiry from "./enquiry";
import BrandMark from "./brand-mark";
import HoldReveal, { type HoldStage } from "./hold-reveal";
import { useMotionSettings } from "./motion";
import FooterControls from "./footer-controls";

const services = [
  {
    title: "Websites",
    hidden: "Pretty. Fast. No loading wheel of doom.",
    description:
      "Expressive websites, immersive experiences, and e-commerce. Fast, thoughtful, and built to be remembered.",
  },
  {
    title: "Apps",
    hidden: "The app people open. Not just download.",
    description:
      "Web apps, mobile apps, and software platforms. Complicated problems, beautifully simple experiences.",
  },
  {
    title: "Automation",
    hidden: "Because copy-paste is not a career plan.",
    description:
      "Connect your tools, remove repetitive tasks, and give your team its time back. Let the software handle it.",
  },
  {
    title: "AI & tools",
    hidden: "Useful intelligence. No robot uprising.",
    description:
      "Practical AI integrations, custom internal tools, and systems built around the way your business actually works.",
  },
];
const process = [
  {
    number: "01",
    title: "Strategy & discovery",
    detail: "Find the right problem",
    alternate: "Ask the awkward questions",
    hidden: "Before the pixels",
  },
  {
    number: "02",
    title: "Design & prototype",
    detail: "Make the idea tangible",
    alternate: "Move it two pixels",
    hidden: "Yes, those two pixels matter",
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
    hidden: "Preferably in that order",
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
    hidden: ["It works on", "your machine,", "too."],
    label: "THE ENGINEERING",
    caption: "Beautiful on the inside, too.",
  },
  {
    lines: ["Build for real", "people.", "Always."],
    hidden: ["Made for people.", "Even the ones", "who hate tech."],
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
      aria-current={active ? "location" : undefined}
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
  journey,
  afterHours,
  onNightReady,
}: {
  mirror: boolean;
  entered: boolean;
  activePrinciple: number;
  onEnquiry: () => void;
  openService: number | null;
  onService: (index: number | null) => void;
  journey: RefObject<number>;
  afterHours: boolean;
  onNightReady: (ready: boolean) => void;
}) {
  return (
    <>
      <div
        className="about-sequence"
        id={!mirror ? "about" : undefined}
        data-section={!mirror ? "about" : undefined}
      >
        <div className="portal-journey">
          <section className="portrait-hero portal-hero">
            {!mirror && <ArchitecturalScene journey={journey} active={entered} afterHours={afterHours} onNightReady={onNightReady} />}
            <div className="hero-center" data-mask="expand">
              <h1
                className="hero-heading"
                aria-label={mirror ? undefined : "From what if to holy shit."}
              >
                {(mirror
                  ? ["Less blah blah.", "More ta-da."]
                  : ["From “what if”", "to “holy shit.”"]
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
                  ? "We take the work seriously."
                  : "Websites, apps & automations."}
                <br />
                {mirror
                  ? "Ourselves? A little less."
                  : "Good software. Minus the drama."}
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
              {mirror ? "LESS BLAH BLAH. MORE TA-DA." : "HOVER TO SEE ANOTHER SIDE"}
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
            <div className="portal-blackout" aria-hidden="true" />
          </section>
        </div>
        <section className="about-studio" id={!mirror ? "studio" : undefined}>
          <div className="studio-intro-stage">
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
                  "Big ideas. Small egos.",
                  "Far too many tabs open.",
                  "Care in every decision,",
                  "and code with purpose.",
                ]}
                accent={["websites", "apps", "automations"]}
              />
            </div>
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
              Built to work.
              <br />
              <em>Hard to ignore.</em>
            </h2>
            <p className="work-section-intro">
              A drinks brand. A music platform. A keyboard playground.
              We have range. And apparently, hobbies.
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
                    id={!mirror ? `principle-${index + 1}` : undefined}
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
                  <a
                    className={`principle-thumb thumb-${i} ${activePrinciple === i ? "is-active" : ""}`}
                    key={p.label}
                    href={`#principle-${i + 1}`}
                    tabIndex={mirror ? -1 : undefined}
                    aria-label={p.label}
                    aria-current={activePrinciple === i ? "step" : undefined}
                  >
                    <span>
                      <span className="principle-index">0{i + 1}</span>
                    </span>
                  </a>
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
              <span>Let’s build</span>
              <br />
              the good stuff.
              <Arrow diagonal />
            </button>
            <p>
              A website. An app. A task you wish a robot would do. Tell us what
              you have in mind. Napkin sketches are a perfectly good start.
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
                    alternate="Napkins welcome"
                    onClick={onEnquiry}
                  />
                  <RollLink
                    label="Back to top"
                    alternate="Miss us already?"
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
  const [afterHours, setAfterHours] = useState(false);
  const [nightReady, setNightReady] = useState(false);
  const [nightNotice, setNightNotice] = useState(false);
  const logoTaps = useRef({ count: 0, last: 0 });
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [openService, setOpenService] = useState<number | null>(null);
  const { reduced, fine, compact, shortLandscape } = useMotionSettings();
  const entrancePlayed = useRef(false);
  const journeyRef = useRef(0);
  const [touchReveal, setTouchReveal] = useState(false);
  const [holdStage, setHoldStage] = useState<HoldStage>("idle");
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const audioRef = useRef<{
    context: AudioContext;
    gain: GainNode;
    oscillators: OscillatorNode[];
  } | null>(null);
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
    if (!afterHours || !nightReady) return;
    const show = setTimeout(() => setNightNotice(true), reduced ? 0 : 1700);
    const hide = setTimeout(() => setNightNotice(false), 8000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [afterHours, nightReady, reduced]);

  const tapLogo = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.button !== 0) return;
    const now = performance.now();
    const taps = logoTaps.current;
    taps.count = now - taps.last < 1100 ? taps.count + 1 : 1;
    taps.last = now;
    if (taps.count !== 3) return;
    taps.count = 0;
    // Ordinary clicks remain Home links; the third click owns the secret gesture.
    event.preventDefault();
    event.stopPropagation();
    setNightNotice(false);
    setAfterHours(value => !value);
  };

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
      image.onload = () => { void image.decode().catch(() => {}).then(() => resolve()); };
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
    const root = rootRef.current;
    if (!entered || !compact || !root) return;
    // The footer has its own index. Hide floating chrome only while it would
    // cross those links, rather than drawing two menus on top of each other.
    const targets = root.querySelectorAll(".base-layer .connect-grid,.base-layer .end-credit");
    const visible = new Set<Element>();
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      visible.clear();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        root.classList.toggle("is-footer-index-overlap", visible.size > 0);
      }, { rootMargin: `0px 0px -${Math.max(0, innerHeight - 160)}px 0px` });
      targets.forEach((target) => observer.observe(target));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
      root.classList.remove("is-footer-index-overlap");
    };
  }, [entered, compact]);
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
      lerp: 0.085,
      wheelMultiplier: 0.9,
      smoothWheel: !reduced,
      syncTouch: false,
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
      if (!fine || compact || maskRef.current.hold || !target) return;
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
      if (!fine || compact || event.pointerType === "touch" || maskRef.current.hold)
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
      if ((fine && !compact) || m.hold || m.radius > 0.01 || lastRadius !== m.radius) {
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
        offset: section.hasAttribute("data-principle")
          ? -Math.max(0, (innerHeight - section.offsetHeight) / 2)
          : 0,
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
    // Native sticky stages keep both text layers registered. No pin spacers.
    const journeys = [...root.querySelectorAll<HTMLElement>(".portal-journey")];
    const hero = root.querySelector<HTMLElement>(".base-layer .portal-hero");
    const chrome = [
      ...root.querySelectorAll<HTMLElement>(
        ".fixed-header,.fixed-footer,.touch-hold",
      ),
    ];
    const smooth = (from: number, to: number, value: number) => {
      const t = Math.max(0, Math.min(1, (value - from) / (to - from)));
      return t * t * (3 - 2 * t);
    };
    const playhead = { value: 0 };
    const drawJourney = () => {
      const p = playhead.value;
      journeyRef.current = p;
      const copy = 1 - smooth(0.025, 0.19, p);
      const blackout = smooth(0.79, 0.96, p);
      journeys.forEach((stage) => {
        stage.style.setProperty("--portal-copy-opacity", copy.toFixed(4));
        stage.style.setProperty("--portal-copy-y", `${-24 * (1 - copy)}px`);
        stage.style.setProperty("--portal-blackout", blackout.toFixed(4));
        stage.style.setProperty(
          "--portal-shade-opacity",
          (1 - smooth(0.08, 0.4, p)).toFixed(4),
        );
        stage.style.setProperty(
          "--portal-fallback-scale",
          (1 + 7 * smooth(0.06, 0.78, p)).toFixed(4),
        );
      });
      // The black cut is brief; navigation returns as the next chapter arrives.
      const chromeOpacity = 1 - smooth(0.72, 0.9, p) * (1 - smooth(0.96, 1, p));
      const holdOpacity = 1 - smooth(0.1, 0.25, p) * (1 - smooth(0.96, 1, p));
      root.style.setProperty("--portal-chrome-opacity", chromeOpacity.toFixed(4));
      root.style.setProperty("--portal-hold-opacity", holdOpacity.toFixed(4));
      root.style.setProperty("--studio-arrival-opacity", smooth(0.83, 0.93, p).toFixed(4));
      root.style.setProperty("--studio-arrival-black", smooth(0.79, 0.91, p).toFixed(4));
      root.classList.toggle("is-portal-travelling", p > 0.15 && p < 1);
      if (hero) hero.inert = p > 0.2;
      chrome.forEach((element) => {
        element.inert =
          (element.classList.contains("touch-hold") ? holdOpacity : chromeOpacity) < 0.05;
      });
    };
    const context = gsap.context(() => {
      const stage = journeys[0];
      if (!reduced && !shortLandscape && stage && hero) {
        gsap.to(playhead, {
          value: 1,
          ease: "none",
          onUpdate: drawJourney,
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom bottom",
            scrub: compact ? 0.2 : 0.3,
            invalidateOnRefresh: true,
          },
        });
      }
      if (playEntrance) {
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
          const studioStage = paragraph.closest(".studio-intro-stage");
          if (studioStage && !shortLandscape) {
            gsap.set(lines, { clipPath: "inset(0% 100% 0% 0%)" });
            gsap.to(lines, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              stagger: 1,
              ease: "none",
              scrollTrigger: {
                trigger: studioStage,
                start: () => `top+=${((journeys[0]?.offsetHeight ?? 0) - (hero?.offsetHeight ?? 0)) * 0.1} top`,
                end: "bottom bottom",
                scrub: compact ? 0.2 : 0.3,
                invalidateOnRefresh: true,
              },
            });
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
      journeyRef.current = 0;
      journeys.forEach((stage) => {
        [
          "--portal-copy-opacity", "--portal-copy-y", "--portal-blackout",
          "--portal-shade-opacity", "--portal-fallback-scale",
        ].forEach((property) => stage.style.removeProperty(property));
      });
      root.style.removeProperty("--portal-chrome-opacity");
      root.style.removeProperty("--portal-hold-opacity");
      root.style.removeProperty("--studio-arrival-opacity");
      root.style.removeProperty("--studio-arrival-black");
      root.classList.remove("is-portal-travelling");
      if (hero) hero.inert = false;
      chrome.forEach((element) => { element.inert = false; });
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
      maskState.hold = false;
      maskState.targetX = -1000;
      maskState.targetY = -1000;
      maskLayer?.style.setProperty("--mask-radius", "0px");
    };
  }, [entered, reduced, fine, compact, shortLandscape]);

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
      audioRef.current?.oscillators.forEach((o) => o.stop());
      audioRef.current?.context.close();
    },
    [],
  );
  const openEnquiry = () => { setEnquiryOpen(true); };
  const changeHoldStage = useCallback((stage: HoldStage, button: HTMLButtonElement) => {
    setHoldStage(stage);
    const mask = maskRef.current;
    radiusTween.current?.kill();
    if (stage === "idle") {
      mask.hold = false;
      setTouchReveal(false);
      radiusTween.current = gsap.to(mask, {
        radius: 0, duration: reduced || document.hidden ? 0 : 0.6, ease: "power3.inOut",
        onComplete: () => {
          mask.hold = false;
          mask.targetX = -1000;
          mask.targetY = -1000;
        },
      });
      return;
    }
    const rect = button.getBoundingClientRect();
    mask.hold = true;
    mask.targetX = mask.x = rect.left + rect.width / 2;
    mask.targetY = mask.y = rect.top + rect.height / 2;
    const fullRadius = Math.hypot(Math.max(mask.x, innerWidth - mask.x), Math.max(mask.y, innerHeight - mask.y)) + 8;
    radiusTween.current = gsap.to(mask, {
      radius: stage === "charging" ? rect.width * 0.65 : fullRadius,
      duration: reduced ? 0 : stage === "charging" ? 0.55 : 0.8,
      ease: stage === "charging" ? "power1.inOut" : "power3.inOut",
      onComplete: () => { if (stage === "revealed") setTouchReveal(true); },
    });
  }, [reduced]);
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
      className={`motion-site ${entered ? "has-entered" : ""} ${touchReveal ? "touch-revealed" : ""} ${afterHours && nightReady ? "is-after-hours" : ""}`}
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
        <a className="fixed-logo" href="#about" aria-label="Astra devs home" onClick={tapLogo}>
          <BrandMark interactive active={entered} revealStage={holdStage} />
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
            journey={journeyRef}
            afterHours={afterHours}
            onNightReady={setNightReady}
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
            journey={journeyRef}
            afterHours={afterHours}
            onNightReady={setNightReady}
          />
        </div>
      </main>
      <FooterControls entered={entered} soundOn={soundOn} onToggleSound={toggleSound} />
      <HoldReveal enabled={entered && !enquiryOpen} onStageChange={changeHoldStage} />
      <div className="after-hours-note" data-visible={nightNotice && afterHours} role="status" aria-live="polite" aria-atomic="true">
        {nightNotice && afterHours && <><span>AFTER HOURS AT ASTRA</span><p>Still here? So are we. One last commit.</p></>}
      </div>
      <Enquiry open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
