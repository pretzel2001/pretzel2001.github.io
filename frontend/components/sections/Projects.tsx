"use client";

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <span className="section-eyebrow">Projects</span>
        <h2 className="projects-heading">Things I have built</h2>

        {/* ── Empty state — fill this in later ── */}
        <div className="projects-empty">
          <svg
            className="empty-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <p>Projects coming soon.</p>
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          padding: 7rem 1.5rem;
        }
        .projects-container {
          max-width: 860px;
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
        .projects-heading {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700;
          color: var(--color-text-primary, #0f172a);
          margin: 0 0 3rem;
        }
        .projects-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 4rem 2rem;
          border: 1px dashed var(--color-border, #e2e8f0);
          border-radius: 12px;
          color: var(--color-text-muted, #94a3b8);
        }
        .empty-icon {
          color: var(--color-text-muted, #cbd5e1);
        }
        .projects-empty p {
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
    </section>
  );
}