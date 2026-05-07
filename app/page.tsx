"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.35 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const isActive = (id: string) => activeSection === id ? "active" : "";

  return (
    <>
      <nav className="nav">
        <div className="nav__inner">
          <Link href="/" className="nav__logo">BF<span>.</span></Link>
          <ul className="nav__links">
            <li><a href="#projects"   className={isActive("projects")}>Projects</a></li>
            <li><a href="#skills"     className={isActive("skills")}>Stack</a></li>
            <li><a href="#experience" className={isActive("experience")}>Experience</a></li>
            <li><a href="#contact"    className={isActive("contact")}>Contact</a></li>
          </ul>
          <a href="/resume.pdf" className="nav__resume" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="hero__inner">
          <div className="hero__left">
            <div className="hero__eyebrow">Computer Science · University of Ottawa · 3.7 GPA</div>
            <h1 className="hero__name">
              Ben<br /><strong>Farsijani</strong>
            </h1>
            <p className="hero__tagline">
              Building systems across <em>real-time ML infrastructure</em>,{" "}
              <em>embedded IoT</em>, and <em>threat network analytics</em>.
            </p>
            <div className="hero__ctas">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="/resume.pdf" className="btn-ghost" target="_blank" rel="noopener noreferrer">Resume</a>
              <a href="#contact" className="btn-ghost">Contact</a>
            </div>
          </div>

          <DancingKirby />
        </div>
        <div className="scroll-indicator">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section id="projects" className="section">
        <div className="sec-header">
          <span className="sec-index">01</span>
          <span className="sec-label">Projects</span>
          <div className="sec-rule" />
        </div>

        <div className="proj-main">

          <div className="pcard">
            <div className="pcard__top">
              <span className="pcard__name">Celsius</span>
              <span className="pcard__badge badge-gold">1st Place · Design Day</span>
            </div>
            <p className="pcard__desc">
              Deployed <em>IoT environmental monitoring system</em> for early childcare at the University of Ottawa,
              running continuously in a live classroom for several months.
            </p>
            <ul className="pcard__bullets">
              <li>Wall-mounted ESP32 integrating BME680 (temp, humidity, VOC) and MAX9814 (sound) over I2C; lithium-battery-powered with persistent WiFi streaming</li>
              <li>React Native mobile app for caregivers to monitor real-time and historical classroom readings from any device</li>
              <li>ML anomaly-detection layer flagging air-quality dips, noise spikes, and temperature excursions with real-time alerts</li>
              <li>3D-printed enclosure designed to engage young children in an early-childcare environment</li>
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

          <div className="pcard">
            <div className="pcard__top">
              <span className="pcard__name">Benny</span>
              <span className="pcard__badge badge-blue">Production</span>
            </div>
            <p className="pcard__desc">
              End-to-end <em>algorithmic crypto trading system</em> ingesting live market data across 6 assets,
              validated via 5-fold walk-forward cross-validation against a buy-and-hold baseline.
            </p>
            <ul className="pcard__bullets">
              <li>50+ engineered features: GARCH(1,1) conditional volatility, Parkinson range estimator, VWAP deviation, OBV, ADX, Stochastic RSI, and multi-timeframe log returns with strict zero-lookahead construction</li>
              <li>Probability-gated risk layer: long if p &gt; 0.65, exit if p &lt; 0.35; 3% take-profit / 1.5% stop-loss; 0.1% fee modeling; per-symbol sizing across a $6,000 paper portfolio</li>
              <li>Live containerized dashboard (Flask, Chart.js, Docker, PostgreSQL) tracking equity curve, per-symbol P&amp;L, and trade history; runs continuously against live Binance feeds</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">Python</span>
              <span className="ptag">XGBoost</span>
              <span className="ptag">PostgreSQL</span>
              <span className="ptag">Docker</span>
              <span className="ptag">Flask</span>
              <span className="ptag">CCXT</span>
            </div>
            <span className="pcard__link pcard__link--private">Private Repository</span>
          </div>

          <div className="pcard">
            <div className="pcard__top">
              <span className="pcard__name">Thermal MPC</span>
              <span className="pcard__badge badge-gray">Research</span>
            </div>
            <p className="pcard__desc">
              Stochastic simulation and <em>Model Predictive Control</em> for steam-assisted heavy oil recovery,
              targeting a 5-10% reduction in steam-to-oil ratio vs. heuristic baselines.
            </p>
            <ul className="pcard__bullets">
              <li>Stochastic simulation modeling delayed nonlinear dynamics: steam injection to reservoir temperature to production output; 100k+ synthetic multivariate time-series observations generated for control experimentation</li>
              <li>Constrained MPC with a learned PyTorch state-space model solved in CasADi, optimizing steam injection policies under physical constraints</li>
              <li>Researched partially observed dynamical systems, stochastic optimization, and sequential decision-making for adaptive industrial process control</li>
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

          <div className="pcard">
            <div className="pcard__top">
              <span className="pcard__name">Azadi</span>
              <span className="pcard__badge badge-blue">Intel Platform</span>
            </div>
            <p className="pcard__desc">
              Palantir Gotham-style <em>threat network intelligence dashboard</em> analyzing actor dynamics
              during the Iranian Revolution (1979-1981) via GDELT event data.
            </p>
            <ul className="pcard__bullets">
              <li>Ingested GDELT 1.0 bulk data (1979-1981) into a directed weighted NetworkX graph; nodes typed by CAMEO actor codes across Government, Military, Religious, and Opposition factions</li>
              <li>Louvain community detection (20 communities, modularity 0.10); PageRank + HITS composite influence scoring</li>
              <li>Daily z-score anomaly detection surfacing 15 event spikes including the Nov. 4, 1979 US Embassy hostage crisis; interactive Dash + Cytoscape dashboard with timeline and influence panels</li>
            </ul>
            <div className="pcard__tags">
              <span className="ptag">Python</span>
              <span className="ptag">NetworkX</span>
              <span className="ptag">GDELT</span>
              <span className="ptag">Dash</span>
              <span className="ptag">SQLite</span>
              <span className="ptag">Graph Analytics</span>
            </div>
            <span className="pcard__link pcard__link--private">Private Repository</span>
          </div>

        </div>

        <div className="proj-mini">
          <div className="pmini">
            <div className="pmini__name">FishTank Poker</div>
            <p className="pmini__desc">Multiplayer poker with real-time betting, live chat, and MCP AI opponents.</p>
            <div className="pcard__tags" style={{ marginBottom: "14px" }}>
              <span className="ptag">TypeScript</span><span className="ptag">React</span><span className="ptag">WebSockets</span>
            </div>
            <a href="https://github.com/benfarsi/FishTankPoker" className="pmini__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="pmini">
            <div className="pmini__name">StudyBuddy</div>
            <p className="pmini__desc">AI study app: upload notes, generate flashcards, get quizzed via Claude API.</p>
            <div className="pcard__tags" style={{ marginBottom: "14px" }}>
              <span className="ptag">React Native</span><span className="ptag">Expo</span><span className="ptag">Claude API</span>
            </div>
            <a href="https://github.com/benfarsi/StudyBuddy" className="pmini__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="pmini">
            <div className="pmini__name">PokerSocial</div>
            <p className="pmini__desc">Social poker platform with profiles, leaderboards, tournament brackets, and full auth.</p>
            <div className="pcard__tags" style={{ marginBottom: "14px" }}>
              <span className="ptag">Next.js</span><span className="ptag">Supabase</span><span className="ptag">TypeScript</span>
            </div>
            <a href="https://github.com/benfarsi/PokerSocial" className="pmini__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="pmini">
            <div className="pmini__name">CodeCrafters</div>
            <p className="pmini__desc">Rebuilding DNS resolvers, HTTP servers, Redis, and Git from scratch.</p>
            <div className="pcard__tags" style={{ marginBottom: "14px" }}>
              <span className="ptag">Go</span><span className="ptag">C</span><span className="ptag">Python</span>
            </div>
            <a href="https://github.com/benfarsi" className="pmini__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="sec-header">
          <span className="sec-index">02</span>
          <span className="sec-label">Technical Stack</span>
          <div className="sec-rule" />
        </div>
        <div className="skills-grid">
          <div className="sgroup">
            <div className="sgroup__label">Languages</div>
            <Skill name="Python"           dots={5} />
            <Skill name="C / C++"          dots={4} />
            <Skill name="TypeScript / JS"  dots={4} />
            <Skill name="Go"               dots={3} />
            <Skill name="Rust"             dots={2} />
            <Skill name="SQL / Bash"       dots={4} />
          </div>
          <div className="sgroup">
            <div className="sgroup__label">ML &amp; Modeling</div>
            <Skill name="PyTorch"                      dots={4} />
            <Skill name="XGBoost / scikit-learn"       dots={5} />
            <Skill name="Time-series / Anomaly Det."   dots={4} />
            <Skill name="Model Predictive Control"     dots={3} />
            <Skill name="Monte Carlo Methods"          dots={3} />
          </div>
          <div className="sgroup">
            <div className="sgroup__label">Embedded &amp; Hardware</div>
            <Skill name="ESP32 Firmware"             dots={4} />
            <Skill name="I2C / SPI / UART"           dots={4} />
            <Skill name="Sensor Integration"         dots={4} />
            <Skill name="Hardware Bring-up"          dots={3} />
            <Skill name="3D Printing / Design"       dots={3} />
          </div>
          <div className="sgroup">
            <div className="sgroup__label">Infrastructure &amp; Systems</div>
            <Skill name="Docker"                       dots={4} />
            <Skill name="PostgreSQL / SQLite"          dots={4} />
            <Skill name="Linux / POSIX"                dots={5} />
            <Skill name="Multithreading / Low-lat I/O" dots={4} />
            <Skill name="Flask / React Native"         dots={4} />
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="sec-header">
          <span className="sec-index">03</span>
          <span className="sec-label">Experience &amp; Education</span>
          <div className="sec-rule" />
        </div>
        <div className="exp-card">
          <div>
            <div className="exp__role">Technical Mentor, Embedded Systems &amp; Prototyping</div>
            <div className="exp__org">Centre for Entrepreneurship and Engineering Design (CEED) · University of Ottawa</div>
            <p className="exp__desc">
              Mentored engineering students through firmware debugging, peripheral integration (I2C, SPI, UART),
              and hardware bring-up in CEED&apos;s Makerspace. Guided hardware/software co-design across multiple
              student teams, accelerating prototype iteration under tight competition deadlines.
            </p>
          </div>
          <div className="exp__meta">
            <div className="exp__date">Sep 2024 · Present</div>
            <div className="exp__loc">Ottawa, ON</div>
          </div>
        </div>
        <div className="edu-card">
          <div>
            <div className="edu__school">University of Ottawa</div>
            <div className="edu__degree">Honours B.Sc., Computer Science</div>
          </div>
          <div>
            <div className="edu__gpa">GPA 3.7 / 4.0</div>
            <div className="edu__date">Sep 2023 · May 2027</div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="sec-header">
          <span className="sec-index">04</span>
          <span className="sec-label">Contact</span>
          <div className="sec-rule" />
        </div>
        <h2 className="contact__heading">Let&apos;s connect.</h2>
        <p className="contact__sub">Open to internships, research collaborations, and interesting problems.</p>
        <div className="contact__links">
          <a href="mailto:farsijaniben@gmail.com"    className="btn-primary">Email</a>
          <a href="https://linkedin.com/in/benfarsi" className="btn-ghost" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/benfarsi"      className="btn-ghost" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/resume.pdf"                      className="btn-ghost" target="_blank" rel="noopener noreferrer">Resume</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__id">BF. · BENFARSI.COM</div>
        <div className="site-footer__copy">© 2026 Ben Farsijani</div>
      </footer>
    </>
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

function DancingKirby() {
  const [mood, setMood]     = useState<"idle" | "spin" | "bounce" | "wave">("idle");
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MOODS: Array<"spin" | "bounce" | "wave"> = ["spin", "bounce", "wave"];

  const handleClick = useCallback(() => {
    const next = clicks + 1;
    setClicks(next);
    const m = MOODS[next % MOODS.length];
    setMood(m);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMood("idle"), 900);
  }, [clicks]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const label =
    mood === "spin"   ? "hey!" :
    mood === "bounce" ? "hired?" :
    mood === "wave"   ? ":3" : "click me";

  return (
    <div className="kirby-wrap" onClick={handleClick} title="click me">
      <div className="kirby-box">
        <div className="kirby-box__bar">
          <span className="kirby-dot" /><span className="kirby-dot" /><span className="kirby-dot" />
          <span className="kirby-box__title">KIRBY.EXE</span>
        </div>
        <div className="kirby-stage">
          <div className={`kirby-char kirby-char--${mood}`}>
            <svg width="88" height="88" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="48" cy="58" rx="38" ry="33" fill="#FF69B4"/>
              <ellipse cx="23" cy="64" rx="11" ry="7" fill="#FF1493" opacity=".45"/>
              <ellipse cx="73" cy="64" rx="11" ry="7" fill="#FF1493" opacity=".45"/>
              <ellipse cx="33" cy="50" rx="8"  ry="9.5" fill="#1a0820"/>
              <ellipse cx="63" cy="50" rx="8"  ry="9.5" fill="#1a0820"/>
              <circle  cx="31" cy="47" r="3.2" fill="white"/>
              <circle  cx="61" cy="47" r="3.2" fill="white"/>
              <path d="M30 68 Q48 80 66 68" stroke="#C71585" strokeWidth="3" fill="#FF4488" strokeLinecap="round"/>
              <ellipse cx="24" cy="88" rx="15" ry="9" fill="#FF1493"/>
              <ellipse cx="72" cy="88" rx="15" ry="9" fill="#FF1493"/>
              <ellipse cx="8"  cy="62" rx="10" ry="7" fill="#FF69B4" transform="rotate(-20 8 62)"/>
              <ellipse cx="88" cy="62" rx="10" ry="7" fill="#FF69B4" transform="rotate(20 88 62)"/>
            </svg>
          </div>
          <div className="kirby-label">{label}</div>
        </div>
      </div>
    </div>
  );
}
