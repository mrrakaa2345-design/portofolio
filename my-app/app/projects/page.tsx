"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

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
      
      {/* 1. HEADER */}
      <div className="text-center space-y-4" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
          🚀 Hasil Karya
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white">Featured Projects</h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Koleksi proyek web aplikasi, dashboard analitik, dan platform digital yang telah saya kembangkan.
        </p>
      </div>

      {/* 2. FILTERS & SEARCH */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6" data-aos="fade-up">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-cyan-500/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari teknologi atau nama proyek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <svg
              className="w-4 h-4 text-slate-500 absolute left-3.5 top-3"
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

      {/* 3. PROJECT GRID */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800 text-slate-400">
          <p className="text-lg">Tidak ada proyek yang sesuai dengan pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProjects.map((proj, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="group bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-3 flex flex-col justify-between"
            >
              <div>
                {/* Visual Cover Banner Gradient */}
                <div
                  className={`relative h-48 sm:h-52 w-full bg-gradient-to-tr ${proj.gradient} p-6 sm:p-8 flex flex-col justify-between overflow-hidden group-hover:scale-105 transition-transform duration-500`}
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="text-xs font-mono font-bold bg-black/50 text-slate-200 px-3 py-1 rounded-md backdrop-blur-md">
                      Project #{idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-md backdrop-blur-md">
                      {proj.category}
                    </span>
                  </div>

                  <div className="z-10">
                    <p className="text-white font-extrabold text-xl tracking-wide drop-shadow-md">
                      {proj.title}
                    </p>
                  </div>

                  <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>

                {/* Project Info */}
                <div className="p-6 sm:p-8 space-y-4">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                  >
                    Live Demo
                    <svg
                      className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>

                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      GitHub Repo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. CTA */}
      <div className="text-center pt-8" data-aos="fade-up">
        <p className="text-slate-400 text-sm mb-4">Punya ide proyek atau butuh aplikasi web kustom?</p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5"
        >
          Mari Diskusikan Proyek Anda
        </Link>
      </div>

    </div>
  );
}
