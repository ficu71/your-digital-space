export interface Project {
  name: string
  tagline: string
  desc: string
  tags: string[]
  url: string
  linkLabel: string
}

export interface MeshNode {
  id: number
  key: string
  label: string
  category: string
  color: string
  colorDim: string
  short: string
  position: [number, number, number]
  rotationY: number
  detail: {
    heading: string
    blocks: DetailBlock[]
  }
}

export type DetailBlock =
  | { kind: 'text'; value: string }
  | { kind: 'kv'; rows: [string, string][] }
  | { kind: 'stats'; rows: [string, string][] }
  | { kind: 'feature'; title: string; desc: string }
  | { kind: 'chips'; chips: string[] }
  | { kind: 'project'; project: Project }
  | { kind: 'actions'; actions: { label: string; url: string; primary?: boolean }[] }
  | { kind: 'ticks'; items: string[] }

export const NODES: MeshNode[] = [
  {
    id: 1,
    key: 'identity',
    label: 'Operator profile',
    category: 'identity',
    color: '#5eead4',
    colorDim: 'rgba(94,234,212,0.14)',
    short: 'Independent offensive security engineering from Gouda, NL.',
    position: [0, 3.75, -1.4],
    rotationY: 0,
    detail: {
      heading: 'Solo operator. Deep technical focus.',
      blocks: [
        {
          kind: 'text',
          value:
            "I'm f1cu — solo security researcher & red team operator. Penetration testing, exploit development, iOS jailbreak research, Android FRP bypass, CVE analysis, API security testing. Python 3.11+ stack, asyncio-first architecture.",
        },
        {
          kind: 'stats',
          rows: [
            ['20+', 'CVE discoveries'],
            ['50+', 'red team ops'],
            ['100+', 'PoC exploits'],
            ['mobile', 'specialty'],
          ],
        },
        {
          kind: 'kv',
          rows: [
            ['callsign', 'f1cu'],
            ['base', 'Gouda, NL — CET'],
            ['role', 'red team operator'],
            ['marker', '71'],
            ['status', 'accepting engagements'],
          ],
        },
      ],
    },
  },
  {
    id: 2,
    key: 'capabilities',
    label: 'Capability matrix',
    category: 'capabilities',
    color: '#a78bfa',
    colorDim: 'rgba(167,139,250,0.14)',
    short: 'Offensive depth across apps, identity, mobile, cloud, and automation.',
    position: [4.6, 1.9, -0.6],
    rotationY: -0.28,
    detail: {
      heading: 'What I deliver.',
      blocks: [
        {
          kind: 'feature',
          title: 'Exploit development',
          desc: 'CVE research, PoC creation, weaponization. Custom payloads, staging chains, evasion techniques. Python + C/shellcode integration.',
        },
        {
          kind: 'feature',
          title: 'Mobile security',
          desc: 'iOS jailbreak-era knowledge applied to modern runtime. Sandbox escapes, entitlement abuse, IPC fuzzing. Android FRP bypass, firmware analysis.',
        },
        {
          kind: 'feature',
          title: 'Red team automation',
          desc: 'Jebie_w_denko framework. CVE exploits, JWT attacks, OAuth/OIDC vulnerabilities, WAF bypass. Modular, async-first Python tooling.',
        },
        {
          kind: 'chips',
          chips: [
            'Python 3.11+',
            'asyncio',
            'FastAPI',
            'httpx',
            'Frida',
            'Burp Suite Pro',
            'Cobalt Strike',
            'Sliver',
            'Ghidra',
            'Hopper',
            'Docker',
            'AWS',
            'Terraform',
            'Git',
          ],
        },
      ],
    },
  },
  {
    id: 3,
    key: 'systems',
    label: 'Active systems',
    category: 'systems',
    color: '#f472b6',
    colorDim: 'rgba(244,114,182,0.14)',
    short: 'Research, red-team infrastructure, mobile tooling, and CI security.',
    position: [-4.6, 1.9, -0.6],
    rotationY: 0.28,
    detail: {
      heading: 'Open source & frameworks.',
      blocks: [
        {
          kind: 'project',
          project: {
            name: 'Jebie_w_denko',
            tagline: 'red team automation framework',
            desc: 'Modular exploitation framework. CVE exploits, JWT attacks, OAuth/OIDC vulnerabilities, API security testing, WAF bypass modules. Plugin-based architecture with shared utilities.',
            tags: ['Python 3.11+', 'asyncio', 'modular'],
            url: 'https://github.com/ficu71/jebie_w_denko',
            linkLabel: 'view repo',
          },
        },
        {
          kind: 'project',
          project: {
            name: 'Apple-kombajn',
            tagline: 'iOS security tooling GUI',
            desc: 'PySide6 desktop application for iOS security research. Jailbreak automation, FRP bypass, filesystem access, runtime hooking workflows. Cyberpunk-themed Qt widgets.',
            tags: ['PySide6', 'iOS tools', 'Frida'],
            url: 'https://github.com/ficu71/apple-kombajn',
            linkLabel: 'view repo',
          },
        },
        {
          kind: 'project',
          project: {
            name: 'bunq API security research',
            tagline: 'independent adversarial testing',
            desc: 'Research into AI-assisted API flows, prompt-injection behavior, and SEPA transaction logic. Sensitive reproduction details intentionally withheld.',
            tags: ['API security', 'prompt injection', 'SEPA'],
            url: 'https://www.bunq.com/en-us/about/security',
            linkLabel: 'security context',
          },
        },
        {
          kind: 'project',
          project: {
            name: 'CVE research & writeups',
            tagline: 'active exploitation research',
            desc: 'Published PoC exploits, technical writeups, and vulnerability analysis. Zero-day discovery, privilege escalation chains, mobile platform vulnerabilities.',
            tags: ['exploit dev', 'research', 'writeups'],
            url: 'https://github.com/ficu71?tab=repositories',
            linkLabel: 'view repos',
          },
        },
      ],
    },
  },
  {
    id: 4,
    key: 'uplink',
    label: 'Secure channel',
    category: 'uplink',
    color: '#4ade80',
    colorDim: 'rgba(74,222,128,0.14)',
    short: 'Fast scoping, NDA-ready communication, and direct operator access.',
    position: [0, 0.55, 1.9],
    rotationY: 0,
    detail: {
      heading: 'Have a target?',
      blocks: [
        {
          kind: 'text',
          value:
            "Scope out the engagement. What's the objective, the stack, and the timeline? I'll provide a quote and contract within 24 hours.",
        },
        {
          kind: 'actions',
          actions: [
            { label: 'look@f1cu.space', url: 'mailto:look@f1cu.space', primary: true },
            { label: 'github.com/ficu71', url: 'https://github.com/ficu71' },
          ],
        },
        {
          kind: 'ticks',
          items: ['Encrypted comms available', 'Direct access to me', 'NDAs signed immediately'],
        },
      ],
    },
  },
]

export const BOOT_LINES = [
  'f1cu.holo.mesh — bios v5.0.7',
  'mounting /dev/mesh0 ............ OK',
  'linking operator nodes ......... 4/4',
  'syncing core lattice ........... OK',
  'threat surface scan ............ CLEAN',
  'rendering control room .........',
]
