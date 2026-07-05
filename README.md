# "The Journey of the Soul" — Award-Winning Interactive Portfolio

An Awwwards/FWA-tier immersive, scroll-driven portfolio website built on **Next.js 16 (React 19)**, **Tailwind CSS v4**, **GSAP 3 (ScrollTrigger & Timelines)**, **Lenis Smooth Scroll**, and **Three.js**.

Instead of a conventional portfolio, this project presents an immersive narrative experience where the visitor scrolls through the metaphorical evolution of a soul across 9 distinct stages. A persistent 3D particle entity travels with the user through the entire scroll, dynamically morphing in form, color, particle density, and behavior at each stage.

---

## 🌌 The 9 Stages of Evolution

1. **01 — VOID (Hero / Landing)**: Pure darkness. A single pulsing point of light in total silence that fractures into hundreds of particles on scroll input, accompanied by converging editorial typography.
2. **02 — AWAKENING (About / Introduction)**: Pinned section with word-by-word scrubbed text reveal. Particles organize into an ethereal humanoid silhouette/column.
3. **03 — CURIOSITY (Skills / Ecosystem)**: Interactive skills arena. Particles expand into orbiting satellite rings with sparks shooting outward toward interactive skill nodes and an inspector card.
4. **04 — LEARNING (Growth / Timeline)**: A vertical constellation path. Each career milestone is an igniting star node connected by progressive drawing light lines.
5. **05 — CREATION (Main Work / Projects — The Centerpiece)**: Peak brightness with a radiant golden particle core and radiating constellation webs. Features a pinned horizontal scroll-jacked exhibition gallery on desktop (converting gracefully to stacked cards on mobile/touch devices).
6. **06 — FAILURE (Process / Honesty)**: Stark, vulnerable contrast. The bright figure fractures and scatters downward via gravity physics, dimming to ash grey and crimson tones.
7. **07 — TRANSFORMATION (Methodology)**: A phoenix-from-ashes moment. Particles swirl upward in a spiral vortex, reassembling into a refined crystalline form while explaining core engineering principles.
8. **08 — WISDOM (Philosophy / Testimonials)**: Calm, symmetrical double-lotus sacred geometry. Features an interactive crossfade carousel of collaborator testimonials.
9. **09 — LEGACY (Contact / CTA / Footer)**: Full circle narrative. The soul figure dissolves back into a single point of light with direct inquiry copy buttons, downloadable resume links, and social connections.

---

## 🎨 Visual Design System

- **Typography**:
  - Display Headlines: `Playfair Display` (italic serif for editorial emotional resonance).
  - Labels & Meta: `JetBrains Mono` (small-caps/uppercase monospace, heavily letter-spaced `0.3em`).
  - Body Copy: `Inter` (clean sans-serif with generous line-height and low opacity white `rgba(255,255,255,0.7)`).
- **Color Palette**: Deep-space monochrome background (`#050505`), warm/cool white glows (`#f5f0e8` / `#e8f0ff`), and dynamic stage accent colors shifting from pale blue through electric cyan, warm gold, ash red, and ethereal violet.
- **Texture & Audio**: Animated HTML5 Canvas film-grain overlay (`~6% opacity`, `overlay` blend mode) with subtle edge vignette, plus an optional Web Audio API ambient chord generator (off by default).

---

## 🛠️ How to Customize Content

All editable copy, project data, skills, timeline milestones, testimonials, and stage colors are centralized in a single configuration file:

📁 **`app/data/content.ts`**

You can customize **100% of the site's text and data** simply by editing this file without ever touching the complex Three.js shader code or GSAP animation timelines!

### Swapping Placeholder Artwork & Project Assets

In `app/data/content.ts`, each project item in `SITE_CONTENT.projects` contains:
- `image`: The path to the image asset (currently pointing to high-aesthetic generated placeholders in `/public/images/project1.png`, etc.).
- `link`: The external URL when visitors click "LAUNCH EXHIBITION".
- `assetSuggestion`: Creative recommendations on what type of asset works best for production (e.g., video loops of 3D web experiments, WebGL embeds, or high-contrast drone footage).

To replace placeholder images:
1. Place your real project images, GIFs, or WebM/MP4 videos into the `/public/images/` directory.
2. Update the `image` path in `app/data/content.ts` (e.g., `image: "/images/my-real-project.jpg"`).

---

## ⚡ Performance & Accessibility

- **60fps Optimization**: Particle count dynamically scales based on device concurrency and screen width (~2,200 particles on desktop, auto-scaling down to ~800 or fewer on mobile/mid-range devices).
- **Reduced Motion Support**: Fully respects `prefers-reduced-motion: reduce`. When enabled by the visitor, complex Three.js orbital physics and parallax effects are disabled in favor of elegant color/opacity crossfades.
- **Touch & Mobile Friendly**: Horizontal scroll-jacking in Stage 05 automatically disables on touch screens and mobile viewports (< 768px), rendering clean vertical stacked exhibition cards instead.

---

## 🚀 Getting Started Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

*Crafted with code, light, and patience.*
