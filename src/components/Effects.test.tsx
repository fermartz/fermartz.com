import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { TypeWriter, GlitchText, Reveal } from "./Effects.tsx";

describe("Effects", () => {
  it("TypeWriter renders without crashing and mounts a span", () => {
    const { container } = render(<TypeWriter text="hello" />);
    expect(container.querySelector("span")).not.toBeNull();
  });

  it("GlitchText renders the initial text immediately", () => {
    const { container } = render(<GlitchText text="FERMARTZ" />);
    expect(container.textContent).toBe("FERMARTZ");
  });

  it("Reveal renders its children", () => {
    const { getByText } = render(
      <Reveal>
        <p>hidden content</p>
      </Reveal>
    );
    expect(getByText("hidden content")).toBeDefined();
  });
});
