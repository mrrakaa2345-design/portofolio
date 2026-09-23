"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";

interface CvDocItem {
  id: "ats" | "creative";
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  file: string;
  downloadName: string;
  description: string;
  highlights: string[];
}

export default function CvModal() {
  const { isCvModalOpen, closeCvModal, lang, setLang } = useLanguage();
  const [selectedType, setSelectedType] = useState<"ats" | "creative">("ats");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const CV_DOCS: Record<"ats" | "creative", CvDocItem> = {
    ats: {
      id: "ats",
      title: lang === "id" ? "CV Format ATS" : "ATS-Friendly CV",
      subtitle: lang === "id" ? "Standar Industri & Recruiter ATS" : "Industry Standard & ATS-Friendly",
      tag: "ATS Optimized",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      file: "/cv/CV_Raka_Febrian_ATS.jpg",
      downloadName: "CV_Raka_Febrian_ATS.jpg",
      description:
        lang === "id"
          ? "Format formal monokrom yang dioptimalkan untuk sistem ATS (Applicant Tracking System), menonjolkan ringkasan keahlian, pendidikan SMK Telkom Sidoarjo, dan pengalaman proyek."
          : "Clean monochrome structure tailored for Applicant Tracking Systems (ATS), emphasizing skills, education at SMK Telkom Sidoarjo, and project track record.",
      highlights: [
        lang === "id" ? "Ringkasan Profil & Kontak" : "Profile Summary & Contact",
        lang === "id" ? "Pendidikan SIJA 2024-2028" : "SIJA Vocational Education",
        lang === "id" ? "Skill Frontend & Backend" : "Frontend & Backend Skillset",
        lang === "id" ? "Pengalaman Proyek Nyata" : "Real-world Project Experience",
      ],
    },
    creative: {
      id: "creative",
      title: lang === "id" ? "CV Format Kreatif" : "Creative Visual CV",
      subtitle: lang === "id" ? "Desain Visual Navy & Gold" : "Modern Navy & Gold Visual Design",
      tag: "Visual Design",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      file: "/cv/CV_Raka_Febrian_Kreatif.jpg",
      downloadName: "CV_Raka_Febrian_Kreatif.jpg",
      description:
        lang === "id"
          ? "Desain visual modern berkarakter dengan sidebar kontras navy gelap, aksen emas, serta tata letak artistik yang cocok untuk portofolio UI/UX dan presentasi visual."
          : "A modern, distinctive layout with dark navy contrast sidebar, gold accents, and visual hierarchy suited for UI/UX portfolios and creative showcases.",
      highlights: [
        lang === "id" ? "Desain Sidebar Kontras" : "High-Contrast Sidebar Layout",
        lang === "id" ? "Aksen Emas Elegan" : "Sophisticated Gold Accents",
        lang === "id" ? "Data Diri & Sosmed Lengkap" : "Complete Personal Meta",
        lang === "id" ? "Visual Hierarki Rapi" : "Structured Visual Hierarchy",
      ],
    },
  };

  const currentDoc = CV_DOCS[selectedType];

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCvModal();
      }
    };
    if (isCvModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCvModalOpen, closeCvModal]);

  // Reset scroll position on switch
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedType]);

  if (!isCvModalOpen) return null;

  const triggerDownload = (fileUrl: string, fileName: string) => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1200);
  };

  const handlePrint = () => {
    const printWindow = window.open(currentDoc.file, "_blank");
    if (printWindow) {
      printWindow.focus();
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      window.print();
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("mr.rakka23@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error("Gagal menyalin email:", err);
    }
  };

  const docMaxWidth = Math.round(760 * (zoomLevel / 100));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={closeCvModal}
    >
      {/* High-End Document Viewer Window Frame */}
      <div
        className="relative w-full max-w-6xl h-[94vh] max-h-[94vh] flex flex-col bg-[#0f131a] border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-auto select-none"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        {/* 1. TOP LUXURY WINDOW BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#151922] border-b border-slate-800 shrink-0">
          {/* Left: Window Controls + Document Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={closeCvModal}
                className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-125 cursor-pointer transition-all shadow-sm flex items-center justify-center group"
                title="Tutup Modal"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[9px] text-black font-black leading-none">×</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:brightness-125 cursor-pointer transition-all shadow-sm"
                title="Toggle Sidebar Navigator"
              />
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:brightness-125 cursor-pointer transition-all shadow-sm"
                title="Reset Zoom"
              />
            </div>

            <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white font-heading truncate max-w-[180px] sm:max-w-none">
                Curriculum Vitae — Raka Febrian
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border hidden md:inline-block ${currentDoc.tagColor}`}>
                {currentDoc.tag}
              </span>
            </div>
          </div>

          {/* Center: Dual-Mode Format Switcher */}
          <div className="order-3 sm:order-2 flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => setSelectedType("ats")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedType === "ats"
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{lang === "id" ? "Format ATS" : "ATS Format"}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("creative")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedType === "creative"
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span>{lang === "id" ? "Format Kreatif" : "Creative Format"}</span>
            </button>
          </div>

          {/* Right Action: Download Button & Controls */}
          <div className="order-2 sm:order-3 flex items-center gap-2">
            {/* Primary REAL Download Action */}
            <button
              type="button"
              onClick={() => triggerDownload(currentDoc.file, currentDoc.downloadName)}
              disabled={isDownloading}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-lg active:scale-95 ${
                selectedType === "ats"
                  ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/25"
                  : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-500/25"
              }`}
              title={`Unduh ${currentDoc.title}`}
            >
              <svg className={`w-4 h-4 ${isDownloading ? "animate-bounce" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isDownloading ? (lang === "id" ? "Mengunduh..." : "Downloading...") : (lang === "id" ? "Unduh CV" : "Download CV")}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hidden sm:flex"
              title="Cetak CV"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeCvModal}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
              aria-label="Tutup"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 2. VIEWER SUB-TOOLBAR (Info, Scroll Hint & Zoom Controls) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-[#12161f] border-b border-slate-800/80 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-cyan-400 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>{isSidebarOpen ? (lang === "id" ? "Sembunyikan Panel" : "Hide Sidebar") : (lang === "id" ? "Tampilkan Panel" : "Show Sidebar")}</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-cyan-400/90 font-mono text-[11px] hidden sm:inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Scroll ke bawah untuk membaca seluruh CV
            </span>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setZoomLevel(Math.max(70, zoomLevel - 15))}
                className="px-2 py-0.5 text-slate-400 hover:text-cyan-400 font-bold cursor-pointer"
                title="Zoom Out"
              >
                -
              </button>
              <span className="w-12 text-center text-slate-200">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                className="px-2 py-0.5 text-slate-400 hover:text-cyan-400 font-bold cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => setZoomLevel(100)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-800 cursor-pointer hidden md:inline-block"
            >
              Reset 100%
            </button>
          </div>
        </div>

        {/* 3. MAIN WORKSPACE: SIDEBAR + HIGH-RES SCROLLABLE DOCUMENT CANVAS */}
        <div className="flex-1 flex overflow-hidden bg-[#0a0d13] relative min-h-0">
          
          {/* Left Sidebar Navigator (Thumbnails & Document Info) */}
          {isSidebarOpen && (
            <div className="w-64 sm:w-72 md:w-80 bg-[#10141d] border-r border-slate-800/90 p-4 overflow-y-auto space-y-4 shrink-0 animate-fadeIn hidden sm:flex flex-col justify-between custom-scrollbar">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {lang === "id" ? "PILIHAN FORMAT CV" : "SELECT CV VERSION"}
                  </p>
                  <p className="text-xs text-slate-300 font-semibold">
                    {lang === "id" ? "Pilih versi sesuai kebutuhan:" : "Choose version for your needs:"}
                  </p>
                </div>

                {/* Document Selector Cards */}
                <div className="space-y-2.5">
                  {/* Option 1: ATS Card */}
                  <div
                    onClick={() => setSelectedType("ats")}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      selectedType === "ats"
                        ? "bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-12 h-16 rounded-md overflow-hidden border border-slate-700 shrink-0 bg-white shadow-sm">
                        <Image
                          src="/cv/CV_Raka_Febrian_ATS.jpg"
                          alt="Thumbnail ATS"
                          width={1446}
                          height={2048}
                          unoptimized
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white">Format ATS</p>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Recommended
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">
                          Standar recruiter, parsing ATS ramah & jelas.
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerDownload("/cv/CV_Raka_Febrian_ATS.jpg", "CV_Raka_Febrian_ATS.jpg");
                          }}
                          className="mt-2 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Unduh File ATS</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Option 2: Creative Card */}
                  <div
                    onClick={() => setSelectedType("creative")}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      selectedType === "creative"
                        ? "bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/30"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-12 h-16 rounded-md overflow-hidden border border-slate-700 shrink-0 bg-white shadow-sm">
                        <Image
                          src="/cv/CV_Raka_Febrian_Kreatif.jpg"
                          alt="Thumbnail Kreatif"
                          width={1446}
                          height={2048}
                          unoptimized
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white">Format Kreatif</p>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Modern
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">
                          Desain visual navy & gold, menarik untuk portfolio.
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerDownload("/cv/CV_Raka_Febrian_Kreatif.jpg", "CV_Raka_Febrian_Kreatif.jpg");
                          }}
                          className="mt-2 text-[10px] font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Unduh File Kreatif</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                  <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono">
                    {lang === "id" ? "Sorotan Dokumen" : "Document Highlights"}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {currentDoc.highlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="truncate">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Contact Footer Bar */}
              <div className="p-3 rounded-2xl bg-[#090c12] border border-slate-800/90 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px] font-mono">Email Pribadi</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    {copiedEmail ? (lang === "id" ? "✓ Tersalin!" : "✓ Copied!") : (lang === "id" ? "Salin" : "Copy")}
                  </button>
                </div>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-slate-200 truncate text-[11px] hover:text-cyan-400 transition-colors inline-block"
                  title="Kirim Email ke mr.rakka23@gmail.com"
                >
                  mr.rakka23@gmail.com
                </a>
                <p className="text-[10px] text-slate-500 font-mono">WA: 088991304142 • SIJA Telkom</p>
              </div>
            </div>
          )}

          {/* Central High-Resolution Document Canvas with Full Vertical Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-auto p-3 sm:p-6 md:p-8 flex flex-col items-center justify-start bg-[#07090e] custom-scrollbar relative"
          >
            
            {/* Mobile Format Switcher Strip */}
            <div className="w-full max-w-[760px] flex sm:hidden items-center justify-between pb-3 mb-3 border-b border-slate-800 shrink-0">
              <span className="text-xs font-bold text-white">{currentDoc.title}</span>
              <button
                type="button"
                onClick={() => triggerDownload(currentDoc.file, currentDoc.downloadName)}
                className="px-3 py-1 rounded-full bg-cyan-500 text-black text-xs font-bold shadow-md"
              >
                Unduh ({selectedType.toUpperCase()})
              </button>
            </div>

            {/* Document Sheet Container (Naturally tall for perfect scrolling & crystal clear HD text) */}
            <div
              style={{
                width: "100%",
                maxWidth: `${docMaxWidth}px`,
                transition: "max-width 0.25s ease-out",
              }}
              className="rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] border border-slate-700/70 bg-white group my-2 shrink-0"
            >
              {/* Image Document with 100% original uncompressed quality & crisp rendering */}
              <div className="w-full bg-white relative">
                <Image
                  src={currentDoc.file}
                  alt={currentDoc.title}
                  width={1446}
                  height={2048}
                  unoptimized={true}
                  priority={true}
                  quality={100}
                  className="w-full h-auto block select-none object-contain"
                />
              </div>

              {/* Bottom Card Bar */}
              <div className="p-3 bg-[#11141c] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px] text-slate-300">
                  {currentDoc.title} • HD 2048px
                </span>
                <button
                  type="button"
                  onClick={() => triggerDownload(currentDoc.file, currentDoc.downloadName)}
                  className="px-3.5 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{lang === "id" ? "Unduh Resolusi Penuh" : "Download Full HD"}</span>
                </button>
              </div>
            </div>

            {/* Bottom Quick Download Strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pb-6 shrink-0">
              <span>{lang === "id" ? "Pilihan unduh:" : "Download options:"}</span>
              <button
                type="button"
                onClick={() => triggerDownload("/cv/CV_Raka_Febrian_ATS.jpg", "CV_Raka_Febrian_ATS.jpg")}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-300 font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span>📄 Unduh CV ATS (HD)</span>
              </button>
              <button
                type="button"
                onClick={() => triggerDownload("/cv/CV_Raka_Febrian_Kreatif.jpg", "CV_Raka_Febrian_Kreatif.jpg")}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-amber-300 font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span>🎨 Unduh CV Kreatif (HD)</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

