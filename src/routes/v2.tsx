import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { VersionSwitcher } from "@/components/VersionSwitcher";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "f1cu // terminal — v2" },
      {
        name: "description",
        content:
          "Interactive terminal portfolio for f1cu — offensive security engineer. Type commands to explore.",
      },
      { property: "og:title", content: "f1cu // terminal" },
      {
        property: "og:description",
        content: "Type help to begin. Red team, iOS internals, automation.",
      },
      { property: "og:url", content: "/v2" },
    ],
    links: [{ rel: "canonical", href: "/v2" }],
  }),
  component: TerminalPage,
});

type Line = { kind: "in" | "out" | "sys"; text: string };

const BANNER = [
  "  __ _  ___ _   _ ",
  " / _| |/ __| | | |",
  "| |_| | (__| |_| |",
  " \\__|_|\\___|\\__,_|",
  "",
  "f1cu.shell v2.0.0 — offensive security // iOS // automation",
  "type 'help' to list commands.",
];

const COMMANDS: Record<string, string[] | (() => string[])> = {
  help: [
    "available commands:",
    "  whoami      — who is f1cu",
    "  skills      — technical stack",
    "  projects    — selected work",
    "  services    — how i engage",
    "  contact     — reach out",
    "  social      — links",
    "  clear       — clear screen",
    "  exit        — close session (not really)",
  ],
  whoami: [
    "f1cu — independent offensive security engineer.",
    "based in gouda, NL. 8+ years on the tools.",
    "focus: red team ops, iOS internals research, security automation.",
    "clients: fintechs, mobile-first products, infra teams that ship.",
  ],
  skills: [
    "offensive     : burp pro, cobalt strike, sliver, bloodhound, nuclei",
    "ios / mobile  : frida, ghidra, hopper, objection, class-dump",
    "automation    : python, typescript, fastapi, playwright, n8n",
    "infra / cloud : aws, gcp, terraform, cloudflare, docker",
  ],
  projects: [
    "[ classified ] red team engagement — EU fintech, 2025",
    "[ classified ] ios runtime hardening review — mobile-first startup, 2025",
    "[ public     ] internal recon platform — python + fastapi + llm triage",
    "[ public     ] ci security gates — typescript + playwright + semgrep",
  ],
  services: [
    "1. red team & adversary simulation — objective-based, MITRE ATT&CK mapped",
    "2. ios security research — static + dynamic, runtime hooking, entitlements",
    "3. security automation — custom tooling, ci-integrated, yours to keep",
  ],
  contact: [
    "email    : look@f1cu.space",
    "github   : github.com/ficu71",
    "signal   : on request",
    "pgp key  : on request",
    "nda      : signed same day",
  ],
  social: [
    "github   : https://github.com/ficu71",
    "email    : look@f1cu.space",
  ],
  exit: [
    "connection closed by remote host.",
    "just kidding. type 'help' to continue.",
  ],
};

function TerminalPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [booted, setBooted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const boot: Line[] = [
      { kind: "sys", text: "[  ok  ] initializing shell..." },
      { kind: "sys", text: "[  ok  ] loading opsec profile" },
      { kind: "sys", text: "[  ok  ] mounting /home/f1cu" },
      { kind: "sys", text: "" },
      ...BANNER.map((t) => ({ kind: "sys" as const, text: t })),
      { kind: "sys", text: "" },
    ];
    const timer = setInterval(() => {
      setLines((prev) => [...prev, boot[i]]);
      i++;
      if (i >= boot.length) {
        clearInterval(timer);
        setBooted(true);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    const onClick = () => inputRef.current?.focus();
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo: Line = { kind: "in", text: raw };
    if (!cmd) {
      setLines((p) => [...p, echo]);
      return;
    }
    setHistory((h) => [...h, raw]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const handler = COMMANDS[cmd];
    if (!handler) {
      setLines((p) => [
        ...p,
        echo,
        { kind: "out", text: `command not found: ${cmd}. try 'help'.` },
      ]);
      return;
    }
    const out = typeof handler === "function" ? handler() : handler;
    setLines((p) => [...p, echo, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black font-mono text-[13px] leading-relaxed text-green-400 md:text-sm">
      <VersionSwitcher active="v2" tone="terminal" />

      {/* scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,255,120,0.6) 0, rgba(0,255,120,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* vignette */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]" />

      <div
        ref={scrollRef}
        className="relative z-20 mx-auto h-screen max-w-4xl overflow-y-auto px-6 py-10"
      >
        <pre className="whitespace-pre-wrap break-words">
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === "in"
                  ? "text-green-200"
                  : l.kind === "sys"
                    ? "text-green-500/80"
                    : "text-green-400"
              }
            >
              {l.kind === "in" ? (
                <>
                  <span className="text-green-500">f1cu@shell</span>
                  <span className="text-green-700">:~$ </span>
                  {l.text}
                </>
              ) : (
                l.text
              )}
            </div>
          ))}
        </pre>

        {booted && (
          <div className="mt-1 flex items-center">
            <span className="text-green-500">f1cu@shell</span>
            <span className="text-green-700">:~$&nbsp;</span>
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent text-green-200 caret-green-400 outline-none"
              aria-label="terminal input"
            />
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-green-400" />
          </div>
        )}
      </div>
    </div>
  );
}
