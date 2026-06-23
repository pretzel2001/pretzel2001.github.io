"use client";

import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { aboutStyles } from "../styles/about.styles"; 

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section id="about" ref={ref} className={`about-section ${isInView ? "in-view" : ""}`}>
      <div className="about-container">
        <span className="section-eyebrow">About me</span>
        <h2 className="about-heading">
          Engineered for scale,<br />
          designed for impact.
        </h2>

        <div className="about-body">
          <p>
            I am Anannya Preeta, a Full Stack Software Engineer with a focus on building 
            enterprise-grade web applications and data-driven systems. My approach 
            bridges the gap between complex backend architecture and intuitive user 
            experiences.
          </p>
          <p>
            With professional experience in the ASP.NET Core and React ecosystem, 
            I specialize in optimizing system performance, implementing robust 
            RESTful APIs, and streamlining operational workflows through automation. 
            I am passionate about writing clean, maintainable code that solves 
            real-world business challenges.
          </p>
        </div>
      </div>
      <style jsx>{aboutStyles}</style>
    </section>
  );
}