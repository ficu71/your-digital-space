# Plan: 4 alternatywne wersje strony f1cu

Obecna strona (`/`) pozostaje bez zmian. Dodaję cztery osobne trasy, każda z innym kierunkiem wizualnym.

## Nowe trasy

### `/v2` — Terminal Brutalist
- Pełnoekranowy interaktywny terminal (fake shell).
- Komendy: `whoami`, `skills`, `projects`, `contact`, `help`, `clear`.
- Monospace (JetBrains Mono), zielony fosfor na czarnym, migający kursor, scanlines CSS.
- Typewriter effect przy bootowaniu, historia komend (strzałki góra/dół).
- Brak zewnętrznej biblioteki — czysty React state.

### `/v3` — Interaktywny SVG (network graph)
- Główna sekcja: interaktywny SVG przedstawiający graf węzłów (red team, iOS, automation, OSINT, tooling) połączonych liniami z centralnym węzłem "f1cu".
- Hover na węźle → podświetlenie połączeń + panel z opisem obszaru.
- Drag węzłów (prosta symulacja sił w useEffect, bez d3), animowane linie (SVG `<animate>` na `stroke-dashoffset`).
- Tło: siatka SVG, akcent cyjan `#22d3ee` na ciemnym `#0a0f1a`.
- Space Grotesk do UI, JetBrains Mono do etykiet.

### `/v4` — Editorial / Magazine
- Layout inspirowany magazynem: asymetryczna siatka 12 kolumn, duża typografia serif (Fraunces) mieszana z mono.
- Sekcje jako "artykuły": numerowane (01 — Red Team, 02 — iOS Research, 03 — Automation).
- Tło kość słoniowa `#f5f1ea`, tekst grafit `#1a1a1a`, akcent karmazyn `#8b1e2b`.
- Sticky boczny spis treści, subtelne parallax na scrollu (CSS only).

### `/v5` — Cyberpunk Neon Glass
- Glassmorphism na ciemnym gradiencie (fioletowy → cyjan), animowane blob'y w tle.
- Hero z warstwowymi kartami szkła, glow shadows, mikroanimacje na hover.
- Space Grotesk + JetBrains Mono, akcenty magenta `#ff2e88` i cyjan `#00f0ff`.
- Sekcje: hero, capabilities grid (6 kart glass), CTA.

## Nawigacja
- Dodaję dyskretny "version switcher" w prawym górnym rogu KAŻDEJ z 5 wersji (linki `v1 · v2 · v3 · v4 · v5`), żeby łatwo przełączać podczas oglądania.
- Aktywna wersja podświetlona.

## Zmiany techniczne

```text
src/routes/
  index.tsx          (bez zmian — v1)
  v2.tsx             (nowa — terminal)
  v3.tsx             (nowa — SVG graph)
  v4.tsx             (nowa — editorial)
  v5.tsx             (nowa — cyber glass)
src/components/
  VersionSwitcher.tsx (nowy — wspólny)
```

- Każda trasa ma własne `head()` z unikalnym `title` / `description` / `og:title` / `og:description`.
- Fonty: `bun add @fontsource/fraunces` (dla v4). JetBrains Mono i Space Grotesk już są.
- Tokeny kolorów per-wersja definiowane lokalnie w komponencie (inline style vars) — żeby nie zaburzać globalnego motywu v1.
- Zero zmian w `src/routes/index.tsx`, `src/routes/__root.tsx` (poza ewentualnym importem fontu, jeśli konieczne globalnie — inaczej import w pliku wersji).

## Poza zakresem
- Nie dotykam obecnej wersji `/`.
- Bez backendu, bez Cloud — czysty frontend.
- Bez ciężkich bibliotek (d3, three.js) — wszystko na natywnym React + SVG + CSS.