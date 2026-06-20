"use client";

import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import { contactStyles } from "../styles/contact.styles";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:anannyapreeta2022@gmail.com",
    ariaLabel: "Send me an email",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/anannyapreeta",
    ariaLabel: "Visit my LinkedIn profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/pretzel2001",
    ariaLabel: "Visit my GitHub profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.15 });

  return (
    <section
      id="contact"
      ref={ref}
      className={`contact-section ${isInView ? "in-view" : ""}`}
    >
      <div className="contact-container">
        <span className="section-eyebrow">Contact</span>
        <h2 className="contact-heading">Let's talk</h2>
        <p className="contact-subtext">
          Whether it is a project, an opportunity, or just a hello — my inbox is
          open.
        </p>

        <ul className="contact-links" role="list">
          {contactLinks.map((link) => (
            <li key={link.label} className="contact-link-item">
              <a
                href={link.href}
                aria-label={link.ariaLabel}
                className="contact-link"
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx global>{contactStyles}</style>
    </section>
  );
}