# f1cu.space

Professional personal website and landing page for **f1cu** — an independent offensive security engineer focused on red teaming, iOS internals research, and security automation.

## Overview

This is a single-page business card / portfolio site built to sell services directly. It is designed for clarity, fast loading, and strong calls-to-action:

- Hero with engagement status and primary CTA
- Services section: Red Team, iOS Research, Security Automation
- Stack & tooling overview
- Process from first email to final report
- Contact section with email and GitHub links

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

## Deployment

This project is built for static / edge deployment. Lovable publishes it automatically from the connected GitHub repository. You can also build locally and host the `dist/` output on any static host or edge platform.

```bash
bun run build
```

## Contact

- Website: [f1cu.space](https://f1cu.space)
- Email: [look@f1cu.space](mailto:look@f1cu.space)
- GitHub: [github.com/ficu71](https://github.com/ficu71)
