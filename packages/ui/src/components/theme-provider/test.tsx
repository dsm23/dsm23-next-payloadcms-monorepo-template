import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from ".";

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(
    (query) =>
      ({
        matches: false,
        media: query as string,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(() => false),
      }) satisfies MediaQueryList,
  ),
});

describe("component", () => {
  describe("ThemeProvider", () => {
    it("should render correctly", () => {
      render(
        <ThemeProvider>
          <div data-testid="target">Hello, World!</div>
        </ThemeProvider>,
      );

      expect(screen.getByTestId("target")).toBeInTheDocument();
    });
  });
});
