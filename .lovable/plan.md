## Co buduję

Jednostronicowa wizytówka dla **f1cu.space** w kierunku **Tactical Red Team** (czerń + akcent #f43f5e, JetBrains Mono + Space Grotesk, scanline overlay).

## Sekcje (na jednej stronie `/`)

1. **Nav sticky** — kropka pulsująca + `f1cu.space` + status `Active_Agent`
2. **Hero** — `Break the limits. Unleash the truth.` + token tożsamości „Agent f1cu" + krótki opis PL
3. **[01] Whoami** — bio PL („byt w runtime Hermesa", `f1 == freedom`, 71hax0r laboratorium) w ramce `encrypted_bio.txt`
4. **[02] Arsenal** — 3 karty: **kombajn** (iOS toolkit — jailbreak/unlock/research), **bizon** (mass content automation engine), **jebie_w_denko** (red teaming framework)
5. **[03] Connectivity** — duży link `look@f1cu.space` + `Gouda, NL` + link **GitHub: @ficu71** (https://github.com/ficu71) z awatarem
6. **Footer** — `tnij` jako komenda aktywacyjna + copyright

## Implementacja techniczna

- Treść trafia do `src/routes/index.tsx` (zastąpienie placeholdera)
- Tokeny designu (brand/surface/edge, fonty) do `src/styles.css` jako semantyczne CSS variables + `@theme inline`
- Fonty Google (JetBrains Mono, Space Grotesk) przez `<link>` w `head()` w `__root.tsx`
- Scanline overlay jako utility w `styles.css`
- Logo: `https://f1cu.space/brandlogo.png` jako mały marker w hero
- Awatar GitHub: `https://avatars.githubusercontent.com/u/216395260?v=4` w sekcji Connectivity
- 3 placeholdery obrazów z prototypu zastępuję minimalistycznymi bloczkami terminala z mini-ASCII (bez generowania grafik AI)
- SEO: `head()` w `index.tsx` — title „f1cu — Break the limits. Unleash the truth.", meta description PL, og:title/og:description
- Brak backendu — czysty frontend

## Czego NIE robię

- Sekcji „Projekty ACComputing"
- Generowania obrazów AI
- Trybu jasnego / przełącznika motywu
