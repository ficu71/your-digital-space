# f1cu.space — Red Team Operator & Security Researcher

Professional portfolio for **f1cu** — independent offensive security engineer specializing in red team operations, exploit development, iOS jailbreak research, Android security, and CVE analysis.

## Overview

This is a high-performance portfolio site showcasing:

- Red team capabilities and services
- Open-source frameworks (Jebie_w_denko, Apple-kombajn)
- Technical expertise areas
- Direct engagement contact
- Stack & tooling overview

Built for clarity, fast loading, and direct client acquisition.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start/) (full-stack React 19 + Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix + class-variance-authority)
- **Icons:** Lucide React
- **Package Manager:** [Bun](https://bun.sh)

## Requirements

- [Bun](https://bun.sh) >= 1.0
- Node.js-compatible environment (not required if Bun is installed)

## Getting Started

Clone the repository and install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun dev
```

Open the site in your browser:

```text
http://localhost:8080
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `bun dev` | Start local Vite dev server |
| Build | `bun run build` | Production build |
| Build (dev) | `bun run build:dev` | Development build |
| Preview | `bun run preview` | Preview the production build locally |
| Lint | `bun run lint` | Run ESLint |
| Format | `bun run format` | Format with Prettier |

## Project Structure

```text
src/
├── routes/
│   ├── __root.tsx        # Root layout, head metadata, providers
│   └── index.tsx         # Home / landing page
├── components/           # Reusable UI components
├── lib/                  # Utilities and helpers
├── styles.css            # Tailwind v4 global styles
└── ...
```

## Sections

- **Hero:** Red team operator branding, engagement status, primary CTA
- **About:** Core specializations (exploit dev, mobile security, red team automation)
- **Services:** Red team ops, mobile research, exploit development & automation
- **Projects:** Open-source frameworks (Jebie_w_denko, Apple-kombajn) and active research
- **Stack:** Technical tooling (Python 3.11+, asyncio, Frida, Burp Suite, Cobalt Strike, etc.)
- **Expertise:** Specialized knowledge areas (penetration testing, mobile security, CVE development, offensive automation)
- **Contact:** Direct email for engagement inquiries

## Deployment

Build locally and deploy to any static host:

```bash
bun run build
```

Output in `dist/` directory ready for production.

## Contact

- Email: `ficu71@proton.me`
- GitHub: [github.com/ficu71](https://github.com/ficu71)

---

Built with TanStack Start, Tailwind CSS, and shadcn/ui.
