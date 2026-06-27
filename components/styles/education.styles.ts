import css from 'styled-jsx/css';

export const educationStyles = css`
    .edu-section {
        /* Pass styling mapping token across active component layer */
        font-family: var(--font-sans), sans-serif;
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .edu-section.in-view {
        opacity: 1;
        transform: none;
    }
    .edu-container {
        max-width: 760px;
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
    .edu-heading {
        font-family: var(--font-sans), sans-serif;
        font-size: clamp(1.5rem, 2.5vw, 2rem);
        font-weight: 700;
        color: var(--portfolio-purple);
        margin: 0 0 3rem;
    }

    .edu-cards {
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
    }
    .edu-cards::before {
        content: "";
        position: absolute;
        left: 72px;
        top: 8px;
        bottom: 8px;
        width: 1px;
        background: var(--color-border, #e2e8f0);
    }
    @media (max-width: 480px) {
        .edu-cards::before {
        left: 56px;
        }
    }

    .edu-card {
        display: flex;
        gap: 1.5rem;
        padding: 1.5rem 0;
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .edu-section.in-view .edu-card {
        opacity: 1;
        transform: none;
    }

    .edu-card-left {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 4px;
        min-width: 60px;
        padding-top: 3px;
        position: relative;
    }
    @media (max-width: 480px) {
        .edu-card-left {
        min-width: 44px;
        }
    }
    .edu-period {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        color: var(--color-text-muted, #94a3b8);
        white-space: nowrap;
    }
   .edu-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    /* Updated to use purple */
    border: 2px solid var(--portfolio-purple);
    background: var(--color-bg, #fff);
    position: absolute;
    right: -18px;
    top: 4px;
    z-index: 1;
  }

    /* ── Body ── */
    .edu-card-body {
        flex: 1;
        padding-left: 1rem;
    }
    .edu-degree {
        font-family: var(--font-sans), sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text-primary, #0f172a);
        margin: 0 0 0.25rem;
    }
    .edu-institution {
    font-size: 0.85rem;
    /* Updated to use purple */
    color: var(--portfolio-purple);
    margin: 0 0 0.85rem;
  }

    /* ── Course tags ── */
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
        color: var(--portfolio-purple);
        background: var(--portfolio-surface-purple);
        border: 1px solid var(--portfolio-border-purple);
        border-radius: 4px;
        padding: 0.2rem 0.6rem;
        letter-spacing: 0.02em;
    }
`;