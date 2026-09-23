"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/languageContext";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, lang, openCvModal } = useLanguage();

  const NAV_LINKS = [
    { name: t.nav.home, id: "home" },
    { name: t.nav.about, id: "about" },
    { name: t.nav.achievements, id: "prestasi" },
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.contact, id: "contact" },
  ];

  const FOCUS_AREAS = [
    lang === "id" ? "Full-Stack Web Development" : "Full-Stack Web Development",
    lang === "id" ? "UI/UX & Product Design" : "UI/UX & Product Design",
    lang === "id" ? "Cloud & AI Integration" : "Cloud & AI Integration",
    lang === "id" ? "Arsitektur Database & API" : "Database & API Architecture",
    lang === "id" ? "Sistem Informasi SIJA" : "SIJA System Engineering",
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    if (pathname === "/") {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 overflow-hidden bg-gradient-to-b from-[#080c14] via-[#05080e] to-[#020408] text-slate-400 border-t border-slate-800/80">
      
      {/* Top Ambient Glow Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />

      {/* Decorative Radial Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-blue-600/[0.04] blur-[140px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        
        {/* Main 4-Column High-Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800/70">
          
          {/* Column 1: Brand Info & Direct Frameless Logo (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              {/* Frameless Direct Logo with Pure Glow on Hover */}
              <div className="relative w-12 h-12 shrink-0 transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_16px_rgba(34,211,238,0.5)]">
                <Image
                  src="/rf-logo.png"
                  alt="Raka Febrian Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white font-heading tracking-tight flex items-center gap-1">
                  Raka Febrian<span className="text-cyan-400">.</span>
                </h3>
                <p className="text-xs font-medium text-cyan-300/90 font-mono">
                  {t.footer.role}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {lang === "id"
                ? "Siswa SIJA di SMK Telkom Sidoarjo yang berfokus merancang & membangun aplikasi web modern, terstruktur, scalable, dan memiliki kenyamanan interaksi pengguna."
                : "A SIJA student at SMK Telkom Sidoarjo passionate about building scalable, high-performance web applications and delightful digital solutions."}
            </p>

            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>
                {lang === "id"
                  ? "Terbuka untuk Magang & Project Kolaborasi"
                  : "Open for Internships & Collaborations"}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              {lang === "id" ? "Navigasi" : "Navigation"}
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-all hover:translate-x-1 cursor-pointer group"
                  >
                    <span className="text-slate-600 group-hover:text-cyan-400 text-xs transition-colors">→</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openCvModal}
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-all hover:translate-x-1 cursor-pointer group text-left"
                >
                  <span className="text-slate-600 group-hover:text-cyan-400 text-xs transition-colors">→</span>
                  <span>{lang === "id" ? "Curriculum Vitae" : "View CV"}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Focus & Engineering Domain (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              {lang === "id" ? "Keahlian Utama" : "Core Focus"}
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {FOCUS_AREAS.map((area, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social & Direct Connect (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              {lang === "id" ? "Hubungi Saya" : "Get in Touch"}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === "id"
                ? "Respon cepat dalam < 24 jam untuk diskusi project atau tawaran magang."
                : "Quick response within 24 hours for project inquiries or internship opportunities."}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href="https://wa.me/6288991304142"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp: 088991304142"
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:-translate-y-1 shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
              <a
                href="https://github.com/rakaa-star"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub: rakaa-star"
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 transition-all duration-300 hover:-translate-y-1 shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/rakaafeb_"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram: @rakaafeb_"
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/50 hover:bg-pink-500/10 text-slate-400 hover:text-pink-400 transition-all duration-300 hover:-translate-y-1 shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Email"
                title="Kirim Email ke mr.rakka23@gmail.com"
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-300 transition-all duration-300 hover:-translate-y-1 shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Tech Stack & Smooth Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Raka Febrian. {t.footer.rights}</p>
          
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-slate-400">
              {t.footer.techNote}
            </span>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 text-slate-400 transition-all cursor-pointer font-mono text-[11px]"
              title="Kembali ke atas"
            >
              <span>Back to Top</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

