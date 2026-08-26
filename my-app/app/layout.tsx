import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AosProvider from "@/components/AosProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raka Febrian | Portfolio",
  description: "Portfolio Raka Febrian - Front-End Developer & UI Specialist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f17] text-slate-100 font-sans tracking-wide selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
        <AosProvider>
          {/* Ambient Background Glow */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[650px] md:w-[1100px] h-[320px] sm:h-[550px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent blur-[110px] sm:blur-[150px] pointer-events-none z-0"></div>

          <Navbar />
          
          <main className="flex-1 w-full relative z-10 pt-20 sm:pt-24">
            {children}
          </main>

          <Footer />
        </AosProvider>
      </body>
    </html>
  );
}
