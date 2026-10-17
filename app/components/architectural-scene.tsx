"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const desktop = "/images/threshold/threshold-desktop.webp";
const mobile = "/images/threshold/threshold-mobile.webp";

/* Original artwork with a restrained 2.5D camera and local water refraction. */
export default function ArchitecturalScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const [reduced, setReduced] = useState(false);

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
      uCover: { value: new THREE.Vector2(1, 1) },
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
        uniform vec2 uCover;
        uniform vec2 uPointer;
        uniform float uTime;
        uniform float uWaterline;
        varying vec2 vUv;
        void main() {
          float breath = 1.025 + sin(uTime * .075) * .004;
          vec2 uv = (vUv - .5) * uCover / breath + .5;
          uv += uPointer * .004 * uCover;
          // Only the foreground pool moves; the architectural edges stay still.
          float water = 1.0 - smoothstep(uWaterline - .05, uWaterline, uv.y);
          float shore = smoothstep(.02, .12, uv.x) * (1.0 - smoothstep(.82, .9, uv.x));
          uv.x += sin(uv.y * 190.0 + uTime * .55) * .0011 * water * shore;
          uv.y += sin(uv.x * 31.0 + uv.y * 95.0 - uTime * .4) * .00055 * water * shore;
          gl_FragColor = texture2D(uImage, uv);
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
    const pointer = new THREE.Vector2();
    const aim = new THREE.Vector2();
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setPixelRatio(
        Math.min(devicePixelRatio, compact.matches ? 1.25 : 1.5),
      );
      renderer.setSize(width, height);
      if (texture) {
        const image = texture.image as { width: number; height: number };
        const imageAspect = image.width / image.height;
        const aspect = width / height;
        uniforms.uCover.value.set(
          Math.min(aspect / imageAspect, 1),
          Math.min(imageAspect / aspect, 1),
        );
      }
      dirty = true;
    };
    const load = () => {
      const version = ++request;
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
          ready = true;
          resize();
          renderer.render(scene, camera);
          setAvailable(true);
        },
        undefined,
        () => {
          if (!disposed) setAvailable(false);
        },
      );
    };
    const tick = (now: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden || lost || !ready) {
        last = now;
        return;
      }
      const interval = compact.matches ? 1000 / 30 : 1000 / 60;
      if (now - last < interval - 1 && !dirty) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (pausedRef.current && !dirty) return;
      if (!pausedRef.current) {
        time += dt;
        pointer.lerp(aim, 1 - Math.exp(-dt * 2.5));
      }
      uniforms.uTime.value = time;
      uniforms.uPointer.value.copy(pointer);
      renderer.render(scene, camera);
      dirty = false;
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || pausedRef.current || !visible) return;
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
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [reduced]);

  return (
    <>
      <div
        className={`hero-background portal-background ${available && !reduced ? "is-ready" : ""}`}
        aria-hidden="true"
      >
        <picture className="portal-artwork">
          <source media="(max-width: 767.98px)" srcSet={mobile} />
          <img
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
      {available && !reduced && (
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
