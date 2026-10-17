"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function earthTexture() {
  const texture = new THREE.TextureLoader().load("/textures/earth.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export default function VisualScenes({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const resources: {
      geometry: THREE.BufferGeometry[];
      material: THREE.Material[];
      texture: THREE.Texture[];
    } = { geometry: [], material: [], texture: [] };
    const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material) => {
      resources.geometry.push(geometry);
      resources.material.push(material);
      return new THREE.Mesh(geometry, material);
    };
    const create = (type: string) => {
      const scene = new THREE.Scene();
      scene.environmentIntensity = 0.7;
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
      camera.position.set(0, 0, 5.4);
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const key = new THREE.DirectionalLight(0xffffff, 3.8);
      key.position.set(-3, 5, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xd0bda4, 2);
      rim.position.set(4, -1, 2);
      scene.add(rim);
      const group = new THREE.Group();
      scene.add(group);
      if (type === "coffee") {
        const ceramic = new THREE.MeshStandardMaterial({
          color: 0xb7ab98,
          roughness: 0.25,
          metalness: 0.12,
          side: THREE.DoubleSide,
        });
        const body = mesh(
          new THREE.CylinderGeometry(0.72, 0.56, 1.4, 64, 1, true),
          ceramic,
        );
        group.add(body);
        const rim = mesh(new THREE.TorusGeometry(0.72, 0.045, 12, 64), ceramic);
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 0.7;
        group.add(rim);
        const bottom = mesh(
          new THREE.CylinderGeometry(0.56, 0.56, 0.07, 64),
          ceramic,
        );
        bottom.position.y = -0.7;
        group.add(bottom);
        const coffee = mesh(
          new THREE.CircleGeometry(0.68, 64),
          new THREE.MeshStandardMaterial({ color: 0x16110e, roughness: 0.16 }),
        );
        coffee.rotation.x = -Math.PI / 2;
        coffee.position.y = 0.63;
        group.add(coffee);
        const handle = mesh(
          new THREE.TorusGeometry(0.43, 0.095, 16, 48),
          ceramic,
        );
        handle.position.set(0.79, 0, 0);
        group.add(handle);
        group.rotation.set(0.55, -0.5, -0.4);
        group.scale.setScalar(1.12);
      } else if (type === "mouse") {
        const plastic = new THREE.MeshStandardMaterial({
          color: 0x242424,
          roughness: 0.4,
          metalness: 0.3,
        });
        const body = mesh(new THREE.SphereGeometry(1, 64, 48), plastic);
        body.scale.set(0.7, 0.39, 1.14);
        group.add(body);
        const wheel = mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 0.22, 24),
          new THREE.MeshStandardMaterial({ color: 0x9a9284, roughness: 0.4 }),
        );
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(0, 0.37, -0.45);
        group.add(wheel);
        const seamPath = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.29, -0.85),
          new THREE.Vector3(0, 0.38, -0.5),
          new THREE.Vector3(0, 0.4, -0.1),
        ]);
        const seam = mesh(
          new THREE.TubeGeometry(seamPath, 30, 0.008, 6, false),
          new THREE.MeshStandardMaterial({ color: 0x000000 }),
        );
        group.add(seam);
        const logo = mesh(
          new THREE.CircleGeometry(0.06, 24),
          new THREE.MeshBasicMaterial({ color: 0xb7ab98 }),
        );
        logo.rotation.x = -Math.PI / 2;
        logo.position.set(0, 0.386, 0.42);
        group.add(logo);
        group.rotation.set(0.7, -0.5, 0.45);
        group.scale.setScalar(1.45);
      } else if (type === "globe") {
        const texture = earthTexture();
        resources.texture.push(texture);
        const earth = mesh(
          new THREE.SphereGeometry(1.55, 96, 64),
          new THREE.MeshStandardMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.012,
            roughness: 0.72,
            metalness: 0.08,
            color: 0xf0e9d8,
          }),
        );
        group.add(earth);
        group.rotation.set(0.13, -2, 0);
        group.scale.setScalar(1.2);
      } else {
        const chrome = new THREE.MeshStandardMaterial({
          color: 0xb7ab98,
          metalness: 0.95,
          roughness: 0.17,
        });
        const knot = mesh(
          new THREE.TorusKnotGeometry(1, 0.29, 160, 28, 2, 3),
          chrome,
        );
        group.add(knot);
        const orange = mesh(
          new THREE.TorusGeometry(1.7, 0.06, 16, 100),
          new THREE.MeshStandardMaterial({
            color: 0xeb5939,
            roughness: 0.32,
            metalness: 0.4,
          }),
        );
        orange.rotation.set(0.5, 0.8, 0);
        group.add(orange);
        group.position.x = 0.9;
        camera.position.z = 6.5;
      }
      return { scene, camera, group, type };
    };
    // Each object lives inside its own DOM box. A fixed canvas above the page
    // cannot obey section stacking or clipping and used to obscure the work.
    const views = [
      ...document.querySelectorAll<HTMLElement>(
        ".base-layer [data-three-scene]",
      ),
    ].flatMap((element) => {
      const canvas = document.createElement("canvas");
      canvas.className =
        element.dataset.threeScene === "reel" ? "reel-canvas" : "object-canvas";
      canvas.setAttribute("aria-hidden", "true");
      element.appendChild(canvas);
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        element.classList.add("scene-unavailable");
        canvas.remove();
        return [];
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      const generator = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environmentTarget = generator.fromScene(room, 0.04);
      room.dispose();
      const view = create(element.dataset.threeScene || "globe");
      view.scene.environment = environmentTarget.texture;
      const lost = (event: Event) => {
        event.preventDefault();
        element.classList.add("scene-unavailable");
      };
      const restored = () => element.classList.remove("scene-unavailable");
      canvas.addEventListener("webglcontextlost", lost);
      canvas.addEventListener("webglcontextrestored", restored);
      return [
        {
          ...view,
          element,
          canvas,
          renderer,
          generator,
          environmentTarget,
          created: true,
          width: 0,
          height: 0,
          lost,
          restored,
        },
      ];
    });
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = preference.matches;
    const motionChange = () => {
      reduced = preference.matches;
    };
    preference.addEventListener("change", motionChange);
    let frame = 0;
    let last = 0;
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (document.hidden || time - last < 1000 / 45) return;
      last = time;
      const height = innerHeight;
      views.forEach((view) => {
        const rect = view.element.getBoundingClientRect();
        if (
          rect.bottom <= 0 ||
          rect.top >= height ||
          rect.width <= 0 ||
          rect.height <= 0 ||
          view.element.classList.contains("scene-unavailable")
        )
          return;
        const parent = view.element.closest(
          ".about-studio,.selected-work,.showreel",
        ) as HTMLElement | null;
        const pr = parent?.getBoundingClientRect();
        const progress = pr
          ? THREE.MathUtils.clamp(
              (height - pr.top) / (height + pr.height),
              0,
              1,
            )
          : 0;
        if (view.type === "coffee" && !reduced) {
          view.group.rotation.x = 0.3 + progress * 1.5;
          view.group.rotation.y = -0.5 + progress * 2;
          view.group.rotation.z =
            -0.4 + (reduced ? 0 : Math.sin(time * 0.0003) * 0.05);
        }
        if (view.type === "mouse" && !reduced) {
          view.group.rotation.set(
            -0.25 + progress * 1.25,
            -0.5 + progress * 0.5,
            0.5 + progress * 0.5,
          );
        }
        if (view.type === "globe" && !reduced) {
          view.group.rotation.y =
            -2 + progress * 1.2 + (reduced ? 0 : time * 0.000015);
          view.group.rotation.x = 0.13;
        }
        if (view.type === "reel") {
          const container = view.element.closest(".reel-window") as HTMLElement;
          const p = parseFloat(
            container?.style.getPropertyValue("--reel-progress") || "0",
          );
          view.group.rotation.set(
            p * Math.PI * 2,
            p * Math.PI * 4,
            p * Math.PI,
          );
          view.group.position.y = reduced ? 0 : Math.sin(p * Math.PI * 6) * 0.2;
        }
        const width = Math.max(1, Math.round(rect.width));
        const viewHeight = Math.max(1, Math.round(rect.height));
        if (view.width !== width || view.height !== viewHeight) {
          view.renderer.setSize(width, viewHeight, false);
          view.width = width;
          view.height = viewHeight;
          view.camera.aspect = width / viewHeight;
          if (view.type !== "reel") {
            const radius = view.type === "globe" ? 1.86 : 1.7;
            const vertical = THREE.MathUtils.degToRad(view.camera.fov / 2);
            const limitingAngle = Math.atan(
              Math.tan(vertical) * Math.min(1, view.camera.aspect),
            );
            view.camera.position.z = (radius / Math.sin(limitingAngle)) * 1.12;
          }
          view.camera.updateProjectionMatrix();
        }
        if (view.type === "reel") {
          view.group.scale.setScalar(rect.width < 768 ? 0.72 : 1);
          view.group.position.x = rect.width < 768 ? 0.5 : 0.9;
        }
        view.renderer.render(view.scene, view.camera);
      });
    };
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", motionChange);
      resources.geometry.forEach((g) => g.dispose());
      [...new Set(resources.material)].forEach((m) => m.dispose());
      resources.texture.forEach((t) => t.dispose());
      views.forEach((view) => {
        view.canvas.removeEventListener("webglcontextlost", view.lost);
        view.canvas.removeEventListener("webglcontextrestored", view.restored);
        view.environmentTarget.dispose();
        view.generator.dispose();
        view.renderer.dispose();
        view.renderer.forceContextLoss();
        if (view.created) view.canvas.remove();
        view.element.classList.remove("scene-unavailable");
      });
    };
  }, [enabled]);
  return null;
}
