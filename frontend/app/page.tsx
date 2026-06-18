"use client";

import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience"; // Added import
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="portfolio-wrapper">
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