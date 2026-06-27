import css from 'styled-jsx/css';

export const blogPreview = css`
    .blog-section {
        /* Apply the global font variable directly to the container */
        font-family: var(--font-sans), sans-serif;
    }
    .blog-container {
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
    .blog-heading {
        font-family: var(--font-sans), sans-serif;
        font-size: clamp(1.5rem, 2.5vw, 2rem);
        font-weight: 700;
        color: var(--color-text-primary, #0f172a);
        margin: 0 0 3rem;
    }
    .blog-empty {
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
    .blog-empty p {
        font-size: 0.9rem;
        margin: 0;
    }
`;