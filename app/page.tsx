"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TYPED_PHRASES = [
  "real-time ML infrastructure",
  "agentic RAG pipelines",
  "embedded IoT systems",
  "threat network analytics",
  "low-latency Go services",
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const closeMenu = () => setMenuOpen(false);

  // section highlighting
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  // scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // cursor spotlight
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--spot-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--spot-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // scroll-reveal
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // mouse-tracked glow on cards
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest(".pcard, .pmini, .sgroup") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const isActive = (id: string) => activeSection === id ? "active" : "";

  return (
    <>
      <div className="cursor-spotlight" aria-hidden="true" />

      <nav className="nav">
        <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} />
        <div className="nav__inner">
          <Link href="/" className="nav__logo">BF<span>.</span></Link>
          <ul className="nav__links">
            <li><a href="#projects"   className={isActive("projects")}>Projects</a></li>
            <li><a href="#skills"     className={isActive("skills")}>Stack</a></li>
            <li><a href="#experience" className={isActive("experience")}>Experience</a></li>
            <li><a href="#contact"    className={isActive("contact")}>Contact</a></li>
          </ul>
          <a href="/resume.pdf" className="nav__resume" target="_blank" rel="noopener noreferrer">Resume</a>
          <button
            className={`nav__hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav__mobile${menuOpen ? " open" : ""}`}>
        <a href="#projects"   onClick={closeMenu}>Projects</a>
        <a href="#skills"     onClick={closeMenu}>Stack</a>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#contact"    onClick={closeMenu}>Contact</a>
        <a href="/resume.pdf" onClick={closeMenu} target="_blank" rel="noopener noreferrer">Resume</a>
      </div>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />
        <div className="hero__inner">
          <div className="hero__left">
            <div className="hero__eyebrow">Computer Science · University of Ottawa · 3.7 GPA</div>
            <h1 className="hero__name">Benjamin<br /><strong>Farsijani</strong></h1>
            <p className="hero__tagline">
              Building systems across{" "}
              <Typewriter phrases={TYPED_PHRASES} />
            </p>
            <div className="hero__ctas">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="/resume.pdf" className="btn-ghost" target="_blank" rel="noopener noreferrer">Resume</a>
              <a href="#contact" className="btn-ghost">Contact</a>
            </div>
          </div>

          <div className="hero__photo-wrap">
            <Image
              src="/photo.jpg"
              alt="Benjamin Farsijani"
              width={320}
              height={400}
              className="hero__photo"
              priority
            />
          </div>
        </div>
        <div className="scroll-indicator">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="sec-header" data-reveal>
          <span className="sec-index">01</span>
          <span className="sec-label">Projects</span>
          <div className="sec-rule" />
        </div>

        <div className="proj-main">

          <div className="pcard" data-reveal>
            <div className="pcard__top">
              <span className="pcard__name">Sage</span>
            </div>
            <p className="pcard__desc">
              Production-grade <em>agentic RAG system</em> that ingests large-scale networking documentation
              and answers natural-language queries over complex technical content.
            </p>
            <ul className="pcard__bullets">
              <li>Hybrid retrieval combining dense semantic search (pgvector + text-embedding-3-large) with BM25 sparse retrieval, merged via reciprocal rank fusion; sub-100ms p95 latency over 100k+ embedded chunks</li>
              <li>Multi-step agentic loop with tool use that dynamically re-queries and synthesizes across document chunks before generating a final grounded answer</li>
              <li>Fully containerized ingestion and query pipelines in Docker</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">Python</span>
              <span className="ptag">LangChain</span>
              <span className="ptag">pgvector</span>
              <span className="ptag">Claude API</span>
              <span className="ptag">PostgreSQL</span>
              <span className="ptag">Docker</span>
            </div>
            <a href="https://github.com/benfarsi/sage" className="pcard__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>

          <div className="pcard" data-reveal>
            <div className="pcard__top">
              <span className="pcard__name">MedOffice AI</span>
              <span className="pcard__badge badge-gold">Hackers &amp; Healers 2026</span>
            </div>
            <p className="pcard__desc">
              Local-first <em>clinical AI assistant</em> for Ontario primary care — agentic RAG pipeline keeping all patient data on-device.
            </p>
            <ul className="pcard__bullets">
              <li>Medical billing-code agent reaching 92% accuracy across 35 labeled test cases; 85% latency reduction (4.8s → 0.7s) via hybrid retrieval combining dense embeddings with BM25 sparse search and reciprocal rank fusion</li>
              <li>AI form filler using local OCR (PyMuPDF + Tesseract) to extract any medical form structure and fill all fields from FHIR-like patient records via DeepSeek-R1; renders approved output to a downloadable PDF</li>
              <li>Smart scheduler ranking appointments by a 12-domain clinical risk scorer (diabetes, cardiac, renal, mental health, and more); full FastAPI backend with auth, patient records, and dashboard stats</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">Python</span>
              <span className="ptag">FastAPI</span>
              <span className="ptag">Ollama</span>
              <span className="ptag">DeepSeek-R1</span>
              <span className="ptag">RAG</span>
              <span className="ptag">SQLite</span>
            </div>
            <a href="https://github.com/benfarsi/medofficeai" className="pcard__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>

          <div className="pcard" data-reveal>
            <div className="pcard__top">
              <span className="pcard__name">Celsius</span>
              <span className="pcard__badge badge-gold">1st Place · $500 Prize</span>
            </div>
            <p className="pcard__desc">
              Deployed <em>IoT environmental monitoring system</em> for early childcare at the University of Ottawa.
            </p>
            <ul className="pcard__bullets">
              <li>Wall-mounted ESP32 integrating BME680 (temp, humidity, VOC) and MAX9814 (sound) over I2C; lithium-battery-powered with persistent WiFi streaming</li>
              <li>React Native mobile app for caregivers to monitor real-time and historical classroom readings from any device</li>
              <li>ML anomaly-detection layer flagging air-quality dips, noise spikes, and temperature excursions with real-time alerts</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">C / C++</span>
              <span className="ptag">ESP32</span>
              <span className="ptag">React Native</span>
              <span className="ptag">BME680</span>
              <span className="ptag">I2C</span>
              <span className="ptag">ML</span>
            </div>
            <a href="https://github.com/benfarsi/environmental-sensor" className="pcard__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>

          <div className="pcard" data-reveal>
            <div className="pcard__top">
              <span className="pcard__name">Benny</span>
            </div>
            <p className="pcard__desc">
              End-to-end <em>algorithmic crypto trading system</em> ingesting live market data across 6 assets,
              validated via 5-fold walk-forward cross-validation against a buy-and-hold baseline.
            </p>
            <ul className="pcard__bullets">
              <li>50+ engineered features: GARCH(1,1) volatility, Parkinson range estimator, VWAP deviation, OBV, ADX, Stochastic RSI, and multi-timeframe log returns with strict zero-lookahead construction</li>
              <li>Probability-gated risk layer: long if p &gt; 0.65, exit if p &lt; 0.35; 3% take-profit / 1.5% stop-loss; 0.1% fee modeling; per-symbol sizing across a $6,000 paper portfolio</li>
              <li>Live containerized dashboard (Flask, Chart.js, Docker, PostgreSQL) tracking equity curve, per-symbol P&amp;L, and trade history against live Binance feeds</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">Python</span>
              <span className="ptag">XGBoost</span>
              <span className="ptag">PostgreSQL</span>
              <span className="ptag">Docker</span>
              <span className="ptag">Flask</span>
              <span className="ptag">CCXT</span>
            </div>
            <span className="pcard__link pcard__link--private">Private</span>
          </div>

          <div className="pcard" data-reveal>
            <div className="pcard__top">
              <span className="pcard__name">Thermal MPC</span>
              <span className="pcard__badge badge-gray">Research</span>
            </div>
            <p className="pcard__desc">
              Stochastic simulation and <em>Model Predictive Control</em> for steam-assisted heavy oil recovery,
              targeting a 5-10% reduction in steam-to-oil ratio vs. heuristic baselines.
            </p>
            <ul className="pcard__bullets">
              <li>Stochastic environment modeling delayed nonlinear dynamics: steam injection to reservoir temperature to production output; 100k+ synthetic multivariate time-series observations</li>
              <li>Constrained MPC with a learned PyTorch state-space model solved in CasADi, optimizing steam injection policies under physical constraints</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">Python</span>
              <span className="ptag">PyTorch</span>
              <span className="ptag">CasADi</span>
              <span className="ptag">MPC</span>
              <span className="ptag">NumPy</span>
              <span className="ptag">Stochastic Control</span>
            </div>
            <a href="https://github.com/benfarsi" className="pcard__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>

          <div className="pcard" data-reveal>
            <div className="pcard__top">
              <span className="pcard__name">Azadi</span>
              <span className="pcard__badge badge-blue">Intel Platform</span>
            </div>
            <p className="pcard__desc">
              Palantir Gotham-style <em>threat network intelligence dashboard</em> analyzing actor dynamics
              during the Iranian Revolution (1979-1981) via GDELT event data.
            </p>
            <ul className="pcard__bullets">
              <li>Ingested GDELT 1.0 bulk data into a directed weighted NetworkX graph; nodes typed by CAMEO actor codes across Government, Military, Religious, and Opposition factions</li>
              <li>Louvain community detection (20 communities, modularity 0.10); PageRank + HITS composite influence scoring</li>
              <li>Daily z-score anomaly detection surfacing 15 event spikes including the Nov. 4, 1979 US Embassy hostage crisis; interactive Dash + Cytoscape dashboard</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">Python</span>
              <span className="ptag">NetworkX</span>
              <span className="ptag">GDELT</span>
              <span className="ptag">Dash</span>
              <span className="ptag">SQLite</span>
              <span className="ptag">Graph Analytics</span>
            </div>
            <span className="pcard__link pcard__link--private">Private</span>
          </div>

          <div className="pcard" data-reveal>
            <div className="pcard__top">
              <span className="pcard__name">Cisco Networking Homelab</span>
              <span className="pcard__badge badge-gray">Infrastructure</span>
            </div>
            <p className="pcard__desc">
              Physical <em>enterprise networking lab</em> built from Cisco hardware — OSPF, BGP, IPsec VPN, and QoS under real traffic conditions.
            </p>
            <ul className="pcard__bullets">
              <li>5-device lab: ASA 5520 firewall, two 2911 ISRs, and an L3 switch; configured OSPF multi-area, eBGP peering, GRE tunnels, IPsec site-to-site VPN, and QoS policies end-to-end</li>
              <li>Proxmox hypervisor running VMs bridged into the physical network; site-to-site VPN tunneled to a cloud VPS for realistic WAN simulation</li>
              <li>Automated device polling via Netmiko/SSH script replacing 15+ manual CLI commands; 22 pytest assertions validating interface state, routing tables, and VPN tunnel status</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">Cisco ASA</span>
              <span className="ptag">OSPF / BGP</span>
              <span className="ptag">IPsec VPN</span>
              <span className="ptag">Proxmox</span>
              <span className="ptag">Netmiko</span>
              <span className="ptag">Python</span>
            </div>
            <a href="https://github.com/benfarsi/homelab" className="pcard__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>

        </div>

        {/* mini projects */}
        <div className="proj-mini">
          <div className="pmini" data-reveal>
            <div className="pmini__name">Neural Network from Scratch</div>
            <p className="pmini__desc">Feedforward neural network built from scratch using only NumPy. No ML frameworks.</p>
            <div className="pcard__tags" style={{ marginBottom: "14px" }}>
              <span className="ptag">Python</span><span className="ptag">NumPy</span><span className="ptag">Backprop</span>
            </div>
            <a href="https://github.com/benfarsi/neural-network-from-scratch" className="pmini__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="pmini" data-reveal>
            <div className="pmini__name">Transformer from Scratch</div>
            <p className="pmini__desc">Full transformer architecture in pure Python. Attention, positional encoding, multi-head, no frameworks.</p>
            <div className="pcard__tags" style={{ marginBottom: "14px" }}>
              <span className="ptag">Python</span><span className="ptag">Attention</span><span className="ptag">NLP</span>
            </div>
            <a href="https://github.com/benfarsi/transformer-from-scratch" className="pmini__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="pmini" data-reveal>
            <div className="pmini__name">TCP Load Balancer</div>
            <p className="pmini__desc">Layer-4 TCP proxy in Go using raw Linux epoll. Sustains 50k concurrent connections with round-robin and least-connections scheduling.</p>
            <div className="pcard__tags" style={{ marginBottom: "14px" }}>
              <span className="ptag">Go</span><span className="ptag">Linux</span><span className="ptag">epoll</span><span className="ptag">TCP</span>
            </div>
            <a href="https://github.com/benfarsi" className="pmini__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="pmini" data-reveal>
            <div className="pmini__name">Ingestion Engine</div>
            <p className="pmini__desc">Concurrent ingestion service sustaining 20k req/s. Worker pools, connection pooling, p95 latency cut 35% via pprof profiling.</p>
            <div className="pcard__tags" style={{ marginBottom: "14px" }}>
              <span className="ptag">Go</span><span className="ptag">PostgreSQL</span><span className="ptag">pprof</span>
            </div>
            <a href="https://github.com/benfarsi/ingestion-engine" className="pmini__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="skills" className="section">
        <div className="sec-header" data-reveal>
          <span className="sec-index">02</span>
          <span className="sec-label">Technical Stack</span>
          <div className="sec-rule" />
        </div>
        <div className="skills-grid">
          <div className="sgroup" data-reveal>
            <div className="sgroup__label">Languages</div>
            <Skill name="Python"           dots={5} />
            <Skill name="C / C++"          dots={4} />
            <Skill name="TypeScript / JS"  dots={4} />
            <Skill name="Go"               dots={3} />
            <Skill name="Rust"             dots={2} />
            <Skill name="SQL / Bash"       dots={4} />
          </div>
          <div className="sgroup" data-reveal>
            <div className="sgroup__label">ML &amp; Modeling</div>
            <Skill name="PyTorch"                     dots={4} />
            <Skill name="XGBoost / scikit-learn"      dots={5} />
            <Skill name="Time-series / Anomaly Det."  dots={4} />
            <Skill name="Model Predictive Control"    dots={3} />
            <Skill name="Monte Carlo Methods"         dots={3} />
          </div>
          <div className="sgroup" data-reveal>
            <div className="sgroup__label">Embedded &amp; Hardware</div>
            <Skill name="ESP32 Firmware"          dots={4} />
            <Skill name="I2C / SPI / UART"        dots={4} />
            <Skill name="Sensor Integration"      dots={4} />
            <Skill name="Hardware Bring-up"       dots={3} />
            <Skill name="3D Printing / Design"    dots={3} />
          </div>
          <div className="sgroup" data-reveal>
            <div className="sgroup__label">Infrastructure &amp; Systems</div>
            <Skill name="Docker"                        dots={4} />
            <Skill name="PostgreSQL / SQLite"           dots={4} />
            <Skill name="Linux / POSIX"                 dots={5} />
            <Skill name="Multithreading / Low-lat I/O"  dots={4} />
            <Skill name="Flask / React Native"          dots={4} />
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="sec-header" data-reveal>
          <span className="sec-index">03</span>
          <span className="sec-label">Experience &amp; Education</span>
          <div className="sec-rule" />
        </div>

        <div className="exp-list">

          <ExpCard
            role="Field Technician"
            org="TPH Plumbing &amp; Heating"
            date="Aug 2025 · Feb 2026"
            loc="Ottawa, ON"
            desc="Worked on large commercial job sites (crews of 10+, buildings up to 14 stories) alongside licensed plumbers and gas technicians: cut, threaded, soldered, and fit pipe, coordinating daily with electricians, HVAC, and general contractors to keep multi-trade work on schedule."
          />

          <ExpCard
            role="Competitive Soccer Coach"
            org="Ottawa South United"
            date="Mar 2019 · July 2025"
            loc="Ottawa, ON"
            desc="Coached 500+ youth athletes across competitive recreational programs. Designed training sessions, managed player development pipelines, and coordinated directly with parents and club staff across five seasons."
          />

          <ExpCard
            role="Founder, Benny Blends"
            org="Independent · Mobile Barbershop"
            date="2018 · Present"
            loc="Ottawa, ON"
            desc="Built and operated a barbershop out of a home studio while in school full-time. Cut thousands of clients, generated $25,000+ cumulative revenue, and managed all scheduling, client relations, and marketing independently."
          />

        </div>

        <div className="edu-card" data-reveal>
          <div>
            <div className="edu__school">University of Ottawa</div>
            <div className="edu__degree">Honours B.Sc., Computer Science · Dean&apos;s Honour List</div>
          </div>
          <div>
            <div className="edu__gpa">GPA 3.7 / 4.0</div>
            <div className="edu__date">Sep 2023 · May 2028</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="sec-header" data-reveal>
          <span className="sec-index">04</span>
          <span className="sec-label">Contact</span>
          <div className="sec-rule" />
        </div>
        <div data-reveal>
          <h2 className="contact__heading">Let&apos;s connect.</h2>
          <p className="contact__sub">Open to internships, research collaborations, and interesting problems.</p>
          <div className="contact__links">
            <a href="mailto:farsijaniben@gmail.com"    className="btn-primary">Email</a>
            <a href="https://linkedin.com/in/benfarsi" className="btn-ghost" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/benfarsi"      className="btn-ghost" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="/resume.pdf"                      className="btn-ghost" target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__id">BF. · BENFARSI.COM</div>
        <div className="site-footer__copy">© 2026 Benjamin Farsijani</div>
      </footer>
    </>
  );
}

function Typewriter({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[idx % phrases.length];
    let delay = deleting ? 30 : 55;
    if (!deleting && text === phrase) delay = 2200;      // pause at full phrase
    else if (deleting && text === "") delay = 350;       // pause before next

    const t = setTimeout(() => {
      if (!deleting && text === phrase) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIdx(i => i + 1);
      } else {
        setText(phrase.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, idx, phrases]);

  return (
    <span className="typewriter">
      <em>{text}</em>
      <span className="typewriter__caret" aria-hidden="true" />
    </span>
  );
}

function Skill({ name, dots }: { name: string; dots: number }) {
  return (
    <div className="srow">
      <span className="sname">{name}</span>
      <div className="sdots">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`sdot${i <= dots ? " sdot--on" : ""}`} />
        ))}
      </div>
    </div>
  );
}

function ExpCard({ role, org, date, loc, desc }: {
  role: string; org: string; date: string; loc: string; desc: string;
}) {
  return (
    <div className="exp-card" data-reveal>
      <div>
        <div className="exp__role" dangerouslySetInnerHTML={{ __html: role }} />
        <div className="exp__org">{org}</div>
        <p className="exp__desc">{desc}</p>
      </div>
      <div className="exp__meta">
        <div className="exp__date">{date}</div>
        <div className="exp__loc">{loc}</div>
      </div>
    </div>
  );
}
