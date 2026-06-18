"use client";

import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { experienceStyles } from "../styles/experience.styles";

const experienceData = [
  {
    title: "Software Engineer",
    company: "Berger Paints Bangladesh Limietd",
    period: "June 2024 – May 2026",
    description: "Developing scalable Web APIs using ASP.NET and building pixel-perfect, interactive frontends using Angular and Bootstrap framework.",
  },
//   {
//     title: "UI/UX Intern",
//     company: "Digicon Technologies Limited",
//     period: "April 2024 – May2024",
//     description: "Designed prototypes, mockups and responsive user flows with Figma.",
//   },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={ref}
      className={`work-section ${isInView ? "in-view" : ""}`}
    >
      <div className="work-container">
        <span className="section-eyebrow">Experience</span>
        <h3 className="work-heading">Where I have worked</h3>

        <ol className="timeline">
          {experienceData.map((job, index) => (
            <li key={index} className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="job-title">{job.title}</span>
                  <span className="job-period">{job.period}</span>
                </div>
                <span className="job-company">{job.company}</span>
                <p className="job-description">{job.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style jsx>{experienceStyles}</style>
    </section>
  );
}