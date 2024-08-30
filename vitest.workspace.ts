import { defineWorkspace } from "vitest/config";

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  {
    extends: "./vitest.config.ts",
    test: {
      name: "unit",
      environment: "jsdom",
      include: ["tests/unit/**/*.spec.{ts,tsx,js,jsx}"]
    }
  },
  {
    extends: "./vitest.config.ts",
    test: {
      name: "integration",
      include: ["tests/integration/**/*.spec.{ts,tsx,js,jsx}"],
      setupFiles: ["tests/integration/setup.ts"]
    }
  }
]);
