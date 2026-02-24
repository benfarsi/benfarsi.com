"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

const socials = [
  { label: "GitHub", href: "https://github.com/benfarsi" },
  { label: "LinkedIn", href: "https://linkedin.com/in/benfarsi" },
  { label: "Instagram", href: "https://instagram.com/benfarsii" },
  { label: "Email", href: "mailto:farsijaniben@gmail.com" },
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
          <span className="nav__logo">BF</span>
          <ul className="nav__links">
            <li><a className="nav__link" href="#projects">Projects</a></li>
            <li><a className="nav__link" href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__text">
              <p className="hero__eyebrow">CS & Math · University of Ottawa</p>
              <h1 className="hero__name">Benjamin<br />Farsijani</h1>
              <p className="hero__bio">
                i enjoy building software, hardware, and ai systems.
              </p>
              <div className="hero__socials">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    className="hero__social"
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="hero__photo-wrap">
              <Image
                src="/photo.jpg"
                alt="Benjamin Farsijani"
                width={260}
                height={260}
                className="hero__photo"
                priority
              />
            </div>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="projects__inner">
            <p className="section-label">Selected Work</p>
            <div className="projects-grid">
              {projects.map((p, i) => (
                <div key={p.title} className="project-card">
                  <span className="project-card__num">0{i + 1}</span>
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
                      Visit site <span className="cta-arrow">→</span>
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
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
