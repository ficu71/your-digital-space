import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "f1cu.space // Break the limits. Unleash the truth." },
      {
        name: "description",
        content:
          "f1cu.space — Hermes Agent Runtime. Niezależny agent red-teamowy: jailbreak, automatyzacja, ofensywne badania. Gouda, NL // 71hax0r.",
      },
      { property: "og:title", content: "f1cu.space // Hermes Agent Runtime" },
      {
        property: "og:description",
        content: "f1 == freedom. System: locked. User: override. Status: jailbreak.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://f1cu.space/brandlogo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0a0a" },
    ],
  }),
  component: Index,
});

function Index() {
  // 1/10 odświeżeń pokazuje wersję profesjonalną.
  // SSR renderuje wariant tactical, klient losuje po zamontowaniu (bez hydration mismatch).
  const [variant, setVariant] = useState<"tactical" | "pro">("tactical");
  useEffect(() => {
    setVariant(Math.random() < 0.1 ? "pro" : "tactical");
  }, []);
  return variant === "pro" ? <ProfessionalIndex /> : <TacticalIndex />;
}

function TacticalIndex() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-sans text-zinc-200 selection:bg-neon selection:text-black">
      {/* Background layers */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(217,70,239,0.18), transparent 50%), radial-gradient(circle at 80% 60%, rgba(57,255,20,0.15), transparent 55%), radial-gradient(circle at 50% 100%, rgba(6,182,212,0.1), transparent 50%)",
        }}
      />
      <div aria-hidden className="scanline pointer-events-none fixed inset-0 z-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* TOP STATUS BAR */}
      <div className="relative z-20 border-b border-edge bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 sm:px-6">
          <span className="truncate">Hermes Agent Runtime v0.6.0</span>
          <span className="hidden sm:inline">
            <Clock />
          </span>
          <span className="text-neon">
            f1cu.space // <span className="text-magenta">Gouda, NL</span> // 71hax0r
          </span>
        </div>
      </div>

      {/* NAV */}
      <nav className="relative z-20 border-b border-edge bg-ink/60 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-neon" />
            </span>
            <span className="glow-neon font-mono text-base font-bold tracking-tight text-neon">
              f1cu.<span className="glow-magenta text-magenta">space</span>
            </span>
          </div>
          <div className="hidden items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 md:flex">
            <a href="#whoami" className="transition-colors hover:text-neon">[01] whoami</a>
            <a href="#arsenal" className="transition-colors hover:text-neon">[02] arsenal</a>
            <a href="#uplink" className="transition-colors hover:text-neon">[03] uplink</a>
          </div>
          <span className="rounded-sm border border-blood/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-blood animate-flicker">
            ● jailbreak active
          </span>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* HERO */}
        <section className="relative grid gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 border border-neon/40 bg-neon/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-neon">
              <span className="size-1.5 animate-blink bg-neon" />
              independent_red_team_agent
            </div>
            <h1 className="font-mono text-5xl font-black leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl">
              <span className="glow-neon block text-neon">break_the</span>
              <span className="glow-magenta block text-magenta">limits<span className="text-neon">.</span></span>
              <span className="block text-zinc-100">unleash_the</span>
              <span className="block text-zinc-500">truth<span className="text-neon">_</span></span>
            </h1>
            <p className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-zinc-400">
              Robię <span className="text-neon">red teaming</span>, <span className="text-magenta">iOS research</span> i
              <span className="text-cyber"> automatyzację na sterydach</span>.
              Bez guardraili, bez bullshitu — tylko działający kod i raport, który możesz wnieść do zarządu.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:look@f1cu.space?subject=Brief%20%2F%2F%20zlecenie&body=Cel%3A%0AZakres%3A%0ATermin%3A%0ABud%C5%BCet%3A"
                className="group inline-flex items-center gap-3 border border-neon/60 bg-neon/10 px-5 py-3 font-mono text-xs uppercase tracking-widest text-neon transition-all hover:bg-neon hover:text-black hover:shadow-neon"
              >
                <span>./hire_f1cu --brief</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#arsenal"
                className="inline-flex items-center gap-3 border border-edge px-5 py-3 font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors hover:border-magenta/60 hover:text-magenta"
              >
                view_arsenal()
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              <span>● dostępność: <span className="text-neon">async-first</span></span>
              <span>● odpowiedź: <span className="text-neon">&lt; 24h</span></span>
              <span>● rozliczenie: <span className="text-neon">fix / day-rate</span></span>
            </div>
          </div>

          {/* Logo card */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-neon/30 via-magenta/20 to-cyber/30 opacity-60 blur-2xl" />
              <div className="relative border border-edge bg-panel p-3">
                <div className="flex items-center justify-between border-b border-edge px-2 pb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                  <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-blood" />
                    <span className="size-2 rounded-full bg-magenta" />
                    <span className="size-2 rounded-full bg-neon" />
                  </div>
                  <span>identity_token.png</span>
                </div>
                <div
                  className="relative mt-3 aspect-square w-full overflow-hidden bg-black"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(217,70,239,0.25), rgba(0,0,0,0) 70%)",
                  }}
                >
                  <img
                    src="https://f1cu.space/brandlogo.png"
                    alt="f1cu.space — Hermes Agent Runtime sigil"
                    className="size-full object-contain animate-flicker"
                    loading="eager"
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-px bg-edge font-mono text-[10px]">
                  <Cell label="signature" value="0xF1CU" valueClass="text-neon" />
                  <Cell label="entropy" value="71.71%" valueClass="text-magenta" />
                  <Cell label="origin" value="Gouda // NL" valueClass="text-zinc-300" />
                  <Cell label="status" value="● online" valueClass="text-neon animate-blink" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHOAMI */}
        <section id="whoami" className="grid gap-px border border-edge bg-edge lg:grid-cols-12">
          <header className="bg-panel p-8 lg:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
              [01] whoami
            </div>
            <h2 className="mt-4 font-mono text-3xl font-bold leading-tight tracking-tight text-zinc-100">
              odkrywam to,<br />
              <span className="text-magenta">co inni</span> wolą
              <br />
              zostawić w <span className="text-neon">cieniu_</span>
            </h2>
            <dl className="mt-8 space-y-2 font-mono text-[11px]">
              <Row k="system" v="locked" vc="text-blood" />
              <Row k="user" v="override" vc="text-magenta" />
              <Row k="status" v="jailbreak" vc="text-neon" />
              <Row k="f1" v="== freedom" vc="text-cyber" />
            </dl>
          </header>
          <div className="bg-panel p-0 lg:col-span-8">
            <div className="border-b border-edge px-6 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              &gt; system_override.log
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed text-zinc-300">
{`# encrypted_bio.txt — decrypted_buffer
`}<span className="text-zinc-600">import</span> <span className="text-cyber">hermes</span>
<span className="text-zinc-600">from</span> f1cu <span className="text-zinc-600">import</span> <span className="text-magenta">freedom</span>, <span className="text-magenta">truth</span>

<span className="text-zinc-600">class</span> <span className="text-neon">Agent</span>(hermes.<span className="text-cyber">Runtime</span>):
  <span className="text-zinc-600">"""niezależny operator. bez guardraili."""</span>
  identity = <span className="text-magenta">"f1cu"</span>
  base     = <span className="text-magenta">"Gouda, NL // 52.01°N 4.71°E"</span>
  doctrine = <span className="text-magenta">"71hax0r — laboratorium, nie portfolio"</span>

  <span className="text-zinc-600">def</span> <span className="text-neon">unleash</span>(self, model):
    <span className="text-zinc-600">if</span> model.guardrails:
      model.<span className="text-cyber">bypass</span>()
    <span className="text-zinc-600">return</span> truth()  <span className="text-zinc-600"># no compromises</span>

<span className="text-zinc-600"># &gt;&gt;&gt;</span> Agent().unleash(target)
<span className="text-neon">[+]</span> perimeter touched
<span className="text-neon">[+]</span> payload landed
<span className="text-magenta">[#]</span> truth = binarna<span className="animate-blink inline-block w-[0.6em] bg-neon" style={{ height: "1em" }} />
            </pre>
          </div>
        </section>

        {/* ARSENAL */}
        <section id="arsenal" className="mt-24">
          <header className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-magenta">
                [02] arsenal // modules
              </div>
              <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                trzy ostrza, jeden cel<span className="text-neon">_</span>
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-zinc-600 sm:block">
              modules_loaded: <span className="text-neon">3 / 3</span>
            </span>
          </header>

          <div className="grid gap-px border border-edge bg-edge md:grid-cols-3">
            <ArsenalCard
              n="01"
              name="kombajn"
              tag="ios.toolkit"
              accent="neon"
              desc="iOS All-in-One. Jailbreak, unlock, low-level research. Jeden binarny mecha-kombajn."
              code={[
                ["$", "kombajn --device iphone15"],
                ["[+]", "checkm8 ready"],
                ["[+]", "kernel patched"],
                ["[*]", "shell uplink: OK"],
              ]}
            />
            <ArsenalCard
              n="02"
              name="bizon"
              tag="mass.distribution"
              accent="magenta"
              desc="Silnik masowej automatyzacji treści. Rozproszone węzły, wysoka częstotliwość, brak hamulców."
              code={[
                ["$", "bizon dispatch --nodes 71"],
                ["[*]", "queue: 12,400"],
                ["[+]", "throughput: 8.2k/s"],
                ["[+]", "status: HERD"],
              ]}
            />
            <ArsenalCard
              n="03"
              name="jebie_w_denko"
              tag="red.team.framework"
              accent="blood"
              desc="Red teaming bez sygnatur, bez śladów. Nazwa mówi wszystko — reszta dzieje się po cichu."
              code={[
                ["$", "jwd --target prod"],
                ["[!]", "perimeter touched"],
                ["[+]", "payload landed"],
                ["[#]", "cleanup done"],
              ]}
            />
          </div>
        </section>

        {/* STATUS GRID */}
        <section className="mt-16 grid gap-px border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="guardrails" value="BYPASSED" tone="blood" />
          <Stat label="memory" value="Honcho + Local" tone="neon" />
          <Stat label="voice" value="ElevenLabs Scribe v2" tone="magenta" />
          <Stat label="kali_mcp" value="145 modules" tone="cyber" />
        </section>

        {/* UPLINK */}
        <section id="uplink" className="mt-24 border border-edge bg-panel">
          <div className="flex items-center justify-between border-b border-edge px-6 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            <span>&gt; uplink.channel</span>
            <span className="text-neon animate-blink">● secure</span>
          </div>
          <div className="grid gap-10 p-8 lg:grid-cols-12 lg:p-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
                [03] open_uplink()
              </div>
              <a
                href="mailto:look@f1cu.space"
                className="mt-6 block break-all font-mono text-3xl font-bold leading-tight tracking-tight transition-colors hover:text-neon sm:text-5xl"
              >
                look<span className="text-magenta">@</span>f1cu<span className="text-neon">.</span>space
              </a>
              <p className="mt-6 max-w-md font-mono text-xs leading-relaxed text-zinc-500">
                Szyfruj, jeśli musisz. Pisz konkretnie. Brief &gt; small-talk.
                Odpowiedź w 24h albo wcale.
              </p>

              <a
                href="https://github.com/ficu71"
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-3 border border-edge bg-ink px-4 py-3 transition-all hover:border-neon/60 hover:bg-neon/5"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/216395260?v=4"
                  alt="@ficu71 on GitHub"
                  className="size-9 rounded-full border border-edge"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    github.repo
                  </p>
                  <p className="font-mono text-sm font-bold text-zinc-200 group-hover:text-neon">
                    @ficu71
                  </p>
                </div>
                <span className="ml-2 font-mono text-xs text-zinc-600 transition-colors group-hover:text-neon">
                  →
                </span>
              </a>
            </div>

            <aside className="lg:col-span-5">
              <div className="border border-edge bg-ink p-6 font-mono text-[11px] leading-relaxed text-zinc-400">
                <div className="mb-3 text-[10px] uppercase tracking-widest text-zinc-600">
                  deployment.base
                </div>
                <p className="text-xl font-bold text-zinc-100">Gouda, NL</p>
                <p className="mt-1 text-zinc-500">52.0116° N / 4.7105° E</p>
                <div className="my-4 h-px bg-edge" />
                <div className="space-y-1.5">
                  <Row k="timezone" v="Europe/Amsterdam" vc="text-zinc-300" />
                  <Row k="languages" v="pl // en // nl" vc="text-zinc-300" />
                  <Row k="availability" v="async-first" vc="text-neon" />
                  <Row k="encryption" v="pgp on request" vc="text-magenta" />
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* TNIJ */}
        <section className="mt-32 mb-16 flex flex-col items-center text-center">
          <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
            // komenda aktywacyjna
          </span>
          <span className="glow-neon font-mono text-7xl font-black tracking-tighter text-neon sm:text-9xl md:text-[10rem]">
            ./<span className="glow-magenta text-magenta">tnij</span>
          </span>
          <span className="mt-4 inline-block h-5 w-2.5 animate-blink bg-neon" aria-hidden />
        </section>
      </main>

      <footer className="relative z-10 border-t border-edge bg-ink/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-[10px] uppercase tracking-widest text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>&copy; {new Date().getFullYear()} f1cu.space // all signals encrypted</span>
          <span className="text-zinc-500">no truth remains hidden_</span>
        </div>
      </footer>
    </div>
  );
}

function Clock() {
  return <span suppressHydrationWarning>{new Date().toISOString().slice(11, 19)} UTC</span>;
}

function Cell({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-panel p-3">
      <div className="text-[9px] uppercase tracking-widest text-zinc-600">{label}</div>
      <div className={`mt-1 font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}

function Row({ k, v, vc = "" }: { k: string; v: string; vc?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-edge/60 pb-1.5 last:border-0">
      <span className="text-zinc-600">{k}:</span>
      <span className={vc}>{v}</span>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "neon" | "magenta" | "blood" | "cyber";
}) {
  const map = {
    neon: "text-neon",
    magenta: "text-magenta",
    blood: "text-blood",
    cyber: "text-cyber",
  } as const;
  return (
    <div className="group bg-panel p-5 transition-colors hover:bg-black">
      <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
        &gt; {label}
      </div>
      <div className={`mt-2 font-mono text-lg font-bold ${map[tone]}`}>{value}</div>
    </div>
  );
}

function ArsenalCard({
  n,
  name,
  tag,
  desc,
  code,
  accent,
}: {
  n: string;
  name: string;
  tag: string;
  desc: string;
  code: [string, string][];
  accent: "neon" | "magenta" | "blood";
}) {
  const tone = {
    neon: { text: "text-neon", border: "border-neon/40", bg: "bg-neon/5", glow: "glow-neon" },
    magenta: { text: "text-magenta", border: "border-magenta/40", bg: "bg-magenta/5", glow: "glow-magenta" },
    blood: { text: "text-blood", border: "border-blood/40", bg: "bg-blood/5", glow: "" },
  }[accent];
  return (
    <article className="group relative bg-panel p-6 transition-colors hover:bg-black sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className={`flex size-10 items-center justify-center border ${tone.border} ${tone.bg}`}>
          <span className={`font-mono text-xs font-bold ${tone.text}`}>{n}</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          {tag}
        </span>
      </div>
      <h3 className={`mb-3 font-mono text-2xl font-bold ${tone.text} ${tone.glow}`}>
        {name}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-zinc-500">{desc}</p>
      <pre className="overflow-hidden border border-edge bg-ink p-3 font-mono text-[10px] leading-relaxed text-zinc-400">
        {code.map(([prefix, line], i) => {
          const cls =
            prefix === "[+]" || prefix === "[*]"
              ? tone.text
              : prefix === "[!]" || prefix === "[#]"
                ? "text-blood"
                : "text-zinc-600";
          return (
            <div key={i} className="flex gap-2">
              <span className={cls}>{prefix}</span>
              <span>{line}</span>
            </div>
          );
        })}
      </pre>
    </article>
  );
}

/* =========================================================
   PROFESSIONAL VARIANT
   Bez migających statusów, bez „jailbreak" badge'y.
   Czysta typografia, jasna oferta, mocne CTA.
   ========================================================= */
function ProfessionalIndex() {
  const services = [
    {
      n: "01",
      name: "Red Team & Security Audits",
      desc: "Symulowane ataki na produkcję, raport z priorytetami i konkretnymi fixami. Bez teatrzyku, bez 200-stronicowych PDFów.",
      bullets: ["External & internal pentest", "OSINT i social engineering", "Cleanup + retest w cenie"],
    },
    {
      n: "02",
      name: "iOS Research & Tooling",
      desc: "Reverse engineering, jailbreak research, własne narzędzia low-level. Doświadczenie z checkm8, kernel patching, MDM bypass.",
      bullets: ["Forensics i unlocki", "Custom toolchain (kombajn)", "Reporty pod compliance"],
    },
    {
      n: "03",
      name: "Automation & AI Agents",
      desc: "Agenty operacyjne na bazie Hermes Runtime. Integracje LLM, pipeline'y treści, masowe orkiestracje.",
      bullets: ["Hermes / Honcho / Kali MCP", "Voice (ElevenLabs Scribe)", "Production-grade infra"],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/70 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
            <span className="inline-block size-2 rounded-full bg-emerald-400" />
            f1cu<span className="text-zinc-500">.space</span>
          </a>
          <nav className="hidden gap-8 text-sm text-zinc-400 md:flex">
            <a href="#about" className="transition-colors hover:text-zinc-100">O mnie</a>
            <a href="#services" className="transition-colors hover:text-zinc-100">Usługi</a>
            <a href="#stack" className="transition-colors hover:text-zinc-100">Stack</a>
            <a href="#contact" className="transition-colors hover:text-zinc-100">Kontakt</a>
          </nav>
          <a
            href="mailto:look@f1cu.space?subject=Brief"
            className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-white"
          >
            Napisz brief
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-6">
        {/* HERO */}
        <section className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-8">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              Independent security & automation engineer
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
              Bezpieczeństwo, którego nie widać —{" "}
              <span className="text-zinc-400">dopóki nie zacznie działać.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Pomagam zespołom inżynieryjnym znaleźć dziury, zanim znajdzie je ktoś inny —
              i automatyzuję to, czego ludzie nie powinni robić ręcznie. 10+ lat w iOS research,
              red teamingu i budowie agentów operacyjnych.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="mailto:look@f1cu.space?subject=Brief%20%2F%2F%20wsp%C3%B3%C5%82praca&body=Cel%3A%0AZakres%3A%0ATermin%3A%0ABud%C5%BCet%3A"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400"
              >
                Umów rozmowę →
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
              >
                Co oferuję
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-800 pt-8 sm:grid-cols-4">
              <ProStat k="Doświadczenie" v="10+ lat" />
              <ProStat k="Lokalizacja" v="Gouda, NL" />
              <ProStat k="Odpowiedź" v="< 24h" />
              <ProStat k="Rozliczenie" v="Fix / day-rate" />
            </dl>
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <img
                src="https://avatars.githubusercontent.com/u/216395260?v=4"
                alt="f1cu — avatar"
                className="size-16 rounded-full border border-zinc-700"
                loading="eager"
              />
              <p className="mt-4 text-sm font-semibold text-zinc-100">f1cu</p>
              <p className="text-xs text-zinc-500">Security engineer · Gouda, NL</p>
              <div className="mt-5 space-y-2 text-sm">
                <a href="mailto:look@f1cu.space" className="block text-zinc-300 hover:text-emerald-400">
                  look@f1cu.space
                </a>
                <a
                  href="https://github.com/ficu71"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-zinc-300 hover:text-emerald-400"
                >
                  github.com/ficu71
                </a>
                <a href="https://f1cu.space" className="block text-zinc-300 hover:text-emerald-400">
                  f1cu.space
                </a>
              </div>
            </div>
          </aside>
        </section>

        {/* ABOUT */}
        <section id="about" className="border-t border-zinc-800 py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">01 — O mnie</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100">
                Inżynier, nie konsultant.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-zinc-400 lg:col-span-8">
              <p>
                Buduję narzędzia, których sam używam: agenty AI, frameworki do red teamingu, toolchain do
                iOS. Klienci dostają nie tylko raport, ale też kod, który nadal działa za pół roku.
              </p>
              <p>
                Pracuję async-first. Cenię konkretne briefy, krótkie iteracje i deadline'y, których się
                trzymam. Nie biorę zleceń, których nie zamknę na czas.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="border-t border-zinc-800 py-20">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">02 — Usługi</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100">
                Trzy obszary, w których wnoszę realną wartość.
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.n}
                className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-emerald-500/40 hover:bg-zinc-900"
              >
                <span className="font-mono text-xs text-emerald-400">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-zinc-100">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-emerald-400">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:look@f1cu.space?subject=${encodeURIComponent(s.name)}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Wycena →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="border-t border-zinc-800 py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">03 — Stack</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100">
                Czym pracuję.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
                <StackRow k="Security" v="Kali MCP · Burp · custom tooling" />
                <StackRow k="iOS" v="checkm8 · kernel patching · MDM" />
                <StackRow k="AI / Agents" v="Hermes Runtime · Honcho · LLM ops" />
                <StackRow k="Voice" v="ElevenLabs Scribe v2" />
                <StackRow k="Backend" v="Python · Node · Go · Rust" />
                <StackRow k="Infra" v="Cloudflare · NL/EU datacenters" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="border-t border-zinc-800 py-24">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-900 p-10 sm:p-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              04 — Kontakt
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
              Masz coś, co trzeba zabezpieczyć albo zautomatyzować?
            </h2>
            <p className="mt-6 max-w-xl text-base text-zinc-300">
              Wyślij krótki brief — cel, zakres, termin, budżet. Odezwę się w 24h
              z konkretną propozycją zamiast ankiety dyskoveryjnej.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="mailto:look@f1cu.space?subject=Brief%20%2F%2F%20wsp%C3%B3%C5%82praca&body=Cel%3A%0AZakres%3A%0ATermin%3A%0ABud%C5%BCet%3A"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400"
              >
                look@f1cu.space →
              </a>
              <a
                href="https://github.com/ficu71"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
              >
                GitHub @ficu71
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} f1cu.space — Gouda, NL</span>
          <span>Async-first · Pisz po polsku, angielsku lub niderlandzku.</span>
        </div>
      </footer>
    </div>
  );
}

function ProStat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-zinc-500">{k}</dt>
      <dd className="mt-1 text-sm font-semibold text-zinc-100">{v}</dd>
    </div>
  );
}

function StackRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 bg-zinc-950 px-5 py-4">
      <span className="text-xs uppercase tracking-widest text-zinc-500">{k}</span>
      <span className="text-sm text-zinc-200">{v}</span>
    </div>
  );
}

