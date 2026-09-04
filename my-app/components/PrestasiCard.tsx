"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AchievementItem } from "@/lib/data";

interface PrestasiCardProps {
  item: AchievementItem;
  index: number;
  onOpen: (item: AchievementItem) => void;
  inspectLabel: string;
}

export default function PrestasiCard({
  item,
  index,
  onOpen,
  inspectLabel,
}: PrestasiCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 7;
    const tiltY = ((x - centerX) / centerX) * 7;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(item)}
      data-aos="fade-up"
      data-aos-delay={index * 60}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease",
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl bg-[#0c121e]/90 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden cursor-pointer will-change-transform z-10"
    >
      {/* Dynamic Cursor Spotlight Radial Glow (Same as ProjectCard) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.2), transparent 60%)`
            : "none",
        }}
      />

      {/* Top Accent Gradient Glow Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${item.accentGlow} opacity-40 group-hover:opacity-90 transition-opacity pointer-events-none`}
      />

      {/* Certificate Image Frame Container */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800/80"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/20 to-transparent opacity-80 group-hover:opacity-25 transition-opacity" />

        {/* Floating Category Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-sm ${item.badgeColor}`}
          >
            {item.badge}
          </span>
        </div>

        {/* Floating Year Pill */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-300 text-[10px] font-mono font-bold border border-slate-700/80">
            {item.year}
          </span>
        </div>

        {/* Hover Inspect Prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/40 flex items-center gap-1.5 scale-90 group-hover:scale-100 transition-transform">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{inspectLabel}</span>
          </span>
        </div>
      </div>

      {/* Certificate Information Body */}
      <div
        style={{ transform: "translateZ(14px)" }}
        className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 relative z-10"
      >
        <div className="space-y-2">
          {/* Issuer & Date Row */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono gap-2">
            <span className="text-cyan-400 font-semibold truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              {item.issuer}
            </span>
            <span className="shrink-0 text-slate-500 text-[10px]">{item.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-heading leading-snug line-clamp-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Highlights Tags & Interactive Action Bar */}
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
          {/* Skill/Highlight Chips */}
          <div className="flex flex-wrap gap-1 items-center">
            {item.highlights.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Quick Action Link */}
          <span className="text-[11px] font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-0.5 shrink-0 font-mono">
            <span>Lihat</span>
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
