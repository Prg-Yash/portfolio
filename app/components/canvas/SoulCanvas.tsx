"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useSoul } from "../../context/SoulContext";
import { SITE_CONTENT } from "../../data/content";
import { buildStageShapes } from "./shapes/stageShapes";
import { createGlowParticleTexture, updateParticleColors } from "./utils/particleUtils";

export const SoulCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollProgress } = useSoul();
  const progressRef = useRef(scrollProgress);
  const prevProgressRef = useRef(scrollProgress);

  // Keep ref in sync
  useEffect(() => {
    prevProgressRef.current = progressRef.current;
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const PARTICLE_COUNT = prefersReducedMotion ? 400 : 2500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Track mouse in 3D normalized device coordinates for repulsive/vortex field
    const mouse3D = new THREE.Vector3(999, 999, 0);
    const handleMouseMove = (e: MouseEvent) => {
      mouse3D.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse3D.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse3D.x *= (window.innerWidth / window.innerHeight) * 2.2;
      mouse3D.y *= 2.2;
    };

    // Track click shockwaves
    let shockwaveTime = -10;
    const handleMouseDown = () => {
      shockwaveTime = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    // 2. Generate 9 Stage Shape Targets for Particles using modular generator
    const shapes = buildStageShapes(PARTICLE_COUNT);

    // 3. Initialize Geometry & Buffers
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const baseSizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      positions[i] = shapes[0][i];
      colors[i] = 1.0;
    }
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const sz = Math.random() * 0.8 + 0.4;
      sizes[i] = sz;
      baseSizes[i] = sz;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom Particle Sprite via utility
    const texture = createGlowParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 4. Animation & Physics Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    const stageColors = SITE_CONTENT.stages.map((s) => new THREE.Color(s.accentColor));

    const animate = () => {
      const time = clock.getElapsedTime();
      const progress = progressRef.current;
      const prevProgress = prevProgressRef.current;

      // Check scroll velocity for Warp Speed effect
      const scrollVelocity = Math.abs(progress - prevProgress) * 50;
      if (shockwaveTime >= 0) shockwaveTime += 0.04;
      if (shockwaveTime > 4) shockwaveTime = -10;

      const stageFloat = Math.min(7.999, Math.max(0, progress * 8));
      const stageIdx = Math.floor(stageFloat);
      const nextIdx = Math.min(8, stageIdx + 1);
      
      const rawT = stageFloat - stageIdx;
      const t = rawT * rawT * (3 - 2 * rawT);

      const shapeA = shapes[stageIdx];
      const shapeB = shapes[nextIdx];
      const colorA = stageColors[stageIdx];
      const colorB = stageColors[nextIdx];

      const currentColor = colorA.clone().lerp(colorB, t);

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const colAttr = geometry.attributes.color as THREE.BufferAttribute;
      const sizeAttr = geometry.attributes.size as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const colArr = colAttr.array as Float32Array;
      const sizeArr = sizeAttr.array as Float32Array;

      const speed = SITE_CONTENT.stages[stageIdx].particleState.speed;
      const dispersion = SITE_CONTENT.stages[stageIdx].particleState.dispersion;

      const isShockwaveOrWarp = shockwaveTime >= 0 || scrollVelocity > 0.2;
      updateParticleColors(colArr, sizeArr, baseSizes, PARTICLE_COUNT, currentColor, isShockwaveOrWarp);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        
        let tx = shapeA[i3] + (shapeB[i3] - shapeA[i3]) * t;
        let ty = shapeA[i3 + 1] + (shapeB[i3 + 1] - shapeA[i3 + 1]) * t;
        let tz = shapeA[i3 + 2] + (shapeB[i3 + 2] - shapeA[i3 + 2]) * t;

        // Interactive Mouse Repulsion & Vortex Field
        const dx = tx - mouse3D.x;
        const dy = ty - mouse3D.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.8 && !prefersReducedMotion) {
          const force = (1.8 - dist) / 1.8;
          tx += (dx / dist) * force * 1.5;
          ty += (dy / dist) * force * 1.5;
          tz += Math.sin(time * 5 + i) * force * 1.2;
        }

        // Click Shockwave Ring
        if (shockwaveTime >= 0) {
          const waveRadius = shockwaveTime * 3.5;
          const distToCenter = Math.sqrt(tx * tx + ty * ty);
          if (Math.abs(distToCenter - waveRadius) < 0.6) {
            const waveForce = (0.6 - Math.abs(distToCenter - waveRadius)) * 2.0;
            tx += (tx / (distToCenter || 1)) * waveForce;
            ty += (ty / (distToCenter || 1)) * waveForce;
            tz += waveForce * 1.5;
          }
        }

        // Organic noise
        let nx = 0, ny = 0, nz = 0;
        if (!prefersReducedMotion) {
          nx = Math.sin(time * speed + i * 0.1) * dispersion * 0.2;
          ny = Math.cos(time * speed * 0.8 + i * 0.2) * dispersion * 0.2;
          nz = Math.sin(time * speed * 0.5 + i * 0.3) * dispersion * 0.2;
        }

        // Warp Speed stretch during fast scrolling
        if (scrollVelocity > 0.1) {
          ty += (Math.random() - 0.5) * scrollVelocity * 2.0;
          tz += scrollVelocity * 1.5;
        }

        posArr[i3] += (tx + nx - posArr[i3]) * 0.08;
        posArr[i3 + 1] += (ty + ny - posArr[i3 + 1]) * 0.08;
        posArr[i3 + 2] += (tz + nz - posArr[i3 + 2]) * 0.08;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;

      // Slow orbital rotation
      if (!prefersReducedMotion) {
        particles.rotation.y = time * 0.05;
        particles.rotation.x = Math.sin(time * 0.03) * 0.1;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-10 pointer-events-none" />;
};
