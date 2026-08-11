export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  year: string;
  category?: "PERSONAL" | "CLIENT";
}

export interface Skill {
  name: string;
  category: 'Core' | '3D & Motion' | 'Architecture' | 'Design';
  level: number; // 0 to 100
  description: string;
  orbitRadius: number; // For 3D / 2D orbital layout
  orbitSpeed: number;
}

export type MilestoneType = "education" | "win" | "hackathon" | "internship" | "venture" | "leadership" | "achievement";
export type MilestoneEra = "GENESIS" | "MOMENTUM" | "LEADERSHIP" | "ASCENDANCE";
export type MilestoneTrack = "left" | "right";

export interface TimelineMilestone {
  year: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlight: string;
  type: MilestoneType;
  era: MilestoneEra;
  track: MilestoneTrack;
  badge: string; // emoji icon
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
  label: string; // Practical portfolio tag e.g. "[ SKILLS ]", "[ PROJECTS ]"
  title: string;
  accentColor: string; // Hex color for soul particle & glow
  enabled?: boolean; // If false, stage is hidden from navigation bar & timeline
  particleState: {
    count: number;
    speed: number;
    dispersion: number;
    color: string;
  };
}

export const SITE_CONTENT = {
  meta: {
    title: "Yash Nimse | Portfolio",
    description: "Portfolio",
    author: "Yash Nimse",
  },

  stages: [
    {
      id: "void",
      number: "01",
      name: "VOID",
      label: "[ INTRO ]",
      title: "In the Beginning, Absence",
      accentColor: "#f5f0e8",
      enabled: true,
      particleState: { count: 1, speed: 0.2, dispersion: 0.05, color: "#f5f0e8" }
    },
    {
      id: "awakening",
      number: "02",
      name: "AWAKENING",
      label: "[ ABOUT ]",
      title: "Consciousness Taking Form",
      accentColor: "#ffc490",
      enabled: true,
      particleState: { count: 1800, speed: 0.5, dispersion: 0.3, color: "#ffc490" }
    },
    {
      id: "curiosity",
      number: "03",
      name: "CURIOSITY",
      label: "[ SKILLS ]",
      title: "Reaching Outward into the Unknown",
      accentColor: "#ffc490",
      enabled: true,
      particleState: { count: 2200, speed: 1.2, dispersion: 0.8, color: "#ffc490" }
    },
    {
      id: "learning",
      number: "04",
      name: "LEARNING",
      label: "[ EXPERIENCE ]",
      title: "Tracing the Constellations of Growth",
      accentColor: "#ffc490",
      enabled: true,
      particleState: { count: 2000, speed: 0.8, dispersion: 0.5, color: "#ffc490" }
    },
    {
      id: "creation",
      number: "05",
      name: "CREATION",
      label: "[ PROJECTS ]",
      title: "Synthesizing Light into Structure",
      accentColor: "#ffd890",
      enabled: true,
      particleState: { count: 2800, speed: 1.5, dispersion: 1.0, color: "#ffc870" }
    },

    {
      id: "legacy",
      number: "06",
      name: "LEGACY",
      label: "[ CONTACT ]",
      title: "Returning to the Infinite",
      accentColor: "#f5f0e8",
      enabled: true,
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
    statement: " I'm Yash Nimse, a third-year Computer Engineering student who enjoys turning ambitious ideas into real products. Whether it's building scalable web applications, AI-powered systems, or SaaS platforms, I'm driven by the challenge of solving meaningful problems through technology. Over the past few years, I've worked with startups, clients, and my own products, gaining experience across full-stack development, AI, and product design. From hackathon-winning solutions to freelance projects, every experience has helped shape the way I think, build, and grow. For me, development isn't just about writing code, it's about creating experiences, designing systems that scale, and building products that people genuinely enjoy using.",
    subText: ""
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
    // ── GENESIS (2022–2023) ───────────────────────────────────────────────────
    {
      year: "2022 – 2025",
      title: "Diploma in Computer Engineering",
      organization: "Vidyalankar Polytechnic",
      location: "Mumbai, India",
      description: "Three-year full-time diploma in Computer Engineering, building core foundations in programming, data structures, operating systems, and software engineering.",
      highlight: "Graduated as Department Topper — CO Branch, 1st Year",
      type: "education", era: "GENESIS", track: "left", badge: "🎓"
    },
    {
      year: "2022",
      title: "First Programming Languages: C & C++",
      organization: "Self-taught",
      location: "Mumbai",
      description: "Wrote my first lines of code — mastering procedural logic, pointers, memory management, and object-oriented principles with C and C++.",
      highlight: "Spark that ignited everything — the first program that actually ran",
      type: "education", era: "GENESIS", track: "left", badge: "⚡"
    },
    {
      year: "2023",
      title: "Web Development: HTML, CSS, JavaScript",
      organization: "Self-taught",
      location: "Mumbai",
      description: "Dove into the web — mastered HTML semantics, CSS layouts, vanilla JavaScript, and quickly expanded into React, Next.js, Tailwind CSS, and modern frameworks.",
      highlight: "Built first full client websites within months of learning",
      type: "education", era: "GENESIS", track: "left", badge: "🌐"
    },
    {
      year: "2023",
      title: "TechSpardha — First Competition Win",
      organization: "Vidyalankar Polytechnic",
      location: "Mumbai",
      description: "Won in 2 categories at TechSpardha, a prestigious tech project competition organized by Vidyalankar Polytechnic. First taste of competing — and winning — at the institutional level.",
      highlight: "Won in 2 categories — first competitive achievement in tech",
      type: "win", era: "GENESIS", track: "right", badge: "🏆"
    },
    {
      year: "2023",
      title: "First DSA Competition Win",
      organization: "VP Techshala",
      location: "Mumbai",
      description: "Won a Data Structures & Algorithms competition organized by VP Techshala, proving early aptitude for algorithmic problem-solving under time pressure.",
      highlight: "Winner — proof that logic and speed were becoming second nature",
      type: "win", era: "GENESIS", track: "right", badge: "🧠"
    },
    {
      year: "2023",
      title: "Topper — CO Department, 1st Year",
      organization: "Vidyalankar Polytechnic",
      location: "Mumbai",
      description: "Ranked as the top student in the Computer Engineering department (CO) for the first year of diploma, balancing academics with self-driven technical projects.",
      highlight: "Department Topper — academics and passion in parallel",
      type: "achievement", era: "GENESIS", track: "left", badge: "🥇"
    },
    {
      year: "Aug – Dec 2023",
      title: "WordPress Developer — First Internship",
      organization: "Unscrap Media",
      location: "Vashi, Mumbai",
      description: "First professional internship — built and deployed WordPress websites for real clients, learning production workflows, client communication, and web publishing at scale.",
      highlight: "First professional experience — went from student to developer",
      type: "internship", era: "GENESIS", track: "left", badge: "💼"
    },
    // ── MOMENTUM (2024) ──────────────────────────────────────────────────────
    {
      year: "2024",
      title: "Technothon 24 — State Level Hackathon Winner",
      organization: "VES Polytechnic, Chembur",
      location: "Mumbai",
      description: "Won first state-level hackathon, Technothon 24, organized by VES Polytechnic. Competed against teams from across Maharashtra and secured 1st place with a high-impact technical solution.",
      highlight: "1st Place — First state-level hackathon win",
      type: "hackathon", era: "MOMENTUM", track: "right", badge: "🚀"
    },
    {
      year: "2024",
      title: "Recursion 5.0 — Hackathon Winner",
      organization: "RGIT, Andheri",
      location: "Mumbai",
      description: "Won Recursion 5.0 hackathon organized by RGIT, Andheri. Delivered a full working prototype under intense time constraints, earning first place against strong competition from degree-level engineering students.",
      highlight: "1st Place — Won against degree-level engineers as a diploma student",
      type: "hackathon", era: "MOMENTUM", track: "right", badge: "⚡"
    },
    {
      year: "2024",
      title: "VP Internal Hackathon Winner",
      organization: "Vidyalankar Polytechnic",
      location: "Mumbai",
      description: "Won the internal institutional hackathon at Vidyalankar Polytechnic — 3rd hackathon win in 2024, demonstrating consistent ability to execute under pressure and deliver production-grade solutions.",
      highlight: "1st Place — 3rd hackathon win in a single year",
      type: "hackathon", era: "MOMENTUM", track: "right", badge: "🏆"
    },
    {
      year: "2024",
      title: "TechSpardha — Second Win",
      organization: "Vidyalankar Polytechnic",
      location: "Mumbai",
      description: "Won TechSpardha again, the prestigious tech project competition by Vidyalankar Polytechnic — a second consecutive win that cemented a reputation for delivering outstanding technical projects.",
      highlight: "Back-to-back TechSpardha champion",
      type: "win", era: "MOMENTUM", track: "right", badge: "🏅"
    },
    {
      year: "2024",
      title: "2nd Place — DSA Competition",
      organization: "Vidyalankar Institute of Technology",
      location: "Mumbai",
      description: "Placed 2nd in a Data Structures & Algorithms competition at VIT, demonstrating continued algorithmic sharpness while simultaneously winning hackathons in the same period.",
      highlight: "2nd Place at VIT — consistent competitor across multiple disciplines",
      type: "win", era: "MOMENTUM", track: "right", badge: "🧩"
    },
    {
      year: "Mar – Jun 2024",
      title: "Content & Design Team — IEEE Bombay Section",
      organization: "IEEE Bombay Section (SAAC)",
      location: "Mumbai",
      description: "Joined the Student Activities Advisory Committee (SAAC) of IEEE Bombay Section as a Content and Design team member — contributing to one of India's most active engineering chapters.",
      highlight: "Joined IEEE — contributing to India's premier engineering community",
      type: "achievement", era: "MOMENTUM", track: "left", badge: "🔬"
    },
    {
      year: "Jun – Jul 2024",
      title: "Web Developer — Second Internship",
      organization: "Hertzsoft Technologies",
      location: "Mumbai",
      description: "2nd internship as a professional Web Developer at Hertzsoft Technologies — built client web applications using modern stacks, gaining real-world industry experience in product delivery and client management.",
      highlight: "Promoted from WordPress Dev to Full-Stack Web Developer",
      type: "internship", era: "MOMENTUM", track: "left", badge: "💻"
    },
    {
      year: "2024 – 2025",
      title: "App Development Head",
      organization: "VP Techshala",
      location: "Vidyalankar Polytechnic, Mumbai",
      description: "Appointed as App Development Head at VP Techshala — the student technical body. Led the app development vertical, organizing events, mentoring juniors, and driving technical culture in the institution.",
      highlight: "Led the app development vertical at institutional student body",
      type: "leadership", era: "MOMENTUM", track: "left", badge: "👑"
    },
    // ── LEADERSHIP (2025) ─────────────────────────────────────────────────────
    {
      year: "2025",
      title: "Taught 60+ Students — 3+ Events",
      organization: "VP Techshala",
      location: "Vidyalankar Polytechnic, Mumbai",
      description: "Conducted 3+ app development events and competitions, directly teaching and mentoring 60+ students in mobile development, cross-platform frameworks, and modern app architecture.",
      highlight: "60+ students mentored — the first time I gave back what I learned",
      type: "leadership", era: "LEADERSHIP", track: "left", badge: "📚"
    },
    {
      year: "2025",
      title: "DiPEx 2025 — State Level Exhibition Shortlist",
      organization: "Maharashtra & Goa State Competition",
      location: "Maharashtra",
      description: "Shortlisted for DiPEx 2025, the prestigious state-level diploma project exhibition for Maharashtra and Goa. Presented a SaaS solution over 3 days in a competitive technical exhibition setting.",
      highlight: "Selected for state-level SaaS exhibition — 3-day product showcase",
      type: "win", era: "LEADERSHIP", track: "right", badge: "🌟"
    },
    {
      year: "2025",
      title: "OdooxSPIT — National Hackathon, 1st Runner-Up",
      organization: "Odoo × SPIT",
      location: "Mumbai",
      description: "Won 1st Runner-Up in OdooxSPIT, a national-level hackathon organized by Odoo and SPIT. Competed against the country's best engineering teams with a live technical solution built under pressure.",
      highlight: "National 1st Runner-Up — first national podium finish",
      type: "hackathon", era: "LEADERSHIP", track: "right", badge: "🥈"
    },
    {
      year: "2025 – Present",
      title: "Started Freelancing",
      organization: "Independent",
      location: "Global Remote",
      description: "Launched independent freelancing — taking on full-stack development, AI integration, and product design projects for clients across sectors. Every project a new challenge, a new domain.",
      highlight: "First paying projects as a solo professional",
      type: "venture", era: "LEADERSHIP", track: "left", badge: "🌍"
    },
    {
      year: "2025 – Present",
      title: "Co-founded DevAlly",
      organization: "DevAlly",
      location: "Mumbai / Remote",
      description: "Co-founded DevAlly, a digital agency offering full-stack development, AI solutions, and design services to businesses and startups. From solo developer to agency founder.",
      highlight: "From developer to founder — built a team, built a brand",
      type: "venture", era: "LEADERSHIP", track: "left", badge: "🚀"
    },
    {
      year: "2025 – Present",
      title: "25+ Clients Served",
      organization: "DevAlly & Freelance",
      location: "Global",
      description: "Delivered projects for 25+ clients spanning startups, local businesses, e-commerce brands, and SaaS products — across web development, mobile apps, and AI automation.",
      highlight: "25+ clients — real products solving real problems",
      type: "venture", era: "LEADERSHIP", track: "left", badge: "🤝"
    },
    {
      year: "2025 – Present",
      title: "B.E. Computer Engineering — SIES GST",
      organization: "SIES Graduate School of Technology",
      location: "Nerul, Navi Mumbai",
      description: "Completed diploma and directly admitted to B.E. Computer Engineering at SIES Graduate School of Technology — balancing advanced academics with freelancing, agency operations, and competitive achievements.",
      highlight: "Diploma to B.E. — never stopped building while learning",
      type: "education", era: "LEADERSHIP", track: "left", badge: "🎓"
    },
    // ── ASCENDANCE (2026) ────────────────────────────────────────────────────
    {
      year: "2026",
      title: "Technions — National Online Hackathon Winner",
      organization: "Technions (Powered by ElevenLabs)",
      location: "National (Online)",
      description: "Won Technions, a national-level online hackathon powered by ElevenLabs. Built and deployed an AI-powered solution leveraging cutting-edge voice AI technology against top engineering teams nationwide.",
      highlight: "National Winner — AI hackathon powered by ElevenLabs",
      type: "hackathon", era: "ASCENDANCE", track: "right", badge: "🤖"
    },
    {
      year: "2026",
      title: "Innovations — National Project Competition Winner",
      organization: "SIES Graduate School of Technology",
      location: "Nerul, Navi Mumbai",
      description: "Won Innovations, a national-level project competition organized by SIES Graduate School of Technology — presenting a breakthrough technical project that earned top honors at the national stage.",
      highlight: "National Winner — back-to-back national victories in 2026",
      type: "win", era: "ASCENDANCE", track: "right", badge: "🏆"
    }
  ] as TimelineMilestone[],

  projects: [
    // ── PERSONAL PROJECTS & SAAS ─────────────────────────────────────────────
    {
      id: "gten",
      title: "Gten",
      subtitle: "AI/ML Financial Forensics & Fraud Detection",
      description: "An advanced financial forensics platform utilizing AI/ML models for real-time fund flow intelligence and anomaly detection. Developed during the prestigious national Idea 2.0 Hackathon organized by Union Bank of India.",
      tags: ["REACT.JS", "PRISMA", "POSTGRESQL", "NEO4J", "PYTHON", "FASTAPI", "SHAP", "GEMINI", "RESEND"],
      image: "/projects/gten.webp",
      link: "https://g-ten.devally.in",
      year: "2025",
      category: "PERSONAL"
    },
    {
      id: "sitepilot",
      title: "Sitepilot",
      subtitle: "AI Multi-Tenant Custom Website Engine",
      description: "An AI-powered multi-tenant architecture engineered to autonomously generate, deploy, and manage enterprise-grade organizational websites natively. Built during SPIT Hackathon with dynamic theme synthesis and automated content provisioning.",
      tags: ["NEXT.JS", "NEXTAUTH", "PRISMA", "TAILWIND CSS", "SHADCN", "POSTGRESQL", "AWS S3", "CLOUDFLARE", "LOCAL LLM"],
      image: "/projects/sitepilot.webp",
      link: "https://spit-hackathon-2026.vercel.app/",
      year: "2026",
      category: "PERSONAL"
    },
    {
      id: "ecoflow",
      title: "EcoFlow",
      subtitle: "Vision AI Gamified Waste Management",
      description: "A revolutionary waste management platform leveraging Google Gemini 2.0 Flash AI for intelligent waste verification. Optimizes municipal collection routes with real-time tracking and incentivizes citizen participation via a gamified QR verification marketplace.",
      tags: ["NEXT.JS", "NEXTAUTH", "VISION API", "PRISMA", "POSTGRESQL", "GOOGLE MAPS API", "AWS S3"],
      image: "/projects/ecoflow.webp",
      link: "https://ecoflow.devally.in",
      year: "2026",
      category: "PERSONAL"
    },
    {
      id: "thikana",
      title: "Thikana",
      subtitle: "Local Business Growth & Storefront SaaS",
      description: "A powerful SaaS platform enabling local businesses to launch customizable digital storefronts, automate promotional offers, and amplify digital presence. Winner of 2+ National Level Competitions and selected for DiPEx 2025.",
      tags: ["NEXT.JS", "NEXTAUTH", "FIREBASE", "TAILWIND CSS", "SHADCN", "AWS S3", "GOOGLE MAPS API", "VAPI API", "REACT NATIVE", "PYTHON", "ALGOLIA", "RAZORPAY", "GEMINI API"],
      image: "/projects/thikana.webp",
      link: "https://tech-thikana.devally.in",
      year: "2025",
      category: "PERSONAL"
    },

    {
      id: "eve-manager",
      title: "EVE Manager",
      subtitle: "Institutional Event & Campus Ecosystem",
      description: "An end-to-end event management SaaS featuring instant QR-based attendance verification, role-based access control, volunteer workflows, automated payment gateways, real-time analytics, and a built-in virtual meeting portal. Technothon '23 Winning Project.",
      tags: ["NEXT.JS", "FIREBASE", "TAILWIND CSS", "RAZORPAY", "RESEND"],
      image: "/projects/evemanager.webp",
      link: "https://evemanager.vercel.app",
      year: "2024",
      category: "PERSONAL"
    },
    {
      id: "booknow",
      title: "BookNow",
      subtitle: "Smart Scheduling & Consultation SaaS",
      description: "A high-performance appointment booking product featuring smart automated scheduling, integrated payment processing, intelligent SMS/email reminders, and deep analytical dashboards within a highly secure architecture. OdooxSPIT National Hackathon Winner.",
      tags: ["NEXT.JS", "TAILWINDCSS", "SHADCN", "NEXTAUTH", "PRISMA", "POSTFRESQL", "RAZORPAY", "BOLNA API", "METAPI"],
      image: "/projects/booknow.webp",
      link: "https://booknow.devally.in",
      year: "2025",
      category: "PERSONAL"
    },
    {
      id: "ngo-connect",
      title: "NGO Connect",
      subtitle: "All in one NGO management ecosystem",
      description: "A centralized, transparent operational platform designed for NGOs to orchestrate activities, manage volunteer forces, and execute verified financial payouts through an integrated escrow system, ensuring total operational accountability.",
      tags: ["NEXT.JS", "FIREBASE", "TAIWINDCSS", "SHADCN", "RAZORPAY"],
      image: "/projects/ngoconnect.webp",
      link: "https://ngoconnect.devally.in/",
      year: "2025",
      category: "PERSONAL"
    },
    {
      id: "refkit",
      title: "Refkit",
      subtitle: "Web3 Referral & On-Chain Reward Infrastructure",
      description: "A decentralized Web3 referral and reward infrastructure. Enables brands to fund marketing campaigns directly with cryptocurrency, track referral attributions natively on-chain, and automatically distribute smart-contract rewards to brand advocates.",
      tags: ["WEB3", "SMART CONTRACTS", "ON-CHAIN TRACKING", "CRYPTO PAYOUTS", "DAPP"],
      image: "/projects/refkit.webp",
      link: "#",
      year: "2026",
      category: "PERSONAL"
    },

    // ── CLIENT WORK & AGENCY ─────────────────────────────────────────────────
    {
      id: "dev-ally",
      title: "Dev Ally | Digital Agency",
      subtitle: "Flagship Agency Showcase & Client Success Portal",
      description: "The official flagship website for Dev Ally, engineered to showcase high-impact digital services, case studies, and client transformation stories. Optimized for lightning-fast performance, technical SEO, and seamless content management.",
      tags: ["WORDPRESS", "ELEMENTOR"],
      image: "/projects/devally.webp",
      link: "https://www.devally.in/",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "brilliant-minds",
      title: "Brilliant Minds",
      subtitle: "Byculla's Premier Tuition Portal & Admin Suite",
      description: "A comprehensive web platform for Byculla's leading tuition institute, displaying academic programs, student toppers, and institutional events. Powered by a custom-built, full-featured administrative control panel for seamless academic management.",
      tags: ["NEXT.JS", "TAILWIND CSS", "SHADCN", "NEXTAUTH", "FIREBASE", "FIREBASE STORAGE"],
      image: "/projects/brilliantmindsweb.webp",
      link: "https://brilliantminds.co.in",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "brilliant-minds-app",
      title: "Brilliant Minds Application",
      subtitle: "Student & Admin Academic Workflow App",
      description: "A dedicated web application bridging administrators and students. Streamlines daily academic workflows including dynamic timetable scheduling, automated test scoring, attendance tracking, and instant broadcast announcements.",
      tags: ["React Native", "Firebase", "FCM"],
      image: "/projects/brilliantmindsapp.webp",
      link: "https://app.brilliantminds.co.in",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "the-common-people",
      title: "The Common People (TCP)",
      subtitle: "Australian ACNC-Registered Humanitarian Portal",
      description: "The digital home for an Australian ACNC-registered non-profit organization established in 2014. Engineered to drive global awareness and fundraising for child labor eradication, healthcare restoration, and formal education initiatives across international borders.",
      tags: ["WORDPRESS", "ELEMENTOR"],
      image: "/projects/thecommonpeople.webp",
      link: "https://thecommonpeople.org/",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "fyfo-health",
      title: "FYFO — Holistic Health",
      subtitle: "High-Conversion Fitness Lead Generation Engine",
      description: "A high-octane lead generation landing page built for a fitness coach on a mission to transform mindset and physical health. Features psychological conversion copywriting, instant lead capture forms, and automated real-time email dispatchers.",
      tags: ["NEXT.JS", "TAILWINDCSS", "SHADCN", "SMTP"],
      image: "/projects/fyfo.webp",
      link: "http://holistic-health.fyfo.in/",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "jennifers-flowers",
      title: "Jennifer’s Flowers",
      subtitle: "Canadian Bespoke Floral E-Commerce Store",
      description: "An elegant, high-converting e-commerce platform built for a Canada-based floral boutique in Vaughan. Features custom bouquet ordering workflows, multi-parameter product filtering, and localized delivery scheduling.",
      tags: ["WORDPRESS", "ELEMENTOR", "WOOCOMMERCE"],
      image: "/projects/jenniferflowers.webp",
      link: "https://flowersinvaughan.ca/",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "rcs-uniforms",
      title: "RCS Uniforms",
      subtitle: "Royal Crown School E-Commerce Distribution",
      description: "A robust, dedicated e-commerce distribution system developed for Royal Crown School in Canada. Streamlines the purchasing process for official school uniforms with automated sizing guides, inventory tracking, and student verification.",
      tags: ["WORDPRESS", "ELEMENTOR", "WOOCOMMERCE"],
      image: "/projects/royalcrownuniform.webp",
      link: "https://uniform.royalcrownschool.com/",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "navkar-store",
      title: "Navkar Academy Store",
      subtitle: "Digital E-Book E-Commerce & Analytics Suite",
      description: "An automated digital e-commerce storefront for Navkar Academy selling proprietary E-Books. Features interactive cover page previews, secure digital document delivery, and a comprehensive admin suite tracking sales statistics and revenue analytics.",
      tags: ["NEXT.JS", "TAILWINDCSS", "SHADCN", "FIREBASE", "RAZORPAY"],
      image: "/projects/navkar-academystore.webp",
      link: "https://navkar-academy-store.vercel.app/",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "navkar-academy",
      title: "Navkar Academy",
      subtitle: "Playgroup & Early Childhood Institutional Portal",
      description: "A warm, engaging landing experience designed for an early childhood playgroup school. Showcases interactive photo galleries, curriculum highlights, and upcoming campus events to prospective parents with delightful micro-animations.",
      tags: ["NEXT.JS", "TAILWINDCSS", "SHADCN"],
      image: "/projects/navkar-academy.webp",
      link: "https://navkar-academy.vercel.app/",
      year: "2025",
      category: "CLIENT"
    },
    {
      id: "nutty-kids",
      title: "Nutty Kids",
      subtitle: "Playful Digital Presence for Early Learning",
      description: "A playful, modern landing platform engineered for a children's playgroup school. Highlights institutional values, event schedules, and vivid photographic galleries in a child-friendly, mobile-optimized interface.",
      tags: ["LANDING PAGE", "CHILD EDUCATION", "INTERACTIVE GALLERY", "MOBILE OPTIMIZED", "CLIENT WORK"],
      image: "/projects/nuttykids.webp",
      link: "https://nuttykids.com",
      year: "2025",
      category: "CLIENT"
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
      email: "yash@devally.in",
      phone: "+91 8097310988",
      location: "Mumbai / Global Remote",
      resumeUrl: "/resume.pdf"
    },
    socials: [
      { name: "GITHUB", url: "https://github.com/Prg-Yash" },
      { name: "LINKEDIN", url: "https://linkedin.com/in/yashnimse" },
      { name: "LEETCODE", url: "https://leetcode.com/u/yashnimse92/" },
      { name: "INSTAGRAM", url: "https://instagram.com/yash.nimse.92/" },
      { name: "X", url: "https://x.com/yashnimse92" }
    ],
    copyright: "© 2026 THE JOURNEY OF THE SOUL. CRAFTED WITH CODE, LIGHT, AND PATIENCE."
  }
};
