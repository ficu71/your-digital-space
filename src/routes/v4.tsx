import { createFileRoute } from "@tanstack/react-router";
import { VersionSwitcher } from "@/components/VersionSwitcher";

export const Route = createFileRoute("/v4")({
  head: () => ({
    meta: [
      { title: "f1cu // editorial — v4" },
      {
        name: "description",
        content:
          "An editorial portfolio for f1cu — offensive security, iOS internals, automation. Read as a magazine.",
      },
      { property: "og:title", content: "f1cu // editorial" },
      {
        property: "og:description",
        content: "Three long-form dispatches from the offensive security desk.",
      },
      { property: "og:url", content: "/v4" },
    ],
    links: [{ rel: "canonical", href: "/v4" }],
  }),
  component: EditorialPage,
});

const IVORY = "#f5f1ea";
const INK = "#1a1a1a";
const CRIMSON = "#8b1e2b";
const MUTED = "#6b6259";

const ARTICLES = [
  {
    n: "01",
    kicker: "DISPATCH",
    title: "Red teams work best when nobody notices.",
    lede: "Objective-based operations against production stacks — recon, initial access, lateral movement, exfiltration. Mapped to ATT&CK, with a detection handoff that your blue team can actually use on Monday.",
    body: [
      "Every engagement produces two artifacts. The first is a working proof of concept for each finding — not a screenshot, a script your engineers can run. The second is a written report that speaks to executives without patronising the security team.",
      "Assumed-breach and full-scope both belong in the toolbox. Which one fits depends on the risk model, not the sales cycle.",
    ],
  },
  {
    n: "02",
    kicker: "RESEARCH",
    title: "iOS is a research target, not a checkbox.",
    lede: "Years of hands-on iOS internals — sandbox, entitlements, IPC, jailbreak-era exploit context — applied to modern app security. Frida, Ghidra, Hopper, objection, class-dump.",
    body: [
      "Mobile applications tend to ship with the assumption that the runtime is trusted. That assumption is a finding waiting to happen. Runtime hooking, keychain inspection, and IPC audits routinely surface the sort of issues that don't appear in a static scan.",
      "The deliverable includes an entitlement hardening pass. Small changes to the manifest close large classes of bug.",
    ],
  },
  {
    n: "03",
    kicker: "PRACTICE",
    title: "Automation you keep after the invoice.",
    lede: "Custom tooling for teams that outgrew off-the-shelf scanners. CI-integrated checks, agent-based recon, and internal platforms tuned to your stack. Python and TypeScript, documented and handed over.",
    body: [
      "The default is: everything I build during an engagement ships to your monorepo with tests and a README. No black boxes, no ongoing licence, no lock-in.",
      "LLM-assisted triage pipelines are earning their keep on the recon side — separating signal from noise on internal surfaces that used to require a human sweep.",
    ],
  },
];

function EditorialPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: IVORY, color: INK, fontFamily: "'Fraunces', Georgia, serif" }}
    >
      <VersionSwitcher active="v4" tone="light" />

      {/* Masthead */}
      <header className="border-b" style={{ borderColor: INK }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-[11px] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <span>Vol. VIII · No. 12</span>
          <span>The f1cu Quarterly</span>
          <span>Gouda, NL · MMXXVI</span>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-6 text-center">
          <div
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: CRIMSON, fontFamily: "'JetBrains Mono', monospace" }}
          >
            An offensive security dispatch
          </div>
          <h1
            className="mt-4 text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl"
            style={{ fontStyle: "italic" }}
          >
            f<span style={{ color: CRIMSON }}>1</span>cu
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>
            Three dispatches from an independent offensive security engineer.
            Red teaming, iOS internals research, and automation for teams that ship.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-8 px-6 py-16">
        {/* Sticky TOC */}
        <aside className="col-span-12 md:col-span-3">
          <div className="sticky top-8">
            <div
              className="text-[10px] uppercase tracking-widest"
              style={{ color: CRIMSON, fontFamily: "'JetBrains Mono', monospace" }}
            >
              In this issue
            </div>
            <ul className="mt-4 space-y-3 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {ARTICLES.map((a) => (
                <li key={a.n}>
                  <a
                    href={`#a${a.n}`}
                    className="flex gap-3 leading-snug transition-colors"
                    style={{ color: INK }}
                  >
                    <span style={{ color: CRIMSON }}>{a.n}</span>
                    <span className="normal-case" style={{ fontFamily: "'Fraunces', serif" }}>
                      {a.title}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="#colophon"
                  className="text-[10px] uppercase tracking-widest"
                  style={{ color: MUTED }}
                >
                  → Colophon
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Articles */}
        <main className="col-span-12 space-y-24 md:col-span-9">
          {ARTICLES.map((a, i) => (
            <article key={a.n} id={`a${a.n}`} className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <div
                  className="text-[80px] font-semibold leading-none"
                  style={{ color: CRIMSON, fontStyle: "italic" }}
                >
                  {a.n}
                </div>
                <div
                  className="mt-2 text-[10px] uppercase tracking-widest"
                  style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {a.kicker}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="text-3xl font-semibold leading-tight md:text-5xl" style={{ fontStyle: i % 2 === 0 ? "normal" : "italic" }}>
                  {a.title}
                </h2>
                <p className="mt-6 border-l-2 pl-5 text-xl leading-relaxed" style={{ borderColor: CRIMSON, color: INK }}>
                  {a.lede}
                </p>
                <div className="mt-6 space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
                  {a.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {/* Colophon / contact */}
          <section id="colophon" className="border-t pt-12" style={{ borderColor: INK }}>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <div
                  className="text-[10px] uppercase tracking-widest"
                  style={{ color: CRIMSON, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Colophon
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                  Correspondence
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>
                  Enquiries, scoping calls, and NDAs — direct to the desk. Written
                  proposals within forty-eight hours.
                </p>
                <div
                  className="mt-8 flex flex-wrap gap-6 text-sm"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <a href="mailto:look@f1cu.space" className="underline decoration-1 underline-offset-4" style={{ color: CRIMSON }}>
                    look@f1cu.space
                  </a>
                  <a href="https://github.com/ficu71" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4" style={{ color: INK }}>
                    github.com/ficu71
                  </a>
                  <span style={{ color: MUTED }}>PGP on request</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer
        className="border-t py-6 text-center text-[11px] uppercase tracking-widest"
        style={{ borderColor: INK, fontFamily: "'JetBrains Mono', monospace", color: MUTED }}
      >
        © {new Date().getFullYear()} f1cu.space · set in Fraunces & JetBrains Mono
      </footer>
    </div>
  );
}
