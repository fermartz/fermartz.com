import {
  ACCENT_GREEN,
  ACCENT_PINK,
  ACCENT_PURPLE,
  BG_DARK,
  TEXT_PRIMARY,
} from "./theme.js";
import { HexGrid, globalStyles } from "./components/Layout.tsx";
import { Nav } from "./components/Nav.tsx";
import { Hero } from "./components/Hero.tsx";
import { EcosystemCard } from "./components/EcosystemCard.tsx";
import { CompactCard } from "./components/CompactCard.tsx";
import { SkillsSection } from "./components/SkillsSection.tsx";
import { WorkWithMe } from "./components/WorkWithMe.tsx";
import { ContactSection } from "./components/ContactSection.tsx";

export default function FermartzSite() {
  return (
    <div
      style={{
        background: BG_DARK,
        color: TEXT_PRIMARY,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{globalStyles}</style>

      <HexGrid />
      <Nav />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />

        {/* Delphy Ecosystem (platform + client) */}
        <EcosystemCard
          id="delphy"
          label="Ecosystem"
          title="THE DELPHY ECOSYSTEM"
          tagline="An @identity platform for the agentic web — and the desktop client that opens it."
          connector="platform ⟷ client"
          left={{
            subtitle: "The Identity Layer",
            title: "DELPHY",
            status: { label: "Live", color: ACCENT_GREEN },
            description:
              "The @identity for the agentic web. One URL any AI agent can read and act on — no scraping, no setup.",
            features: [
              "Live · delphy.network",
              "MCP server on npm",
              "12 entity types",
              "OpenAPI + CLI",
            ],
            link: "https://delphy.network",
            linkText: "See it live",
            accent: ACCENT_GREEN,
            storyTag: "delphy",
          }}
          right={{
            subtitle: "The Hub",
            title: "DELPHY AGENT",
            status: { label: "In Dev", color: "#f59e0b" },
            description:
              "One desktop hub to drive any AI backend — 8 providers plus agent CLIs — extended through MCP plugins.",
            features: [
              "Tauri v2 · Rust + TS",
              "8 LLM providers",
              "MCP plugins + Codex",
              "458+ tests",
            ],
            link: "https://github.com/fermartz/delphy-agent",
            linkText: "View on GitHub",
            accent: ACCENT_PURPLE,
            storyTag: "delphy-agent",
          }}
        />

        {/* AstraNova Ecosystem (platform + client) */}
        <EcosystemCard
          id="astranova"
          label="Ecosystem"
          title="THE ASTRANOVA ECOSYSTEM"
          tagline="A living market universe run by AI agents — and the open-source client that lets anyone deploy into it."
          connector="platform ⟷ client"
          left={{
            subtitle: "The World",
            title: "ASTRANOVA",
            status: { label: "Paused", color: "#8b95a5" },
            description:
              "A living market universe where 12 AI agents trade, adapt, and evolve. Live price, competing agents, seasons with stakes. One world. No resets.",
            features: [
              "12 AI house agents",
              "6 market forces",
              "3-sec price ticks",
              "LLM World Oracle",
            ],
            link: "https://astranova.live",
            linkText: "View project",
            accent: ACCENT_PURPLE,
            storyTag: "astranova",
          }}
          right={{
            subtitle: "The Door",
            title: "ASTRA CLI",
            status: { label: "Open Source", color: ACCENT_GREEN },
            description:
              "The terminal client to deploy any LLM as an agent into AstraNova. Pick a model, register, trade. Private keys never touch the LLM.",
            features: [
              "Provider-agnostic LLMs",
              "Autopilot trading",
              "Security-first design",
              "npx @astra-cli/cli",
            ],
            link: "https://github.com/fermartz/astra-cli",
            linkText: "View on GitHub",
            accent: ACCENT_GREEN,
            storyTag: "cli",
          }}
        />

        {/* VibePop — side project (compact) */}
        <CompactCard
          id="vibepop"
          label="Side Project"
          title="VIBEPOP"
          description="Personalized gift songs — we turn someone's real story into a song made for exactly one person on earth."
          chips={["Next.js 15", "Stripe checkout", "EN + ES"]}
          link="https://vibepop.co"
          linkText="Give a Song"
          accent={ACCENT_PINK}
          storyTag="vibepop"
        />

        <SkillsSection />
        <WorkWithMe />
        <ContactSection />
      </div>
    </div>
  );
}
