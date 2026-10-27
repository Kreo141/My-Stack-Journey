import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import process from "node:process";

const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/").at(-1) ?? "My-Stack-Journey";
const base = repositoryName.endsWith(".github.io")
  ? "/"
  : `/${repositoryName}/`;

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
