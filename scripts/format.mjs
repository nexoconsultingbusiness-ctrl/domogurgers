import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const mode = process.argv[2];
if (mode !== "--check" && mode !== "--write") {
  console.error("Usa --check o --write para comprobar o aplicar el formato.");
  process.exit(1);
}

// Git excludes temporary tools, builds and private environment files before
// Prettier traverses the filesystem. This also includes new project files.
const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean);

if (files.length === 0) process.exit(0);

const prettier = fileURLToPath(
  new URL("../node_modules/prettier/bin/prettier.cjs", import.meta.url),
);
const result = spawnSync(
  process.execPath,
  [prettier, mode, "--ignore-unknown", ...files],
  { stdio: "inherit" },
);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
