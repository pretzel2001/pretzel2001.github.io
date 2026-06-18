"use client";

import dynamic from "next/dynamic";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

// Lazy load Hero component only on client side
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="portfolio-wrapper">
      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <BlogPreview />
      <Contact />

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