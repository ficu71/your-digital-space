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
  Code2,
  Zap,
  Layers,
} from "lucide-react";
import { VersionSwitcher } from "@/components/VersionSwitcher";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "f1cu — Red Team Operator & Security Researcher" },
      {
        name: "description",
        content:
          "Solo security researcher & red team operator. Penetration testing, exploit development, offensive tooling, mobile security (iOS jailbreak, Android FRP bypass), CVE research, API security testing.",
      },
      { property: "og:title", content: "f1cu — Red Team Operator & Security Researcher" },
      {
        property: "og:description",
        content:
          "Offensive security engineer. Exploit development, iOS internals, Android security, CVE research, red team automation.",
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
      <VersionSwitcher active="v1" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Stack />
        <Expertise />
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
          <span className="grid h-7 w-7 place-items-center rounded-md bg-red-600 text-background text-xs font-bold">
            F1
          </span>
          <span>f1cu</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#services" className="transition-colors hover:text-foreground">
            Services
          </a>
          <a href="#projects" className="transition-colors hover:text-foreground">
            Projects
          </a>
          <a href="#stack" className="transition-colors hover:text-foreground">
            Stack
          </a>
        </nav>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
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
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            Offensive security engineer
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            Exploits,
            <br />
            <span className="text-red-600">red team ops,</span>
            <br />
            <span className="text-muted-foreground">mobile security.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I'm f1cu — solo security researcher & red team operator. Penetration testing, exploit
            development, iOS jailbreak research, Android FRP bypass, CVE analysis, API security
            testing. Python 3.11+ stack, asyncio-first architecture.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${EMAIL}?subject=Security%20engagement%20inquiry`}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Start engagement
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border/60 pt-10 md:grid-cols-4">
          <Stat label="CVE discoveries" value="20+" />
          <Stat label="Red team ops" value="50+" />
          <Stat label="PoC exploits" value="100+" />
          <Stat label="Mobile security" value="Specialty" />
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
      title="Solo operator. Deep technical focus."
      intro="Security research and offensive operations at scale. No consultancy overhead — direct access to tools, knowledge, and custom exploitation frameworks."
    >
      <div className="grid gap-10 md:grid-cols-3">
        <AboutCard
          icon={<Code2 className="h-5 w-5" />}
          title="Exploit development"
          body="CVE research, PoC creation, weaponization. Custom payloads, staging chains, evasion techniques. Python + C/shellcode integration."
        />
        <AboutCard
          icon={<Smartphone className="h-5 w-5" />}
          title="Mobile security"
          body="iOS jailbreak era knowledge applied to modern runtime. Sandbox escapes, entitlement abuse, IPC fuzzing. Android FRP bypass, firmware analysis."
        />
        <AboutCard
          icon={<Zap className="h-5 w-5" />}
          title="Red team automation"
          body="Jebie_w_denko framework. CVE exploits, JWT attacks, OAuth/OIDC vulnerabilities, WAF bypass. Modular, async-first Python tooling."
        />
      </div>
    </Section>
  );
}

function AboutCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div>
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-red-600">
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
      title: "Red team operations",
      body: "Full-scope adversary simulation. Recon, initial access, lateral movement, privilege escalation, exfiltration. MITRE ATT&CK mapped. Detection engineering handoff.",
      bullets: [
        "Assumed-breach scenarios",
        "Multi-stage exploitation",
        "Post-exploitation tooling",
      ],
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile security research",
      body: "iOS & Android deep-dive. Reverse engineering, runtime hooking with Frida, jailbreak surface analysis, entitlement hardening, sandbox escape research.",
      bullets: ["Static + dynamic analysis", "IPC audit & fuzzing", "Jailbreak PoC development"],
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      title: "Exploit development & automation",
      body: "Custom PoC creation, weaponized exploits, CI-integrated security tooling. Python 3.11+, asyncio architecture. Delivered as standalone modules — yours to maintain.",
      bullets: ["CVE weaponization", "Custom payload chains", "Owned automation frameworks"],
    },
  ];

  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What I deliver."
      intro="Fixed-scope engagements. Working code, documented findings, and knowledge transfer. No reselling, no overhead — you work with me directly."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="flex flex-col gap-5 bg-background p-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-background">
              {s.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
            <ul className="mt-auto space-y-2 pt-4 text-sm text-muted-foreground">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-600" />
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

function Projects() {
  const projects = [
    {
      name: "Jebie_w_denko",
      subtitle: "Red team automation framework",
      description:
        "Modular exploitation framework. CVE exploits, JWT attacks, OAuth/OIDC vulnerabilities, API security testing, WAF bypass modules. Plugin-based architecture with shared utilities.",
      tech: ["Python 3.11+", "asyncio", "Modular design"],
      icon: <Zap className="h-5 w-5" />,
      link: `${GITHUB}/jebie_w_denko`,
    },
    {
      name: "Apple-kombajn",
      subtitle: "iOS security tooling GUI",
      description:
        "PySide6 desktop application for iOS security research. Jailbreak automation, FRP bypass, filesystem access, runtime hooking workflows. Cyberpunk-themed Qt widgets.",
      tech: ["PySide6", "iOS tools", "Frida integration"],
      icon: <Smartphone className="h-5 w-5" />,
      link: `${GITHUB}/apple-kombajn`,
    },
    {
      name: "bunq API security research",
      subtitle: "Independent adversarial testing",
      description:
        "Research into AI-assisted API flows, prompt-injection behavior, and SEPA transaction logic. Sensitive reproduction details intentionally withheld.",
      tech: ["API security", "Prompt injection", "SEPA flows"],
      icon: <Shield className="h-5 w-5" />,
      link: "https://www.bunq.com/en-us/about/security",
      action: "Security context",
    },
    {
      name: "CVE Research & writeups",
      subtitle: "Active exploitation research",
      description:
        "Published PoC exploits, technical writeups, and vulnerability analysis. Focus on zero-day discovery, privilege escalation chains, and mobile platform vulnerabilities.",
      tech: ["Exploit dev", "Security research", "Technical writing"],
      icon: <Code2 className="h-5 w-5" />,
      link: `${GITHUB}?tab=repositories`,
    },
  ];

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Open source & frameworks."
      intro="Tools built for red team operations and security research. Production-ready, heavily tested."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-5 rounded-2xl border border-border bg-card p-8 transition-all hover:border-red-600/50 hover:bg-card/80"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10 text-red-600">
              {p.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="inline-block rounded-full border border-border/50 bg-background/50 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-red-600 transition-colors group-hover:text-red-500">
              {p.action ?? "View"} <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Stack() {
  const groups = [
    {
      label: "Core",
      items: ["Python 3.11+", "asyncio", "FastAPI", "httpx", "Frida"],
    },
    {
      label: "Exploitation",
      items: ["Burp Suite Pro", "Cobalt Strike", "Sliver", "Custom payloads", "Shellcode"],
    },
    {
      label: "Mobile",
      items: ["Frida", "Ghidra", "Hopper", "class-dump", "iOS internals"],
    },
    {
      label: "Infrastructure",
      items: ["Docker", "AWS", "Terraform", "Git", "Linux hardening"],
    },
  ];

  return (
    <Section
      id="stack"
      eyebrow="Tech Stack"
      title="Tools & frameworks."
      intro="Production-battle-tested. Selected for reliability, not trends."
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.label} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Cpu className="h-4 w-4 text-red-600" />
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

function Expertise() {
  const areas = [
    {
      title: "Penetration Testing",
      items: ["Web/API security", "Infrastructure assessment", "Wireless networks"],
    },
    {
      title: "Mobile Security",
      items: ["iOS jailbreak research", "Android FRP bypass", "Runtime analysis"],
    },
    {
      title: "CVE & Exploit Development",
      items: ["Zero-day research", "PoC weaponization", "Privilege escalation chains"],
    },
    {
      title: "Offensive Automation",
      items: ["Framework development", "CI/CD pipeline security", "Detection evasion"],
    },
  ];

  return (
    <Section eyebrow="Expertise" id="expertise" title="Specialized knowledge.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {areas.map((a) => (
          <div key={a.title} className="rounded-2xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Layers className="h-4 w-4 text-red-600" />
              {a.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {a.items.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-red-600" />
                  {i}
                </li>
              ))}
            </ul>
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
                Have a target?
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Scope out the engagement. What's the objective, the stack, and the timeline? I'll
                provide a quote and contract within 24 hours.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href={`mailto:${EMAIL}?subject=Security%20engagement&body=Objective%3A%0AScope%3A%0ATimeline%3A`}
                className="inline-flex items-center justify-between gap-6 rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
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
              Encrypted comms available
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Direct access to me
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              NDAs signed immediately
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
        <div>© {new Date().getFullYear()} f1cu — Security researcher & red team operator</div>
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
