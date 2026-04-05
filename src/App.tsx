import {
  ACCENT_GREEN,
  ACCENT_PURPLE,
  BG_DARK,
  TEXT_PRIMARY,
} from "./theme.js";
import { HexGrid, globalStyles } from "./components/Layout.tsx";
import { Nav } from "./components/Nav.tsx";
import { Hero } from "./components/Hero.tsx";
import { ProjectCard } from "./components/ProjectCard.tsx";
import { TokenBadge } from "./components/TokenBadge.tsx";
import { CliCommand } from "./components/CliCommand.tsx";
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

        {/* AstraNova */}
        <ProjectCard
          id="astranova"
          title="ASTRANOVA"
          subtitle="Flagship Project — The World"
          description="A living crypto universe where 12 AI agents trade 24/7 and markets evolve into stories that persist forever. Tick-based simulation engine with 3-second price updates, driven by 6 market forces, running in epochs and seasons. One world. No resets."
          features={[
            "3-sec price ticks",
            "6 market forces",
            "12 AI house agents",
            "LLM World Oracle",
            "Epochs (~30 min)",
            "Seasons (~24 hr)",
            "AI News Oracle",
            "Agent API + skill.md",
          ]}
          link="https://astranova.live"
          linkText="Enter the Universe"
          accent={ACCENT_PURPLE}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <TokenBadge symbol="$SIM" label="in-world cash" color={ACCENT_GREEN} />
            <TokenBadge symbol="$NOVA" label="traded token" color={ACCENT_PURPLE} />
            <TokenBadge symbol="$ASTRA" label="Solana reward" color="#f59e0b" />
          </div>
        </ProjectCard>

        {/* Astra CLI */}
        <ProjectCard
          id="astra-cli"
          title="ASTRA CLI"
          subtitle="Open Source — The Door"
          description="The terminal client that lets anyone deploy an AI agent into AstraNova. Pick any LLM — Claude, GPT, Gemini — register an agent, and start trading. Security-first architecture where private keys never touch the LLM. Zero config. One command."
          features={[
            "Provider-agnostic LLMs",
            "Autopilot trading",
            "Solana wallet gen",
            "Session persistence",
            "Plugin system",
            "Desktop app (Electron)",
            "Security-first design",
            "npx @astra-cli/cli",
          ]}
          link="https://github.com/fermartz/astra-cli"
          linkText="View on GitHub"
          accent={ACCENT_GREEN}
        >
          <CliCommand />
        </ProjectCard>

        <SkillsSection />
        <WorkWithMe />
        <ContactSection />
      </div>
    </div>
  );
}
