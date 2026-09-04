"use client";

import React, { useState, useRef, useCallback } from "react";
import { TechIcon } from "@/components/TechIcon";

interface ToolItemProps {
  toolName: string;
}

function ToolItem({ toolName }: ToolItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 12;
    const tiltY = ((x - centerX) / centerX) * 12;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 450);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: isHovered
          ? `perspective(600px) rotateX(${tilt.x.toFixed(1)}deg) rotateY(${tilt.y.toFixed(1)}deg) translateY(-4px) scale3d(1.06, 1.06, 1.06)`
          : "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease",
        transformStyle: "preserve-3d",
      }}
      className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl cursor-pointer select-none overflow-hidden transition-all duration-300 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/90 text-slate-300 hover:text-white shadow-sm ${
        isClicked ? "scale-95 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]" : ""
      }`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10"
        style={{
          background: isHovered
            ? `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.25), transparent 70%)`
            : "none",
        }}
      />

      {/* Click Ripple Pulse Animation */}
      {isClicked && (
        <span className="absolute inset-0 rounded-2xl bg-cyan-400/20 animate-ping pointer-events-none" />
      )}

      {/* Tool Icon with 3D Depth */}
      <div
        style={{ transform: "translateZ(12px)" }}
        className={`shrink-0 transition-transform duration-300 ${
          isClicked ? "scale-125 rotate-6" : "group-hover:scale-110"
        }`}
      >
        <TechIcon name={toolName} className="w-5 h-5" />
      </div>

      {/* Tool Label */}
      <span
        style={{ transform: "translateZ(8px)" }}
        className="text-xs sm:text-sm font-mono font-medium transition-colors group-hover:text-white"
      >
        {toolName}
      </span>
    </div>
  );
}

interface InteractiveToolsProps {
  tools: string[];
}

export default function InteractiveTools({ tools }: InteractiveToolsProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-3.5 max-w-4xl mx-auto pt-2">
      {tools.map((toolName) => (
        <ToolItem key={toolName} toolName={toolName} />
      ))}
    </div>
  );
}
