"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EXPERIENCES } from "@/lib/data";

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-16">
      
      {/* 1. HEADER */}
      <div className="text-center space-y-4" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
          💼 Jejak Karir
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white">Pengalaman Kerja</h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Perjalanan profesional dan kontribusi saya dalam berbagai proyek teknologi industri.
        </p>
      </div>

      {/* 2. INTERACTIVE TABBED EXPERIENCE CARD */}
      <div
        className="flex flex-col md:flex-row gap-6 md:gap-10 bg-slate-900/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* Company List Tabs */}
        <div className="flex md:flex-col overflow-x-auto gap-2 sm:gap-3 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6 min-w-full md:min-w-[220px]">
          {EXPERIENCES.map((exp, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`text-left px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 whitespace-nowrap ${
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
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {EXPERIENCES[activeTab].role}
              </h2>
              <p className="text-cyan-400 font-semibold text-base mt-0.5">
                @{EXPERIENCES[activeTab].company}
              </p>
            </div>
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

      {/* 3. FULL CHRONOLOGICAL TIMELINE */}
      <div className="space-y-8 pt-8" data-aos="fade-up">
        <h3 className="text-2xl font-bold text-white text-center sm:text-left">Semua Riwayat Pengalaman</h3>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h4>
                  <p className="text-cyan-400 text-sm font-medium">{exp.company}</p>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full w-fit">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.description.map((d, i) => (
                  <li key={i} className="text-slate-400 text-xs sm:text-sm flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"></span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CTA */}
      <div className="text-center pt-8" data-aos="fade-up">
        <p className="text-slate-400 text-sm mb-4">Tertarik untuk berkolaborasi dalam proyek Anda berikutnya?</p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5"
        >
          Diskusikan Peluang
        </Link>
      </div>

    </div>
  );
}
