export const CONTENT = {
  brand: "F1CU.SPACE",
  tagline: "breaks the limits — unleashes the truth.",
  location: "warsaw · en / pl",
  email: "look@f1cu.space",
  github: "https://github.com/ficu71",
  signal: "@f1cu.42",
  availability: "open for Q4 2026",
  capabilities: [
    {
      id: "red",
      code: "01",
      title: "Red Team",
      lede: "Assumed-breach engagements, physical access, adversary emulation.",
      bullets: [
        "TIBER-style scenarios",
        "Custom C2 & implants",
        "Payload dev & AV/EDR evasion",
        "Physical pretext & drop-boxes",
      ],
    },
    {
      id: "ios",
      code: "02",
      title: "iOS Research",
      lede: "Runtime introspection, kernel & sandbox reversing, CVE work.",
      bullets: [
        "iBoot / XNU internals",
        "Sandbox / entitlement bypass",
        "Frida & Objection tooling",
        "Responsible disclosure",
      ],
    },
    {
      id: "ai",
      code: "03",
      title: "AI Agents",
      lede: "Offensive automation & guardrail probing for LLM systems.",
      bullets: [
        "Agentic red teams",
        "Prompt-injection surfaces",
        "Guardrail bypass research",
        "Retrieval poisoning",
      ],
    },
  ],
  work: [
    {
      id: "kombajn",
      title: "kombajn",
      subtitle: "apple ecosystem RE harness",
      body: "Reversing pipeline for iOS/macOS system daemons — automated symbol resolution, entitlement map, kernel struct diffing across builds.",
      angle: 0,
    },
    {
      id: "bizon",
      title: "bizon",
      subtitle: "iOS runtime probe",
      body: "Frida-first runtime harness. Injects, hooks, records — used to fingerprint sandbox drift and privilege boundaries live on device.",
      angle: 1.5708,
    },
    {
      id: "denko",
      title: "jebie_w_denko",
      subtitle: "LLM guardrail probing",
      body: "Adversarial corpus + fuzzing loop against guardrails. Enumerates refusal surfaces, jailbreak reproducibility, and drift across model updates.",
      angle: 3.1416,
    },
    {
      id: "cve",
      title: "CVE / disclosure",
      subtitle: "coordinated disclosure",
      body: "Bugs reported to Apple, Google, and vendors under coordinated disclosure. Details under NDA — references on request.",
      angle: 4.7124,
    },
  ],
} as const;

export type WorkNode = (typeof CONTENT.work)[number];
