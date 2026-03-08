"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

interface Toast {
  id: number;
  msg: string;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; hue: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Embedded · IoT":            "#22c55e",
  "Security · Systems":        "#ef4444",
  "Systems · Performance":     "#3b82f6",
  "Robotics · Control Systems": "#f59e0b",
  "AI · Web":                  "#8b5cf6",
};

const projects: Project[] = [
  {
    category: "Embedded · IoT",
    title: "Embedded Environmental Monitoring Device",
    summary:
      "Wall-mounted, lithium battery-powered ESP32 device with BME680 (temp, humidity, AQI) and MAX9814 (noise) deployed in an early childcare home — streams live data to the Celsius mobile app with 3D printed interactive enclosure accessories.",
    tech: ["C/C++", "ESP32", "I2C", "BME680", "MAX9814", "WiFi", "Lithium Battery", "3D Printing"],
    highlights: [
      "Designed and deployed a wall-mounted, lithium battery-powered ESP32 device integrating a BME680 (temperature, humidity, AQI) and MAX9814 (ambient noise) over I2C — installed in an early childcare home to continuously monitor classroom environmental conditions.",
      "Streamed sensor data over WiFi with persistent logging to the Celsius mobile application, enabling caregivers to track real-time and historical environmental readings from any device.",
      "Built 3D printed enclosure accessories designed to engage young children — making the device interactive and approachable in an early childcare environment.",
    ],
    github: "https://github.com/benfarsi/environmental-reader",
  },
  {
    category: "Security · Systems",
    title: "Secure IoT Network Gateway & Authentication Service",
    summary:
      "mTLS device authentication gateway with a signed provisioning workflow and multi-stage certificate validation pipeline on Linux — reduced unauthorized connection attempts by 85% under adversarial simulation.",
    tech: ["Go", "Linux", "TLS/mTLS", "iptables", "SQLite", "Fail2ban", "SSH", "STRIDE", "OpenSSL"],
    highlights: [
      "Engineered mTLS device authentication gateway with signed provisioning workflow and multi-stage certificate validation pipeline on Linux; reduced unauthorized connection attempts by 85% under adversarial simulation.",
      "Hardened OS attack surface via iptables network isolation, SSH key-only access, and Fail2ban intrusion blocking; implemented structured audit logging across all auth events enabling full forensic replay of security incidents.",
      "Produced formal STRIDE threat model spanning 4 attack classes (credential leakage, DoS, replay, certificate compromise) — mapping protocol-level countermeasures to each threat vector with documented risk severity ratings.",
    ],
    github: "https://github.com/benfarsi/iot-auth-gateway-",
  },
  {
    category: "Systems · Performance",
    title: "High-Performance Concurrent Ingestion Engine",
    summary:
      "Concurrent ingestion service sustaining 20,000 req/s under synthetic load using worker pools and connection pooling, with p95 latency cut 35% via pprof profiling and backpressure handling.",
    tech: ["Go", "Rust", "PostgreSQL", "Linux", "Worker Pools", "Connection Pooling", "pprof", "Goroutines"],
    highlights: [
      "Built concurrent ingestion service sustaining 20,000 req/s under synthetic load using worker pools and connection pooling; benchmarked REST vs. message queue ingestion patterns under memory-constrained and high-throughput conditions.",
      "Reduced p95 latency by 35% through heap allocation optimization and goroutine scheduling refinements identified via pprof CPU/memory profiling — eliminating head-of-line blocking under burst traffic.",
      "Designed backpressure handling and graceful degradation under partial downstream failures, ensuring service stability and zero data loss during simulated outage scenarios.",
    ],
    github: "https://github.com/benfarsi/ingestion-engine",
  },
  {
    category: "Systems · Performance",
    title: "Layer-4 TCP Load Balancer",
    summary:
      "Epoll-based TCP proxy in Go sustaining 50,000 concurrent connections with round-robin and least-connections scheduling — raw Linux epoll event loop, zero per-event allocations, N worker goroutines sharing one epoll fd.",
    tech: ["Go", "Linux", "epoll", "TCP", "syscall", "Round-Robin", "Least-Connections", "Non-blocking I/O"],
    highlights: [
      "Built a Layer-4 TCP load balancer in Go using raw Linux epoll syscalls — single shared epoll fd multiplexed across N IO worker goroutines, sustaining 50,000 concurrent connections under synthetic load.",
      "Implemented two lock-free scheduling algorithms: atomic round-robin (single AddUint64 counter) and least-connections (per-backend atomic active-connection counter), selectable at runtime with zero mutex overhead.",
      "Achieved zero per-event heap allocations by giving each worker goroutine a dedicated scratch buffer — eliminating GC pressure at high connection counts and keeping p99 forwarding latency stable under load.",
      "Engineered a blocking accept loop feeding a non-blocking epoll event plane: listener fd blocks in Accept4 (no busy-wait), accepted fds are SOCK_NONBLOCK and backend fds are dup'd away from Go's internal netpoll to prevent scheduler interference.",
    ],
    github: "https://github.com/benfarsi/tcp-lb",
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
    github: "https://github.com/benfarsi/robotics-control-platform",
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
  { label: "GitHub",    href: "https://github.com/benfarsi" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/benfarsi" },
  { label: "Instagram", href: "https://instagram.com/benfarsii" },
  { label: "Email",     href: "mailto:farsijaniben@gmail.com" },
];

const BIO    = "I build software, hardware, and AI systems.";
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function Home() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState<Project | null>(null);
  const [typedText,  setTypedText]  = useState("");
  const [cursorOn,   setCursorOn]   = useState(true);
  const [photoSpin,  setPhotoSpin]  = useState(false);
  const [toasts,     setToasts]     = useState<Toast[]>([]);

  const logoClicksRef  = useRef(0);
  const konamiRef      = useRef<string[]>([]);
  const sudoRef        = useRef<string[]>([]);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const particlesRef   = useRef<Particle[]>([]);
  const rafRef         = useRef<number>(0);
  const toastIdRef     = useRef(0);
  const typingDoneRef  = useRef(false);

  // ── Toast helper ────────────────────────────────────────────
  const addToast = useCallback((msg: string) => {
    const id = ++toastIdRef.current;
    setToasts((t: Toast[]) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t: Toast[]) => t.filter((x: Toast) => x.id !== id)), 3200);
  }, []);

  // ── Console Easter egg ──────────────────────────────────────
  useEffect(() => {
    console.log(
      "%c██████╗ ███████╗\n██╔══██╗██╔════╝\n██████╔╝█████╗  \n██╔══██╗██╔══╝  \n██████╔╝██║     \n╚═════╝ ╚═╝",
      "color:#6b7280;font-family:monospace;line-height:1.4;font-size:11px;"
    );
    console.log(
      "%cBenjamin Farsijani — benfarsi.com\nFound the console 👾   Hire me → farsijaniben@gmail.com",
      "color:#0d0d0d;font-family:monospace;font-size:13px;"
    );
  }, []);

  // ── Typewriter ──────────────────────────────────────────────
  useEffect(() => {
    if (typingDoneRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setTypedText(BIO); typingDoneRef.current = true; return; }
    let i = 0;
    const id = setInterval(() => {
      if (i < BIO.length) { setTypedText(BIO.slice(0, ++i)); }
      else { clearInterval(id); typingDoneRef.current = true; }
    }, 55);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c: boolean) => !c), 530);
    return () => clearInterval(id);
  }, []);

  // ── Scroll ──────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Modal ───────────────────────────────────────────────────
  const close = useCallback(() => setActive(null), []);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active, close]);

  // ── Easter egg keyboard listeners ───────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Konami code
      konamiRef.current = [...konamiRef.current, e.key].slice(-10);
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        addToast("🎮 +1 life  //  konami unlocked");
        document.body.classList.add("konami-flash");
        setTimeout(() => document.body.classList.remove("konami-flash"), 900);
        konamiRef.current = [];
      }
      // "sudo" Easter egg
      if (e.key.length === 1) {
        sudoRef.current = [...sudoRef.current, e.key.toLowerCase()].slice(-4);
        if (sudoRef.current.join("") === "sudo") {
          addToast("🔒 permission denied");
          sudoRef.current = [];
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [addToast]);

  // ── Sparkle cursor ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const ctx = canvas.getContext("2d")!;
    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 4; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2.5 - 0.3,
          life: 1,
          maxLife: 35 + Math.random() * 25,
          size: 1.5 + Math.random() * 2.5,
          hue: Math.random() * 360,
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p: Particle) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.06;
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) return false;
        ctx.save();
        ctx.globalAlpha = p.life * 0.65;
        ctx.fillStyle = `hsl(${p.hue},75%,62%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Logo click Easter egg (7×) ──────────────────────────────
  const handleLogoClick = () => {
    logoClicksRef.current += 1;
    if (logoClicksRef.current === 7) {
      addToast("🌙 building in the dark since 2023");
      logoClicksRef.current = 0;
    }
  };

  // ── Photo double-click Easter egg ───────────────────────────
  const handlePhotoDoubleClick = () => {
    setPhotoSpin(true);
    addToast("👋 hey!");
    setTimeout(() => setPhotoSpin(false), 800);
  };

  return (
    <>
      <canvas ref={canvasRef} className="sparkle-canvas" aria-hidden="true" />

      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <span
            className="nav__logo"
            onClick={handleLogoClick}
            style={{ cursor: "default", userSelect: "none" }}
          >
            BF
          </span>
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
              <div className="hero__status">
                <span className="hero__status-dot" />
                Available for opportunities
              </div>
              <p className="hero__eyebrow">CS · University of Ottawa</p>
              <h1 className="hero__name">Benjamin<br />Farsijani</h1>
              <p className="hero__bio">
                {typedText}
                <span className="type-cursor" style={{ opacity: cursorOn ? 1 : 0 }} aria-hidden="true">|</span>
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
              <div className="hero__stats">
                <div className="hero__stat">
                  <span className="hero__stat-num">50K</span>
                  <span className="hero__stat-label">concurrent conns</span>
                </div>
                <div className="hero__stat">
                  <span className="hero__stat-num">20K</span>
                  <span className="hero__stat-label">req/s sustained</span>
                </div>
                <div className="hero__stat">
                  <span className="hero__stat-num">35%</span>
                  <span className="hero__stat-label">p95 latency cut</span>
                </div>
                <div className="hero__stat">
                  <span className="hero__stat-num">85%</span>
                  <span className="hero__stat-label">attacks blocked</span>
                </div>
              </div>
            </div>

            <div className="hero__right">
              <div className="hero__photo-wrap">
                <Image
                  src="/photo.jpg"
                  alt="Benjamin Farsijani"
                  width={240}
                  height={240}
                  className={`hero__photo${photoSpin ? " hero__photo--spin" : ""}`}
                  priority
                  onDoubleClick={handlePhotoDoubleClick}
                />
              </div>
              <div className="hero__terminal" aria-hidden="true">
                <div className="hero__terminal-bar">
                  <span className="t-dot t-dot--red" />
                  <span className="t-dot t-dot--yellow" />
                  <span className="t-dot t-dot--green" />
                  <span className="hero__terminal-title">~/projects</span>
                </div>
                <div className="hero__terminal-body">
                  <div><span className="t-prompt">$</span> gcc sensors.c -O2</div>
                  <div><span className="t-ok">→</span> loop: 94ms ✓</div>
                  <div><span className="t-prompt">$</span> ./gateway --mtls</div>
                  <div><span className="t-ok">→</span> blocked: 85% ✓</div>
                  <div><span className="t-prompt">$</span> ./tcp-lb -algo leastconn</div>
                  <div><span className="t-ok">→</span> 50k conns ✓</div>
                  <div><span className="t-prompt">$</span><span className="t-blink">_</span></div>
                </div>
              </div>
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
                  <p className="project-card__category">
                    <span
                      className="category-dot"
                      style={{ background: CATEGORY_COLORS[p.category] ?? "#6b7280" }}
                    />
                    {p.category}
                  </p>
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
          <div className="modal" onClick={(e: { stopPropagation(): void }) => e.stopPropagation()}>
            <div className="modal__header">
              <p className="modal__category">
                <span
                  className="category-dot"
                  style={{ background: CATEGORY_COLORS[active.category] ?? "#6b7280" }}
                />
                {active.category}
              </p>
              <button className="modal__close" onClick={close} aria-label="Close">✕</button>
            </div>
            <h2 className="modal__title">{active.title}</h2>
            <div className="modal__tech">
              {active.tech.map((t: string) => (
                <span key={t} className="modal__tag">{t}</span>
              ))}
            </div>
            <ul className="modal__highlights">
              {active.highlights.map((h: string, i: number) => (
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

      <div className="toast-container" aria-live="polite">
        {toasts.map((t: Toast) => (
          <div key={t.id} className="toast">{t.msg}</div>
        ))}
      </div>
    </>
  );
}
