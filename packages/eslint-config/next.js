import next from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import { config as reactConfig } from "./react.js";

export const config = defineConfig(
  reactConfig,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  next.configs["core-web-vitals"],
);
