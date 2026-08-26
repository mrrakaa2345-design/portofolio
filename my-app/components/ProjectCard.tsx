"use client";

import React, { useState, useRef } from "react";
import { ProjectItem } from "@/lib/data";

interface ProjectCardProps {
  proj: ProjectItem;
  idx: number;
}

export default function ProjectCard({ proj, idx }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
      data-aos="fade-up"
      data-aos-delay={idx * 100}
      className="group relative flex flex-col justify-between h-full rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/60 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden will-change-transform z-10"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15), transparent 70%)",
        }}
      />

      <div style={{ transform: "translateZ(30px)" }}>
        <div
          className={`relative h-48 sm:h-52 w-full bg-gradient-to-tr ${proj.gradient} p-6 sm:p-8 flex flex-col justify-between overflow-hidden`}
        >
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-mono font-bold bg-black/40 text-slate-200 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-sm border border-white/10">
              Project #{idx + 1}
            </span>
            <span className="text-xs font-mono font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-sm">
              {proj.category}
            </span>
          </div>

          <div className="z-10">
            <p className="text-white font-extrabold text-2xl tracking-tight drop-shadow-lg">
              {proj.title}
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out"></div>
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-black/10 blur-2xl group-hover:scale-125 transition-transform duration-700 ease-out delay-75"></div>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {proj.description}
          </p>
        </div>
      </div>

      <div
        className="p-6 sm:p-8 pt-0 space-y-6 mt-auto"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex flex-wrap gap-2">
          {proj.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800/80 text-cyan-100 border border-slate-700/80 shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <a
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-xl"
          >
            Live Demo
            <svg
              className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {proj.github && (
            <a
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors hover:underline underline-offset-4"
            >
              GitHub Repo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
