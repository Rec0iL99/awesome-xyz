import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

export default [
  // config for api
  // TODO: add recommend configs from typescript-eslint once they start officially supporting flat config
  {
    files: ["api/src/**/*.ts"],
    ...js.configs.recommended,
    ...eslintConfigPrettier,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptEslintParser,
    },
    plugins: {
      typescriptEslintPlugin,
    },
    rules: {},
  },
  // config for frontend
  {
    files: ["frontend/src/**/*.{ts,tsx}"],
    ...js.configs.recommended,
    ...reactRecommended,
    ...eslintConfigPrettier,
    // TODO: add eslint-config-next when they support flat config
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      typescriptEslintPlugin,
      react,
    },
    rules: {},
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // config for common
  {
    files: ["common/src/**/*.ts"],
    ...js.configs.recommended,
    ...eslintConfigPrettier,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptEslintParser,
    },
    plugins: {
      typescriptEslintPlugin,
    },
    rules: {},
  },
];
