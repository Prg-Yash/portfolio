"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Skill, SITE_CONTENT } from "../../data/content";
import { MobileSkillTree } from "./MobileSkillTree";

interface ConstellationSkillMapProps {
  selectedCategory?: string;
  className?: string;
}

export interface StarNode {
  id: string;
  name: string;
  x: number;
  y: number;
  baseAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  category: string;
  level: number;
  description: string;
  opacity: number;
  targetOpacity: number;
  isDragged?: boolean;
  customAnchor?: { x: number; y: number } | null;
}

// All 12 skill nodes with their metadata
// All 29 skill nodes with their metadata across the 5 categories
export const ALL_NODES: Omit<StarNode, "x" | "y" | "opacity" | "targetOpacity">[] = [
  // ── Frontend ──────────────────────────────────────────────────────────
  { id: "nextjs",      name: "NEXT.JS",       baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0015, size: 13, category: "Frontend", level: 95, description: "Enterprise web architecture, full-stack routing, server-side rendering, and high-performance production web applications." },
  { id: "react",       name: "REACT.JS",      baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0018, size: 13, category: "Frontend", level: 95, description: "Modern reactive user interfaces, component-driven architecture, state synchronization, and seamless client experiences." },
  { id: "ts",          name: "TYPESCRIPT",    baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0022, size: 12, category: "Frontend", level: 90, description: "End-to-end type safety, robust software contracts, scalable codebase maintainability, and enterprise tooling." },
  { id: "html",        name: "HTML",          baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0012, size: 14, category: "Frontend", level: 99, description: "Semantic web structure, accessibility compliance, SEO optimization, and modern web document standards." },
  { id: "tailwind",    name: "TAILWIND CSS",  baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0020, size: 13, category: "Frontend", level: 95, description: "Utility-first styling systems, responsive layout engineering, design token integration, and rapid UI prototyping." },
  { id: "js",          name: "JAVASCRIPT",    baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0016, size: 13, category: "Frontend", level: 95, description: "Core web scripting, asynchronous event-driven programming, functional paradigms, and browser engine optimization." },
  { id: "wordpress",   name: "WORDPRESS",     baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0010, size: 14, category: "Frontend", level: 99, description: "Custom theme architecture, CMS platform engineering, headless integrations, and scalable content systems." },
  { id: "reactnative", name: "REACT NATIVE",  baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0024, size: 11, category: "Frontend", level: 88, description: "Cross-platform mobile application engineering, native API bridges, fluid touch interactions, and iOS/Android deployment." },
  { id: "flutter",     name: "FLUTTER",       baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0026, size: 10, category: "Frontend", level: 75, description: "Multi-platform UI development, high-performance rendering engines, custom widget systems, and expressive mobile experiences." },

  // ── Backend ───────────────────────────────────────────────────────────
  { id: "nodejs",      name: "NODE.JS",       baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0017, size: 12, category: "Backend",  level: 90, description: "Scalable server-side runtimes, non-blocking I/O event loops, RESTful microservices, and high-throughput network applications." },
  { id: "express",     name: "EXPRESS.JS",    baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0021, size: 12, category: "Backend",  level: 90, description: "Agile backend frameworks, API routing architectures, custom middleware pipelines, and secure HTTP service layers." },
  { id: "fastapi",     name: "FASTAPI",       baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0023, size: 11, category: "Backend",  level: 85, description: "High-performance asynchronous Python backends, automated OpenAPI documentation, robust validation, and rapid API delivery." },
  { id: "php",         name: "PHP",           baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0014, size: 11, category: "Backend",  level: 85, description: "Dynamic server-side scripting, legacy web system architecture, backend integrations, and content platform development." },
  { id: "prisma",      name: "PRISMA ORM",    baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0025, size: 11, category: "Backend",  level: 88, description: "Type-safe database access layers, automated schema migrations, intuitive relational modeling, and query optimization." },
  { id: "drizzle",     name: "DRIZZLE ORM",   baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0027, size: 11, category: "Backend",  level: 85, description: "Lightweight SQL-first database interaction, high-performance query execution, and serverless-ready schema engineering." },

  // ── AI & Automations ──────────────────────────────────────────────────
  { id: "python",      name: "PYTHON",        baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0013, size: 12, category: "AI & Automations", level: 90, description: "Core artificial intelligence engineering, data science pipelines, backend automation scripting, and algorithmic problem solving." },
  { id: "langchain",   name: "LANGCHAIN",     baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0022, size: 11, category: "AI & Automations", level: 80, description: "Large language model application frameworks, context-aware retrieval pipelines, prompt engineering, and AI agent orchestration." },
  { id: "langgraph",   name: "LANGGRAPH",     baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0024, size: 11, category: "AI & Automations", level: 80, description: "Stateful multi-actor AI workflows, cyclical graph execution architectures, and autonomous cognitive agent systems." },
  { id: "crewai",      name: "CREWAI",        baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0028, size: 11, category: "AI & Automations", level: 80, description: "Collaborative multi-agent intelligence, role-based task delegation, automated problem resolution, and AI swarm orchestration." },
  { id: "n8n",         name: "N8N",           baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0019, size: 13, category: "AI & Automations", level: 95, description: "Advanced workflow automation engineering, enterprise API integrations, event-driven triggers, and low-code orchestration pipelines." },

  // ── Databases ─────────────────────────────────────────────────────────
  { id: "sql",         name: "SQL",           baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0015, size: 12, category: "Databases", level: 92, description: "Relational database schema engineering, complex relational queries, data integrity enforcement, and transaction management." },
  { id: "postgresql",  name: "POSTGRESQL",    baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0018, size: 12, category: "Databases", level: 92, description: "Advanced open-source relational database systems, high-concurrency indexing, JSONB data structures, and query optimization." },
  { id: "firebase",    name: "FIREBASE",      baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0016, size: 13, category: "Databases", level: 95, description: "Real-time NoSQL data synchronization, serverless authentication pipelines, cloud functions, and rapid scalable backends." },
  { id: "mongodb",     name: "MONGODB",       baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0020, size: 12, category: "Databases", level: 90, description: "Document-oriented NoSQL database architectures, flexible schema design, horizontal scaling, and high-volume data storage." },
  { id: "neo4j",       name: "NEO4J",         baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0025, size: 12, category: "Databases", level: 90, description: "Graph database modeling, complex relationship traversal algorithms, Cypher query execution, and connected data intelligence." },

  // ── Tools ─────────────────────────────────────────────────────────────
  { id: "git",         name: "GIT",           baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0012, size: 14, category: "Tools", level: 98, description: "Distributed version control, branching workflows, collaborative code history management, and safe release pipelines." },
  { id: "github",      name: "GITHUB",        baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0014, size: 14, category: "Tools", level: 98, description: "Enterprise code collaboration, CI/CD automated deployment workflows, pull request reviews, and repository governance." },
  { id: "figma",       name: "FIGMA",         baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0022, size: 11, category: "Tools", level: 80, description: "UI/UX interface prototyping, design system token architecture, collaborative visual layouts, and developer handoff." },
  { id: "canva",       name: "CANVA",         baseAngle: 0, orbitRadius: 0, orbitSpeed: 0.0019, size: 12, category: "Tools", level: 90, description: "Rapid visual graphic production, brand asset generation, marketing collateral design, and intuitive digital layouts." },
];

export const LINKS = [
  // Frontend connections
  ["nextjs", "react"], ["nextjs", "ts"], ["nextjs", "tailwind"], ["react", "js"],
  ["react", "reactnative"], ["react", "html"], ["html", "tailwind"], ["wordpress", "php"], ["reactnative", "flutter"],
  // Backend connections
  ["nodejs", "express"], ["nodejs", "ts"], ["nodejs", "prisma"], ["nodejs", "drizzle"],
  ["express", "mongodb"], ["fastapi", "python"], ["php", "sql"],
  // AI & Automations connections
  ["python", "langchain"], ["python", "langgraph"], ["python", "crewai"],
  ["langchain", "langgraph"], ["langgraph", "crewai"], ["python", "n8n"], ["n8n", "nodejs"],
  // Database connections
  ["sql", "postgresql"], ["prisma", "postgresql"], ["drizzle", "sql"],
  ["firebase", "nextjs"], ["mongodb", "express"], ["neo4j", "python"],
  // Tool connections
  ["git", "github"], ["github", "nextjs"], ["figma", "tailwind"], ["figma", "canva"], ["canva", "wordpress"],
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Frontend":         "#ffc490", // Luminous Gold
  "Backend":          "#90d5ff", // Celestial Blue
  "AI & Automations": "#c8a0ff", // Ethereal Purple
  "Databases":        "#ffd890", // Solar Yellow
  "Tools":            "#ff8080", // Nebula Red
};

// Energy particle traveling along a link
interface EnergyParticle {
  sourceId: string;
  targetId: string;
  t: number;        // 0 → 1 progress along the line
  speed: number;
  size: number;
  color: string;
}

// Expanding ripple ring
interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export const ConstellationSkillMap: React.FC<ConstellationSkillMapProps> = ({
  selectedCategory = "ALL",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const hoverRef = useRef<StarNode | null>(null);
  const prevHoverIdRef = useRef<string | null>(null);
  const nodesRef = useRef<StarNode[]>(
    ALL_NODES.map((n) => ({ ...n, x: 0, y: 0, opacity: 0, targetOpacity: 1 }))
  );
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const particlesRef = useRef<EnergyParticle[]>([]);
  const ripplesRef   = useRef<Ripple[]>([]);

  const draggedNodeRef = useRef<StarNode | null>(null);
  const hasDraggedRef = useRef<boolean>(false);
  const dragOffsetRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  const [selectedNode, setSelectedNode] = useState<StarNode | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ──────────────────────────────────────────────
  // Compute geometric orbits whenever category changes
  // ──────────────────────────────────────────────
  useEffect(() => {
    const nodes = nodesRef.current;
    const active = selectedCategory === "ALL"
      ? nodes
      : nodes.filter((n) => n.category === selectedCategory || n.category.replace(" & ", " & ") === selectedCategory);

    const inactive = nodes.filter((n) => !active.includes(n));
    const count = active.length;

    // Reset dragged custom anchors on filter change so active nodes form clean orbital rings without overlap
    nodes.forEach((n) => {
      n.customAnchor = null;
      n.isDragged = false;
    });

    // Inactive nodes fade out completely to 0 so they vanish and never overlap active nodes
    inactive.forEach((n) => { n.targetOpacity = 0; });

    // Active nodes re-arrange into multi-ring orbital layouts to prevent any overlap
    active.forEach((node, idx) => {
      const frac = idx / count;
      const baseAngle = frac * Math.PI * 2 - Math.PI / 2;
      let radius: number;

      if (selectedCategory === "ALL") {
        // Spread across 3 tightly contained rings (`180`, `275`, `370`) so outermost stars never touch top/bottom bounds
        radius = idx % 3 === 0 ? 180 : idx % 3 === 1 ? 275 : 370;
      } else {
        // When filtered (`6-9 nodes`), spread across 2 compact inner rings (`160`, `260`)
        radius = idx % 2 === 0 ? 160 : 260;
      }
      node.baseAngle = baseAngle;
      node.orbitRadius = radius;
      node.targetOpacity = 1;
    });
  }, [selectedCategory]);

  // ──────────────────────────────────────────────
  // Canvas render loop
  // ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let width = 0, height = 0, dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width  = canvas.parentElement?.clientWidth  || window.innerWidth;
      // Responsive canvas height: smaller on mobile so nodes fill the space
      if (width < 480) height = 360;
      else if (width < 768) height = 440;
      else if (width < 1024) height = 520;
      else height = 640;
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Ambient background dust
    const dust = Array.from({ length: 80 }, () => ({
      x: Math.random() * 3000 - 1500,
      y: Math.random() * 1200 - 600,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.35 + 0.05,
    }));

    // IntersectionObserver – stop rAF when off-screen
    const io = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const render = () => {
      animRef.current = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      timeRef.current += 0.007;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      const cx = width  / 2;
      const cy = height / 2;
      const rs = Math.min(1.0, Math.max(0.32, width / 1100));

      // ── 1. Ambient dust ──────────────────────────────────
      dust.forEach((d) => {
        const sx = cx + d.x, sy = cy + d.y;
        if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 10) return;
        ctx.globalAlpha = d.a * (0.6 + 0.4 * Math.sin(t * 1.5 + d.x * 0.01));
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(sx, sy, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── 2. Update positions with orbital physics, magnetic pull, and collision avoidance ──
      nodesRef.current.forEach((node) => {
        node.opacity += (node.targetOpacity - node.opacity) * 0.07;
        
        if (node.isDragged) {
          // Position handled directly in onMouseMove while dragging
          return;
        }

        let tx: number, ty: number;
        if (node.customAnchor) {
          // Softly anchor around where user placed/dragged the node
          const angle = node.baseAngle + t * (node.orbitSpeed * 0.3);
          tx = node.customAnchor.x + Math.cos(angle) * 12;
          ty = node.customAnchor.y + Math.sin(angle) * 12;
        } else {
          const angle = node.baseAngle + t * node.orbitSpeed;
          tx = cx + Math.cos(angle) * node.orbitRadius * rs;
          const vScale = selectedCategory === "ALL" ? 0.62 : 0.78;
          ty = cy + Math.sin(angle) * node.orbitRadius * rs * vScale;
        }

        // Magnetic pull: connected nodes drift toward hovered star
        const hov = hoverRef.current;
        if (hov && hov.id !== node.id && !draggedNodeRef.current) {
          const connectedToHover = LINKS.some(
            ([a, b]) => (a === hov.id && b === node.id) || (b === hov.id && a === node.id)
          );
          if (connectedToHover) {
            const pullStr = 22 * rs;
            const dx = hov.x - tx;
            const dy = hov.y - ty;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            tx += (dx / dist) * pullStr;
            ty += (dy / dist) * pullStr;
          }
        }

        if (node.x === 0) { node.x = tx; node.y = ty; }
        else {
          node.x += (tx - node.x) * 0.055;
          node.y += (ty - node.y) * 0.055;
        }
      });

      // ── 2B. Real-time Repulsion Engine (Collision avoidance so nodes & labels never overlap!) ──
      const activeNodes = nodesRef.current.filter((n) => n.opacity > 0.25);
      for (let i = 0; i < activeNodes.length; i++) {
        for (let j = i + 1; j < activeNodes.length; j++) {
          const n1 = activeNodes[i];
          const n2 = activeNodes[j];
          if (n1.isDragged || n2.isDragged) continue;

          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = (n1.size + n2.size + 115) * rs;
          if (dist < minDist) {
            const push = (minDist - dist) * 0.06;
            const nx = dx / dist;
            const ny = dy / dist;
            if (!n1.customAnchor) { n1.x -= nx * push; n1.y -= ny * push; }
            if (!n2.customAnchor) { n2.x += nx * push; n2.y += ny * push; }
          }
        }
      }

      // ── 2C. Safety Bounding Box (Ensure NO node or label ever goes under top/bottom bars or outside canvas!) ──
      const padTopBottom = 55;
      const padLeftRight = 80;
      nodesRef.current.forEach((node) => {
        if (node.isDragged) return;
        node.x = Math.max(padLeftRight, Math.min(width - padLeftRight, node.x));
        node.y = Math.max(padTopBottom, Math.min(height - padTopBottom, node.y));
      });

      // ── 3. Hover detection + spawn effects on new hover ──
      const hitNode = nodesRef.current.find((n) => {
        if (n.opacity < 0.15) return false;
        const dx = n.x - mouseRef.current.x;
        const dy = n.y - mouseRef.current.y;
        return Math.sqrt(dx * dx + dy * dy) < 36;
      }) ?? null;

      if (!draggedNodeRef.current) {
        hoverRef.current = hitNode;
        canvas.style.cursor = hitNode ? "grab" : "crosshair";
      }

      // Spawn ripple + energy particles when hover changes
      if (hitNode && hitNode.id !== prevHoverIdRef.current) {
        prevHoverIdRef.current = hitNode.id;
        const col = CATEGORY_COLORS[hitNode.category] ?? "#ffc490";

        // 3 staggered ripple rings
        for (let i = 0; i < 3; i++) {
          ripplesRef.current.push({
            x: hitNode.x, y: hitNode.y,
            radius: hitNode.size * (1 + i * 0.4),
            maxRadius: hitNode.size * (7 + i * 4),
            color: col,
            alpha: 0.7 - i * 0.15,
          });
        }

        // Spawn flowing energy particles on every connected link
        LINKS.forEach(([a, b]) => {
          if (a !== hitNode.id && b !== hitNode.id) return;
          for (let k = 0; k < 3; k++) {
            particlesRef.current.push({
              sourceId: a === hitNode.id ? a : b,
              targetId: a === hitNode.id ? b : a,
              t: k * 0.25,
              speed: 0.012 + Math.random() * 0.008,
              size: 2.8 + Math.random() * 2.2,
              color: col,
            });
          }
        });
      }

      if (!hitNode) prevHoverIdRef.current = null;

      // ── 4. Ripple rings ───────────────────────────────────
      ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0.01);
      ripplesRef.current.forEach((r) => {
        r.radius += (r.maxRadius - r.radius) * 0.06;
        r.alpha  *= 0.93;
        ctx.globalAlpha = r.alpha;
        ctx.strokeStyle = r.color;
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // ── 5. Energy particles flowing along links ───────────
      particlesRef.current = particlesRef.current.filter((p) => p.t <= 1.02);
      particlesRef.current.forEach((p) => {
        p.t += p.speed;
        const src = nodesRef.current.find((n) => n.id === p.sourceId);
        const tgt = nodesRef.current.find((n) => n.id === p.targetId);
        if (!src || !tgt) return;
        const px = src.x + (tgt.x - src.x) * Math.min(p.t, 1);
        const py = src.y + (tgt.y - src.y) * Math.min(p.t, 1);
        const fade = p.t > 0.8 ? (1 - p.t) / 0.2 : Math.min(p.t / 0.15, 1);
        ctx.globalAlpha = fade * 0.9;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        // Bright white core of the particle
        ctx.globalAlpha = fade * 0.7;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── 6. Constellation lines ────────────────────────────
      LINKS.forEach(([a, b]) => {
        const na = nodesRef.current.find((n) => n.id === a);
        const nb = nodesRef.current.find((n) => n.id === b);
        if (!na || !nb) return;
        const minOp = Math.min(na.opacity, nb.opacity);
        if (minOp < 0.1) return;

        const isHovLink = hoverRef.current && (hoverRef.current.id === a || hoverRef.current.id === b);
        const isSelLink = selectedNode   && (selectedNode.id   === a || selectedNode.id   === b);

        if (isHovLink || isSelLink) {
          ctx.strokeStyle = CATEGORY_COLORS[nodesRef.current.find(n=>n.id===a)?.category??"Core"] ?? "rgba(255,196,144,0.85)";
          ctx.lineWidth   = 1.6;
          ctx.globalAlpha = minOp * 0.8;
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.10)";
          ctx.lineWidth   = 0.7;
          ctx.globalAlpha = minOp * 0.75;
        }
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      });

      // ── 7. Star nodes with starburst rays on hover ────────
      nodesRef.current.forEach((node) => {
        if (node.opacity < 0.05) return;

        const isHov = hoverRef.current?.id === node.id;
        const isSel = selectedNode?.id     === node.id;
        const isAct = isHov || isSel;
        const col   = CATEGORY_COLORS[node.category] ?? "#ffffff";
        const pulse = 0.92 + 0.08 * Math.sin(t * 3 + node.baseAngle * 7);
        const r     = (isAct ? node.size * 1.6 : node.size) * pulse;


        // Outer soft halo
        ctx.fillStyle   = col;
        ctx.globalAlpha = node.opacity * (isAct ? 0.28 : 0.09);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 2.9, 0, Math.PI * 2);
        ctx.fill();

        // Mid glow ring
        ctx.globalAlpha = node.opacity * (isAct ? 0.50 : 0.18);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 1.7, 0, Math.PI * 2);
        ctx.fill();

        // Solid sphere
        ctx.fillStyle   = isAct ? col : "#e2d8cc";
        ctx.globalAlpha = node.opacity;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Bright white core
        ctx.fillStyle   = "#ffffff";
        ctx.globalAlpha = node.opacity * (isAct ? 1.0 : 0.55);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font        = `${isAct ? "600 12px" : "400 10px"} "IBM Plex Mono", monospace`;
        ctx.fillStyle   = isAct ? col : "rgba(235,228,215,0.78)";
        ctx.globalAlpha = node.opacity;
        ctx.fillText(node.name, node.x + r + 11, node.y + 4);
      });

      ctx.globalAlpha = 1;
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [selectedNode]); // re-subscribe only when selectedNode changes (for line highlight)

  // ──────────────────────────────────────────────
  // Mouse / click handlers
  // ──────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;

    const hit = nodesRef.current.find((n) => {
      if (n.opacity < 0.15) return false;
      const dx = n.x - mx;
      const dy = n.y - my;
      return Math.sqrt(dx * dx + dy * dy) < n.size + 20;
    });

    if (hit) {
      draggedNodeRef.current = hit;
      hit.isDragged = true;
      hasDraggedRef.current = false;
      dragOffsetRef.current = { dx: hit.x - mx, dy: hit.y - my };
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    mouseRef.current = { x: mx, y: my };

    if (draggedNodeRef.current) {
      hasDraggedRef.current = true;
      draggedNodeRef.current.x = mx + dragOffsetRef.current.dx;
      draggedNodeRef.current.y = my + dragOffsetRef.current.dy;
      draggedNodeRef.current.customAnchor = {
        x: draggedNodeRef.current.x,
        y: draggedNodeRef.current.y,
      };
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current.isDragged = false;
      draggedNodeRef.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = hoverRef.current ? "grab" : "crosshair";
      }
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
    if (draggedNodeRef.current) {
      draggedNodeRef.current.isDragged = false;
      draggedNodeRef.current = null;
    }
  }, []);

  const closePanel = useCallback(() => {
    setPanelVisible(false);
    setTimeout(() => setSelectedNode(null), 400);
  }, []);

  const onClick = useCallback(() => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    if (hoverRef.current) {
      setSelectedNode(hoverRef.current);
      setPanelVisible(true);
    } else if (panelVisible) {
      closePanel();
    }
  }, [panelVisible, closePanel]);

  // Support closing with physical Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelVisible) {
        closePanel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [panelVisible, closePanel]);

  const catColor = selectedNode ? (CATEGORY_COLORS[selectedNode.category] ?? "#ffc490") : "#ffc490";

  // ── Mobile Skill Grid (replaces canvas on small screens) ──────────────────
  const mobileNodes = selectedCategory === "ALL"
    ? ALL_NODES
    : ALL_NODES.filter((n) => n.category === selectedCategory);

  const mobileCategories = ["Frontend", "Backend", "AI & Automations", "Databases", "Tools"];

  if (isMobile) {
    return <MobileSkillTree selectedCategory={selectedCategory} className={className} />;
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 px-1 mb-6 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.28em] uppercase text-white/40 select-none">
        <span className="leading-relaxed">
          CELESTIAL SKILL CONSTELLATION
          <span className="ml-2 sm:ml-3 text-[#ffc490]/70 font-bold">[{selectedCategory}]</span>
        </span>
        <span className="text-white/30 text-[8px] sm:text-[10px] leading-relaxed">DRAG STARS TO REARRANGE · CLICK TO INSPECT · [ESC] TO CLOSE</span>
      </div>

      {/* Canvas */}
      <div className="relative w-full overflow-visible">
        <canvas
          ref={canvasRef}
          className="w-full select-none block"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      </div>

      {/* ── Skill Deep-Dive Panel (slides in from bottom-left, safely away from right timeline bar) ── */}
      <div
        className={`
          absolute bottom-6 left-0 sm:left-6 w-full sm:w-[460px]
          transition-all duration-500 ease-out
          ${panelVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}
        `}
        style={{ zIndex: 50 }}
      >
        {selectedNode && (
          <div
            className="relative rounded-2xl overflow-hidden border backdrop-blur-2xl"
            style={{
              borderColor: `${catColor}44`,
              background: `linear-gradient(135deg, ${catColor}12 0%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.96) 100%)`,
              boxShadow: `0 0 60px ${catColor}22, 0 0 120px ${catColor}10, inset 0 0 40px ${catColor}08`,
            }}
          >
            {/* Scanning laser top */}
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] animate-scanline pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${catColor}, transparent)` }}
            />

            <div className="p-7 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: catColor, boxShadow: `0 0 8px ${catColor}` }}
                    />
                    <span
                      className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold"
                      style={{ color: catColor }}
                    >
                      {selectedNode.category}
                    </span>
                  </div>
                  <h3
                    className="font-serif-italic text-3xl sm:text-4xl tracking-wide"
                    style={{ color: "#f5f0e8", textShadow: `0 0 40px ${catColor}60` }}
                  >
                    {selectedNode.name}
                  </h3>
                </div>
                <button
                  onClick={closePanel}
                  className="mt-1 text-white/30 hover:text-white/80 transition-colors font-mono text-xs tracking-widest"
                >
                  [ESC]
                </button>
              </div>

              {/* Proficiency ring + bar */}
              <div className="flex items-center gap-5 mb-6">
                {/* Circular gauge */}
                <div className="relative flex-shrink-0 w-20 h-20">
                  <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                    <circle
                      cx="32" cy="32" r="26" fill="none"
                      stroke={catColor} strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${2 * Math.PI * 26 * (1 - selectedNode.level / 100)}`}
                      style={{ filter: `drop-shadow(0 0 6px ${catColor})`, transition: "stroke-dashoffset 1s ease-out" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-sm font-bold" style={{ color: catColor }}>
                      {selectedNode.level}%
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-white/40 mb-1.5 uppercase">
                    PROFICIENCY INDEX
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${selectedNode.level}%`,
                        background: `linear-gradient(90deg, ${catColor}, #ffffff)`,
                        boxShadow: `0 0 12px ${catColor}`,
                      }}
                    />
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
                    STAGE 03 · CURIOSITY · DEEP INSPECTION
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-sm leading-relaxed text-white/75 border-t border-white/8 pt-5">
                {selectedNode.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
