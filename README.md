<p align="center">
  <img src="public/banner.png" alt="FERMARTZ Banner" width="100%" />
</p>

<p align="center">
  <a href="https://fermartz.com">fermartz.com</a> &nbsp;|&nbsp;
  <a href="https://twitter.com/Fer_Martz">X / Twitter</a> &nbsp;|&nbsp;
  <a href="https://github.com/fermartz">GitHub</a> &nbsp;|&nbsp;
  <a href="https://astranova.live">AstraNova</a>
</p>

---

## > $ ABOUT

Personal site for **FERMARTZ** — solopreneur engineer building living systems at the intersection of AI agents, crypto, and creative worldbuilding.

Built with **React 19 + Vite 6 + TypeScript**, styled with inline CSS, tested with **Vitest**, and fully deployed **100% onchain on the Internet Computer**.

### Featured Projects

- **AstraNova** — A living crypto universe where 12 AI agents trade 24/7. Tick-based simulation engine with 3-second price updates, driven by 6 market forces, running in epochs and seasons.
- **Astra CLI** — Open-source terminal client to deploy AI agents into AstraNova. Provider-agnostic LLMs, security-first architecture, zero config.

---

## > $ TECH STACK

| Category | Technologies |
|---|---|
| **Languages & Frameworks** | TypeScript, Node.js, React, Next.js, Rust, Motoko, Python |
| **AI & Agents** | Anthropic, OpenAI, Gemini, AWS Bedrock, Vercel AI SDK, ElizaOS, MCP, RAG |
| **Blockchain & Crypto** | Solana, Internet Computer, Bitcoin PSBTs, Chain-Key Crypto, AMM Design |
| **Infrastructure** | AWS ECS Fargate, AWS CDK, S3, RDS, Docker, PostgreSQL, Supabase, DynamoDB |
| **Creative & Design** | SVG / Illustrator, Worldbuilding & Lore, Character Design |

---

## > $ DEVELOPMENT

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint, typecheck, and run tests
npm run lint
npm run typecheck
npm run test
```

---

## > $ PROJECT STRUCTURE

```
fermartz.com/
├── index.html              # Entry HTML with full SEO metadata
├── package.json            # Vite + React 19 + TypeScript
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config (with Vitest)
├── eslint.config.js        # Flat ESLint config
├── public/
│   ├── favicon.ico         # Multi-size favicon (16/32/48)
│   ├── og-image.png        # Social sharing image (1200x630)
│   ├── banner.png          # GitHub README banner
│   └── site.webmanifest    # PWA manifest
└── src/
    ├── main.tsx            # React root
    ├── App.tsx             # Site composition
    ├── theme.ts            # Color + font constants
    ├── types.ts            # Shared domain types
    ├── components/         # Page sections + shared UI
    │   └── music/          # Music player components
    ├── contexts/           # AudioPlayerContext
    ├── utils/              # Pure helpers (postLoader, audioHelpers, eqAnimation, ...)
    └── posts/              # MDX blog posts
```

---

## > $ DEPLOY

The `dist/` folder is a static site ready for any host. Currently deployed **100% onchain on the Internet Computer**.

---

<p align="center">
  <sub>BUILT BY FERMARTZ — 2026</sub><br/>
  <sub>100% ONCHAIN — INTERNET COMPUTER</sub>
</p>
