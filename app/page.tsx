"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface Project {
  category: string;
  title: string;
  summary: string;
  tech: string[];
  highlights: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    category: "IoT · Systems",
    title: "Distributed Environmental Telemetry Platform",
    summary:
      "End-to-end IoT telemetry system ingesting sensor data from STM32-based devices over HTTPS, with indexed PostgreSQL time-series storage, Dockerized multi-service backend, and Prometheus/Grafana monitoring.",
    tech: ["STM32", "C", "Go", "PostgreSQL", "Docker", "Nginx", "TLS", "Prometheus", "Grafana"],
    highlights: [
      "Designed a full-stack IoT pipeline from firmware to cloud dashboard — STM32 devices collect environmental data and transmit over HTTPS to a Go ingestion service.",
      "Structured a PostgreSQL time-series schema with composite indexes to support high-frequency writes and efficient range queries across sensor streams.",
      "Containerized all backend services with Docker Compose: ingestion API, database, Nginx reverse proxy, and Prometheus + Grafana monitoring stack.",
      "Configured TLS termination at Nginx with automated cert management, keeping device communication encrypted end-to-end.",
      "Built Grafana dashboards for real-time sensor visualization with alerting thresholds for anomaly detection.",
    ],
    github: "https://github.com/benfarsi/environmental-reader",
  },
  {
    category: "Security · Systems",
    title: "Secure IoT Authentication & Gateway",
    summary:
      "Device authentication gateway with mutual TLS and a signed provisioning workflow. Hardened Linux host with SSH key-only auth, iptables firewall isolation, and Fail2ban — backed by a formal threat model.",
    tech: ["Go", "Python", "mTLS", "TLS 1.3", "JWT (ES256)", "iptables", "Fail2ban", "systemd", "SQLite", "OpenSSL"],
    highlights: [
      "Built a Go gateway that enforces TLS 1.3 + mutual TLS on every connection — devices must present a CA-signed certificate before any request is processed.",
      "Designed a Python provisioning pipeline: CA bootstrap (RSA-4096), per-device EC P-256 certificate issuance, and a SQLite device registry with revocation support.",
      "Issued short-lived JWTs (ES256, 1-hour TTL) after mTLS authentication — all subsequent API calls require both the client cert and a valid Bearer token.",
      "Reduced unauthorized connection attempts by 85% in simulated threat testing through per-IP rate limiting, Fail2ban banning on repeated auth failures, and iptables INPUT DROP defaults.",
      "Hardened the host with SSH key-only auth, sysctl network stack hardening (SYN cookies, martian logging, ASLR), and systemd sandboxing (NoNewPrivileges, MemoryDenyWriteExecute).",
      "Produced a formal STRIDE threat model covering credential leakage, denial-of-service, and certificate compromise attack surfaces.",
    ],
    github: "https://github.com/benfarsi/iot-auth-gateway-",
  },
  {
    category: "Systems · Performance",
    title: "High-Performance Concurrent Ingestion Engine",
    summary:
      "Concurrent ingestion service sustaining 20,000 req/s via worker pools and connection pooling, with a 35% average latency reduction through memory profiling and backpressure handling.",
    tech: ["Go", "PostgreSQL", "Worker Pools", "Connection Pooling", "pprof", "Goroutines", "Channels"],
    highlights: [
      "Architected a worker-pool ingestion engine in Go — a fixed pool of goroutines drains a buffered channel, preventing goroutine explosion under burst load.",
      "Achieved 20,000 sustained requests per second with p99 latency under 8ms on commodity hardware by tuning pool sizes against CPU and I/O saturation points.",
      "Reduced average latency by 35% through memory profiling with pprof: eliminated high-allocation hot paths, introduced object pooling for request structs, and reduced GC pressure.",
      "Implemented backpressure handling — when the channel fills, the server returns 503 rather than queuing unboundedly, preventing cascading memory exhaustion.",
      "Benchmarked connection pool configurations against PostgreSQL under realistic write patterns to find optimal pool sizing relative to database max_connections.",
    ],
  },
  {
    category: "Robotics · Control Systems",
    title: "Autonomous Robotics Control Platform",
    summary:
      "Closed-loop PID controller with sub-20ms real-time latency on embedded hardware, multi-sensor fusion via Kalman filtering, and benchmarked stability across disturbance conditions.",
    tech: ["C++", "PID Control", "Kalman Filter", "Embedded Linux", "I2C", "SPI", "RTOS"],
    highlights: [
      "Implemented a discrete PID controller in C++ running on embedded Linux — tuned gains via Ziegler-Nichols method and validated stability margins across operating conditions.",
      "Achieved sub-20ms control loop latency through real-time scheduling (SCHED_FIFO), DMA-driven sensor reads, and elimination of dynamic allocation in the control path.",
      "Fused IMU, encoder, and proximity sensor data using a Kalman filter — reduced state estimation noise by 60% compared to raw sensor averaging.",
      "Benchmarked controller stability under external disturbances (step inputs, impulse loads) and tuned derivative filtering to suppress high-frequency noise amplification.",
      "Designed a hardware abstraction layer over I2C and SPI peripherals to decouple control logic from sensor drivers, enabling unit testing of the control loop in simulation.",
    ],
  },
  {
    category: "AI · Web",
    title: "Stade.AI",
    summary:
      "An adaptive study platform powered by AI that personalizes learning through spaced repetition and active recall. Built with Next.js and GPT-4o.",
    tech: ["Next.js", "TypeScript", "GPT-4o", "Spaced Repetition", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      "Built an AI-driven study platform that generates personalized flashcards and quiz questions from any uploaded content using GPT-4o.",
      "Implemented a spaced repetition scheduling algorithm (SM-2) that adapts review intervals based on individual recall performance — maximizing long-term retention.",
      "Designed an active recall engine that presents questions in varying formats (multiple choice, free response, fill-in-the-blank) to prevent pattern memorization.",
      "Built with Next.js App Router, server actions for low-latency AI calls, and PostgreSQL for persisting user progress and card decks.",
    ],
    github: "https://github.com/benfarsi/stade.ai",
    live: "https://stade-ai.com",
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
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  return (
    <>
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <span className="nav__logo">BF</span>
          <ul className="nav__links">
            <li><a className="nav__link" href="#projects">Projects</a></li>
            <li><a className="nav__link" href="#contact">Contact</a></li>
            <li>
              <a className="nav__link nav__link--resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__text">
              <p className="hero__eyebrow">CS · University of Ottawa</p>
              <h1 className="hero__name">Benjamin<br />Farsijani</h1>
              <p className="hero__bio">I build software, hardware, and AI systems.</p>
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
                width={240}
                height={240}
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
              {projects.map((p) => (
                <button
                  key={p.title}
                  className="project-card"
                  onClick={() => setActive(p)}
                  aria-label={`View details for ${p.title}`}
                >
                  <p className="project-card__category">{p.category}</p>
                  <h2 className="project-card__title">{p.title}</h2>
                  <p className="project-card__desc">{p.summary}</p>
                  <span className="project-card__cta">
                    View project <span className="cta-arrow">→</span>
                  </span>
                </button>
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

      {active && (
        <div className="modal-overlay" onClick={close} role="dialog" aria-modal="true">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <p className="modal__category">{active.category}</p>
              <button className="modal__close" onClick={close} aria-label="Close">✕</button>
            </div>
            <h2 className="modal__title">{active.title}</h2>
            <div className="modal__tech">
              {active.tech.map((t) => (
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
                    GitHub →
                  </a>
                )}
                {active.live && (
                  <a className="modal__btn modal__btn--solid" href={active.live} target="_blank" rel="noopener noreferrer">
                    Live site →
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
