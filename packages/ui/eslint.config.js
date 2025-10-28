import { config } from "@repo/eslint-config/react";

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: ["coverage"],
  },
  ...config,
];
