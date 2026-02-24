"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    category: "IoT · Hardware",
    title: "Environmental Monitoring System",
    description:
      "A distributed sensor network for real-time tracking of air quality, temperature, humidity, and atmospheric conditions, with a live web dashboard.",
    link: null as string | null,
  },
  {
    category: "AI · Web",
    title: "Stade.AI",
    description:
      "An adaptive study platform powered by AI that personalizes learning through spaced repetition and active recall. Built with Next.js and GPT-4o.",
    link: "https://stade-ai.com",
  },
  {
    category: "Robotics · Hardware",
    title: "Autonomous Smart Dog Bowl",
    description:
      "A self-regulating pet care system using sensors to monitor water and food levels, automate refills, and log consumption over time.",
    link: null as string | null,
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <span className="nav__logo">Benjamin Farsijani</span>
          <ul className="nav__links">
            <li>
              <a className="nav__link" href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a className="nav__link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero__inner">
            <h1 className="hero__name">
              Benjamin
              <br />
              Farsijani
            </h1>
            <p className="hero__meta">CS & Math · University of Ottawa</p>
            <p className="hero__tagline">
              Building software, hardware, and AI systems.
            </p>
            <div className="hero__socials">
              <a
                className="hero__social"
                href="https://github.com/benfarsi"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="hero__social"
                href="https://linkedin.com/in/benfarsi"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="hero__social"
                href="https://instagram.com/benfarsii"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                className="hero__social"
                href="mailto:farsijaniben@gmail.com"
              >
                Email
              </a>
            </div>
          </div>
        </section>

        <section className="about">
          <div className="about__inner">
            <p className="about__text">
              I&apos;m a Computer Science and Mathematics student at the
              University of Ottawa, interested in the intersection of hardware,
              software, and AI. I build things that solve real problems — from
              embedded systems to web platforms.
            </p>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="projects__inner">
            <p className="section-label">Projects</p>
            <div className="projects-grid">
              {projects.map((p) => (
                <div key={p.title} className="project-card">
                  <p className="project-card__category">{p.category}</p>
                  <h2 className="project-card__title">{p.title}</h2>
                  <p className="project-card__desc">{p.description}</p>
                  {p.link && (
                    <a
                      className="project-card__cta"
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer__inner">
          <span className="footer__copy">© 2026 Benjamin Farsijani</span>
          <div className="footer__links">
            <a
              href="https://github.com/benfarsi"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/benfarsi"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/benfarsii"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="mailto:farsijaniben@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
