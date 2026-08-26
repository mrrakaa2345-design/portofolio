import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Raka Febrian",
  description: "Pelajari lebih lanjut mengenai latar belakang, keahlian, dan filosofi kerja Raka Febrian.",
};

const STATS = [
  { value: "3+", label: "Tahun Pengalaman" },
  { value: "20+", label: "Proyek Terselesaikan" },
  { value: "99%", label: "Skor Kepuasan Klien" },
  { value: "10+", label: "Teknologi & Tools" },
];

const SKILL_CATEGORIES = [
  {
    title: "Frontend Development",
    desc: "Membangun antarmuka modern yang cepat, responsif, dan interaktif.",
    skills: ["React.js", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
  },
  {
    title: "Backend & Database",
    desc: "Integrasi API, arsitektur database, dan serverless backend.",
    skills: ["Node.js", "Supabase", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    title: "Tools & Workflow",
    desc: "Efisiensi alur kerja pengembang dengan tooling modern.",
    skills: ["Git & GitHub", "Vercel", "Figma", "VS Code", "Postman", "Turbopack"],
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* 1. HEADER & INTRO */}
      <section className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
        <div className="flex-1 space-y-6 text-center lg:text-left" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Mengenal Lebih Dekat</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">Raka Febrian</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Saya seorang <strong>Front-End Developer</strong> yang berdedikasi menciptakan pengalaman web yang memikat, intuitif, dan berkinerja tinggi. Dengan kombinasi estetika desain modern dan arsitektur kode yang bersih, saya membantu mengubah ide kompleks menjadi produk digital yang dinikmati pengguna.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/#contact"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all"
            >
              Hubungi Saya
            </Link>
            <Link
              href="/#projects"
              className="px-7 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
            >
              Lihat Portofolio
            </Link>
          </div>
        </div>

        {/* Profile Card */}
        <div className="relative w-full max-w-sm" data-aos="zoom-in" data-aos-delay="150">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-40"></div>
          <div className="relative aspect-[4/5] rounded-2xl border-2 border-slate-700 bg-slate-900/90 p-4 shadow-2xl flex flex-col items-center justify-center">
            <div className="w-full h-full rounded-xl border border-slate-800 bg-slate-950/70 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-slate-800/80 border border-cyan-500/40 flex items-center justify-center mb-4 text-cyan-400 shadow-inner">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-xl font-black text-white">Raka Febrian</p>
              <p className="text-xs font-mono text-cyan-400 mt-1">Front-End Engineer</p>
              <div className="mt-4 pt-4 border-t border-slate-800/80 w-full flex justify-around text-xs text-slate-400 font-mono">
                <span>Indonesia</span>
                <span className="text-emerald-400">● Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" data-aos="fade-up">
        {STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 text-center space-y-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
          >
            <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-400">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* 3. STORY & PHILOSOPHY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-stretch" data-aos="fade-up">
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">Filosofi Pengembangan</h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Bagi saya, kode bukan hanya sekadar instruksi komputer, melainkan jembatan antara kebutuhan manusia dan kecanggihan teknologi. Saya selalu mengutamakan:
          </p>
          <ul className="space-y-3 pt-2 text-slate-300 text-sm sm:text-base">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <strong>Performa & Aksesibilitas:</strong> Kecepatan muat kilat dan ramah untuk semua pengguna.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <strong>Arsitektur Modular:</strong> Kode yang rapi, mudah dirawat, dan teruji.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <strong>Detail Visual:</strong> Micro-interactions dan transisi halus yang memanjakan mata.
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">Fokus & Minat</h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Saya terus mengeksplorasi ekosistem modern web development, mulai dari:
          </p>
          <ul className="space-y-3 pt-2 text-slate-300 text-sm sm:text-base">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Fullstack React & Next.js App Router
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Integrasi Cloud Database & Serverless (Supabase, PostgreSQL)
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Modern CSS & Animasi Interaktif (Tailwind, AOS)
            </li>
          </ul>
        </div>
      </section>

      {/* 4. DETAILED SKILL CATEGORIES */}
      <section className="space-y-8" data-aos="fade-up">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Keahlian & Kemampuan</h2>
          <p className="text-slate-400 text-sm sm:text-base">Teknologi yang saya gunakan untuk mewujudkan solusi digital.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 space-y-4"
            >
              <h4 className="text-xl font-bold text-cyan-300">{cat.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400">{cat.desc}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
