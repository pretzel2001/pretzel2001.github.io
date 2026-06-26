"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
});

const MOBILE_BREAKPOINT = 768; // matches Tailwind's `md` breakpoint

export default function Home() {
  const [viewMode, setViewMode] = useState<"dev" | "normal">("dev");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile, always render classic mode — ignore the dev/normal toggle
  const effectiveViewMode = isMobile ? "normal" : viewMode;

  return (
    <main className="portfolio-wrapper">
      <Hero viewMode={effectiveViewMode} setViewMode={setViewMode} isMobile={isMobile} />

      {effectiveViewMode === "normal" && (
        <div className="animate-[fadeIn_0.5s_ease-out] w-full max-w-3xl mx-auto px-6 md:px-0 flex flex-col gap-24 select-text">
          <section id="about" className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-12">
            <About />
          </section>
          <section id="experience" className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-12">
            <Experience />
          </section>
          <section id="education" className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-12">
            <Education />
          </section>
          <section id="projects" className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-12">
            <Projects />
          </section>
          <section id="blogs" className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-12">
            <BlogPreview />
          </section>
          <section id="contact" className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-12 pb-24">
            <Contact />
          </section>
        </div>
      )}
      <style jsx global>{`
        .portfolio-wrapper {
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
          width: 100%;
        }
        section {
          scroll-margin-top: 2rem;
        }
      `}</style>
    </main>
  );
}