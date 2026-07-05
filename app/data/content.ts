export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  role: string;
  year: string;
  assetSuggestion: string;
}

export interface Skill {
  name: string;
  category: 'Core' | '3D & Motion' | 'Architecture' | 'Design';
  level: number; // 0 to 100
  description: string;
  orbitRadius: number; // For 3D / 2D orbital layout
  orbitSpeed: number;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlight: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface StageConfig {
  id: string;
  number: string;
  name: string;
  title: string;
  accentColor: string; // Hex color for soul particle & glow
  particleState: {
    count: number;
    speed: number;
    dispersion: number;
    color: string;
  };
}

export const SITE_CONTENT = {
  meta: {
    title: "The Journey of the Soul — Portfolio",
    description: "An immersive scroll-driven narrative experience exploring the metaphorical evolution of a creative developer's soul.",
    author: "Creative Technologist",
  },
  
  stages: [
    {
      id: "void",
      number: "01",
      name: "VOID",
      title: "In the Beginning, Absence",
      accentColor: "#f5f0e8",
      particleState: { count: 1, speed: 0.2, dispersion: 0.05, color: "#f5f0e8" }
    },
    {
      id: "awakening",
      number: "02",
      name: "AWAKENING",
      title: "Consciousness Taking Form",
      accentColor: "#ffc490",
      particleState: { count: 1800, speed: 0.5, dispersion: 0.3, color: "#ffc490" }
    },
    {
      id: "curiosity",
      number: "03",
      name: "CURIOSITY",
      title: "Reaching Outward into the Unknown",
      accentColor: "#ffc490",
      particleState: { count: 2200, speed: 1.2, dispersion: 0.8, color: "#ffc490" }
    },
    {
      id: "learning",
      number: "04",
      name: "LEARNING",
      title: "Tracing the Constellations of Growth",
      accentColor: "#ffc490",
      particleState: { count: 2000, speed: 0.8, dispersion: 0.5, color: "#ffc490" }
    },
    {
      id: "creation",
      number: "05",
      name: "CREATION",
      title: "Synthesizing Light into Structure",
      accentColor: "#ffd890",
      particleState: { count: 2800, speed: 1.5, dispersion: 1.0, color: "#ffc870" }
    },
    {
      id: "failure",
      number: "06",
      name: "FAILURE",
      title: "The Dissolution of Certainty",
      accentColor: "#ff6060",
      particleState: { count: 1500, speed: 2.0, dispersion: 2.5, color: "#d05050" }
    },
    {
      id: "transformation",
      number: "07",
      name: "TRANSFORMATION",
      title: "Reassembling from the Ashes",
      accentColor: "#d4a5ff",
      particleState: { count: 2200, speed: 1.0, dispersion: 0.6, color: "#c080ff" }
    },
    {
      id: "wisdom",
      number: "08",
      name: "WISDOM",
      title: "The Serenity of Equilibrium",
      accentColor: "#ffc490",
      particleState: { count: 2400, speed: 0.3, dispersion: 0.2, color: "#ffc490" }
    },
    {
      id: "legacy",
      number: "09",
      name: "LEGACY",
      title: "Returning to the Infinite",
      accentColor: "#f5f0e8",
      particleState: { count: 100, speed: 0.1, dispersion: 0.1, color: "#ffffff" }
    }
  ] as StageConfig[],

  hero: {
    headline: "THE JOURNEY OF THE SOUL",
    subline: "AN IMMERSIVE EXPLORATION OF DIGITAL CRAFT & NARRATIVE ARCHITECTURE",
    scrollPrompt: "SCROLL TO AWAKEN",
    introText: "Before structure, there is only potential. A single point in the dark, waiting for an impulse to divide, to expand, to become."
  },

  about: {
    statement: "I am a creative technologist and front-end architect dedicated to crafting digital experiences that transcend mere utility. I believe code is a medium for emotional resonance—bridging the gap between mathematical precision and human intuition.",
    subText: "With over 8 years of experience building Awwwards-tier web applications, generative art installations, and real-time 3D environments, my work explores the intersection of kinetic typography, shader programming, and responsive storytelling."
  },

  skills: [
    { name: "WebGL & Three.js", category: "3D & Motion", level: 95, description: "Custom GLSL shaders, procedural geometry, particle fields, post-processing pipelines.", orbitRadius: 180, orbitSpeed: 0.008 },
    { name: "GSAP 3 & ScrollTrigger", category: "3D & Motion", level: 98, description: "Complex timeline choreography, scroll-linked physics, SVG motion paths, SplitText reveal.", orbitRadius: 220, orbitSpeed: -0.006 },
    { name: "React & Next.js", category: "Core", level: 95, description: "App router architecture, server components, state synchronization, high-performance UI.", orbitRadius: 150, orbitSpeed: 0.01 },
    { name: "TypeScript", category: "Core", level: 92, description: "Strict type safety, generic architecture, scalable design systems.", orbitRadius: 260, orbitSpeed: -0.005 },
    { name: "Creative Typography", category: "Design", level: 90, description: "Editorial layout, kinetic text reveals, variable font interpolation, optical kerning.", orbitRadius: 200, orbitSpeed: 0.007 },
    { name: "Tailwind & CSS Architecture", category: "Core", level: 96, description: "Fluid responsive design, design tokens, glassmorphism, micro-animations.", orbitRadius: 240, orbitSpeed: -0.008 },
    { name: "Generative AI & Shaders", category: "3D & Motion", level: 88, description: "AI-assisted procedural textures, real-time noise algorithms, audio-reactive visuals.", orbitRadius: 280, orbitSpeed: 0.004 },
    { name: "System Architecture", category: "Architecture", level: 90, description: "Modular component design, performance profiling (60fps target), micro-frontends.", orbitRadius: 170, orbitSpeed: -0.009 }
  ] as Skill[],

  timeline: [
    {
      year: "2024 — PRESENT",
      title: "Principal Creative Technologist",
      organization: "Noctra Studio",
      location: "Remote / New York",
      description: "Leading the interactive engineering team in crafting award-winning WebGL web experiences and immersive brand ecosystems for luxury and tech clients.",
      highlight: "2x Awwwards Site of the Month, 5x FWA of the Day"
    },
    {
      year: "2021 — 2024",
      title: "Senior Front-End Architect",
      organization: "Ethereal Interactive",
      location: "San Francisco, CA",
      description: "Architected real-time 3D web applications and scroll-driven design systems. Specialized in Three.js shader optimization and GSAP timeline synchronization.",
      highlight: "Reduced 3D bundle load times by 45% while maintaining 60fps across mobile viewports"
    },
    {
      year: "2019 — 2021",
      title: "Creative Developer",
      organization: "Vortex Digital Arts",
      location: "London, UK",
      description: "Developed interactive gallery exhibitions and experimental web experiences using Canvas 2D, WebGL, and custom particle engines.",
      highlight: "Featured in Webby Awards 2020 for Experimental & Weird"
    },
    {
      year: "2017 — 2019",
      title: "UI/UX Engineer & Designer",
      organization: "Freelance",
      location: "Global",
      description: "Bridged the gap between visual design and technical implementation, mastering typography, motion physics, and clean responsive code.",
      highlight: "Built over 30 bespoke client websites with focus on micro-interactions"
    }
  ] as TimelineMilestone[],

  projects: [
    {
      id: "constellations-dome",
      title: "Constellations & Absence",
      subtitle: "An inquiry into pattern-making in the sky",
      description: "An interactive digital planetarium experience examining how human cultures impose structure onto infinite darkness. Features generative star maps, real-time audio-reactive dissolution shaders, and editorial typography.",
      tags: ["THREE.JS", "GLSL SHADERS", "GSAP SCROLLTRIGGER", "NEXT.JS"],
      image: "/images/project1.png",
      link: "https://example.com/constellations",
      role: "Lead Creative Technologist & Designer",
      year: "2025",
      assetSuggestion: "RECOMMENDED ASSET: A high-resolution 1080p video loop (WebM/MP4) showing interactive 3D constellation nodes orbiting in real-time as the user moves their mouse over the night sky."
    },
    {
      id: "neural-sculpture",
      title: "Neural Synapse Gallery",
      subtitle: "Visualizing artificial intelligence thoughts",
      description: "A generative 3D web exhibition translating neural network weight distributions into glowing, ethereal volumetric light sculptures suspended in virtual space.",
      tags: ["WEBGL", "REACT THREE FIBER", "TAILWIND CSS", "LENIS SCROLL"],
      image: "/images/project2.png",
      link: "https://example.com/neural",
      role: "3D Architect & Front-End Engineer",
      year: "2024",
      assetSuggestion: "RECOMMENDED ASSET: An interactive WebGL canvas embed or cinematic 4K rendering showing volumetric light rays refracting through geometric crystal structures."
    },
    {
      id: "echoes-silence",
      title: "Echoes of Silence",
      subtitle: "A digital monument to forgotten architecture",
      description: "An immersive scroll-driven documentary exploring brutalist monuments in remote landscapes. Combines photogrammetry 3D scans with atmospheric fog shaders and spatial audio.",
      tags: ["THREE.JS", "PHOTOGRAMMETRY", "GSAP MOTIONPATH", "WEB AUDIO API"],
      image: "/images/project3.png",
      link: "https://example.com/echoes",
      role: "Creative Director & Developer",
      year: "2024",
      assetSuggestion: "RECOMMENDED ASSET: A drone flyover video loop rendered with monochromatic film grain and high-contrast lighting."
    },
    {
      id: "void-symphony",
      title: "The Void Symphony",
      subtitle: "Audio-reactive dark matter visualization",
      description: "An experimental browser instrument where users manipulate gravitational fields to generate evolving ambient soundscapes and particle choreographies.",
      tags: ["CANVAS 2D", "WEB AUDIO API", "TYPESCRIPT", "TAILWIND V4"],
      image: "/images/project1.png",
      link: "https://example.com/symphony",
      role: "Solo Creator",
      year: "2023",
      assetSuggestion: "RECOMMENDED ASSET: A screen recording demonstrating real-time particle physics reacting to synthesizer frequencies."
    }
  ] as Project[],

  failure: {
    quote: "We do not evolve in the light; we grow when the structures we built collapse and force us to understand the architecture of our own resilience.",
    story: "In 2022, I spent eight months engineering an ambitious real-time metaverse gallery that ultimately failed to launch due to overwhelming performance jank on mobile devices and over-engineered abstractions.",
    lesson: "That failure stripped away my reliance on spectacle without substance. It taught me the most sacred rule of interactive engineering: performance is an aesthetic. A 60fps experience with simple geometry will always move the soul more deeply than a stuttering masterpiece."
  },

  transformation: {
    headline: "THE METHODOLOGY OF REBIRTH",
    subtitle: "HOW I ARCHITECT DIGITAL EXPERIENCES TODAY",
    pillars: [
      {
        title: "01 / PERFORMANCE AS FOUNDATION",
        description: "Every animation is profiled against 60fps frame budgets. GPU-accelerated transforms, instanced meshes, and offscreen canvas rendering ensure buttery smoothness across devices."
      },
      {
        title: "02 / NARRATIVE CHOREOGRAPHY",
        description: "We don't just build pages; we score emotional journeys. Scroll position acts as the conductor's baton, harmonizing typography reveals, lighting shifts, and spatial audio."
      },
      {
        title: "03 / EMOTIONAL TYPOGRAPHY",
        description: "Type is voice. The contrast between dramatic editorial serifs and tracked-out monospace labels creates an editorial tension that elevates digital interfaces into art."
      }
    ]
  },

  wisdom: {
    philosophy: "True mastery is not the accumulation of complexity, but the elimination of the unnecessary until only the essential resonance remains.",
    testimonials: [
      {
        quote: "Working with them felt less like hiring a developer and more like collaborating with an artist who speaks fluent mathematics. They elevated our brand from a website to an unforgettable emotional destination.",
        author: "Elena Rostova",
        role: "Chief Creative Officer",
        company: "Vanguard Luxury Group"
      },
      {
        quote: "The attention to micro-interactions and performance is staggering. Our users spend an average of 6 minutes exploring the site—unheard of in today's fast-paced digital landscape.",
        author: "Marcus Chen",
        role: "Founder & CEO",
        company: "Aether AI"
      },
      {
        quote: "They possess that rare duality: technical brilliance capable of custom WebGL shaders, combined with exquisite typographic taste and editorial pacing.",
        author: "Sarah Jenkins",
        role: "Design Director",
        company: "Studio Monolith"
      }
    ] as Testimonial[]
  },

  legacy: {
    closingLine: "Let's create something worth becoming.",
    subline: "I am currently accepting select creative commissions, technical advisory roles, and collaborative art projects for 2026 and beyond.",
    contact: {
      email: "create@journeyofthesoul.studio",
      phone: "+1 (555) 019-2834",
      location: "New York / Global Remote",
      resumeUrl: "/resume.pdf"
    },
    socials: [
      { name: "AWWWARDS", url: "https://awwwards.com" },
      { name: "GITHUB", url: "https://github.com" },
      { name: "TWITTER / X", url: "https://twitter.com" },
      { name: "LINKEDIN", url: "https://linkedin.com" },
      { name: "INSTAGRAM", url: "https://instagram.com" }
    ],
    copyright: "© 2026 THE JOURNEY OF THE SOUL. CRAFTED WITH WITH CODE, LIGHT, AND PATIENCE."
  }
};
