import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
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

type Line = { kind: "in" | "out" | "sys" | "err" | "hint" | "banner"; text: string };

const BANNERS: string[][] = [
  // 0 — ANSI Shadow
  [
    "███████╗ ██╗    ██████╗██╗   ██╗",
    "██╔════╝███║   ██╔════╝██║   ██║",
    "█████╗  ╚██║   ██║     ██║   ██║",
    "██╔══╝   ██║   ██║     ██║   ██║",
    "██║      ██║   ╚██████╗╚██████╔╝",
    "╚═╝      ╚═╝    ╚═════╝ ╚═════╝ ",
  ],
  // 1 — Block outline
  [
    "┏━╸ ╻   ┏━╸ ╻ ╻",
    "┣╸  ┃   ┃   ┃ ┃",
    "╹   ╹   ┗━╸ ┗━┛",
  ],
  // 2 — Small
  [
    " __ _   ___  _   _ ",
    "/ _/ | / __|| | | |",
    "\\_||_| \\___||_|_|_|",
  ],
];

const BANNER_FOOTER = [
  "",
  "f1cu.shell v2.1.0 — offensive security // iOS // automation",
  "type 'help' to list commands, or press Tab to autocomplete.",
];

type BannerAnim = "pulse" | "flicker" | "off";
const ANIM_ORDER: BannerAnim[] = ["pulse", "flicker", "off"];


type CommandDef = {
  desc: string;
  run: (args: string[]) => string[];
};

const START_TIME = Date.now();

const COMMANDS: Record<string, CommandDef> = {
  help: {
    desc: "show this help (help <cmd> for details)",
    run: (args) => {
      if (args[0] && COMMANDS[args[0]]) {
        return [`${args[0]} — ${COMMANDS[args[0]].desc}`];
      }
      const rows = Object.entries(COMMANDS)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, def]) => `  ${name.padEnd(12)} ${def.desc}`);
      return [
        "available commands:",
        ...rows,
        "",
        "shortcuts:",
        "  Tab              autocomplete command",
        "  ↑ / ↓            history navigation",
        "  Ctrl+L           clear screen",
        "  Ctrl+C           cancel input",
        "  Ctrl+U           clear line",
        "  Ctrl+A / Ctrl+E  jump to start / end",
      ];
    },
  },
  whoami: {
    desc: "who is f1cu",
    run: () => [
      "f1cu — independent offensive security engineer.",
      "based in gouda, NL. 8+ years on the tools.",
      "focus: red team ops, iOS internals research, security automation.",
      "clients: fintechs, mobile-first products, infra teams that ship.",
    ],
  },
  skills: {
    desc: "technical stack",
    run: () => [
      "offensive     : burp pro, cobalt strike, sliver, bloodhound, nuclei",
      "ios / mobile  : frida, ghidra, hopper, objection, class-dump",
      "automation    : python, typescript, fastapi, playwright, n8n",
      "infra / cloud : aws, gcp, terraform, cloudflare, docker",
    ],
  },
  projects: {
    desc: "selected work",
    run: () => [
      "[ classified ] red team engagement — EU fintech, 2025",
      "[ classified ] ios runtime hardening review — mobile-first startup, 2025",
      "[ public     ] internal recon platform — python + fastapi + llm triage",
      "[ public     ] ci security gates — typescript + playwright + semgrep",
    ],
  },
  services: {
    desc: "how i engage",
    run: () => [
      "1. red team & adversary simulation — objective-based, MITRE ATT&CK mapped",
      "2. ios security research — static + dynamic, runtime hooking, entitlements",
      "3. security automation — custom tooling, ci-integrated, yours to keep",
    ],
  },
  contact: {
    desc: "reach out",
    run: () => [
      "email    : look@f1cu.space",
      "github   : github.com/ficu71",
      "signal   : on request",
      "pgp key  : on request",
      "nda      : signed same day",
    ],
  },
  social: {
    desc: "links",
    run: () => [
      "github   : https://github.com/ficu71",
      "email    : look@f1cu.space",
    ],
  },
  date: {
    desc: "current date/time",
    run: () => [new Date().toString()],
  },
  uptime: {
    desc: "session uptime",
    run: () => {
      const s = Math.floor((Date.now() - START_TIME) / 1000);
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      return [`up ${h}h ${m}m ${sec}s`];
    },
  },
  echo: {
    desc: "print arguments",
    run: (args) => [args.join(" ")],
  },
  banner: {
    desc: "reprint banner (static copy)",
    run: () => [...BANNERS[0], ...BANNER_FOOTER],
  },
  logo: {
    desc: "cycle ASCII logo style (logo 0|1|2)",
    run: (args) => {
      const n = args[0] ? parseInt(args[0], 10) : -1;
      window.dispatchEvent(new CustomEvent("f1cu:logo", { detail: { n } }));
      return ["logo style updated."];
    },
  },
  anim: {
    desc: "logo animation: pulse | flicker | off",
    run: (args) => {
      const mode = (args[0] ?? "").toLowerCase();
      if (mode && !["pulse", "flicker", "off"].includes(mode)) {
        return ["usage: anim pulse|flicker|off"];
      }
      window.dispatchEvent(
        new CustomEvent("f1cu:anim", { detail: { mode: mode || null } }),
      );
      return [`logo animation: ${mode || "cycled"}`];
    },
  },
  sudo: {
    desc: "try to gain root",
    run: (args) => [
      `[sudo] password for ${args[0] ?? "guest"}: `,
      "Sorry, user is not in the sudoers file. This incident will be reported.",
    ],
  },
  ls: {
    desc: "list current dir",
    run: () => [
      "drwxr-xr-x   projects/",
      "drwxr-xr-x   research/",
      "drwx------   .ssh/",
      "-rw-r--r--   README.md",
      "-rw-------   .pgp",
    ],
  },
  cat: {
    desc: "print a file (try: cat README.md)",
    run: (args) => {
      const f = args[0];
      if (!f) return ["usage: cat <file>"];
      if (f === "README.md")
        return [
          "# f1cu",
          "offensive security engineer for hire.",
          "run 'services' and 'contact' for engagement details.",
        ];
      if (f === ".pgp" || f === ".ssh" || f === ".ssh/") return ["cat: " + f + ": Permission denied"];
      return [`cat: ${f}: No such file or directory`];
    },
  },
  open: {
    desc: "open a link (open github | email)",
    run: (args) => {
      const t = args[0];
      if (t === "github") {
        window.open("https://github.com/ficu71", "_blank");
        return ["opening github.com/ficu71 ..."];
      }
      if (t === "email") {
        window.location.href = "mailto:look@f1cu.space";
        return ["composing mail to look@f1cu.space ..."];
      }
      return ["usage: open github|email"];
    },
  },
  goto: {
    desc: "switch version (goto v1|v2|v3|v4|v5)",
    run: (args) => {
      const v = args[0];
      if (!v || !/^v[1-5]$/.test(v)) return ["usage: goto v1|v2|v3|v4|v5"];
      const path = v === "v1" ? "/" : `/${v}`;
      window.location.href = path;
      return [`navigating to ${path} ...`];
    },
  },
  theme: {
    desc: "toggle amber/green phosphor",
    run: () => {
      document.documentElement.classList.toggle("term-amber");
      return ["theme toggled."];
    },
  },
  clear: {
    desc: "clear screen (Ctrl+L)",
    run: () => [],
  },
  exit: {
    desc: "close session (not really)",
    run: () => [
      "connection closed by remote host.",
      "just kidding. type 'help' to continue.",
    ],
  },
};

function TerminalPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [booted, setBooted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandNames = useMemo(() => Object.keys(COMMANDS).sort(), []);

  // Boot sequence
  useEffect(() => {
    const boot: Line[] = [
      { kind: "sys", text: "[  ok  ] initializing shell..." },
      { kind: "sys", text: "[  ok  ] loading opsec profile" },
      { kind: "sys", text: "[  ok  ] mounting /home/f1cu" },
      { kind: "sys", text: "" },
      ...BANNER_FOOTER.map((t) => ({ kind: "sys" as const, text: t })),
      { kind: "sys", text: "" },
    ];
    let i = 0;
    let cancelled = false;
    setLines([]);
    const timer = setInterval(() => {
      if (cancelled) return;
      const next = boot[i];
      i++;
      if (next) setLines((prev) => [...prev, next]);
      if (i >= boot.length) {
        clearInterval(timer);
        setBooted(true);
      }
    }, 50);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);


  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    const onClick = () => inputRef.current?.focus();
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const setInputAndCursor = (v: string, c?: number) => {
    setInput(v);
    const pos = c ?? v.length;
    
    requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(pos, pos);
    });
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    const echo: Line = { kind: "in", text: raw };
    if (!trimmed) {
      setLines((p) => [...p, echo]);
      return;
    }
    setHistory((h) => [...h, raw]);
    setHistIdx(-1);

    const [name, ...args] = trimmed.split(/\s+/);
    const cmd = name.toLowerCase();

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const def = COMMANDS[cmd];
    if (!def) {
      // suggest
      const suggestion = commandNames.find((c) => c.startsWith(cmd));
      const hint = suggestion ? ` did you mean '${suggestion}'?` : "";
      setLines((p) => [
        ...p,
        echo,
        { kind: "err", text: `command not found: ${cmd}.${hint} try 'help'.` },
      ]);
      return;
    }
    const out = def.run(args);
    setLines((p) => [...p, echo, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
  };

  const handleTab = () => {
    const parts = input.split(/\s+/);
    // only autocomplete the command name (first token)
    if (parts.length > 1) return;
    const prefix = parts[0] ?? "";
    if (!prefix) {
      setLines((p) => [...p, { kind: "hint", text: commandNames.join("  ") }]);
      return;
    }
    const matches = commandNames.filter((c) => c.startsWith(prefix.toLowerCase()));
    if (matches.length === 0) return;
    if (matches.length === 1) {
      setInputAndCursor(matches[0] + " ");
      return;
    }
    // common prefix
    let common = matches[0];
    for (const m of matches) {
      let i = 0;
      while (i < common.length && i < m.length && common[i] === m[i]) i++;
      common = common.slice(0, i);
    }
    if (common.length > prefix.length) {
      setInputAndCursor(common);
    } else {
      setLines((p) => [...p, { kind: "hint", text: matches.join("  ") }]);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    // Ctrl shortcuts
    if (e.ctrlKey || e.metaKey) {
      const k = e.key.toLowerCase();
      if (k === "l") {
        e.preventDefault();
        setLines([]);
        return;
      }
      if (k === "c") {
        e.preventDefault();
        setLines((p) => [...p, { kind: "in", text: input + "^C" }]);
        setInputAndCursor("");
        setHistIdx(-1);
        return;
      }
      if (k === "u") {
        e.preventDefault();
        setInputAndCursor("");
        return;
      }
      if (k === "a") {
        e.preventDefault();
        inputRef.current?.setSelectionRange(0, 0);
        return;
      }
      if (k === "e") {
        e.preventDefault();
        inputRef.current?.setSelectionRange(input.length, input.length);
        return;
      }
      if (k === "w") {
        e.preventDefault();
        setInputAndCursor(input.replace(/\s*\S+\s*$/, ""));
        return;
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
      return;
    }
    if (e.key === "Enter") {
      run(input);
      setInputAndCursor("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInputAndCursor(history[next]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInputAndCursor("");
      } else {
        setHistIdx(next);
        setInputAndCursor(history[next]);
      }
      return;
    }
  };

  const colorFor = (k: Line["kind"]) => {
    switch (k) {
      case "in":
        return "text-green-200";
      case "sys":
        return "text-green-500/80";
      case "err":
        return "text-red-400";
      case "hint":
        return "text-cyan-300/90";
      default:
        return "text-green-400";
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

      {/* hint bar */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 border-t border-green-900/60 bg-black/70 px-4 py-1.5 text-[11px] text-green-600 backdrop-blur">
        <span className="mr-4"><kbd className="text-green-300">Tab</kbd> complete</span>
        <span className="mr-4"><kbd className="text-green-300">↑↓</kbd> history</span>
        <span className="mr-4"><kbd className="text-green-300">Ctrl+L</kbd> clear</span>
        <span className="mr-4"><kbd className="text-green-300">Ctrl+C</kbd> cancel</span>
        <span className="mr-4"><kbd className="text-green-300">Ctrl+U</kbd> clear line</span>
        <span><kbd className="text-green-300">help</kbd> for commands</span>
      </div>

      <div
        ref={scrollRef}
        className="relative z-20 mx-auto h-screen max-w-4xl overflow-y-auto px-6 py-10 pb-16"
      >
        <pre className="whitespace-pre-wrap break-words">
          {lines.filter(Boolean).map((l, i) => (
            <div key={i} className={colorFor(l.kind)}>
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
          </div>
        )}
      </div>
    </div>
  );
}
