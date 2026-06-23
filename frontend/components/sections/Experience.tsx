"use client";

import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { experienceStyles } from "../styles/experience.styles";

const experienceData = [
  {
    title: "Software Engineer",
    company: "Berger Paints Bangladesh Limited",
    period: "June 2024 – May 2026",
    description: "Engineered 3 enterprise web applications using ASP.NET Core and React. Optimized SQL queries to reduce data retrieval time by ~35% and integrated SAP OData services for real-time ERP synchronization.",
  },
  {
    title: "UI/UX Design Intern",
    company: "Digicon Technologies Limited",
    period: "April 2024 – May 2024",
    description: "Designed UI mockups and interactive prototypes in Figma for 2 web products, enhancing design-to-development handoff efficiency.",
  },
  {
    title: "Operations Support & Virtual Assistant",
    company: "All American Home Group",
    period: "January 2019 – June 2020",
    description: "Managed high-value tax record audits and data categorization. Maintained 100% accuracy in sensitive legal documentation and database updates.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section id="experience" ref={ref} className={`work-section ${isInView ? "in-view" : ""}`}>
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