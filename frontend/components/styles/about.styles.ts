import css from 'styled-jsx/css';

export const aboutStyles = css`
  .about-section {
    padding: 7rem 1.5rem 3rem;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .about-section.in-view {
    opacity: 1;
    transform: none;
  }
  .about-container {
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
  .about-heading {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 700;
    line-height: 1.15;
    color: var(--color-text-primary, #0f172a);
    margin: 0 0 2rem;
  }
  .about-body p {
    font-size: 0.975rem;
    line-height: 1.8;
    color: var(--color-text-secondary, #475569);
    margin: 0 0 1.25rem;
  }
  .about-body p:last-child {
    margin-bottom: 0;
  }
`;