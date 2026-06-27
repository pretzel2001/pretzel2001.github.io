import css from 'styled-jsx/css';

export const contactStyles = css.global`
    .contact-section {
        font-family: var(--font-sans), sans-serif;
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
        margin: 0 auto 0 0;
        text-align: left;
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
        margin: 0 0 2rem;
    }

    /* Changed to row layout for side-by-side placement */
    .contact-links {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
    
    /* Elegant modern standalone circular/rounded icon buttons */
    .contact-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border: 1px solid var(--color-border, #e2e8f0);
        border-radius: 10px;
        background: var(--color-surface, #f8fafc);
        color: var(--portfolio-purple);
        text-decoration: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
    }
    .contact-link:hover {
        border-color: var(--portfolio-purple);
        background: var(--color-bg, #fff);
       box-shadow: 0 4px 16px -4px rgba(147, 51, 234, 0.18);
        transform: translateY(-2px);
    }
    .contact-link:focus-visible {
        outline: 2px solid var(--portfolio-purple);
    outline-offset: 2px;
    }
`;