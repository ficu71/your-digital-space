import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import ShaderBackground from "./ShaderBackground";
import HoloScene from "./HoloScene";
import { CONTENT } from "./content";
import { useScrollProgress, useReducedMotion } from "./hooks";

const SECTIONS = [
  { id: "hero", label: "01 · hero" },
  { id: "caps", label: "02 · caps" },
  { id: "work", label: "03 · work" },
  { id: "tel", label: "04 · telemetry" },
  { id: "contact", label: "05 · contact" },
] as const;

export default function V7() {
  const progress = useScrollProgress();
  const progressRef = useRef(0);
  progressRef.current = progress;
  const reduced = useReducedMotion();

  const [active, setActive] = useState<string>("hero");
  const [paletteOpen, setPaletteOpen] = useState(false);

  // active section tracker
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setPaletteOpen(false);
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < SECTIONS.length && !e.metaKey && !e.ctrlKey) {
        const el = document.getElementById(SECTIONS[idx].id);
        if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);

  return (
    <div className="v7-scope">
      <ShaderBackground progress={progress} />
      {!reduced && <HoloScene progressRef={progressRef} />}

      <div className="v7-rail">
        <div className="v7-rail-fill" style={{ ["--p" as never]: `${progress * 100}%` }} />
      </div>

      <VersionSwitcher active="v7" />

      <div className="v7-content">
        <Hero />
        <Capabilities />
        <Work />
        <Telemetry />
        <Contact />
        <Signoff />
      </div>

      <nav className="v7-nav" aria-label="section nav">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            data-active={active === s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })}
            title={`Press ${i + 1}`}
          >
            0{i + 1}
          </button>
        ))}
        <button onClick={() => setPaletteOpen(true)} title="Shortcuts (?)">?</button>
      </nav>

      {paletteOpen && <Palette onClose={() => setPaletteOpen(false)} />}
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="v7-section">
      <div className="v7-hud-corner tl" />
      <div className="v7-hud-corner tr" />
      <div className="v7-reveal" style={{ maxWidth: "56rem" }}>
        <span className="v7-eyebrow">f1cu.space · v7 · liquid chrome cathedral</span>
        <h1 className="v7-display v7-hero-title">
          breaks the limits.<br />unleashes the truth.
        </h1>
        <p className="v7-hero-lede">
          Solo offensive security & AI researcher. Red team engagements, iOS internals, agentic
          automation. {CONTENT.location}. {CONTENT.availability}.
        </p>
        <div className="v7-cta-row">
          <a
            className="v7-cta"
            href={`mailto:${CONTENT.email}?subject=Engagement%20brief&body=Hi%20f1cu%2C%0A%0AScope%3A%20%0ATimeline%3A%20%0ATargets%3A%20%0ARules%20of%20engagement%3A%20%0A%0A--`}
          >
            request engagement →
          </a>
          <a className="v7-cta ghost" href="#caps">
            explore capabilities
          </a>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = (e: PointerEvent) => {
      const cards = el.querySelectorAll<HTMLElement>(".v7-cap");
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        c.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    el.addEventListener("pointermove", on);
    return () => el.removeEventListener("pointermove", on);
  }, []);
  return (
    <section id="caps" className="v7-section">
      <div className="v7-reveal">
        <span className="v7-eyebrow">02 · capabilities</span>
        <h2 className="v7-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", margin: "1rem 0 0" }}>
          three vectors, one operator.
        </h2>
      </div>
      <div className="v7-caps" ref={ref}>
        {CONTENT.capabilities.map((c) => (
          <article key={c.id} className="v7-cap v7-reveal">
            <div className="v7-cap-code">{c.code}</div>
            <h3 className="v7-cap-title">{c.title}</h3>
            <p className="v7-cap-lede">{c.lede}</p>
            <ul>
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="v7-section">
      <div className="v7-reveal">
        <span className="v7-eyebrow">03 · selected work · CVE</span>
        <h2 className="v7-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", margin: "1rem 0 0" }}>
          shipped. reversed. disclosed.
        </h2>
        <p className="v7-hero-lede" style={{ marginTop: "1rem" }}>
          Live in the scene around you. Cards below mirror the mesh — hover a node to feel the link.
        </p>
      </div>
      <div className="v7-work">
        {CONTENT.work.map((w, i) => (
          <article key={w.id} className="v7-work-card v7-reveal">
            <div className="v7-work-code">node.0{i + 1}</div>
            <h3 className="v7-work-title">{w.title}</h3>
            <div className="v7-work-sub">{w.subtitle}</div>
            <p className="v7-work-body">{w.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Telemetry() {
  const [now, setNow] = useState(() => new Date());
  const [logs, setLogs] = useState<{ t: string; l: string; m: string }[]>([]);
  const mountedAt = useMemo(() => Date.now(), []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const seed = [
      { l: "SYS", m: "shader.core online — ray-march @ 60hz" },
      { l: "NET", m: "handshake with holo-mesh established" },
      { l: "OPS", m: "adversary emulation harness idle" },
      { l: "RSCH", m: "sandbox drift monitor: nominal" },
      { l: "AGENT", m: "guardrail probe: 2 candidates queued" },
      { l: "TEL", m: "uptime counter armed" },
    ];
    setLogs(seed.map((s) => ({ ...s, t: fmtTime(new Date()) })));
    const id = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev];
        const pool = [
          { l: "AGENT", m: "prompt-injection surface enumerated" },
          { l: "NET", m: "beacon jitter within tolerance" },
          { l: "RSCH", m: "entitlement diff: 3 new symbols" },
          { l: "OPS", m: "payload signed, capsule sealed" },
          { l: "SYS", m: "GPU pressure: green" },
        ];
        const pick = pool[Math.floor(Math.random() * pool.length)];
        next.push({ ...pick, t: fmtTime(new Date()) });
        if (next.length > 12) next.shift();
        return next;
      });
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const uptime = Math.floor((Date.now() - mountedAt) / 1000);
  const uptimeStr = `${Math.floor(uptime / 3600)
    .toString()
    .padStart(2, "0")}:${Math.floor((uptime % 3600) / 60)
    .toString()
    .padStart(2, "0")}:${(uptime % 60).toString().padStart(2, "0")}`;

  return (
    <section id="tel" className="v7-section">
      <div className="v7-reveal">
        <span className="v7-eyebrow">04 · live telemetry</span>
        <h2 className="v7-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", margin: "1rem 0 0" }}>
          the desk is warm.
        </h2>
      </div>
      <div className="v7-telemetry">
        <div className="v7-tel v7-reveal">
          <div className="v7-tel-label">utc · now</div>
          <div className="v7-tel-value">{fmtTime(now)}</div>
          <div className="v7-tel-sub">{now.toISOString().slice(0, 10)}</div>
        </div>
        <div className="v7-tel v7-reveal">
          <div className="v7-tel-label">session · uptime</div>
          <div className="v7-tel-value">{uptimeStr}</div>
          <div className="v7-tel-sub">since page loaded</div>
        </div>
        <div className="v7-tel v7-reveal">
          <div className="v7-tel-label">availability</div>
          <div className="v7-tel-value">Q4 · 26</div>
          <div className="v7-tel-sub">{CONTENT.availability}</div>
        </div>
        <div className="v7-tel v7-reveal">
          <div className="v7-tel-label">location · languages</div>
          <div className="v7-tel-value" style={{ fontSize: "1.4rem" }}>warsaw / pl</div>
          <div className="v7-tel-sub">english · polish</div>
        </div>
        <div className="v7-log v7-reveal">
          {logs.map((r, i) => (
            <div className="v7-log-row" key={i}>
              <span className="t">{r.t}</span>
              <span className="l">[{r.l}]</span>
              <span>{r.m}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="v7-section">
      <div className="v7-hud-corner bl" />
      <div className="v7-hud-corner br" />
      <div className="v7-reveal">
        <span className="v7-eyebrow">05 · contact</span>
        <h2 className="v7-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", margin: "1rem 0 0" }}>
          send the brief. keep it terse.
        </h2>
      </div>
      <a
        className="v7-contact-mail v7-reveal"
        href={`mailto:${CONTENT.email}?subject=Engagement%20brief&body=Hi%20f1cu%2C%0A%0AScope%3A%20%0ATimeline%3A%20%0ATargets%3A%20%0ARules%20of%20engagement%3A%20%0A%0A--`}
      >
        {CONTENT.email}
      </a>
      <div className="v7-links v7-reveal">
        <a className="v7-cta ghost" href={CONTENT.github} target="_blank" rel="noreferrer">
          github · ficu71 →
        </a>
        <a className="v7-cta ghost" href="#">
          signal · {CONTENT.signal}
        </a>
        <Link className="v7-cta ghost" to="/">
          ← back to /
        </Link>
      </div>
    </section>
  );
}

function Signoff() {
  return (
    <footer className="v7-signoff">
      <span>handcrafted in warsaw</span>
      <span>v7.0.0 · liquid chrome cathedral</span>
      <span>press ? for shortcuts</span>
    </footer>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  return (
    <div className="v7-palette" onClick={onClose}>
      <div className="v7-palette-box" onClick={(e) => e.stopPropagation()}>
        <h3>keyboard</h3>
        <dl>
          <dt>1 – 5</dt>
          <dd>jump to section</dd>
          <dt>?</dt>
          <dd>toggle this panel</dd>
          <dt>esc</dt>
          <dd>close</dd>
        </dl>
      </div>
    </div>
  );
}

function fmtTime(d: Date) {
  const h = d.getUTCHours().toString().padStart(2, "0");
  const m = d.getUTCMinutes().toString().padStart(2, "0");
  const s = d.getUTCSeconds().toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}
