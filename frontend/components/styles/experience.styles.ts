import css from 'styled-jsx/css';

export const experienceStyles = css`
  .work-section {
    font-family: var(--font-sans), sans-serif;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .work-section.in-view {
    opacity: 1;
    transform: none;
  }
  .work-container {
    max-width: 860px;
    margin: 0 auto;
  }
  .section-eyebrow {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--portfolio-purple);
    margin-bottom: 0.75rem;
  }
  .work-heading {
    font-family: var(--font-sans), sans-serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 700;
    color: var(--color-text-primary, #0f172a);
    margin: 0 0 3rem;
  }
  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
  }
  .timeline::before {
    content: "";
    position: absolute;
    left: 7px;
    top: 6px;
    bottom: 0;
    width: 1px;
    background: var(--color-border, #e2e8f0);
  }
  .timeline-item {
    display: flex;
    gap: 1.25rem;
    margin-bottom: 2.25rem;
  }
  .timeline-item:last-child {
    margin-bottom: 0;
  }
  .timeline-marker {
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    /* Updated to use purple */
    border: 2px solid var(--portfolio-purple);
    background: var(--color-bg, #fff);
    margin-top: 3px;
    position: relative;
    z-index: 1;
  }
  .timeline-content {
    flex: 1;
  }
  .timeline-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.2rem;
  }
  .job-title {
    font-family: var(--font-sans), sans-serif;
    font-size: 0.975rem;
    font-weight: 600;
    color: var(--color-text-primary, #0f172a);
  }
  .job-period {
    font-size: 0.75rem;
    color: var(--color-text-muted, #94a3b8);
    white-space: nowrap;
  }
  .job-company {
    display: block;
    font-size: 0.8rem;
    /* Updated to use purple */
    color: var(--portfolio-purple);
    margin-bottom: 0.5rem;
  }
  .job-description {
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--color-text-secondary, #475569);
    margin: 0;
  }
`;