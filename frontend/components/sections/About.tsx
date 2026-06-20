"use client";

import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { aboutStyles } from "../styles/about.styles"; 

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className={`about-section ${isInView ? "in-view" : ""}`}
    >
      <div className="about-container">
        <span className="section-eyebrow">About me</span>
        <h2 className="about-heading">
          Building things people<br />
          actually want to use.
        </h2>

        <div className="about-body">
          <p>
            Hi, I am Anannya Preeta — a full-stack software engineer based in Dhaka,
            Bangladesh. I love turning messy problems into clean, working
            software and am equally at home in a React component tree or a
            C# service layer.
          </p>
          <p>
            I focus on creating structured architectures, optimizing query 
            performance, and shaping fluid frontend layouts with precise 
            interactive styling.
          </p>
        </div>
      </div>

      <style jsx>{aboutStyles}</style>
    </section>
  );
}