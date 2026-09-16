import { Project, SkillCategory, ExperienceItem } from "@/types";

export const PERSONAL_INFO = {
  name: "Vikrant Choudhary",
  role: "Full-Stack Developer & Systems Builder",
  tagline: "I build fast web applications, scalable backend APIs, and real-time platforms.",
  bio: "Full-Stack Developer currently studying Computer Applications at Manipal University Jaipur. Coding and shipping software since 12th grade—obsessed with TypeScript, Go, PostgreSQL, and building snappy, production-ready web products.",
  email: "vikrantchoudhary06@gmail.com",
  github: "https://github.com/vikrant-choudhary06",
  linkedin: "https://linkedin.com/in/",
  location: "Mathura, India",
  status: "Available for Roles & Internships",
  currentVibe: {
    building: "High-throughput Go microservices & real-time systems",
    listening: "Lo-Fi Beats & Synthwave",
    fuel: "Chai & late-night deep work sessions",
    devQuote: "Clean architecture, sub-50ms APIs, and zero compromise on user experience.",
  },
  stats: [
    { label: "Code Shipped", value: "8+ Real Apps" },
    { label: "Weapon of Choice", value: "TypeScript & Go" },
    { label: "Focus Domain", value: "Full-Stack & APIs" },
    { label: "Current Base", value: "Manipal Univ Jaipur" },
  ],
};

export const ALL_PROJECTS: (Project & { 
  ecosystem?: string; 
  badgeColor?: string; 
  metrics?: string;
  featured?: boolean;
})[] = [
  {
    id: "retail-erp-suite",
    title: "OmniRetail — Multi-Tenant Retail & Dining ERP",
    category: "Full-Stack B2B Flagship",
    ecosystem: "POS • Invoicing • Tasks • Payroll",
    badgeColor: "from-emerald-400 to-teal-400",
    metrics: "Sub-100ms Cart • High-Throughput",
    featured: true,
    description: "An interconnected business suite engineered for retail & restaurants. Features rapid POS checkout, automated GST billing, real-time kitchen order dispatch, and employee payroll governance.",
    highlights: [
      "Point of Sale (POS): Sub-100ms item lookup, barcode processing, and live cart reconciliation",
      "Invoice Engine: Automated GST calculation (CGST/SGST/IGST) with tamper-proof financial logging",
      "Payroll Hub: Attendance-linked salary calculations and dynamic pay slip generator",
      "Kitchen Task Dispatch: Real-time Kanban order board with live status updates"
    ],
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis", "Zustand"],
    githubUrl: "https://github.com/vikrant-choudhary06",
    status: "Production"
  },
  {
    id: "movie-streaming",
    title: "PopcornStream — Video Streaming Platform",
    category: "Media & Cloud Infrastructure",
    badgeColor: "from-rose-500 to-amber-500",
    metrics: "Adaptive Playback • Low Latency",
    description: "Full-featured on-demand video streaming platform with responsive media player, adaptive bitrate buffering, user watchlists, and secure auth.",
    highlights: [
      "Chunked video streaming architecture for instant playback without freezing",
      "Optimized media caching layer saving redundant server bandwidth",
      "JWT-authenticated user sessions, persistent watchlists & search history"
    ],
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "JWT"],
    githubUrl: "https://github.com/vikrant-choudhary06",
    status: "Production"
  },
  {
    id: "imdb-scraper",
    title: "IMDb High-Throughput Scraper & Fast API",
    category: "Backend & Systems",
    badgeColor: "from-amber-400 to-orange-500",
    metrics: "Sub-15ms API Latency",
    description: "Blazing fast concurrent scraping pipeline and REST API designed to harvest, clean, and serve movie metadata at scale with zero lag.",
    highlights: [
      "Concurrent worker pipelines with rate-limiting and auto retry backoff",
      "Automated data extraction, sanitization, and structured schema storage",
      "Redis caching layer delivering lightning-fast sub-15ms query responses"
    ],
    tags: ["Python / Go", "FastAPI", "Redis", "REST APIs"],
    githubUrl: "https://github.com/vikrant-choudhary06",
    status: "Production"
  },
  {
    id: "ecommerce-app",
    title: "NovaStore — Full-Stack E-Commerce Engine",
    category: "Product Engineering",
    badgeColor: "from-blue-400 to-indigo-500",
    metrics: "Idempotent Orders",
    description: "High-conversion modern storefront built for speed: dynamic multi-variant product filtering, real-time cart state, and idempotent checkout.",
    highlights: [
      "Instant faceted search, filter, and sorting across extensive catalogs",
      "Idempotent checkout pipeline to eliminate duplicate card charges",
      "PostgreSQL schema indexing optimized for high-traffic sales spikes"
    ],
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/vikrant-choudhary06",
    status: "Case Study"
  },
  {
    id: "tech-us",
    title: "Tech Us — Developer Social & Knowledge Hub",
    category: "Community Platform",
    badgeColor: "from-purple-400 to-pink-500",
    metrics: "Real-time Interactions",
    description: "Interactive social community platform for developers to discuss code, share micro-articles, and debate programming frameworks.",
    highlights: [
      "Live discussion threads with nested comment support and reactions",
      "Dark-mode first reader experience engineered for clean code snippets",
      "Optimized REST endpoints with authenticated relational storage"
    ],
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/vikrant-choudhary06",
    status: "Case Study"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Contract Software Engineer (Freelance)",
    organization: "Client Work (Under NDA)",
    type: "Freelance / Contract",
    period: "2024 - Present",
    description: "Built custom web applications, high-performance database schemas, and clean REST APIs for real-world clients.",
    achievements: [
      "Cut API response times by ~35% by redesigning database indexes and query caching.",
      "Engineered secure role-based access control (RBAC) and JWT auth pipelines.",
      "Shipped modular TypeScript components that clients love using daily."
    ],
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker"]
  },
  {
    role: "Open Source Contributor",
    organization: "GitHub Community",
    type: "Open Source",
    period: "2023 - Present",
    description: "Contributing bug fixes, type improvements, and documentation clarity to repositories I use and love.",
    achievements: [
      "Submitted PRs fixing edge-case type gaps and UI bugs.",
      "Active participant in the developer ecosystem with clean Git hygiene."
    ],
    technologies: ["Git", "GitHub Actions", "TypeScript", "Python"]
  },
  {
    role: "BCA (Bachelor of Computer Applications)",
    organization: "Manipal University Jaipur (MUJ)",
    type: "Education",
    period: "2026 - Present",
    description: "Deep-diving into computer science fundamentals, distributed systems, algorithms, and database design.",
    achievements: [
      "Active focus on Distributed Systems, Advanced Data Structures, and API design.",
      "Building full-stack platforms and backend microservices concurrently with coursework."
    ],
    technologies: ["DSA", "DBMS", "Computer Networks", "Software Engineering"]
  }
];

export const TECH_RADAR: SkillCategory[] = [
  {
    title: "Languages I Code In",
    description: "Where I write production code and scripts daily.",
    skills: [
      { name: "JavaScript", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "Python", level: "Core" },
      { name: "Go (Golang)", level: "Core" },
      { name: "SQL", level: "Core" },
      { name: "HTML5 / CSS3", level: "Core" },
    ]
  },
  {
    title: "Frontend & UI",
    description: "Making interfaces that look snappy and feel instant.",
    skills: [
      { name: "React", level: "Core" },
      { name: "Next.js", level: "Core" },
      { name: "Tailwind CSS", level: "Core" },
      { name: "Vite", level: "Core" },
      { name: "React Native", level: "Familiar" },
      { name: "Vue.js", level: "Familiar" },
      { name: "Three.js", level: "Familiar" },
    ]
  },
  {
    title: "Backend & Systems",
    description: "APIs, microservices, and logic that never breaks.",
    skills: [
      { name: "Node.js", level: "Core" },
      { name: "Express", level: "Core" },
      { name: "NestJS", level: "Core" },
      { name: "FastAPI", level: "Core" },
      { name: "Django / Flask", level: "Core" },
      { name: "REST APIs", level: "Core" },
    ]
  },
  {
    title: "Databases & Caching",
    description: "Where data stays consistent, fast, and ACID-safe.",
    skills: [
      { name: "PostgreSQL", level: "Core" },
      { name: "Prisma ORM", level: "Core" },
      { name: "Redis", level: "Core" },
      { name: "MongoDB", level: "Core" },
      { name: "MySQL / SQL Server", level: "Core" },
    ]
  },
  {
    title: "DevOps & Tooling",
    description: "Shipping, containerizing, and keeping things running.",
    skills: [
      { name: "Docker", level: "Core" },
      { name: "Git & GitHub", level: "Core" },
      { name: "GitHub Actions", level: "Core" },
      { name: "Postman", level: "Core" },
      { name: "Cloud (Vercel / AWS / GCP)", level: "Core" },
      { name: "Nginx", level: "Core" },
    ]
  }
];
