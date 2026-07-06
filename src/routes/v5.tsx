import { createFileRoute } from "@tanstack/react-router";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { ArrowUpRight, Github, Mail, Shield, Smartphone, Workflow, Radar, Cpu, Zap } from "lucide-react";

export const Route = createFileRoute("/v5")({
  head: () => ({
    meta: [
      { title: "f1cu // neon — v5" },
      {
        name: "description",
        content:
          "Neon-glass portfolio for f1cu — offensive security, iOS internals, automation. Cyberpunk edition.",
      },
      { property: "og:title", content: "f1cu // neon" },
      {
        property: "og:description",
        content: "Glassmorphism cyberpunk take on the f1cu portfolio.",
      },
      { property: "og:url", content: "/v5" },
    ],
    links: [{ rel: "canonical", href: "/v5" }],
  }),
  component: NeonPage,
});

const CAPS = [
  { icon: Shield, title: "Red Team Ops", body: "Objective-based adversary simulation, ATT&CK-mapped, detection handoff included." },
  { icon: Smartphone, title: "iOS Research", body: "Runtime hooking, IPC audits, entitlement hardening. Frida / Ghidra / Hopper." },
  { icon: Workflow, title: "Automation", body: "CI-integrated security tooling, Python + TypeScript, LLM-assisted triage." },
  { icon: Radar, title: "OSINT", body: "External attack surface mapping and targeted intelligence for scoping." },
  { icon: Cpu, title: "Tooling", body: "Custom Burp extensions, internal platforms, agent-based recon. Yours to keep." },
  { icon: Zap, title: "Rapid Response", body: "Same-day NDAs, 48h written proposals, weekly delivery cadence." },
];

function NeonPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background: "radial-gradient(ellipse at top, #1a0b3d 0%, #0a0518 40%, #050208 100%)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <VersionSwitcher active="v5" tone="neon" />

      {/* animated blobs */}
      <style>{`
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(80px,-60px) scale(1.15)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-100px,80px) scale(1.2)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,60px) scale(0.9)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .neon-glow { text-shadow: 0 0 20px rgba(0,240,255,0.6), 0 0 40px rgba(255,46,136,0.3); }
        .neon-card { transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
        .neon-card:hover { transform: translateY(-4px); box-shadow: 0 0 40px rgba(0,240,255,0.25); border-color: rgba(0,240,255,0.5) !important; }
      `}</style>

      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "#ff2e88", animation: "blob1 18s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute top-40 right-0 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "#00f0ff", animation: "blob2 22s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
        style={{ background: "#7c3aed", animation: "blob3 20s ease-in-out infinite" }}
      />

      {/* nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div
            className="grid h-9 w-9 place-items-center rounded-lg text-sm font-bold text-black"
            style={{ background: "linear-gradient(135deg, #00f0ff, #ff2e88)" }}
          >
            f1
          </div>
          <div className="text-sm font-semibold tracking-tight">f1cu<span style={{ color: "#00f0ff" }}>.neon</span></div>
        </div>
        <a
          href="mailto:look@f1cu.space"
          className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-medium backdrop-blur-md transition-colors hover:bg-white/10"
        >
          Get in touch →
        </a>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-12 md:pt-24">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md"
          style={{ borderColor: "rgba(0,240,255,0.4)", background: "rgba(0,240,255,0.08)", color: "#7ff5ff" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#00f0ff", boxShadow: "0 0 8px #00f0ff" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>online · booking Q3 2026</span>
        </div>

        <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-8xl">
          Offense as a<br />
          <span
            className="neon-glow"
            style={{
              backgroundImage: "linear-gradient(90deg, #00f0ff, #ff2e88, #7c3aed)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            first-class service.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          I'm f1cu. Independent offensive security engineer working with teams that
          need real answers, not checklists. Red team, iOS internals, automation.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="mailto:look@f1cu.space"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #7c3aed)",
              boxShadow: "0 0 30px rgba(0,240,255,0.4)",
            }}
          >
            <Mail className="h-4 w-4" /> Start a conversation
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/ficu71"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/10"
          >
            <Github className="h-4 w-4" /> View GitHub
          </a>
        </div>
      </section>

      {/* capabilities grid */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-semibold md:text-4xl">Capabilities</h2>
          <div
            className="text-[10px] uppercase tracking-widest text-white/40"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            // six lanes
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPS.map((c) => (
            <div
              key={c.title}
              className="neon-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div
                className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-white/10"
                style={{
                  background: "linear-gradient(135deg, rgba(0,240,255,0.2), rgba(255,46,136,0.2))",
                  animation: "floatY 4s ease-in-out infinite",
                }}
              >
                <c.icon className="h-5 w-5" style={{ color: "#7ff5ff" }} />
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-10 backdrop-blur-xl md:p-16"
          style={{ boxShadow: "0 0 60px rgba(124,58,237,0.15)" }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{ background: "#ff2e88" }}
          />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <div
                className="text-[10px] uppercase tracking-widest"
                style={{ color: "#00f0ff", fontFamily: "'JetBrains Mono', monospace" }}
              >
                → contact
              </div>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Have a target<br />in mind?
              </h2>
              <p className="mt-4 max-w-md text-white/60">
                Objective, stack, timeline. I'll come back with scope and price within
                48 hours.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="mailto:look@f1cu.space?subject=Engagement%20inquiry"
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-black"
                style={{ background: "linear-gradient(135deg,#00f0ff,#ff2e88)" }}
              >
                <Mail className="h-4 w-4" />
                look@f1cu.space
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <div
                className="text-xs text-white/40"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Gouda, NL · PGP on request
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-white/40"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        © {new Date().getFullYear()} f1cu.space · v5 neon glass
      </footer>
    </div>
  );
}
