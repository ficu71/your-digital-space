import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BrainCircuit,
  Braces,
  Check,
  FileCheck2,
  Github,
  Mail,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "f1cu — Independent Security Research" },
      {
        name: "description",
        content:
          "Independent security research: application and API testing, AI red teaming, reproducible evidence, and responsible disclosure.",
      },
      { property: "og:title", content: "f1cu — Independent Security Research" },
      {
        property: "og:description",
        content:
          "Evidence-led security research for authorized, scoped work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#090a0c" },
    ],
  }),
  component: Home,
});

const EMAIL = "look@f1cu.space";
const GITHUB = "https://github.com/ficu71";

const capabilities = [
  {
    icon: <ScanSearch className="h-5 w-5" />,
    index: "01",
    title: "Application & API testing",
    body: "Authentication, authorization, sessions, payment paths, business logic, and the seams where assumptions become attack surface.",
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    index: "02",
    title: "AI red teaming",
    body: "Prompt injection, data leakage, unsafe tool use, and agent behaviour tested against the actual system boundaries.",
  },
  {
    icon: <Braces className="h-5 w-5" />,
    index: "03",
    title: "Security research",
    body: "Focused investigation of unfamiliar systems, including mobile and iOS internals as a research discipline.",
  },
  {
    icon: <FileCheck2 className="h-5 w-5" />,
    index: "04",
    title: "Evidence & disclosure",
    body: "Reproducible proof, clear impact, practical remediation, and responsible communication with the right people.",
  },
];

const method = [
  ["01", "Scope & authorization", "Define what is in bounds, what success means, and which safeguards apply before testing starts."],
  ["02", "Test with intent", "Work through realistic failure paths in controlled conditions, with restraint around systems and data."],
  ["03", "Reproduce the evidence", "Separate a hunch from a finding: capture the sequence, impact, and conditions required to verify it."],
  ["04", "Hand off clearly", "Deliver findings in language that engineering and security teams can use — or disclose responsibly when appropriate."],
];

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090a0c] text-[#f1eee7] selection:bg-cyan-300 selection:text-black">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_at_top,rgba(77,221,239,.15),transparent_62%)]" />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Method />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090a0c]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-baseline gap-2 font-mono text-sm tracking-[0.18em] text-white">
          <span className="text-cyan-300">f1cu</span><span className="text-white/35">//</span><span className="hidden text-white/55 sm:inline">security research</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/60 md:flex">
          <a className="transition hover:text-white" href="#work">Work</a>
          <a className="transition hover:text-white" href="#method">Method</a>
          <a className="transition hover:text-white" href="#contact">Contact</a>
        </nav>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-cyan-300/70 hover:text-cyan-200">
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pb-20 pt-20 md:px-8 md:pb-32 md:pt-28">
      <div className="mb-9 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-200/75">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.9)]" />
        Independent security research · Gouda, NL
      </div>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#d9975a]">Field notes / controlled work</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-0.055em] text-[#f6f2e9] sm:text-6xl md:text-8xl">
            Find the failure mode<br />
            <span className="text-white/38">before it finds you.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
            f1cu is independent, evidence-led security research for teams and systems that need real answers: applications, APIs, AI agents, and the logic between them.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}?subject=Scoped%20security%20assessment`} className="inline-flex items-center gap-2 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061114] transition hover:bg-cyan-200">
              Discuss a scoped assessment <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/18 px-5 py-3 text-sm font-medium text-white/85 transition hover:border-white/50 hover:bg-white/5">
              View research <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
        <FieldNote />
      </div>
    </section>
  );
}

function FieldNote() {
  const rows = [["01", "scope", "authorize the boundary"], ["02", "evidence", "reproduce the behaviour"], ["03", "remediation", "make the fix actionable"]];
  return (
    <aside className="relative border border-cyan-200/20 bg-[#0c1114]/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,.32)]">
      <div className="absolute left-0 top-0 h-px w-20 bg-cyan-300" />
      <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
        <span>Field note</span><span>0001</span>
      </div>
      <div className="space-y-0 pt-3">
        {rows.map(([number, label, detail]) => (
          <div key={label} className="grid grid-cols-[34px_1fr] gap-3 border-b border-white/8 py-4 last:border-0">
            <span className="font-mono text-xs text-[#d9975a]">{number}</span>
            <div><div className="font-mono text-xs uppercase tracking-[.16em] text-cyan-200">{label}</div><p className="mt-1 text-sm text-white/55">{detail}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-white/10 pt-4 font-mono text-[10px] leading-relaxed text-white/35">A finding is useful only when another person can verify it.</div>
    </aside>
  );
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-[.2em] text-[#d9975a]">{eyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] text-[#f6f2e9] md:text-6xl">{title}</h2><p className="mt-5 text-lg leading-relaxed text-white/60">{body}</p></div>;
}

function Work() {
  return (
    <section id="work" className="border-y border-white/10 bg-[#0b0d10]/75">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionTitle eyebrow="Work" title="The parts that break quietly." body="Focused testing around the decisions, integrations, and trust boundaries where a clean interface can conceal a costly failure." />
        <div className="mt-14 grid border border-white/10 sm:grid-cols-2">
          {capabilities.map((item) => <article key={item.index} className="group border-b border-white/10 p-6 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-white/10 md:p-8"><div className="flex items-start justify-between"><span className="text-cyan-200 transition group-hover:drop-shadow-[0_0_10px_rgba(103,232,249,.7)]">{item.icon}</span><span className="font-mono text-xs text-white/28">{item.index}</span></div><h3 className="mt-12 text-xl font-medium text-white">{item.title}</h3><p className="mt-3 max-w-md leading-relaxed text-white/55">{item.body}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="method" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <SectionTitle eyebrow="Method" title="Intent first. Evidence always." body="The work stays grounded in authorization, reproducibility, and clear communication — not theatre." />
      <ol className="mt-14 border-t border-white/12">
        {method.map(([number, title, body]) => <li key={number} className="grid gap-4 border-b border-white/12 py-7 md:grid-cols-[110px_minmax(220px,.7fr)_minmax(0,1fr)] md:items-baseline"><span className="font-mono text-sm text-cyan-200">{number}</span><h3 className="text-xl text-white">{title}</h3><p className="leading-relaxed text-white/55">{body}</p></li>)}
      </ol>
    </section>
  );
}

function Principles() {
  const principles = ["Authorized work only", "Minimum necessary collection", "Reproducible findings", "Clear scope and boundaries"];
  return <section className="border-y border-white/10 bg-[#15100d]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[.9fr_1.1fr] md:px-8 md:py-20"><div><p className="font-mono text-xs uppercase tracking-[.2em] text-[#d9975a]">Principles</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-[#f6f2e9] md:text-5xl">Research with boundaries.</h2></div><div className="grid gap-4 sm:grid-cols-2">{principles.map((principle) => <div key={principle} className="flex items-center gap-3 border-t border-white/15 pt-4 text-white/75"><Check className="h-4 w-4 text-cyan-200" />{principle}</div>)}</div></div></section>;
}

function Contact() {
  return <section id="contact" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"><div className="border border-white/12 bg-[linear-gradient(135deg,rgba(103,232,249,.11),transparent_45%,rgba(217,151,90,.09))] p-7 md:p-12"><p className="font-mono text-xs uppercase tracking-[.2em] text-cyan-200">Contact</p><div className="mt-6 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"><div><h2 className="max-w-3xl text-4xl font-semibold tracking-[-.05em] text-[#f6f2e9] md:text-6xl">If the work is authorized, let&apos;s define the boundary.</h2><p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">Send the system, objective, and constraints. Inbound work must be authorized and scoped.</p></div><div className="flex flex-col gap-3"><a href={`mailto:${EMAIL}?subject=Scoped%20security%20assessment`} className="inline-flex items-center justify-between gap-8 bg-[#f6f2e9] px-5 py-3 text-sm font-semibold text-[#090a0c] transition hover:bg-cyan-200"><span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{EMAIL}</span><ArrowUpRight className="h-4 w-4" /></a><a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between gap-8 border border-white/15 px-5 py-3 text-sm text-white/75 transition hover:border-cyan-200/70 hover:text-cyan-100"><span className="inline-flex items-center gap-2"><Github className="h-4 w-4" />github.com/ficu71</span><ArrowUpRight className="h-4 w-4" /></a></div></div></div></section>;
}

function Footer() {
  return <footer className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 font-mono text-[11px] uppercase tracking-[.12em] text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-8"><span>© {new Date().getFullYear()} f1cu</span><span>Independent security research · Gouda, NL</span></div></footer>;
}
