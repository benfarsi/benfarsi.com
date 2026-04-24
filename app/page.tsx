"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { STATS, socials } from "./data";

const BIO = "I build software, hardware, and AI systems.";
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

interface Toast { id: number; msg: string; }

export default function Home() {
  const [typedText,  setTypedText]  = useState("");
  const [cursorOn,   setCursorOn]   = useState(true);
  const [photoSpin,  setPhotoSpin]  = useState(false);
  const [toasts,     setToasts]     = useState<Toast[]>([]);
  const [counts,     setCounts]     = useState(STATS.map(() => 0));
  const [statsReady, setStatsReady] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const konamiRef   = useRef<string[]>([]);
  const sudoRef     = useRef<string[]>([]);
  const toastIdRef  = useRef(0);
  const typingDone  = useRef(false);
  const statsRef    = useRef<HTMLDivElement>(null);

  const addToast = useCallback((msg: string) => {
    const id = ++toastIdRef.current;
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  useEffect(() => {
    console.log(
      "%cbenjamin farsijani — benfarsi.com\nfound the console 👾   hire me → farsijaniben@gmail.com",
      "color:#FF1493;font-family:monospace;font-size:13px;"
    );
  }, []);

  useEffect(() => {
    if (typingDone.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setTypedText(BIO); typingDone.current = true; return; }
    let i = 0;
    const id = setInterval(() => {
      if (i < BIO.length) setTypedText(BIO.slice(0, ++i));
      else { clearInterval(id); typingDone.current = true; }
    }, 52);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-10);
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        addToast("🎮 konami unlocked");
        document.body.classList.add("konami-flash");
        setTimeout(() => document.body.classList.remove("konami-flash"), 900);
        konamiRef.current = [];
      }
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

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsReady(true); },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statsReady) return;
    const targets = STATS.map(s => s.target);
    const steps = 48;
    let step = 0;
    const id = setInterval(() => {
      step++;
      setCounts(targets.map(t => Math.min(Math.round(t * step / steps), t)));
      if (step >= steps) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [statsReady]);

  return (
    <>
      {/* sticky nav scroll state */}
      <style>{`.layout-nav { ${scrolled ? "background:rgba(8,0,8,.95);border-bottom-color:var(--pink);box-shadow:0 0 20px rgba(255,20,147,.2);" : ""} }`}</style>

      <main>
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__text">
              <div className="hero__status">
                <span className="hero__status-dot" />
                available for opportunities
              </div>
              <p className="hero__eyebrow">cs · university of ottawa</p>
              <h1 className="hero__name">benjamin<br />farsijani</h1>
              <p className="hero__bio">
                {typedText}
                <span className="type-cursor" style={{ opacity: cursorOn ? 1 : 0 }} aria-hidden="true">|</span>
              </p>
              <div className="hero__socials">
                {socials.map(s => (
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
              <div className="hero__stats" ref={statsRef}>
                {STATS.map((s, i) => (
                  <div key={s.label} className="hero__stat">
                    <span className="hero__stat-num">{counts[i]}{s.suffix}</span>
                    <span className="hero__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "28px" }}>
                <Link href="/projects" className="hero__cta">view projects →</Link>
              </div>
            </div>

            <div className="hero__right">
              <div className="hero__photo-wrap">
                <Image
                  src="/photo.jpg"
                  alt="benjamin farsijani"
                  width={200}
                  height={200}
                  className={`hero__photo${photoSpin ? " hero__photo--spin" : ""}`}
                  priority
                  onDoubleClick={() => { setPhotoSpin(true); addToast("👋 hey!"); setTimeout(() => setPhotoSpin(false), 800); }}
                />
              </div>

              {/* dancing kirby */}
              <div className="kirby-box">
                <div className="kirby-box__label">kirby.exe</div>
                <div className="kirby-dance">
                  <svg width="80" height="80" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="48" cy="58" rx="38" ry="33" fill="#FF69B4"/>
                    <ellipse cx="23" cy="64" rx="11" ry="7" fill="#FF1493" opacity=".45"/>
                    <ellipse cx="73" cy="64" rx="11" ry="7" fill="#FF1493" opacity=".45"/>
                    <ellipse cx="33" cy="50" rx="8" ry="9.5" fill="#1a0820"/>
                    <ellipse cx="63" cy="50" rx="8" ry="9.5" fill="#1a0820"/>
                    <circle cx="31" cy="47" r="3.2" fill="white"/>
                    <circle cx="61" cy="47" r="3.2" fill="white"/>
                    <path d="M30 68 Q48 80 66 68" stroke="#C71585" strokeWidth="3" fill="#FF4488" strokeLinecap="round"/>
                    <ellipse cx="24" cy="88" rx="15" ry="9" fill="#FF1493"/>
                    <ellipse cx="72" cy="88" rx="15" ry="9" fill="#FF1493"/>
                    <ellipse cx="8" cy="62" rx="10" ry="7" fill="#FF69B4" transform="rotate(-20 8 62)"/>
                    <ellipse cx="88" cy="62" rx="10" ry="7" fill="#FF69B4" transform="rotate(20 88 62)"/>
                  </svg>
                </div>
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
                  <div><span className="t-ok">→</span> loop: 18ms ✓</div>
                  <div><span className="t-prompt">$</span> ./gateway --mtls</div>
                  <div><span className="t-ok">→</span> blocked: 85% ✓</div>
                  <div><span className="t-prompt">$</span> ./tcp-lb -algo lc</div>
                  <div><span className="t-ok">→</span> 50k conns ✓</div>
                  <div><span className="t-prompt">$</span><span className="t-blink">_</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="toast-container" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className="toast">{t.msg}</div>
        ))}
      </div>
    </>
  );
}
