"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TechMarquee from "@/components/TechMarquee";
import { EXPERIENCES, EDUCATION_TIMELINE, PROJECTS } from "@/lib/data";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  // Typing Effect
  const [textIndex, setTextIndex] = useState(0);
  const roles = ["Front-End Developer", "UI/UX Enthusiast", "React & Vue Specialist"];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16 min-h-[75vh] pt-6 sm:pt-12">
        <div className="flex-1 space-y-6 sm:space-y-8 text-center md:text-left" data-aos="fade-right">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold shadow-sm hover:scale-105 transition-transform duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            Available for Work
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Hi, Saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 animate-pulse">Raka Febrian</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 min-h-[40px] flex items-center justify-center md:justify-start gap-2">
            <span>Saya seorang</span> <span className="text-cyan-400 font-bold">{displayText}</span>
            <span className="w-1 h-6 sm:h-7 bg-cyan-400 animate-pulse"></span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal mx-auto md:mx-0">
            Berfokus pada pembuatan antarmuka web yang bersih, responsif, dan kaya interaksi visual dengan performa tinggi.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-5 pt-2 sm:pt-4">
            <Link
              href="/projects"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >
              Lihat Proyek
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 font-bold text-base hover:bg-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 active:scale-95"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>

        {/* Profile Frame with Glow */}
        <div className="relative group w-full max-w-[280px] sm:max-w-sm md:w-auto" data-aos="zoom-in" data-aos-delay="200">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-700 group-hover:scale-110"></div>
          
          <div className="relative w-full aspect-[4/5] rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/90 p-4 shadow-2xl flex flex-col items-center justify-center group-hover:border-cyan-500/50 transition-all duration-500 group-hover:-translate-y-2">
            <div className="w-full h-full rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-300 shadow-md">
                <svg className="w-10 h-10 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-base font-bold text-slate-300 mb-1">Foto Profile</p>
              <p className="text-xs font-mono text-slate-500">Area pasfoto / portrait</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECH STACK MARQUEE */}
      <TechMarquee />

      {/* 3. ABOUT HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex flex-col lg:flex-row items-center justify-between gap-8" data-aos="fade-up">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">Tentang Saya</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">Membangun Web Modern dengan Presisi & Passion</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Memiliki pengalaman lebih dari 3 tahun dalam merancang antarmuka website berbasis Next.js, React, dan Vue. Mengutamakan performa loading secepat kilat dan pengalaman pengguna yang memuaskan.
            </p>
          </div>
          <Link
            href="/about"
            className="px-6 py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm hover:bg-cyan-500 hover:text-black transition-all shrink-0"
          >
            Baca Selengkapnya →
          </Link>
        </div>
      </section>

      {/* 4. EXPERIENCE SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10" data-aos="fade-up">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Pengalaman Kerja</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">Perjalanan karir dan kontribusi saya di industri teknologi.</p>
          </div>
          <Link href="/experience" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
            Lihat Semua Riwayat →
          </Link>
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

      {/* 5. EDUCATION HIGHLIGHT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10" data-aos="fade-up">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Edukasi & Prestasi</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">Latar belakang akademis dan sertifikasi kompetensi.</p>
          </div>
          <Link href="/education" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
            Lihat Detail Edukasi →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
          {EDUCATION_TIMELINE.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 space-y-3"
            >
              <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                <span>{item.type}</span>
                <span>{item.period}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs font-medium text-slate-400">{item.institution}</p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED PROJECTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10" data-aos="fade-up">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Featured Projects</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">Beberapa aplikasi dan platform pilihan yang telah saya rilis.</p>
          </div>
          <Link href="/projects" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
            Lihat Semua Proyek ({PROJECTS.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.slice(0, 3).map((proj, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="group bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                <div className={`relative h-44 w-full bg-gradient-to-tr ${proj.gradient} p-6 flex flex-col justify-between overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                  <div className="flex justify-between items-center z-10">
                    <span className="text-xs font-mono font-bold bg-black/50 text-slate-200 px-3 py-1 rounded-md backdrop-blur-md">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-white font-extrabold text-lg tracking-wide z-10 drop-shadow">{proj.title}</p>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-slate-300 text-sm leading-relaxed">{proj.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0 flex flex-wrap gap-2">
                {proj.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION TO CONTACT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 text-center" data-aos="zoom-in">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white">Siap Mewujudkan Proyek Anda?</h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Hubungi saya untuk diskusi teknis, estimasi waktu pengerjaan, atau peluang kolaborasi lainnya.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-base shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all"
            >
              Mulai Percakapan Sekarang
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}