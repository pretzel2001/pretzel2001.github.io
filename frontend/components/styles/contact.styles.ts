import css from 'styled-jsx/css';

export const contactStyles = css`
    .contact-section {
        /* Bind modern geometric sans-serif styling token */
        font-family: var(--font-sans), sans-serif;
        padding: 7rem 1.5rem 8rem;
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .contact-section.in-view {
        opacity: 1;
        transform: none;
    }
    .contact-container {
        max-width: 560px;
        margin: 0 auto;
        text-align: center;
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
    .contact-heading {
        font-family: var(--font-sans), sans-serif;
        font-size: clamp(1.75rem, 3vw, 2.5rem);
        font-weight: 700;
        color: var(--color-text-primary, #0f172a);
        margin: 0 0 1rem;
    }
    .contact-subtext {
        font-size: 0.975rem;
        color: var(--color-text-secondary, #475569);
        line-height: 1.7;
        margin: 0 0 3rem;
    }

    .contact-links {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        text-align: left;
    }
    .contact-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.25rem;
        border: 1px solid var(--color-border, #e2e8f0);
        border-radius: 10px;
        background: var(--color-surface, #f8fafc);
        color: inherit;
        text-decoration: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease,
        transform 0.2s ease;
    }
    .contact-link:hover {
        border-color: var(--color-accent, #4f8ef7);
        box-shadow: 0 4px 16px -4px rgba(79, 142, 247, 0.18);
        transform: translateY(-1px);
    }
    .contact-link:focus-visible {
        outline: 2px solid var(--color-accent, #4f8ef7);
        outline-offset: 2px;
    }
    .contact-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 8px;
        background: var(--color-bg, #fff);
        border: 1px solid var(--color-border, #e2e8f0);
        color: var(--color-accent, #4f8ef7);
    }
    .contact-link-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1px;
    }
    .contact-link-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-text-primary, #0f172a);
    }
    .contact-link-display {
        font-size: 0.78rem;
        color: var(--color-text-muted, #94a3b8);
    }
    .contact-arrow {
        color: var(--color-text-muted, #cbd5e1);
        flex-shrink: 0;
        transition: color 0.2s ease, transform 0.2s ease;
    }
    .contact-link:hover .contact-arrow {
        color: var(--color-accent, #4f8ef7);
        transform: translate(2px, -2px);
    }
`;