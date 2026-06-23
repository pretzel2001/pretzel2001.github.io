"use client";

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <span className="section-eyebrow">Projects</span>
        <h2 className="projects-heading">Enterprise Impact</h2>

        <div className="project-grid">
          {/* Dealer Intelligence Dashboard */}
          <div className="project-card">
            <h3>Dealer Intelligence Dashboard</h3>
            <p>
              Engineered a high-performance analytics platform for a 500+ dealer network. 
              Leveraging ASP.NET, SQL Server, and Google Maps API, I optimized geo-spatial 
              data processing, <strong>reducing regional reporting turnaround from 2 days to under 30 minutes.</strong>
            </p>
          </div>

          {/* R&D Automation */}
          <div className="project-card">
            <h3>R&D Process Log Automation</h3>
            <p>
              Developed a custom workflow automation system to modernize R&D operations. 
              By implementing automated job scheduling and process tracking, 
              <strong> I eliminated manual data entry, reclaiming 10+ hours of operational time per week</strong> for QA and R&D teams.
            </p>
          </div>

          {/* Vendor Enlistment System */}
          <div className="project-card">
            <h3>Vendor Enlistment System</h3>
            <p>
              Architected a centralized vendor onboarding platform using ASP.NET Core and SharePoint integration. 
              The digitisation of multi-stage approval workflows <strong>boosted procurement efficiency by ~60%</strong>, replacing legacy paper-based processes.
            </p>
          </div>
        </div>

        <h2 className="projects-heading" style={{ marginTop: '3rem', fontSize: '1.5rem' }}>Personal Works</h2>
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
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <p>Current projects are in active development and will be showcased here shortly.</p>
        </div>
      </div>

      <style jsx>{`
        .projects-container { max-width: 860px; margin: 0 auto; }
        .section-eyebrow { display: block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--portfolio-purple); margin-bottom: 0.75rem; }
        .projects-heading { font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 700; color: var(--color-text-primary); margin: 0 0 2rem; }
        
        .project-grid { display: flex; flex-direction: column; gap: 2rem; }
        .project-card h3 { color: var(--portfolio-purple); margin-bottom: 0.5rem; font-size: 1.1rem; }
        .project-card p { color: var(--color-text-secondary); line-height: 1.6; }

        .projects-empty { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 4rem 2rem; border: 1px dashed var(--color-border); border-radius: 12px; color: var(--color-text-muted); }
        .empty-icon { color: var(--color-text-muted); }
      `}</style>
    </section>
  );
}