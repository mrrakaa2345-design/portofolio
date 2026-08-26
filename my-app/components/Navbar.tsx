"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-500 pointer-events-none">
      <nav
        className={`mx-auto pointer-events-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? "max-w-5xl rounded-full bg-[#0b0f17]/85 backdrop-blur-xl border border-slate-800/90 py-3 px-6 shadow-2xl shadow-cyan-950/40"
            : "max-w-7xl rounded-2xl bg-[#0b0f17]/40 backdrop-blur-md py-3.5 px-6 border border-slate-800/40"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-extrabold text-xl sm:text-2xl tracking-tight flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 font-mono text-sm font-bold shadow-lg shadow-cyan-500/10">
              RF
            </span>
            <span className="text-white group-hover:text-cyan-400 transition-colors font-bold">
              Portofolio<span className="text-cyan-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-semibold text-slate-300 bg-slate-950/40 p-1.5 rounded-full border border-slate-800/60">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20 scale-105"
                      : "hover:text-cyan-400 hover:bg-slate-800/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 active:scale-95 inline-block"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2 rounded-xl bg-slate-900/70 border border-slate-800"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2 animate-fadeIn">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-base transition-colors ${
                    isActive
                      ? "bg-cyan-500 text-black font-bold"
                      : "text-slate-300 hover:text-cyan-400 hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center text-sm font-bold px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 transition-all mt-2"
            >
              Get In Touch
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
