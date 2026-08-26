export interface TechItem {
  name: string;
  category?: "frontend" | "backend" | "tools" | "other";
  bg: string;
  iconName?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
}

export interface EducationItem {
  type: "Education" | "Achievement" | "Certification";
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  gradient: string;
}

export const TECH_STACK: TechItem[] = [
  { name: "Vue.js", category: "frontend", bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
  { name: "React.js", category: "frontend", bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" },
  { name: "TypeScript", category: "frontend", bg: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
  { name: "Tailwind CSS", category: "frontend", bg: "bg-sky-500/10 border-sky-500/30 text-sky-400" },
  { name: "Next.js", category: "frontend", bg: "bg-zinc-500/10 border-zinc-500/30 text-zinc-200" },
  { name: "Node.js", category: "backend", bg: "bg-green-500/10 border-green-500/30 text-green-400" },
  { name: "JavaScript", category: "frontend", bg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" },
  { name: "Git & GitHub", category: "tools", bg: "bg-orange-500/10 border-orange-500/30 text-orange-400" },
  { name: "Supabase", category: "backend", bg: "bg-emerald-600/10 border-emerald-600/30 text-emerald-300" },
  { name: "PostgreSQL", category: "backend", bg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400" },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Tech Corp Indonesia",
    role: "Front-End Developer",
    period: "2024 - Sekarang",
    description: [
      "Mengembangkan aplikasi web berbasis React.js dan Next.js dengan fokus pada optimasi performa dan SEO.",
      "Bekerja sama dengan tim UI/UX untuk mengimplementasikan design system yang konsisten dan responsif.",
      "Meningkatkan skor Lighthouse website utama dari 65 menjadi 95+.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
  },
  {
    company: "Digital Creative Studio",
    role: "Junior Web Developer",
    period: "2023 - 2024",
    description: [
      "Membangun lebih dari 10 landing page interaktif menggunakan Vue.js dan Tailwind CSS.",
      "Mengintegrasikan REST API backend ke dalam antarmuka pengguna secara real-time.",
      "Melakukan refactoring kode legacy untuk mempercepat loading speed halaman.",
    ],
    tech: ["Vue.js", "JavaScript", "REST API", "Tailwind CSS"],
  },
  {
    company: "Freelance / Remote",
    role: "Frontend Specialist",
    period: "2022 - 2023",
    description: [
      "Menerima proyek pembuatan portofolio, dashboard admin, dan e-commerce dari klien lokal.",
      "Memastikan tampilan web kompatibel cross-browser dan mobile-friendly.",
    ],
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    type: "Education",
    title: "S1 Teknik Informatika / Sistem Informasi",
    institution: "Universitas Teknologi",
    period: "2020 - 2024",
    description: "Fokus pada Rekayasa Perangkat Lunak, Struktur Data, dan Pemrograman Web Modern.",
  },
  {
    type: "Achievement",
    title: "Juara 1 Hackathon Web Development",
    institution: "National Tech Competition",
    period: "2023",
    description: "Membuat platform interaktif berbasis Next.js dalam waktu 48 jam dengan performa unggul.",
  },
  {
    type: "Certification",
    title: "Frontend Developer Career Path",
    institution: "Dicoding / Coursera",
    period: "2023",
    description: "Sertifikasi keahlian spesialisasi React, Vue, dan Web Performance Optimization.",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "E-Commerce Modern Dashboard",
    category: "Web Application",
    description: "Dashboard analitik real-time dengan chart interaktif, dark mode, dan manajemen inventaris produk yang dinamis.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Supabase"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-cyan-600 via-blue-600 to-indigo-800",
  },
  {
    title: "AI Writing Assistant App",
    category: "SaaS Platform",
    description: "Platform pembuat konten berbasis AI dengan antarmuka yang bersih, editor markdown cerdas, dan integrasi API OpenAI.",
    tech: ["React.js", "Tailwind CSS", "OpenAI API", "Node.js"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-purple-600 via-indigo-600 to-blue-800",
  },
  {
    title: "Interactive Learning Hub",
    category: "EdTech",
    description: "Aplikasi pembelajaran interaktif dengan fitur kuis berbatas waktu, modul video interaktif, dan pelacakan pencapaian pengguna.",
    tech: ["Vue.js", "Pinia", "Tailwind CSS", "Supabase"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-emerald-600 via-teal-600 to-cyan-800",
  },
  {
    title: "FinTech Personal Portfolio & Tracker",
    category: "Web Application",
    description: "Aplikasi pelacak keuangan pribadi dan portofolio investasi dengan visualisasi data interaktif dan ekspor laporan keuangan.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-amber-600 via-orange-600 to-rose-800",
  },
];
