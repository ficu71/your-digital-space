import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Github,
  Mail,
  Shield,
  Smartphone,
  Terminal,
  Workflow,
  Cpu,
  Lock,
} from "lucide-react";
import { VersionSwitcher } from "@/components/VersionSwitcher";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "f1cu — Offensive Security & iOS Research" },
      {
        name: "description",
        content:
          "Independent offensive security engineer. Red teaming, iOS internals, and automation for teams that need real answers, not checklists.",
      },
      { property: "og:title", content: "f1cu — Offensive Security & iOS Research" },
      {
        property: "og:description",
        content:
          "Red teaming, iOS internals, and automation. Independent engineer based in NL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0a0a" },
    ],
  }),
  component: Index,
});

const EMAIL = "look@f1cu.space";
const GITHUB = "https://github.com/ficu71";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Stack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background text-xs font-bold">
            f1
          </span>
          <span>f1cu</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#about" className="transition-colors hover:text-foreground">About</a>
          <a href="#services" className="transition-colors hover:text-foreground">Services</a>
          <a href="#stack" className="transition-colors hover:text-foreground">Stack</a>
          <a href="#process" className="transition-colors hover:text-foreground">Process</a>
        </nav>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Contact
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available for new engagements — Q3 2026
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            Security that
            <br />
            <span className="text-muted-foreground">holds up under pressure.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I&apos;m f1cu — an independent offensive security engineer.
            I help teams find the failure modes attackers actually use:
            red team operations, iOS internals research, and hardened automation.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}?subject=Engagement%20inquiry`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Github className="h-4 w-4" />
              View GitHub
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border/60 pt-10 md:grid-cols-4">
          <Stat label="Years in security" value="8+" />
          <Stat label="Engagements delivered" value="60+" />
          <Stat label="Repeat clients" value="92%" />
          <Stat label="Based in" value="Gouda, NL" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
          {intro ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{intro}</p>
          ) : null}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Independent, quiet, and hands-on."
      intro="I work best embedded with small security teams that need someone senior on the tools — not another slide deck. My clients are fintechs, mobile-first products, and infra teams that ship."
    >
      <div className="grid gap-10 md:grid-cols-3">
        <AboutCard
          icon={<Shield className="h-5 w-5" />}
          title="Offensive by default"
          body="Every finding comes with a working proof of concept and a remediation path your engineers can actually merge."
        />
        <AboutCard
          icon={<Smartphone className="h-5 w-5" />}
          title="Deep iOS focus"
          body="Years of hands-on iOS internals — sandbox, entitlements, IPC, jailbreak-era research applied to modern app security."
        />
        <AboutCard
          icon={<Workflow className="h-5 w-5" />}
          title="Automation-first"
          body="I ship tooling with every engagement so your team keeps the capability after I leave."
        />
      </div>
    </Section>
  );
}

function AboutCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Services() {
  const services = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Red team & adversary simulation",
      body: "Objective-based operations against production stacks. Recon, initial access, lateral movement, exfiltration — mapped to MITRE ATT&CK with detection gaps documented for your blue team.",
      bullets: ["Assumed-breach and full-scope", "Detection engineering handoff", "Executive + technical reporting"],
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "iOS security research",
      body: "Application, runtime, and platform-level review of iOS products. Reverse engineering, IPC audit, entitlement hardening, and offline analysis of jailbreak surface.",
      bullets: ["Static + dynamic app review", "Runtime hooking & Frida tooling", "Jailbreak-era exploit context"],
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      title: "Security automation",
      body: "Custom tooling for teams that outgrew off-the-shelf scanners. CI-integrated checks, agent-based recon, and internal platforms tuned to your stack.",
      bullets: ["Python + TypeScript delivery", "LLM-assisted triage pipelines", "Owned, documented, handed over"],
    },
  ];

  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Three ways I work with teams."
      intro="Scoped engagements with clear deliverables. No retainer lock-in, no sub-contracting — you work with me directly."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="flex flex-col gap-5 bg-background p-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
              {s.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
            <ul className="mt-auto space-y-2 pt-4 text-sm text-muted-foreground">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Stack() {
  const groups = [
    {
      label: "Offensive",
      items: ["Burp Suite Pro", "Cobalt Strike", "Sliver", "BloodHound", "Nuclei"],
    },
    {
      label: "iOS & mobile",
      items: ["Frida", "Ghidra", "Hopper", "objection", "class-dump"],
    },
    {
      label: "Automation",
      items: ["Python", "TypeScript", "FastAPI", "Playwright", "n8n"],
    },
    {
      label: "Infra & cloud",
      items: ["AWS", "GCP", "Terraform", "Cloudflare", "Docker"],
    },
  ];

  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="Tools I reach for."
      intro="Chosen because they work in production, not because they trend."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.label} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              {g.label}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  const steps = [
    {
      n: "01",
      title: "Scope call",
      body: "30 minutes to understand your risk model, stack, and what a good outcome looks like.",
    },
    {
      n: "02",
      title: "Proposal",
      body: "Written scope, timeline, and fixed price within 48 hours. No sales cycle.",
    },
    {
      n: "03",
      title: "Execution",
      body: "Weekly written updates. Findings flow into your issue tracker as they land, not at the end.",
    },
    {
      n: "04",
      title: "Handover",
      body: "Report, retest, and any tooling built during the engagement — yours to keep and extend.",
    },
  ];

  return (
    <Section
      id="process"
      eyebrow="How we work"
      title="From first email to signed report."
      intro="A predictable process so you know what to expect and when."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="bg-background p-8">
            <div className="text-sm font-mono text-muted-foreground">{s.n}</div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="rounded-3xl border border-border bg-card p-10 md:p-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Contact
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                Have a target in mind?
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Tell me the objective, the stack, and when you need it done.
                I&apos;ll come back with a scope and a price.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href={`mailto:${EMAIL}?subject=Engagement%20inquiry&body=Objective%3A%0AScope%3A%0ATimeline%3A%0ABudget%3A`}
                className="inline-flex items-center justify-between gap-6 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-6 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <span className="inline-flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  github.com/ficu71
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-6 border-t border-border pt-8 text-sm text-muted-foreground md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              PGP key on request
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Signal / Wire available
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              NDAs signed same day
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} f1cu.space — Gouda, NL</div>
        <div className="flex items-center gap-6">
          <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-foreground">
            {EMAIL}
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
