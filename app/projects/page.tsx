"use client";

import { useState } from "react";
import { projects, CATEGORIES, CATEGORY_COLORS, type Project } from "../data";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState("all");

  const close = () => setActive(null);

  const filtered = filter === "all"
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <>
      <main>
        <section className="projects">
          <div className="projects__inner">
            <p className="section-label">selected work</p>
            <h2 className="section-title">projects</h2>

            <div className="filter-bar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn${filter === cat ? " filter-btn--active" : ""}`}
                  onClick={() => setFilter(cat)}
                  style={filter === cat && cat !== "all"
                    ? { borderColor: CATEGORY_COLORS[cat], color: CATEGORY_COLORS[cat] }
                    : undefined}
                >
                  {cat !== "all" && (
                    <span className="category-dot" style={{ background: CATEGORY_COLORS[cat] }} />
                  )}
                  {cat}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filtered.map(p => (
                <button
                  key={p.title}
                  className="project-card"
                  onClick={() => setActive(p)}
                  aria-label={`view details for ${p.title}`}
                  style={{ "--accent": CATEGORY_COLORS[p.category] } as React.CSSProperties}
                >
                  <div className="card__snippet">
                    <span className="card__snippet-line">
                      <span className="t-prompt">$</span> {p.cmd}
                    </span>
                    <span className="card__snippet-line">
                      <span className="t-ok">→</span> {p.out}
                    </span>
                  </div>
                  <p className="project-card__category">
                    <span className="category-dot" style={{ background: CATEGORY_COLORS[p.category] ?? "#6b7280" }} />
                    {p.category}
                  </p>
                  <h2 className="project-card__title">{p.title}</h2>
                  <p className="project-card__desc">{p.summary}</p>
                  <span className="project-card__cta">
                    view project <span className="cta-arrow">→</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {active && (
        <div className="modal-overlay" onClick={close} role="dialog" aria-modal="true">
          <div
            className="modal"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{ borderTopColor: CATEGORY_COLORS[active.category] ?? "var(--border)" }}
          >
            <div className="modal__header">
              <p className="modal__category">
                <span className="category-dot" style={{ background: CATEGORY_COLORS[active.category] ?? "#6b7280" }} />
                {active.category}
              </p>
              <button className="modal__close" onClick={close} aria-label="close">✕</button>
            </div>
            <h2 className="modal__title">{active.title}</h2>
            <div className="modal__tech">
              {active.tech.map(t => (
                <span key={t} className="modal__tag">{t}</span>
              ))}
            </div>
            <ul className="modal__highlights">
              {active.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            {(active.github || active.live) && (
              <div className="modal__actions">
                {active.github && (
                  <a className="modal__btn modal__btn--outline" href={active.github} target="_blank" rel="noopener noreferrer">
                    github →
                  </a>
                )}
                {active.live && (
                  <a className="modal__btn modal__btn--solid" href={active.live} target="_blank" rel="noopener noreferrer">
                    live site →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
