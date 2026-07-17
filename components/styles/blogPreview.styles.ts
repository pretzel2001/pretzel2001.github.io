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

    .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
    }
    .blog-card {
        display: block;
        border: 1px solid var(--color-border, #e2e8f0);
        border-radius: 12px;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .blog-card:hover {
        border-color: var(--portfolio-purple);
        transform: translateY(-2px);
    }
    .blog-card-image {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        background: var(--color-border, #e2e8f0);
    }
    .blog-card-image :global(img) {
        object-fit: cover;
    }
    .blog-card-body {
        padding: 1rem 1.25rem 1.25rem;
    }
    .blog-card-tag {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--portfolio-purple);
        margin-bottom: 0.5rem;
    }
    .blog-card-title {
        font-family: var(--font-sans), sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--color-text-primary, #0f172a);
        margin: 0 0 0.5rem;
        line-height: 1.3;
    }
    .blog-card-date {
        font-size: 0.8rem;
        color: var(--color-text-muted, #94a3b8);
    }
`;