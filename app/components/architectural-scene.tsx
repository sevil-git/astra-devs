"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

const desktop = "/images/threshold/threshold-desktop.webp";
const mobile = "/images/threshold/threshold-mobile.webp";
const ocean = "/images/threshold/ocean-continuation.webp";

/* Two depth planes: near architecture and a distant, continuous seascape. */
export default function ArchitecturalScene({ journey, active }: { journey: RefObject<number>; active: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const activeRef = useRef(active);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    let cancelled = false;
    let frame = 0;
    const prepare = async () => {
      await image.decode().catch(() => {});
      if (cancelled || !image.naturalWidth) return;
      // Paint the hidden, decoded plate before starting its opacity transition.
      frame = requestAnimationFrame(() => { if (!cancelled) setImageReady(true); });
    };
    if (image.complete) void prepare();
    image.addEventListener("load", prepare);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      image.removeEventListener("load", prepare);
    };
  }, []);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (
      !host ||
      reduced ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const compact = matchMedia("(max-width: 767.98px)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      uImage: { value: null as THREE.Texture | null },
      uOcean: { value: null as THREE.Texture | null },
      uAperture: { value: null as THREE.Texture | null },
      uApertureReady: { value: 0 },
      uOceanReady: { value: 0 },
      uCover: { value: new THREE.Vector2(1, 1) },
      uOceanCover: { value: new THREE.Vector2(1, 1) },
      uOceanCentre: { value: new THREE.Vector2(.5, .5) },
      uPortal: { value: new THREE.Vector2(.716, .653) },
      uSun: { value: new THREE.Vector2(.814, .586) },
      uJourney: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uWaterline: { value: 0.34 },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: `
        uniform sampler2D uImage;
        uniform sampler2D uOcean;
        uniform sampler2D uAperture;
        uniform float uApertureReady;
        uniform float uOceanReady;
        uniform vec2 uCover;
        uniform vec2 uOceanCover;
        uniform vec2 uOceanCentre;
        uniform vec2 uPortal;
        uniform vec2 uSun;
        uniform float uJourney;
        uniform vec2 uPointer;
        uniform float uTime;
        uniform float uWaterline;
        varying vec2 vUv;
        void main() {
          float travel = smoothstep(.04, .79, uJourney);
          float align = smoothstep(.02, .56, uJourney);
          // Begin at the picture's exact framing; ease into a tiny ambient drift.
          float breath = 1.0 + (1.0 - cos(uTime * .075)) * .002;
          // Near stone accelerates past the lens; the distant horizon stays calm.
          float nearScale = breath / (1.0 - .94 * travel);
          vec2 centre = mix(vec2(.5), uPortal.xy, align);
          vec2 roomUv = (vUv - .5) * uCover / nearScale + centre;
          roomUv += uPointer * .004 * uCover * (1.0 - travel);
          vec2 uv = roomUv;
          // Only the foreground pool moves; the architectural edges stay still.
          float water = 1.0 - smoothstep(uWaterline - .05, uWaterline, uv.y);
          float shore = smoothstep(.02, .12, uv.x) * (1.0 - smoothstep(.82, .9, uv.x));
          uv.x += sin(uv.y * 190.0 + uTime * .55) * .0011 * water * shore;
          uv.y += sin(uv.x * 31.0 + uv.y * 95.0 - uTime * .4) * .00055 * water * shore;
          vec4 room = texture2D(uImage, uv);
          // Each authored matte follows the actual inner stone edge and sill.
          float aperture = texture2D(uAperture, roomUv).r * uApertureReady;
          float farScale = 1.0 + travel * .24;
          // Register the sun while exchanging plates, then let the far view drift
          // independently. This avoids a double sun during the depth dissolve.
          vec2 registeredCentre = vec2(.753, .566) - (uSun - centre) * nearScale / uCover * uOceanCover / farScale;
          vec2 seaCentre = mix(registeredCentre, uOceanCentre, smoothstep(.18, .62, uJourney));
          vec2 seaUv = (vUv - .5) * uOceanCover / farScale + seaCentre;
          float seaWater = 1.0 - smoothstep(.44, .48, seaUv.y);
          seaUv.x += sin(seaUv.y * 160.0 + uTime * .65) * .0006 * seaWater;
          seaUv.y += sin(seaUv.x * 46.0 - uTime * .4) * .0003 * seaWater;
          vec4 sea = texture2D(uOcean, clamp(seaUv, .001, .999));
          float reveal = aperture * smoothstep(.05, .18, uJourney) * uOceanReady;
          gl_FragColor = mix(room, sea, reveal);
          #include <colorspace_fragment>
        }`,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));
    let disposed = false;
    let lost = false;
    let visible = true;
    let dirty = true;
    let ready = false;
    let last = 0;
    let time = 0;
    let frame = 0;
    let request = 0;
    let texture: THREE.Texture | null = null;
    let seaTexture: THREE.Texture | null = null;
    let apertureTexture: THREE.Texture | null = null;
    let lastJourney = -1;
    const pointer = new THREE.Vector2();
    const aim = new THREE.Vector2();
    const resize = () => {
      // Layout dimensions do not include ancestor entrance transforms.
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setPixelRatio(
        Math.min(devicePixelRatio, compact.matches ? 1.25 : 1.5),
      );
      // CSS owns the display size, so no stale inline pixel width can outlive entry.
      renderer.setSize(width, height, false);
      if (texture) {
        const image = texture.image as { width: number; height: number };
        const imageAspect = image.width / image.height;
        const aspect = width / height;
        uniforms.uCover.value.set(
          Math.min(aspect / imageAspect, 1),
          Math.min(imageAspect / aspect, 1),
        );
      }
      if (seaTexture) {
        const image = seaTexture.image as { width: number; height: number };
        const aspect = width / height;
        const imageAspect = image.width / image.height;
        // Keep the sun in frame on portrait screens, with an undistorted horizon.
        uniforms.uOceanCover.value.set(Math.min(aspect / imageAspect, 1), Math.min(imageAspect / aspect, 1));
        uniforms.uOceanCentre.value.set(.5 + .25 * (1 - uniforms.uOceanCover.value.x), .5);
      }
      dirty = true;
    };
    const load = () => {
      const version = ++request;
      uniforms.uApertureReady.value = 0;
      new THREE.TextureLoader().load(
        compact.matches ? "/images/threshold/aperture-mobile.svg" : "/images/threshold/aperture-desktop.svg",
        (next) => {
          if (disposed || version !== request) { next.dispose(); return; }
          next.minFilter = THREE.LinearFilter;
          next.generateMipmaps = false;
          apertureTexture?.dispose();
          apertureTexture = next;
          uniforms.uAperture.value = next;
          uniforms.uApertureReady.value = 1;
          dirty = true;
        },
        undefined,
        () => { /* The original plate remains complete without the matte. */ },
      );
      new THREE.TextureLoader().load(
        compact.matches ? mobile : desktop,
        (next) => {
          if (disposed || version !== request) {
            next.dispose();
            return;
          }
          next.colorSpace = THREE.SRGBColorSpace;
          next.minFilter = THREE.LinearFilter;
          next.generateMipmaps = false;
          texture?.dispose();
          texture = next;
          uniforms.uImage.value = next;
          uniforms.uWaterline.value = compact.matches ? 0.49 : 0.34;
          if (compact.matches) uniforms.uPortal.value.set(.524, .696);
          else uniforms.uPortal.value.set(.716, .653);
          uniforms.uSun.value.set(compact.matches ? .699 : .814, compact.matches ? .647 : .586);
          ready = true;
          resize();
          uniforms.uJourney.value = journey.current;
          renderer.render(scene, camera);
          setAvailable(true);
        },
        undefined,
        () => {
          if (!disposed) setAvailable(false);
        },
      );
    };
    new THREE.TextureLoader().load(ocean, (next) => {
      if (disposed) { next.dispose(); return; }
      next.colorSpace = THREE.SRGBColorSpace;
      next.minFilter = THREE.LinearFilter;
      next.generateMipmaps = false;
      seaTexture = next;
      uniforms.uOcean.value = next;
      uniforms.uOceanReady.value = 1;
      resize();
    }, undefined, () => { /* Keep the original scene if the continuation fails. */ });
    const tick = (now: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden || lost || !ready) {
        last = now;
        return;
      }
      const interval = compact.matches ? 1000 / 30 : 1000 / 60;
      const progress = journey.current;
      if (progress !== lastJourney) dirty = true;
      // Warm one frame behind the entry screen, without running ambient motion.
      if (!activeRef.current && !dirty) { last = now; return; }
      if (now - last < interval - 1 && !dirty) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (pausedRef.current && !dirty) return;
      if (!pausedRef.current && activeRef.current) {
        time += dt;
        pointer.lerp(aim, 1 - Math.exp(-dt * 2.5));
      }
      uniforms.uTime.value = time;
      uniforms.uPointer.value.copy(pointer);
      uniforms.uJourney.value = progress;
      lastJourney = progress;
      renderer.render(scene, camera);
      dirty = false;
    };
    const move = (event: PointerEvent) => {
      if (!activeRef.current || !fine.matches || pausedRef.current || !visible) return;
      aim.set(
        (event.clientX / innerWidth - 0.5) * 2,
        (event.clientY / innerHeight - 0.5) * 2,
      );
    };
    const leave = () => aim.set(0, 0);
    const contextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      setAvailable(false);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    observer.observe(host);
    const sizes = new ResizeObserver(resize);
    sizes.observe(host);
    compact.addEventListener("change", load);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    resize();
    load();
    frame = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizes.disconnect();
      compact.removeEventListener("change", load);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      texture?.dispose();
      seaTexture?.dispose();
      apertureTexture?.dispose();
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [reduced, journey]);

  return (
    <>
      <div
        className={`hero-background portal-background ${imageReady ? "is-image-ready" : ""} ${available && !reduced ? "is-ready" : ""}`}
        aria-hidden="true"
      >
        <picture className="portal-artwork">
          <source media="(max-width: 767.98px)" srcSet={mobile} />
          <img
            ref={imageRef}
            src={desktop}
            alt=""
            width="1672"
            height="941"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="portal-canvas" ref={hostRef} />
        <div className="portal-shade" />
        <div className="portal-finish" />
      </div>
      {active && available && !reduced && (
        <button
          className="background-motion-toggle"
          aria-label={paused ? "Resume ambient motion" : "Pause ambient motion"}
          aria-pressed={!paused}
          onClick={() => {
            pausedRef.current = !pausedRef.current;
            setPaused(pausedRef.current);
          }}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> MOTION{" "}
          {paused ? "OFF" : "ON"}
        </button>
      )}
    </>
  );
}
