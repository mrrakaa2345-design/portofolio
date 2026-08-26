import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AosProvider from "@/components/AosProvider";
import InteractiveBackground from "@/components/InteractiveBackground";

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
  description: "Portfolio Raka Febrian - Front-End Developer & UI/UX Specialist",
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
      <body className="min-h-full flex flex-col bg-[#080b10] text-slate-100 font-sans tracking-wide selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
        <AosProvider>
          {/* Interactive Grid Background with Cursor Tracking Spotlight */}
          <InteractiveBackground />

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
