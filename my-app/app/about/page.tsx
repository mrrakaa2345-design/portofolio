import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Raka Febrian",
  description: "Tentang Raka Febrian, Software Developer & Tech Enthusiast dari SIJA SMK Telkom Sidoarjo.",
};

const SKILLS = [
  "TypeScript",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "PHP",
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "Supabase",
  "Tailwind CSS",
  "Figma",
  "Git & GitHub",
];

const INTERESTS = [
  "Full-Stack Web Development",
  "Software Engineering",
  "UI/UX & Product Design",
  "Cloud & AI Technologies",
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b10] text-slate-100">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-[120px]" />
        <div className="absolute right-[5%] top-[45%] h-96 w-96 rounded-full bg-blue-600/[0.05] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">

        {/* HERO */}
        <section className="grid items-center gap-14 lg:grid-cols-[1.25fr_.75fr]">
          <div data-aos="fade-up">
            <div className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
              <span className="h-px w-10 bg-cyan-400" />
              About me
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl">
              Engineering
              <br />
              <span className="text-slate-500">and crafting</span>
              <br />
              digital solutions.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Saya Raka Febrian, siswa SIJA di SMK Telkom Sidoarjo dengan
              passion mendalam pada Software Engineering, Full-Stack Web Development,
              dan UI/UX Design. Saya suka merancang dan membangun sistem digital
              yang terstruktur rapi, efisien, dan memberikan solusi nyata.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300"
              >
                Lihat project
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-slate-500 hover:bg-white/[0.04] hover:text-white"
              >
                Hubungi saya
              </Link>
            </div>
          </div>

          {/* PROFILE VISUAL */}
          <div
            className="relative mx-auto w-full max-w-[330px] lg:mx-0 lg:ml-auto"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#10151d] shadow-2xl">

              {/* decorative number */}
              <div className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.25em] text-slate-600">
                01 / ABOUT
              </div>

              {/* portrait placeholder */}
              <div className="absolute inset-5 flex items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-[#0b0f15]">
                <div className="absolute h-48 w-48 rounded-full bg-cyan-400/[0.07] blur-3xl" />

                <div className="relative text-center flex flex-col items-center">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-500 hover:scale-110 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">
                    <Image
                      src="/rf-logo.png"
                      alt="Raka Febrian Logo"
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>

                  <p className="mt-4 text-lg font-bold font-heading text-white">
                    Raka Febrian
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-400 font-mono">
                    Software & Web Dev
                  </p>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-white/[0.08] pt-4 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <span>Sidoarjo, Indonesia</span>
                <span className="flex items-center gap-2 text-slate-400">
                  <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="my-24 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

        {/* STORY */}
        <section
          className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"
          data-aos="fade-up"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
              02 / My story
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Bukan cuma membuat website terlihat bagus.
            </h2>
          </div>

          <div className="space-y-6 text-sm leading-8 text-slate-400 sm:text-base">
            <p>
              Ketertarikan saya pada web development berawal dari rasa ingin
              tahu bagaimana sebuah desain bisa berubah menjadi sesuatu yang
              benar-benar dapat digunakan.
            </p>

            <p>
              Dari sana saya mulai mempelajari HTML, CSS, JavaScript, PHP,
              database, hingga framework dan tools yang membantu proses
              pengembangan website.
            </p>

            <p>
              Saya juga tertarik pada UI/UX karena menurut saya tampilan dan
              fungsi tidak bisa dipisahkan. Website yang baik bukan hanya
              menarik ketika pertama kali dilihat, tetapi juga terasa mudah
              ketika digunakan.
            </p>
          </div>
        </section>

        {/* CURRENT FOCUS */}
        <section className="mt-24" data-aos="fade-up">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
                03 / Currently
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                What I&apos;m into
              </h2>
            </div>

            <span className="hidden font-mono text-xs text-slate-600 sm:block">
              2026
            </span>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
            {INTERESTS.map((item, index) => (
              <div
                key={item}
                className="group relative bg-[#0c1118] p-7 transition-all duration-500 hover:bg-[#101721] sm:p-9"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-600">
                    0{index + 1}
                  </span>

                  <span className="text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400">
                    ↗
                  </span>
                </div>

                <h3 className="text-xl font-medium text-white transition-colors duration-300 group-hover:text-cyan-300">
                  {item}
                </h3>

                <div className="mt-5 h-px w-8 bg-slate-700 transition-all duration-500 group-hover:w-16 group-hover:bg-cyan-400" />
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="mt-24" data-aos="fade-up">
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
              04 / Toolkit
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Tools I use
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {SKILLS.map((skill, index) => (
              <div
                key={skill}
                className="group flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/[0.05]"
              >
                <span className="font-mono text-[10px] text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm text-slate-300 transition-colors group-hover:text-white">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PRINCIPLE */}
        <section
          className="relative mt-24 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d131b] p-8 sm:p-12"
          data-aos="fade-up"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/[0.05] blur-[80px]" />

          <div className="relative grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
                05 / Approach
              </p>

              <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Simple interfaces. Thoughtful details.
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-8 text-slate-400 sm:text-base">
              <p>
                Saya lebih memilih desain yang memiliki alasan daripada
                sekadar menambahkan elemen agar terlihat ramai.
              </p>

              <p>
                Setiap spacing, warna, typography, interaction, dan animasi
                seharusnya membantu pengguna memahami sebuah interface.
              </p>

              <div className="flex flex-wrap gap-2 pt-3">
                <span className="rounded-full bg-white/[0.05] px-4 py-2 text-xs text-slate-300">
                  Clean UI
                </span>
                <span className="rounded-full bg-white/[0.05] px-4 py-2 text-xs text-slate-300">
                  Responsive
                </span>
                <span className="rounded-full bg-white/[0.05] px-4 py-2 text-xs text-slate-300">
                  Accessible
                </span>
                <span className="rounded-full bg-white/[0.05] px-4 py-2 text-xs text-slate-300">
                  Interactive
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 text-center" data-aos="fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-600">
            Have a project?
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
            Let&apos;s make something
            <span className="text-cyan-400"> useful.</span>
          </h2>

          <Link
            href="/#contact"
            className="group mt-9 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300"
          >
            Start a conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>

      </div>
    </main>
  );
}