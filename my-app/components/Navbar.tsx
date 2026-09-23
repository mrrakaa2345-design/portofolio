"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/languageContext";
import HeaderActions from "@/components/HeaderActions";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const NAV_LINKS = [
    { name: t.nav.home, id: "home" },
    { name: t.nav.about, id: "about" },
    { name: t.nav.achievements, id: "prestasi" },
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.contact, id: "contact" },
  ];

  // Scroll listener for sticky styling & active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (pathname === "/") {
        const sections = ["home", "about", "prestasi", "projects", "contact"];
        const scrollPosition = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const elem = document.getElementById(sectionId);
          if (elem && elem.offsetTop <= scrollPosition) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (pathname === "/") {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center transition-all duration-500 ease-in-out ${
        scrolled ? "py-2.5 sm:py-3 px-3 sm:px-6" : "py-4 sm:py-5 px-4 sm:px-8"
      }`}
    >
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? "w-full max-w-5xl rounded-full bg-[#0b0f17]/90 backdrop-blur-2xl border border-slate-800/90 py-2 px-4 sm:px-6 shadow-2xl shadow-cyan-950/30"
            : "w-full max-w-7xl rounded-2xl bg-[#0b0f17]/40 backdrop-blur-md border border-slate-800/40 py-3 sm:py-3.5 px-4 sm:px-6 shadow-lg shadow-black/10"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand / Logo (Frameless Direct RF Logo) */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] shrink-0">
              <Image
                src="/rf-logo.png"
                alt="Raka Febrian Logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 32px, 36px"
              />
            </div>
            <span className="text-white group-hover:text-cyan-400 transition-colors font-bold hidden sm:inline-block font-heading text-sm sm:text-base">
              Raka Febrian<span className="text-cyan-400">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links (Clean & without Edukasi) */}
          <div className="hidden lg:flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-300 bg-slate-950/60 p-1 rounded-full border border-slate-800/60">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === "/" ? activeSection === link.id : false;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-950 font-bold shadow-md shadow-white/10 scale-105"
                      : "hover:text-cyan-400 hover:bg-slate-800/60"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Header Action Controls (Language Switcher ID/EN + Lihat CV Button) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <HeaderActions />
          </div>

          {/* Mobile Right Controls: Compact Header Actions + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <HeaderActions size="compact" />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3.5 pt-3.5 border-t border-slate-800/80 flex flex-col gap-1.5 animate-fadeIn">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === "/" ? activeSection === link.id : false;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-950 font-bold"
                      : "text-slate-300 hover:text-cyan-400 hover:bg-slate-900/80"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="text-center text-xs font-bold px-5 py-2.5 rounded-xl bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 transition-all mt-1 cursor-pointer"
            >
              {t.nav.getInTouch}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
