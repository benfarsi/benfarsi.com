"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
const projects = [
  {
    category: "IoT · Systems",
    title: "Distributed Environmental Telemetry Platform",
    description:
      "End-to-end IoT telemetry system ingesting data from STM32-based devices over HTTPS, with indexed PostgreSQL time-series storage, Dockerized multi-service backend, Nginx + TLS, and Prometheus/Grafana monitoring.",
    link: null as string | null,
  },
  {
    category: "Security · Systems",
    title: "Secure IoT Authentication & Gateway",
    description:
      "Device authentication gateway with mutual TLS and signed provisioning. Hardened Linux server with SSH key-only auth, iptables isolation, and Fail2ban — with a formal threat model covering credential and DoS attack surfaces.",
    link: null as string | null,
  },
  {
    category: "Systems · Performance",
    title: "High-Performance Concurrent Ingestion Engine",
    description:
      "Concurrent ingestion service sustaining 20,000 req/s via worker pools and connection pooling. Achieved 35% average latency reduction through memory profiling, goroutine optimization, and backpressure handling.",
    link: null as string | null,
  },
  {
    category: "Robotics · Control Systems",
    title: "Autonomous Robotics Control Platform",
    description:
      "Closed-loop PID controller achieving sub-20ms real-time latency on embedded hardware, with multi-sensor fusion via Kalman filtering and benchmarked stability across disturbance conditions.",
    link: null as string | null,
  },
  {
    category: "AI · Web",
    title: "Stade.AI",
    description:
      "An adaptive study platform powered by AI that personalizes learning through spaced repetition and active recall. Built with Next.js and GPT-4o.",
    link: "https://stade-ai.com",
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
            <li><a className="nav__link nav__link--resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__text">
              <p className="hero__eyebrow">CS · University of Ottawa</p>
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
