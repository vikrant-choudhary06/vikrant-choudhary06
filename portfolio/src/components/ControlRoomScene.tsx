"use client";

import { useEffect, useRef } from "react";
import type { BufferGeometry, NormalBufferAttributes } from "three";
import styles from "./ControlRoomScene.module.css";

/** A scroll-driven scene: no idle animation loop or React updates per frame. */
export function ControlRoomScene() {
  const host = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = host.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};
    void import("three").then((T) => {
      if (disposed || reduced.matches) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ canvas: element, alpha: true, antialias: innerWidth > 767, powerPreference: "low-power" }); }
      catch { return; } // The CSS blueprint remains when WebGL is unavailable.
      const scene = new T.Scene();
      scene.fog = new T.FogExp2(0xad9878, .012);
      const camera = new T.PerspectiveCamera(48, 1, .1, 100);
      const system = new T.Group();
      scene.add(system);
      const material = new T.LineBasicMaterial({ color: 0x163c32, transparent: true, opacity: .78 });
      const geometries: InstanceType<typeof T.BufferGeometry>[] = [];
      function outline(geometry: BufferGeometry<NormalBufferAttributes>, x: number, y: number, z: number) {
        const edges = new T.EdgesGeometry(geometry);
        geometry.dispose();
        geometries.push(edges);
        const mesh = new T.LineSegments(edges, material);
        mesh.position.set(x, y, z);
        system.add(mesh);
      }
      const nodes = [[-7, 3, -3], [7, 1, -5], [-6, -4, -6], [6, -6, -2], [0, -8, -10]];
      nodes.forEach(([x, y, z], index) => {
        for (let tier = 0; tier < 3; tier++) {
          outline(index % 2 === 0 ? new T.CylinderGeometry(1.15, 1.15, .38, 24) : new T.BoxGeometry(2.2, .48, 1.35), x, y + tier * .65, z);
        }
        outline(new T.TorusGeometry(1.8, .012, 3, 48), x, y + .6, z);
      });
      nodes.slice(1).forEach(([x, y, z], index) => {
        const previous = nodes[index];
        const points = [new T.Vector3(...previous), new T.Vector3(x, previous[1], z), new T.Vector3(x, y, z)];
        const geometry = new T.BufferGeometry().setFromPoints(points);
        geometries.push(geometry);
        system.add(new T.Line(geometry, material));
      });
      const dotGeometry = new T.BufferGeometry();
      const positions = new Float32Array(180 * 3);
      for (let i = 0; i < 180; i++) {
        positions[i * 3] = Math.sin(i * 127.1) * 18;
        positions[i * 3 + 1] = Math.cos(i * 311.7) * 14;
        positions[i * 3 + 2] = -4 - (i % 13);
      }
      dotGeometry.setAttribute("position", new T.BufferAttribute(positions, 3));
      geometries.push(dotGeometry);
      const dots = new T.PointsMaterial({ color: 0x163c32, size: .065, transparent: true, opacity: .75 });
      system.add(new T.Points(dotGeometry, dots));
      let frame = 0, current = scrollY, target = scrollY, last = 0;
      const pointer = { x: 0, y: 0 };
      const phases = [0];
      function measure() {
        phases.splice(0, phases.length, 0);
        ["about", "projects", "stack", "contact"].forEach(id => {
          const section = document.getElementById(id);
          if (section) phases.push(section.getBoundingClientRect().top + scrollY);
        });
        renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1 : 1.5));
        renderer.setSize(innerWidth, innerHeight);
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        wake();
      }
      function render(time: number) {
        frame = 0;
        if (document.hidden || reduced.matches) return;
        const dt = Math.min((time - (last || time - 16)) / 1000, .05);
        last = time;
        current += (target - current) * (1 - Math.exp(-9 * dt));
        let phase = 0;
        for (let i = 0; i < phases.length - 1; i++) {
          phase += Math.max(0, Math.min(1, (current - phases[i]) / Math.max(1, phases[i + 1] - phases[i])));
        }
        camera.position.set(Math.sin(phase * .85) * 4.5 + pointer.x, -phase * 1.7 + pointer.y, innerWidth < 768 ? 22 : 16 - Math.sin(phase * .8) * 4);
        camera.lookAt(0, -phase * 1.15, -4);
        system.rotation.y = phase * .42;
        system.rotation.z = Math.sin(phase) * .16;
        renderer.render(scene, camera);
        if (Math.abs(target - current) > .1) frame = requestAnimationFrame(render);
      }
      function wake() { if (!frame && !document.hidden) { last = 0; frame = requestAnimationFrame(render); } }
      function scroll() { target = scrollY; wake(); }
      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse") return;
        pointer.x = (event.clientX / innerWidth - .5) * 1.2;
        pointer.y = -(event.clientY / innerHeight - .5) * .7;
        wake();
      }
      function preference() { element!.style.display = reduced.matches ? "none" : ""; wake(); }
      const observer = new ResizeObserver(measure);
      observer.observe(document.body);
      addEventListener("scroll", scroll, { passive: true });
      addEventListener("resize", measure);
      addEventListener("pointermove", move, { passive: true });
      document.addEventListener("visibilitychange", wake);
      reduced.addEventListener("change", preference);
      measure();
      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        removeEventListener("scroll", scroll);
        removeEventListener("resize", measure);
        removeEventListener("pointermove", move);
        document.removeEventListener("visibilitychange", wake);
        reduced.removeEventListener("change", preference);
        geometries.forEach(geometry => geometry.dispose());
        material.dispose(); dots.dispose(); renderer.dispose();
      };
    }).catch(() => { /* The static background works offline as well. */ });
    return () => { disposed = true; cleanup(); };
  }, []);
  return <canvas ref={host} className={styles.scene} aria-hidden="true" />;
}
