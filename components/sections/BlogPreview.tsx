"use client";
import { blogPreview } from "../styles/blogPreview.styles";

export default function BlogPreview() {
  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <span className="section-eyebrow">Blog</span>
        <h2 className="blog-heading">Writing</h2>

        <div className="blog-empty">
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
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
          <p>Posts coming soon.</p>
        </div>
      </div>

      <style jsx>{blogPreview}</style>
    </section>
  );
}