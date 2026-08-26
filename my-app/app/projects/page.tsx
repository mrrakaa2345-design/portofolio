"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { PROJECTS, ProjectItem } from "@/lib/data";

interface ProjectCardProps {
  proj: ProjectItem;
  idx: number;
}

const ProjectCard = ({ proj, idx }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
      data-aos="fade-up"
      data-aos-delay={idx * 100}
      className="group relative flex flex-col justify-between h-full rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/60 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden will-change-transform z-10"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15), transparent 70%)",
        }}
      />

      <div style={{ transform: "translateZ(30px)" }}>
        <div
          className={`relative h-48 sm:h-52 w-full bg-gradient-to-tr ${proj.gradient} p-6 sm:p-8 flex flex-col justify-between overflow-hidden`}
        >
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-mono font-bold bg-black/40 text-slate-200 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-sm border border-white/10">
              Project #{idx + 1}
            </span>
            <span className="text-xs font-mono font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-sm">
              {proj.category}
            </span>
          </div>

          <div className="z-10">
            <p className="text-white font-extrabold text-2xl tracking-tight drop-shadow-lg">
              {proj.title}
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out"></div>
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-black/10 blur-2xl group-hover:scale-125 transition-transform duration-700 ease-out delay-75"></div>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {proj.description}
          </p>
        </div>
      </div>

      <div
        className="p-6 sm:p-8 pt-0 space-y-6 mt-auto"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex flex-wrap gap-2">
          {proj.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800/80 text-cyan-100 border border-slate-700/80 shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <a
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-xl"
          >
            Live Demo
            <svg
              className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {proj.github && (
            <a
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors hover:underline underline-offset-4"
            >
              GitHub Repo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-5" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide">
          🚀 Hasil Karya
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
          Featured Projects
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Koleksi proyek web aplikasi, dashboard analitik, dan platform digital yang telah saya kembangkan.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6" data-aos="fade-up">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
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

      {filteredProjects.length === 0 ? (
        <div className="text-center py-24 bg-slate-900/40 rounded-[2rem] border border-slate-800 backdrop-blur-sm">
          <span className="text-4xl mb-4 block">🔍</span>
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

      <div className="text-center pt-12 pb-8" data-aos="fade-up">
        <p className="text-slate-400 text-sm mb-5">Punya ide proyek atau butuh aplikasi web kustom?</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1 group"
        >
          Mari Diskusikan Proyek Anda
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
