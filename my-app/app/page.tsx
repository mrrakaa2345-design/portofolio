"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TechMarquee from "@/components/TechMarquee";
import ProjectCard from "@/components/ProjectCard";
import PrestasiSection from "@/components/PrestasiSection";
import InteractiveTools from "@/components/InteractiveTools";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/languageContext";
import { TechIcon } from "@/components/TechIcon";

export default function Home() {
  const { t, lang, openCvModal } = useLanguage();

  // Typing Effect
  const [textIndex, setTextIndex] = useState(0);
  const roles = t.hero.roles;
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Projects Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Contact Form State (Supabase) & UI State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Live Local Time (WIB / Sidoarjo, Indonesia)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setLocalTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("mr.rakka23@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch (err) {
      console.error("Gagal menyalin email:", err);
    }
  };


  // Typing animation for roles
  useEffect(() => {
    const currentRole = roles[textIndex % roles.length];
    const speed = isDeleting ? 30 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2200);
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
  }, [displayText, isDeleting, textIndex, roles]);

  // Project Categories Dynamic Filter
  const projectItems = t.projects.items;
  const uniqueCategories = Array.from(new Set(projectItems.map((p) => p.category)));
  const categories = [
    { id: "all", label: t.projects.allCategory },
    ...uniqueCategories.map((c) => ({ id: c, label: c })),
  ];

  const filteredProjects = projectItems.filter((proj) => {
    const matchesCategory = selectedCategory === "all" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tech.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
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

  const TECH_TOOLS = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
    "PHP",
    "Laravel",
    "MySQL",
    "Supabase",
    "Git",
    "GitHub",
    "Figma",
    "Vercel",
  ];

  const renderOrbitIcon = (iconKey: string) => {
    switch (iconKey) {
      case "code":
        return (
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case "zap":
        return (
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "layout":
        return (
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case "box":
        return (
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "database":
        return (
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      case "target":
        return (
          <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
        );
    }
  };

  const SOCIAL_LINKS = [
    {
      name: "WhatsApp",
      href: "https://wa.me/6288991304142",
      label: "088991304142",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/rakaa-star",
      label: "rakaa-star",
      icon: <TechIcon name="github" className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/rakaafeb_",
      label: "@rakaafeb_",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com",
      label: "mr.rakka23@gmail.com",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const CORE_TECH_STACK = [
    {
      name: "React 19",
      icon: "react",
      role: "UI & Component",
      glow: "hover:border-cyan-400/60 hover:shadow-[0_0_22px_rgba(34,211,238,0.22)] hover:bg-cyan-500/5",
      textColor: "group-hover:text-cyan-300",
      iconBg: "bg-cyan-950/40 border-cyan-800/40",
      badge: "v19",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
    {
      name: "Next.js 15",
      icon: "next",
      role: "App Router & SSR",
      glow: "hover:border-slate-300/60 hover:shadow-[0_0_22px_rgba(255,255,255,0.12)] hover:bg-slate-800/40",
      textColor: "group-hover:text-white",
      iconBg: "bg-slate-900 border-slate-700/60",
      badge: "v15",
      badgeColor: "bg-white/10 text-slate-200 border-white/20",
    },
    {
      name: "TypeScript",
      icon: "typescript",
      role: "Type-Safe System",
      glow: "hover:border-blue-400/60 hover:shadow-[0_0_22px_rgba(59,130,246,0.22)] hover:bg-blue-500/5",
      textColor: "group-hover:text-blue-300",
      iconBg: "bg-blue-950/40 border-blue-800/40",
      badge: "v5",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      name: "Tailwind CSS",
      icon: "tailwind css",
      role: "Modern Styling",
      glow: "hover:border-sky-400/60 hover:shadow-[0_0_22px_rgba(56,189,248,0.22)] hover:bg-sky-500/5",
      textColor: "group-hover:text-sky-300",
      iconBg: "bg-sky-950/40 border-sky-800/40",
      badge: "v4",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    },
    {
      name: "Supabase",
      icon: "supabase",
      role: "PostgreSQL & Auth",
      glow: "hover:border-emerald-400/60 hover:shadow-[0_0_22px_rgba(16,185,129,0.22)] hover:bg-emerald-500/5",
      textColor: "group-hover:text-emerald-300",
      iconBg: "bg-emerald-950/40 border-emerald-800/40",
      badge: "BaaS",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      name: "Figma",
      icon: "figma",
      role: "UI/UX & Prototype",
      glow: "hover:border-purple-400/60 hover:shadow-[0_0_22px_rgba(168,85,247,0.22)] hover:bg-purple-500/5",
      textColor: "group-hover:text-purple-300",
      iconBg: "bg-purple-950/40 border-purple-800/40",
      badge: "Design",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
  ];

  return (
    <div className="space-y-28 sm:space-y-40 pb-20 scroll-smooth">
      
      {/* 1. HERO SECTION (PERSONAL GREETING, HERO PHOTO FRAME CARD & HIGH CONTRAST) */}
      <section
        id="home"
        className="px-4 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[82vh] pt-4 sm:pt-8 scroll-mt-28 relative"
      >
        {/* Left Column: Greeting, Dynamic Role & CTAs */}
        <div className="flex-1 space-y-7 text-center lg:text-left z-10" data-aos="fade-right">
          
          {/* Status & Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">{t.hero.statusBadge}</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">{t.hero.locationBadge}</span>
          </div>

          {/* Personal Greeting Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading">
              {t.hero.greeting}{" "}
              <span className="text-cyan-400 font-black">
                {t.hero.name}
              </span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-300 min-h-[40px] flex items-center justify-center lg:justify-start gap-2">
              <span className="text-slate-400 font-normal">{t.hero.rolePrefix}</span>
              <span className="text-white font-extrabold border-b-2 border-cyan-400/50 pb-0.5 font-heading">
                {displayText}
              </span>
              <span className="w-0.5 h-6 sm:h-7 bg-cyan-400 animate-pulse inline-block" />
            </h2>
          </div>

          {/* Bio Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0">
            {t.hero.bio}
          </p>

          {/* Clear Call-To-Action (CTA) Buttons Bar */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            {/* Primary CTA: Explore Projects */}
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.hero.viewProjects}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Secondary CTA: Lihat CV Button (Matching Screenshot) */}
            <button
              type="button"
              onClick={openCvModal}
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-[#0d121d] hover:bg-[#151c2d] text-white border border-slate-700/90 hover:border-cyan-500/60 font-bold text-sm sm:text-base shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <svg
                className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>{t.nav.viewCv}</span>
            </button>

            {/* Tertiary CTA: Contact */}
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 font-semibold text-sm sm:text-base hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {t.hero.contactMe}
            </button>
          </div>

          {/* Core Tech Stack Section - Premium Interactive Grid */}
          <div className="pt-8 border-t border-slate-800/80 w-full space-y-4">
            {/* Header with animated beacon & badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"></span>
                </span>
                <span className="text-xs sm:text-sm font-mono font-extrabold tracking-widest text-slate-200 uppercase">
                  {t.hero.techPillTitle}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Production-Ready Stack</span>
              </div>
            </div>

            {/* Grid of Interactive Tech Cards with Brand Glow & Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
              {CORE_TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-900/95 via-[#0b1019]/95 to-[#060910]/95 border border-white/[0.08] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-default overflow-hidden ${tech.glow}`}
                >
                  {/* Subtle Top Shimmer Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-cyan-400/40 transition-colors" />

                  {/* Left: Icon & Text */}
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-md ${tech.iconBg}`}
                    >
                      <TechIcon name={tech.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex flex-col text-left">
                      <span className={`text-sm sm:text-base font-extrabold text-slate-100 truncate transition-colors duration-200 tracking-tight ${tech.textColor}`}>
                        {tech.name}
                      </span>
                      <span className="text-[11px] sm:text-xs font-medium text-slate-400 truncate leading-snug group-hover:text-slate-300 transition-colors">
                        {tech.role}
                      </span>
                    </div>
                  </div>

                  {/* Right: Badge */}
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold border shrink-0 transition-colors ${tech.badgeColor}`}
                  >
                    {tech.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Aesthetic Circular Photo Frame */}
        <div
          className="w-full max-w-xs sm:max-w-sm lg:max-w-md flex items-center justify-center relative"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          {/* Circular Photo Container with Multi-Layer Glow & Micro-Feel */}
          <div className="relative group flex items-center justify-center">
            
            {/* Ambient Multi-Layer Neon Glow Behind Frame */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-600/20 to-teal-400/25 blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse pointer-events-none" />

            {/* Outer Subtle Orbital Dashed Ring */}
            <div className="absolute -inset-3 rounded-full border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors duration-500 pointer-events-none" />

            {/* Outer Glassmorphic Halo Ring */}
            <div className="relative p-2.5 sm:p-3 rounded-full bg-slate-900/60 backdrop-blur-2xl border border-slate-700/80 group-hover:border-cyan-500/60 shadow-2xl shadow-cyan-950/60 transition-all duration-500 hover:scale-[1.02]">
              
              {/* Inner Circular Photo Frame */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-slate-950">
                <Image
                  src="/image raka/dfdc7ef9-b22d-44c5-902f-2a5132f2f509.png"
                  alt="Raka Febrian"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 256px, 288px"
                />

                {/* Subtle Inner Bottom Vignette Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

            </div>

            {/* Floating Tactile Badge: Top-Right Online Status */}
            <div className="absolute -top-1 -right-1 sm:top-1 sm:right-1 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30 shadow-lg shadow-emerald-950/50 hover:scale-105 transition-transform">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>

            {/* Floating Tactile Badge: Bottom-Left SIJA & Dev */}
            <div className="absolute -bottom-1 -left-1 sm:bottom-1 sm:left-1 z-20">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30 shadow-lg shadow-cyan-950/50 hover:scale-105 transition-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                SIJA • Telkom
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TECH STACK MARQUEE */}
      <TechMarquee />

      {/* 3. ABOUT SECTION (MY PRINCIPALS & WORKFLOW) */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-8 space-y-24 scroll-mt-28">
        
        {/* Part A: My Principals (Statement with Flanking Orbital Badges) */}
        <div className="space-y-10 text-center" data-aos="fade-up">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
              {t.about.principalsTitle}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest">
              {t.about.principalsSubtitle}
            </p>
          </div>

          {/* Central Statement flanked with badges */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Left Orbiting Badges */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col justify-center gap-3 order-2 lg:order-1 flex-wrap">
              {t.about.orbitPills.left.map((pill, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium shadow-sm transition-all hover:scale-105 ${pill.bg}`}
                >
                  <span className="shrink-0">{renderOrbitIcon(pill.iconKey)}</span>
                  <span>{pill.title}</span>
                </div>
              ))}
            </div>

            {/* Center High-Impact Statement */}
            <div className="lg:col-span-6 p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-xl backdrop-blur-md order-1 lg:order-2">
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-medium">
                "{t.about.statement}"
              </p>
            </div>

            {/* Right Orbiting Badges */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col justify-center gap-3 order-3 flex-wrap">
              {t.about.orbitPills.right.map((pill, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium shadow-sm transition-all hover:scale-105 ${pill.bg}`}
                >
                  <span className="shrink-0">{renderOrbitIcon(pill.iconKey)}</span>
                  <span>{pill.title}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Part B: Tech Stack & Tools (Official SVG Logos Grid) */}
        <div className="text-center space-y-8" data-aos="fade-up">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-heading">
              {t.about.techTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              {t.about.techSubtitle}
            </p>
          </div>

          {/* Interactive 3D Animated Tools Grid with Click Spotlight */}
          <InteractiveTools tools={TECH_TOOLS} />
        </div>

        {/* Part C: Prinsip Kerja Saya (3 Step Connected Process with Depth & Curves) */}
        <div className="space-y-12" data-aos="fade-up">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
              {t.about.processBadge}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
              {t.about.processTitle}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              {t.about.processSubtitle}
            </p>
          </div>

          {/* 3 Step Connected Process Cards with Visual Connector Lines */}
          <div className="relative pt-4">
            
            {/* Cards Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch z-10">
              {t.about.steps.map((step, idx) => {
                const isFirst = idx === 0;
                const isSecond = idx === 1;

                const cardStyle = isFirst
                  ? {
                      borderColor: "border-cyan-500/20 hover:border-cyan-400/60",
                      glowBg: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
                      accentLine: "from-transparent via-cyan-400 to-transparent",
                      iconBoxBg: "from-cyan-500/20 to-violet-600/20 border-cyan-500/30 text-cyan-400 shadow-cyan-500/20",
                      badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
                      stepPill: "bg-cyan-400/10 text-cyan-400 border-cyan-400/30",
                      titleHover: "group-hover:text-cyan-300",
                      dotColor: "bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)]",
                      chipBg: "bg-cyan-950/40 text-cyan-300/90 border-cyan-500/20 hover:border-cyan-400/40 hover:bg-cyan-900/40",
                      shadowHover: "group-hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)]",
                    }
                  : isSecond
                  ? {
                      borderColor: "border-blue-500/20 hover:border-blue-400/60",
                      glowBg: "bg-blue-500/10 group-hover:bg-blue-500/20",
                      accentLine: "from-transparent via-blue-400 to-transparent",
                      iconBoxBg: "from-blue-500/20 to-indigo-600/20 border-blue-500/30 text-blue-400 shadow-blue-500/20",
                      badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/30",
                      stepPill: "bg-blue-400/10 text-blue-400 border-blue-400/30",
                      titleHover: "group-hover:text-blue-300",
                      dotColor: "bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]",
                      chipBg: "bg-blue-950/40 text-blue-300/90 border-blue-500/20 hover:border-blue-400/40 hover:bg-blue-900/40",
                      shadowHover: "group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.18)]",
                    }
                  : {
                      borderColor: "border-amber-500/20 hover:border-amber-400/60",
                      glowBg: "bg-amber-500/10 group-hover:bg-amber-500/20",
                      accentLine: "from-transparent via-amber-400 to-transparent",
                      iconBoxBg: "from-amber-500/20 to-rose-600/20 border-amber-500/30 text-amber-400 shadow-amber-500/20",
                      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
                      stepPill: "bg-amber-400/10 text-amber-400 border-amber-400/30",
                      titleHover: "group-hover:text-amber-300",
                      dotColor: "bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.9)]",
                      chipBg: "bg-amber-950/40 text-amber-300/90 border-amber-500/20 hover:border-amber-400/40 hover:bg-amber-900/40",
                      shadowHover: "group-hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)]",
                    };

                return (
                  <div key={idx} className="relative flex flex-col h-full">
                    {/* The Card Body */}
                    <div
                      className={`relative h-full p-7 sm:p-8 rounded-[2rem] bg-gradient-to-b from-slate-900/95 via-[#0b1019]/95 to-[#06090f]/95 backdrop-blur-2xl border ${cardStyle.borderColor} transition-all duration-500 hover:-translate-y-3 flex flex-col justify-between shadow-2xl ${cardStyle.shadowHover} group overflow-hidden`}
                    >
                      {/* Top Animated Accent Border Light */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cardStyle.accentLine} opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      {/* Ambient Glow Spotlight inside card */}
                      <div
                        className={`absolute -right-12 -top-12 w-44 h-44 rounded-full ${cardStyle.glowBg} blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-125`}
                      />

                      {/* High-Tech Giant Watermark Step Number */}
                      <span className="absolute top-3 right-6 font-mono font-black text-7xl sm:text-8xl text-white/[0.03] group-hover:text-white/[0.08] select-none pointer-events-none transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                        {step.number}
                      </span>

                      {/* Card Content Top Section */}
                      <div className="relative z-10 space-y-5">
                        
                        {/* Top Bar with Icon & Badges */}
                        <div className="flex items-center justify-between gap-3">
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cardStyle.iconBoxBg} border flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0`}
                          >
                            {step.iconKey === "design" ? (
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                                <path d="M2 2l7.586 7.586" />
                                <circle cx="11" cy="11" r="2" />
                              </svg>
                            ) : step.iconKey === "code" ? (
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                                <line x1="14" y1="4" x2="10" y2="20" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                              </svg>
                            )}
                          </div>

                          {/* Step Pill & Tag */}
                          <div className="flex flex-wrap items-center gap-2 justify-end">
                            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${cardStyle.stepPill}`}>
                              Step {step.number}
                            </span>
                            <span className={`text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${cardStyle.badgeBg}`}>
                              {step.tag}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2.5 pt-1">
                          <h4 className={`text-xl sm:text-2xl font-black text-white ${cardStyle.titleHover} transition-colors font-heading tracking-tight`}>
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-normal">
                            {step.desc}
                          </p>
                        </div>

                        {/* Feature Capability Chips */}
                        {step.highlights && step.highlights.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {step.highlights.map((hl, hIdx) => (
                              <span
                                key={hIdx}
                                className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border backdrop-blur-sm transition-all duration-300 ${cardStyle.chipBg}`}
                              >
                                {hl}
                              </span>
                            ))}
                          </div>
                        )}

                      </div>

                      {/* Card Footer: Phase Status & Quality Beacon */}
                      <div className="relative z-10 pt-5 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="font-semibold text-slate-300">
                          {step.phaseLabel}
                        </span>
                        <span className="flex items-center gap-1.5 font-medium text-slate-300">
                          <span className={`w-2 h-2 rounded-full ${cardStyle.dotColor} animate-pulse`} />
                          <span>{step.metricsLabel}</span>
                        </span>
                      </div>

                    </div>

                    {/* Inter-Card Floating Connected Dots/Path for Desktop (between 01->02 and 02->03) */}
                    {idx < 2 && (
                      <div className="hidden md:flex absolute -right-3.5 sm:-right-4 lg:-right-4.5 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 pointer-events-none items-center justify-center w-12 sm:w-16">
                        {/* SVG Dashed Line passing horizontally between Card A and Card B */}
                        <svg className="absolute inset-0 w-full h-8 overflow-visible" viewBox="0 0 64 32" fill="none">
                          <defs>
                            <linearGradient id={`flow-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor={idx === 0 ? "#22d3ee" : "#3b82f6"} stopOpacity="0.9" />
                              <stop offset="100%" stopColor={idx === 0 ? "#3b82f6" : "#f59e0b"} stopOpacity="0.9" />
                            </linearGradient>
                          </defs>
                          {/* Ambient glowing line */}
                          <path
                            d="M -10 16 L 74 16"
                            stroke={`url(#flow-grad-${idx})`}
                            strokeWidth="4"
                            className="blur-[2px] opacity-40"
                          />
                          {/* Sharp animated dashed dots */}
                          <path
                            d="M -10 16 L 74 16"
                            stroke={`url(#flow-grad-${idx})`}
                            strokeWidth="2.5"
                            strokeDasharray="4 4"
                            className="animate-connector"
                          />
                        </svg>

                        {/* Center Cyber Flow Node */}
                        <div
                          className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#080d17] border shadow-2xl backdrop-blur-xl transition-transform ${
                            idx === 0
                              ? "border-cyan-400/80 text-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.55)]"
                              : "border-blue-400/80 text-blue-300 shadow-[0_0_16px_rgba(59,130,246,0.55)]"
                          }`}
                        >
                          <span
                            className={`absolute inset-0 rounded-full border border-dashed animate-spin ${
                              idx === 0 ? "border-cyan-400/60" : "border-blue-400/60"
                            }`}
                            style={{ animationDuration: "10s" }}
                          />
                          <svg className="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Mobile Vertical Flow Connector (Between Step 01 -> 02 and 02 -> 03) */}
                    {idx < 2 && (
                      <div className="md:hidden flex flex-col items-center justify-center my-3 pointer-events-none z-20">
                        <div
                          className={`w-[2px] h-6 border-l-2 border-dashed ${
                            idx === 0 ? "border-cyan-400/70" : "border-blue-400/70"
                          }`}
                        />
                        <div
                          className={`w-7 h-7 rounded-full bg-[#080d17] border flex items-center justify-center shadow-lg my-1 ${
                            idx === 0 ? "border-cyan-400/80 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]" : "border-blue-400/80 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                        <div
                          className={`w-[2px] h-6 border-l-2 border-dashed ${
                            idx === 0 ? "border-blue-400/70" : "border-amber-400/70"
                          }`}
                        />
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </section>

      {/* 4. PRESTASI & SERTIFIKASI SECTION */}
      <PrestasiSection />

      {/* 5. FEATURED PROJECTS SECTION */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 scroll-mt-28">
        <div className="text-center space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 font-heading">
            {t.projects.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6" data-aos="fade-up">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105"
                    : "bg-slate-900/60 text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-80 group">
            <div className="relative">
              <input
                type="text"
                placeholder={t.projects.searchPlaceholder}
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
            <p className="text-xl font-bold text-slate-300 mb-2 font-heading">{t.projects.noResultsTitle}</p>
            <p className="text-slate-500 text-sm">{t.projects.noResultsDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProjects.map((proj, idx) => (
              <ProjectCard key={idx} proj={proj} idx={idx} />
            ))}
          </div>
        )}
      </section>

      {/* 6. PROFILE SPOTLIGHT SECTION: "MENGENAL SAYA LEBIH DEKAT" */}
      <section id="who-i-am" className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 scroll-mt-28">
        
        {/* Section Header */}
        <div className="text-center space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t.profileSpotlight.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
            {t.profileSpotlight.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t.profileSpotlight.subtitle}
          </p>
        </div>

        {/* Tactile Split Card with Enhanced Spacing & Depth */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#0c111c]/95 backdrop-blur-2xl p-8 sm:p-12 lg:p-14 rounded-[2.5rem] border border-slate-800/90 shadow-2xl hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden"
          data-aos="fade-up"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Portrait Photo Frame with Social Badges */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-5" data-aos="fade-right">
            <div className="relative group">
              <div className="relative w-64 sm:w-72 aspect-[4/5] rounded-3xl overflow-hidden bg-slate-950 p-2.5 border-2 border-slate-700/80 shadow-2xl shadow-cyan-950/40 group-hover:border-cyan-400/60 group-hover:-translate-y-1.5 transition-all duration-500">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src="/image raka/2fc2d00b-c3a3-42fc-ad07-3856560d3bf5.png"
                    alt={t.profileSpotlight.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85" />
                  
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <p className="text-base font-bold font-heading leading-tight">{t.profileSpotlight.name}</p>
                    <p className="text-xs text-cyan-300 font-mono mt-0.5">{t.profileSpotlight.role}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-cyan-500 text-black text-xs font-extrabold shadow-lg font-mono">
                SIJA Student
              </div>
            </div>

            {/* Social Channels Bar */}
            <div className="w-full max-w-[288px] flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    title={`${soc.name}: ${soc.label}`}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer text-slate-400"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>

              <span className="text-xs font-mono text-slate-500 font-semibold">
                SMK Telkom
              </span>
            </div>
          </div>

          {/* Right Column: Personal Story & Focus Chips */}
          <div className="lg:col-span-7 space-y-6 text-slate-300" data-aos="fade-left">
            <div className="space-y-4">
              <p className="text-base sm:text-lg leading-[1.8] font-normal text-slate-100">
                {t.profileSpotlight.p1}
              </p>
              <p className="text-sm sm:text-base leading-[1.8] text-slate-400">
                {t.profileSpotlight.p2}
              </p>
            </div>

            {/* Stats Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {t.profileSpotlight.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 space-y-1.5 shadow-sm"
                >
                  <p className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-base font-bold text-white font-heading">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openCvModal}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{t.nav.viewCv}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <a
                href="https://wa.me/6288991304142"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-sm hover:text-emerald-400 hover:border-emerald-500/40 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* 7. CONTACT SECTION: HIGH-IMPACT COLLABORATION CANVAS (MATCHING REQUESTED CONCEPT) */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12 scroll-mt-28 relative">
        
        {/* Ambient Radial Mesh Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Big Bold Headline & Narrative */}
        <div className="text-center space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t.contact.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] font-heading max-w-3xl mx-auto">
            {t.contact.heroTitle}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {t.contact.heroSubtitle}
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2" data-aos="fade-up" data-aos-delay="100">
          
          {/* Primary Action: Direct Gmail Compose */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0d121c] hover:bg-black text-white font-extrabold text-sm sm:text-base border border-slate-700/80 shadow-xl hover:border-cyan-500/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
            <span>{t.contact.emailCta}</span>
          </a>

          {/* Salin Email Clipboard Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-sm sm:text-base border border-slate-800 hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>{copiedEmail ? t.contact.copiedEmail : t.contact.copyEmail}</span>
          </button>

          {/* Direct Message Form Toggle */}
          <button
            type="button"
            onClick={() => setIsContactFormOpen(!isContactFormOpen)}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold text-sm sm:text-base border border-cyan-500/30 transition-all active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{isContactFormOpen ? t.contact.closeFormCta : t.contact.openFormCta}</span>
          </button>

        </div>

        {/* Live Local Time Widget */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm font-mono text-slate-400 pt-2" data-aos="fade-up">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.contact.localTimeLabel}:</span>
            <span className="text-slate-100 font-bold tracking-wider">{localTime || "..."}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{t.contact.locationTag}</span>
          </div>
        </div>

        {/* Social Rounded Glass Icons */}
        <div className="flex items-center justify-center gap-3 pt-1" data-aos="fade-up">
          {SOCIAL_LINKS.map((soc) => (
            <a
              key={soc.name}
              href={soc.href}
              target="_blank"
              rel="noreferrer"
              title={soc.name}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 hover:scale-110 transition-all duration-300 shadow-md cursor-pointer"
            >
              {soc.icon}
            </a>
          ))}
        </div>

        {/* Expandable Supabase Direct Message Form */}
        {isContactFormOpen && (
          <div className="w-full max-w-2xl mx-auto pt-6 animate-fadeIn" data-aos="fade-up">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800 text-left space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white font-heading">{t.contact.formTitle}</h3>
                <span className="text-xs font-mono text-cyan-400">Supabase Connected</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">{t.contact.emailInputLabel}</label>
                  <input
                    type="email"
                    required
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">{t.contact.messageLabel}</label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.contact.messagePlaceholder}
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
                {isSubmitting ? t.contact.sendingButton : t.contact.sendButton}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-semibold text-sm animate-fadeIn">
                  {t.contact.successMessage}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-center font-semibold text-sm animate-fadeIn">
                  {t.contact.errorMessage}
                </div>
              )}
            </form>
          </div>
        )}

      </section>

    </div>
  );
}