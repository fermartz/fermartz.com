import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CliCommand } from "./CliCommand.tsx";

describe("CliCommand", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders the npx install command", () => {
    render(<CliCommand />);
    expect(screen.getByText("@astra-cli/cli")).toBeDefined();
    expect(screen.getByRole("button")).toHaveTextContent("COPY");
  });

  it("copies the command to clipboard and shows confirmation", () => {
    render(<CliCommand />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("npx @astra-cli/cli");
    expect(button).toHaveTextContent("COPIED");
  });
});
