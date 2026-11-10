// 미리보기용 한 장짜리 HTML을 만듭니다: node preview/build.mjs <출력.html>
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2] ?? path.join(root, "preview", "aruben-preview.html");
const shim = (f) => path.join(root, "preview", "shims", f);

const js = await build({
  entryPoints: [path.join(root, "preview", "main.tsx")],
  bundle: true,
  write: false,
  minify: true,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  alias: {
    "react/jsx-runtime": shim("jsx-runtime.js"),
    "react/jsx-dev-runtime": shim("jsx-runtime.js"),
    react: shim("react.js"),
    "next/link": shim("link.js"),
    "next/navigation": shim("navigation.js"),
    "@": root,
  },
  external: ["*.css"],
});

const globals = readFileSync(path.join(root, "app", "globals.css"), "utf8").replace(/^@import "(?!tailwindcss)[^\n]*\n/gm, "");
const css = await postcss([tailwind({ base: root })]).process(globals, { from: path.join(root, "app", "globals.css") });

const html = `<title>아루벤 Aruben</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Noto+Serif+KR:wght@600&family=Noto+Sans+KR:wght@400;500;600;700&display=swap">
<style>
${css.css}
:root { --font-sans: "Pretendard Variable", Pretendard, "Noto Sans KR", -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
body { font-family: var(--font-sans); }
header.sticky { top: env(safe-area-inset-top, 0px); }
</style>
<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>${js.outputFiles[0].text.replace(/<\/script/g, "<\\/script")}</script>
`;
writeFileSync(out, html);
console.log("wrote", out, (html.length / 1024).toFixed(0) + "KB");
