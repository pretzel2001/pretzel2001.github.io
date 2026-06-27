"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo / name */}
          <a
            href="#"
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Anannya<span className="logo-dot">.</span>
          </a>

          {/* Desktop links */}
          <nav className="navbar-links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${
                  activeSection === link.href.slice(1) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`bar ${menuOpen ? "open" : ""}`} />
            <span className={`bar ${menuOpen ? "open" : ""}`} />
            <span className={`bar ${menuOpen ? "open" : ""}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`mobile-link ${
                activeSection === link.href.slice(1) ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <style jsx>{`
  /* ── Base ── */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    /* Dynamically map background to layout mode token with fallback */
    background: var(--background, #ffffff);
    opacity: 0.85;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }
  .navbar.scrolled {
    border-bottom-color: var(--color-border, #e2e8f0);
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
  }

  /* ── Inner row ── */
  .navbar-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* ── Logo ── */
  .navbar-logo {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary, #0f172a);
    text-decoration: none;
    letter-spacing: -0.01em;
  }
  .logo-dot {
    color: var(--color-accent, #4f8ef7);
  }

  /* ── Desktop nav links ── */
  .navbar-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .nav-link {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--color-text-secondary, #475569);
    text-decoration: none;
    padding: 0.35rem 0.65rem;
    border-radius: 6px;
    transition: color 0.15s ease, background 0.15s ease;
  }
  .nav-link:hover {
    color: var(--color-text-primary, #0f172a);
    background: var(--color-surface, #f1f5f9);
  }
  .nav-link.active {
  color: var(--portfolio-text-primary, #0f172a); 
  font-weight: 700; 
  background: rgba(79, 142, 247, 0.15); 
}

  /* ── Hamburger (mobile) ── */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .bar {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--color-text-primary, #0f172a);
    border-radius: 2px;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  .bar.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .bar.open:nth-child(2) {
    opacity: 0;
  }
  .bar.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ── Mobile menu ── */
  .mobile-menu {
    display: none;
    flex-direction: column;
    padding: 0.5rem 1.5rem 1rem;
    border-top: 1px solid var(--color-border, #e2e8f0);
    background: var(--background, #ffffff);
  }
  .mobile-link {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-secondary, #475569);
    text-decoration: none;
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--color-border, #f1f5f9);
  }
  .mobile-link:last-child {
    border-bottom: none;
  }
  .mobile-link.active {
  color: var(--portfolio-text-primary, #0f172a);
  font-weight: 700;
}

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .navbar-links {
      display: none;
    }
    .hamburger {
      display: flex;
    }
    .mobile-menu.open {
      display: flex;
    }
  }
`}</style>
    </>
  );
}