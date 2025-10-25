import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
} from "vitest/config";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: false,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
    exclude: [...defaultExclude, "**/playwright-tests/**"],
    coverage: {
      include: ["src/**/*.[jt]s?(x)"],
      exclude: [
        "src/**/*.stories.[jt]s?(x)",
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        lines: 5,
        functions: 5,
        branches: 5,
        statements: 5,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
          exclude: [...defaultExclude, "**/playwright-tests/**"],
        },
      },
    ],
  },
});
