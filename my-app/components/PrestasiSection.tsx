"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";
import { AchievementItemTranslation } from "@/lib/translations";
import CertificateModal from "@/components/CertificateModal";
import PrestasiCard from "@/components/PrestasiCard";

interface PrestasiSectionProps {
  initialDisplayCount?: number;
  showAllByDefault?: boolean;
}

export default function PrestasiSection({
  initialDisplayCount = 4,
  showAllByDefault = false,
}: PrestasiSectionProps) {
  const { t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(showAllByDefault);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allItems: AchievementItemTranslation[] = t.achievements.items;

  // Filter Categories with Item Counts
  const categories = useMemo(() => {
    return [
      { id: "all", label: t.achievements.filterAll, count: allItems.length },
      {
        id: "akademik",
        label: t.achievements.filterAcademic,
        count: allItems.filter((i) => i.category === "akademik").length,
      },
      {
        id: "sertifikasi",
        label: t.achievements.filterCert,
        count: allItems.filter((i) => i.category === "sertifikasi").length,
      },
      {
        id: "kompetisi",
        label: t.achievements.filterComp,
        count: allItems.filter((i) => i.category === "kompetisi").length,
      },
      {
        id: "olahraga",
        label: t.achievements.filterSports,
        count: allItems.filter((i) => i.category === "olahraga").length,
      },
    ];
  }, [allItems, t.achievements]);

  // Filtered & Searched List
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.issuer.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.credentialId && item.credentialId.toLowerCase().includes(q)) ||
        (item.highlights && item.highlights.some((h) => h.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [allItems, selectedCategory, searchQuery]);

  // Visible Items (Based on showAll toggle or search active)
  const isFilteringOrSearching = selectedCategory !== "all" || searchQuery.trim() !== "";
  const displayedItems =
    showAll || isFilteringOrSearching
      ? filteredItems
      : filteredItems.slice(0, initialDisplayCount);

  const openCertificate = (item: AchievementItemTranslation) => {
    const idx = allItems.findIndex((i) => i.id === item.id);
    setSelectedIndex(idx >= 0 ? idx : 0);
    setModalOpen(true);
  };

  return (
    <section
      id="prestasi"
      className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 scroll-mt-28 relative"
    >
      {/* 1. SECTION HEADER */}
      <div className="text-center space-y-4" data-aos="fade-up">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide shadow-sm shadow-cyan-500/10">
          <svg
            className="w-4 h-4 text-cyan-400 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <span>{t.achievements.badge}</span>
        </div>

        {/* Dynamic Gradient Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 font-heading tracking-tight">
          {t.achievements.title}
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          {t.achievements.subtitle}
        </p>
      </div>

      {/* 2. FILTER TABS & SEARCH CONTROLS */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-5"
        data-aos="fade-up"
      >
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-105"
                    : "bg-slate-900/70 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/90"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-black/25 text-black font-extrabold"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="w-full md:w-80 group">
          <div className="relative">
            <input
              type="text"
              placeholder={t.achievements.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-2.5 pl-11 pr-9 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-700/80 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            />
            <svg
              className="w-4 h-4 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-cyan-400 transition-colors"
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

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-slate-400 hover:text-white p-1"
                aria-label="Clear Search"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. CERTIFICATES GRID */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 backdrop-blur-sm space-y-3">
          <svg
            className="w-12 h-12 text-slate-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg font-bold text-slate-300 font-heading">
            {t.achievements.noResultsTitle}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            {t.achievements.noResultsDesc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedItems.map((item, index) => (
            <PrestasiCard
              key={item.id}
              item={item}
              index={index}
              onOpen={openCertificate}
              inspectLabel={t.achievements.inspectBtn}
            />
          ))}
        </div>
      )}

      {/* 4. EXPAND / "LIHAT SEMUA" BUTTON & FOOTER ACTIONS */}
      {!isFilteringOrSearching && allItems.length > initialDisplayCount && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2" data-aos="fade-up">
          {/* Main Expand Button */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0d1424] hover:bg-[#152038] text-white border border-cyan-500/40 hover:border-cyan-400 font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-950/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>
              {showAll
                ? t.achievements.viewLessBtn
                : `${t.achievements.viewAllBtn} (${allItems.length})`}
            </span>
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[11px] font-bold group-hover:bg-cyan-500 group-hover:text-black transition-colors">
              {showAll ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                `+${allItems.length - initialDisplayCount}`
              )}
            </span>
          </button>

          {/* Direct Lightbox Gallery Trigger */}
          <button
            onClick={() => {
              setSelectedIndex(0);
              setModalOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>{t.achievements.openGalleryBtn}</span>
          </button>
        </div>
      )}

      {/* 5. LIGHTBOX MODAL */}
      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        items={allItems}
        initialIndex={selectedIndex}
      />
    </section>
  );
}
