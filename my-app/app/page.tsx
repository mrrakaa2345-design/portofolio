"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TechMarquee from "@/components/TechMarquee";
import ProjectCard from "@/components/ProjectCard";
import { TECH_STACK, EXPERIENCES, EDUCATION_TIMELINE, PROJECTS } from "@/lib/data";
import { supabase } from "@/lib/supabase";

const SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "PHP",
  "Laravel",
  "MySQL",
  "Supabase",
  "Figma",
  "Git & GitHub",
];

const SPECIALIZATIONS = [
  {
    title: "Front-End Development",
    desc: "Membangun web app modern dengan React, Next.js, dan Tailwind CSS yang teroptimasi performanya.",
    tag: "Frontend",
  },
  {
    title: "UI/UX Design & Prototyping",
    desc: "Merancang wireframe, user flow, dan desain antarmuka bernuansa modern dan rapi di Figma.",
    tag: "Design",
  },
  {
    title: "Full-Stack Integration",
    desc: "Menghubungkan antarmuka ke backend dan database serverless seperti Supabase, Laravel, dan REST API.",
    tag: "Fullstack",
  },
  {
    title: "Interactive Interfaces",
    desc: "Menambahkan animasi halus, efek hover, dan transisi visual yang membuat web terasa hidup.",
    tag: "Motion",
  },
];

const CERTIFICATES = [
  {
    title: "Frontend Developer Expert",
    issuer: "Dicoding Academy",
    date: "2023",
    skills: ["PWA", "Web Performance", "Clean Code", "Testing"],
  },
  {
    title: "React & Next.js Architecture Specialist",
    issuer: "Coursera / Meta",
    date: "2023",
    skills: ["React Server Components", "State Management", "SSR & SSG"],
  },
  {
    title: "Advanced JavaScript & TypeScript Mastery",
    issuer: "Udemy",
    date: "2022",
    skills: ["Asynchronous JS", "Generics", "Type Safety", "Design Patterns"],
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  // Typing Effect
  const [textIndex, setTextIndex] = useState(0);
  const roles = ["Front-End Developer", "UI/UX Enthusiast", "React & Next.js Developer"];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Projects Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Contact Form State (Supabase)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const currentRole = roles[textIndex % roles.length];
    const speed = isDeleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => prev + 1);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  // Project Categories Dynamic Filter
  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Form Submit Handler (Supabase)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("messages").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Gagal mengirim pesan ke Supabase:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-28 sm:space-y-36 pb-20 scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16 min-h-[80vh] pt-8 sm:pt-14 scroll-mt-28">
        <div className="flex-1 space-y-6 sm:space-y-8 text-center md:text-left" data-aos="fade-right">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for Work & Projects</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Hi, Saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Raka Febrian</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 min-h-[40px] flex items-center justify-center md:justify-start gap-2">
            <span>Saya seorang</span> <span className="text-cyan-400 font-bold">{displayText}</span>
            <span className="w-1 h-6 sm:h-7 bg-cyan-400 animate-pulse"></span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal mx-auto md:mx-0">
            Siswa SIJA di SMK Telkom Sidoarjo yang berfokus pada perancangan antarmuka web modern, cepat, dan nyaman digunakan.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-5 pt-2 sm:pt-4">
            <button
              onClick={() => scrollTo("projects")}
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Lihat Proyek
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 font-bold text-base hover:bg-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Hubungi Saya
            </button>
          </div>
        </div>

        {/* Profile Frame with Glow */}
        <div className="relative group w-full max-w-[280px] sm:max-w-sm md:w-auto" data-aos="zoom-in" data-aos-delay="200">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-80 transition duration-700 group-hover:scale-105"></div>
          
          <div className="relative w-full aspect-[4/5] rounded-3xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-2xl flex flex-col justify-between group-hover:border-cyan-500/50 transition-all duration-500">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>PROFILE</span>
              <span className="text-cyan-400 font-bold">2026</span>
            </div>

            <div className="my-auto text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl font-bold text-white shadow-md group-hover:scale-105 group-hover:border-cyan-500/50 transition-all duration-300">
                RF
              </div>
              <div>
                <p className="text-lg font-bold text-white">Raka Febrian</p>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">Front-End / UI UX</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Sidoarjo, Indonesia</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECH STACK MARQUEE */}
      <TechMarquee />

      {/* 3. ABOUT SECTION (CLEAN BENTO & HUMAN TONE) */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 scroll-mt-28">
        <div className="space-y-4 text-center sm:text-left" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>02 / TENTANG SAYA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Menghubungkan Desain & Logika Kode
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl">
            Membangun website yang tidak hanya menarik saat pertama dilihat, tapi juga ringan dan nyaman saat digunakan.
          </p>
        </div>

        {/* Story & Background Card */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-stretch" data-aos="fade-up">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                Latar Belakang
              </span>
              <h3 className="text-2xl font-bold text-white leading-tight">
                Siswa SIJA di SMK Telkom Sidoarjo
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Di jurusan SIJA (Sistem Informasi, Jaringan, dan Aplikasi), saya mendalami fondasi komputasi dan rekayasa web. Mulai dari HTML, CSS, JavaScript, PHP, MySQL, hingga framework modern seperti React dan Next.js.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Fokus: Front-End & UI/UX</span>
              <span className="text-cyan-400">Sidoarjo, Jawa Timur</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                Prinsip Desain & Kode
              </span>
              <h3 className="text-2xl font-bold text-white leading-tight">
                Sederhana, Responsif, dan Bertenaga
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Saya selalu memperhatikan detail interaksi mikro, kebersihan struktur komponen, dan aksesibilitas agar setiap antarmuka yang dibuat memiliki performa maksimal.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Clean UI", "Responsive Design", "Fast Loading", "Accessible"].map((trait) => (
                <span key={trait} className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Specialization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2" data-aos="fade-up">
          {SPECIALIZATIONS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase">{item.tag}</span>
                <span className="text-slate-600">0{idx + 1}</span>
              </div>
              <h4 className="text-lg font-bold text-white">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Skills Tag Cloud */}
        <div className="space-y-4 pt-4" data-aos="fade-up">
          <p className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
            Toolkit & Teknologi
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs sm:text-sm font-mono transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE SECTION */}
      <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12 scroll-mt-28">
        <div className="text-center space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Jejak Karir</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Pengalaman Kerja</h2>
          <p className="text-slate-400 text-base sm:text-lg">Jejak karir dan kontribusi saya dalam pengembangan perangkat lunak.</p>
        </div>

        <div
          className="flex flex-col md:flex-row gap-6 md:gap-10 bg-slate-900/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 shadow-xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Company List Tabs */}
          <div className="flex md:flex-col overflow-x-auto gap-2 sm:gap-3 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6 min-w-full md:min-w-[220px]">
            {EXPERIENCES.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-left px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === index
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 translate-x-0 md:translate-x-1"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Details Content */}
          <div className="flex-1 space-y-6 pt-2 md:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {EXPERIENCES[activeTab].role}{" "}
                <span className="text-cyan-400">@ {EXPERIENCES[activeTab].company}</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/90 border border-slate-700 px-4 py-1.5 rounded-full w-fit">
                {EXPERIENCES[activeTab].period}
              </span>
            </div>

            <ul className="space-y-4 pt-2">
              {EXPERIENCES[activeTab].description.map((desc, i) => (
                <li key={i} className="text-slate-300 text-sm sm:text-base flex items-start gap-4 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-sm shadow-cyan-400"></span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
              {EXPERIENCES[activeTab].tech.map((t, i) => (
                <span key={i} className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDUCATION & ACHIEVEMENTS SECTION */}
      <section id="education" className="max-w-5xl mx-auto px-4 sm:px-8 space-y-16 scroll-mt-28">
        <div className="text-center space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <span>Pendidikan & Prestasi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Edukasi & Pencapaian</h2>
          <p className="text-slate-400 text-base sm:text-lg">Latar belakang pendidikan formal dan sertifikasi keahlian.</p>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-36 space-y-8 sm:space-y-12">
          {EDUCATION_TIMELINE.map((item, index) => (
            <div key={index} className="relative pl-6 sm:pl-8 group" data-aos="fade-up" data-aos-delay={index * 100}>
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-150 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300"></div>

              {/* Period Stamp for desktop */}
              <div className="hidden md:block absolute -left-40 top-1 text-sm font-mono font-bold text-slate-400 w-28 text-right group-hover:text-cyan-400 transition-colors">
                {item.period}
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-2">
                  {item.type} • <span className="inline md:hidden">{item.period}</span>
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm sm:text-base font-semibold mb-3">{item.institution}</p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4" data-aos="fade-up">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
                <h4 className="text-base font-bold text-white">{cert.title}</h4>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                {cert.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED PROJECTS SECTION */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 scroll-mt-28">
        <div className="text-center space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Hasil Karya</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Koleksi proyek web aplikasi, dashboard analitik, dan platform digital yang telah saya kembangkan.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6" data-aos="fade-up">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105"
                    : "bg-slate-900/60 text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-80 group">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari teknologi atau nama proyek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-700 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              />
              <svg
                className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-cyan-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 3D Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/40 rounded-[2rem] border border-slate-800 backdrop-blur-sm">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-xl font-bold text-slate-300 mb-2">Pencarian tidak ditemukan</p>
            <p className="text-slate-500 text-sm">Coba gunakan kata kunci atau teknologi lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProjects.map((proj, idx) => (
              <ProjectCard key={idx} proj={proj} idx={idx} />
            ))}
          </div>
        )}
      </section>

      {/* 7. CONTACT SECTION (SUPABASE) */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16 scroll-mt-28">
        <div className="text-center space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Hubungi Saya</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Mari Bekerja Sama!</h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Saya selalu terbuka untuk berdiskusi tentang peluang karir baru, proyek freelance, atau sekadar bertukar pikiran seputar pengembangan web.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-2xl font-bold text-white">Informasi Kontak</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Saya biasanya membalas pesan dalam kurun waktu kurang dari 24 jam.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="mailto:raka.febrian@example.com"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400 font-bold uppercase">Email</p>
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors mt-0.5">
                      raka.febrian@example.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/mrrakaa2345-design"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400 font-bold uppercase">GitHub</p>
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors mt-0.5">
                      github.com/mrrakaa2345-design
                    </p>
                  </div>
                </a>
              </div>

              {/* Status Badge */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-400">
                  Terbuka untuk posisi Full-time & Freelance Projects
                </span>
              </div>
            </div>
          </div>

          {/* Right: Supabase Form */}
          <div className="lg:col-span-3" data-aos="fade-left">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white">Kirim Pesan Langsung</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rian Pratama"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Email Anda *</label>
                  <input
                    type="email"
                    required
                    placeholder="rian@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Pesan / Detail Proyek *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Ceritakan tentang kebutuhan proyek Anda atau tawaran kerjasama..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-base hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Mengirim ke Database..." : "Kirim Pesan Sekarang"}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-semibold text-sm animate-fadeIn">
                  ✓ Pesan berhasil disimpan ke database! Terima kasih, saya akan segera membalas email Anda.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-center font-semibold text-sm animate-fadeIn">
                  ✕ Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi via email langsung.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}