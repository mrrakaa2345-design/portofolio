"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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

  const CONTACT_INFOS = [
    {
      title: "Email",
      value: "raka.febrian@example.com",
      link: "mailto:raka.febrian@example.com",
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "GitHub",
      value: "github.com/mrrakaa2345-design",
      link: "https://github.com/mrrakaa2345-design",
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      title: "Lokasi & Ketersediaan",
      value: "Indonesia (WIB) • Remote Work Available",
      link: "#",
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* 1. HEADER */}
      <div className="text-center space-y-4" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Hubungi Saya</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white">Mari Bekerja Sama!</h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
          Punya pertanyaan, tawaran pekerjaan, atau ide proyek inovatif? Jangan ragu untuk mengirim pesan.
        </p>
      </div>

      {/* 2. MAIN GRID (FORM + CONTACT INFO) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white">Informasi Kontak</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Saya biasanya membalas pesan dalam kurun waktu kurang dari 24 jam.
            </p>

            <div className="space-y-4 pt-2">
              {CONTACT_INFOS.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400 font-bold uppercase">{item.title}</p>
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Status Card */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-400">
                Terbuka untuk posisi Full-time & Freelance Projects
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form (Supabase) */}
        <div className="lg:col-span-3" data-aos="fade-left">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white">Kirim Pesan Langsung</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Pratama"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Email Anda *</label>
                <input
                  type="email"
                  required
                  placeholder="rian@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase">Pesan / Detail Proyek *</label>
              <textarea
                required
                rows={5}
                placeholder="Ceritakan tentang kebutuhan proyek Anda atau tawaran kerjasama..."
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
              {isSubmitting ? "Mengirim ke Database..." : "Kirim Pesan Sekarang"}
            </button>

            {/* Notification Alerts */}
            {submitStatus === "success" && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-semibold text-sm animate-fadeIn">
                ✓ Pesan berhasil disimpan ke database! Terima kasih, saya akan segera membalas email Anda.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-center font-semibold text-sm animate-fadeIn">
                ✕ Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi via email langsung.
              </div>
            )}
          </form>
        </div>

      </div>

    </div>
  );
}
