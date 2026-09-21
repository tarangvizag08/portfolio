import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored React Bits components, kept byte-for-byte as upstream ships them
    // (apart from a 'use client' banner and the Lanyard asset paths) so they
    // stay diffable against the repo. Their lint findings are upstream's, and
    // rewriting them here would make every future update a manual merge.
    "components/reactbits/**",
  ]),
]);

export default eslintConfig;
