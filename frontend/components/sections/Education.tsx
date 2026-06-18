"use client";

import { useRef } from "react";
import { useInView } from "../hooks/useInView";

const educationData = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "Independent University, Bangladesh",
    period: "2020 – 2024",
    highlights: [
      "CSE 451: Software Engineering",
      "CSE 490: Special Topics in Computer Science & Engineering",
      "CSE 437: Theory of Computation & Automata",
      "CSE 472: Cloud Computing",
    ],
  },
  {
    degree: "A Levels",
    institution: "Academia",
    period: "2019",
    highlights: [],
  },
  {
    degree: "O Levels",
    institution: "Academia",
    period: "2017",
    highlights: [],
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="education"
      ref={ref}
      className={`edu-section ${isInView ? "in-view" : ""}`}
    >
      <div className="edu-container">
        <span className="section-eyebrow">Education</span>
        <h2 className="edu-heading">Academic background</h2>

        <div className="edu-cards">
          {educationData.map((item, index) => (
            <article
              key={index}
              className="edu-card"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="edu-marker-wrapper">
                <div className="edu-dot" aria-hidden="true" />
              </div>

              <div className="edu-card-body">
                <div className="edu-header">
                  <h3 className="edu-degree">{item.degree}</h3>
                  <span className="edu-period">{item.period}</span>
                </div>
                <p className="edu-institution">{item.institution}</p>

                {item.highlights.length > 0 && (
                  <ul className="edu-courses">
                    {item.highlights.map((course, i) => (
                      <li key={i} className="edu-course-tag">
                        {course}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .edu-section {
          font-family: var(--font-sans), sans-serif;
          padding: 7rem 1.5rem;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .edu-section.in-view {
          opacity: 1;
          transform: none;
        }
        .edu-container {
          max-width: 860px; /* Matched to experience container width exactly */
          margin: 0 auto;
        }

        .section-eyebrow {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-accent, #4f8ef7);
          margin-bottom: 0.75rem;
        }
        .edu-heading {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700;
          color: var(--color-text-primary, #0f172a);
          margin: 0 0 3rem;
        }

        .edu-cards {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        /* Matches timeline line alignment criteria exactly */
        .edu-cards::before {
          content: "";
          position: absolute;
          left: 7px;
          top: 6px;
          bottom: 0;
          width: 1px;
          background: var(--color-border, #e2e8f0);
          z-index: 1;
        }

        .edu-card {
          display: flex;
          gap: 1.25rem; /* Matches experience container timeline gaps */
          margin-bottom: 2.25rem;
          position: relative;
        }
        .edu-card:last-child {
          margin-bottom: 0;
        }
        .edu-section.in-view .edu-card {
          opacity: 1;
          transform: none;
        }

        .edu-marker-wrapper {
          flex-shrink: 0;
          width: 15px;
          display: flex;
          justify-content: center;
        }
        
        .edu-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 2px solid var(--color-accent, #4f8ef7);
          background: var(--background, #fff);
          margin-top: 3px;
          position: relative;
          z-index: 2;
        }

        .edu-card-body {
          flex: 1;
        }
        
        /* Structural match for experience header layout style */
        .edu-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.2rem;
        }
        
        .edu-degree {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.975rem;
          font-weight: 600;
          color: var(--color-text-primary, #0f172a);
          margin: 0;
        }
        
        .edu-period {
          font-size: 0.75rem;
          color: var(--color-text-muted, #94a3b8);
          white-space: nowrap;
        }
        
        .edu-institution {
          display: block;
          font-size: 0.8rem;
          color: var(--color-accent, #4f8ef7);
          margin: 0 0 0.5rem;
        }

        .edu-courses {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .edu-course-tag {
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--color-text-secondary, #475569);
          background: var(--color-surface, #f1f5f9);
          border: 1px solid var(--color-border, #e2e8f0);
          border-radius: 4px;
          padding: 0.2rem 0.6rem;
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
}