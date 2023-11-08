import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import js from '@eslint/js';

export default [{
    ...js.configs.recommended,
    // TODO: add recommend configs from typescript-eslint once they start officially supporting flat config
    files: ["api/**/*.ts"],
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: typescriptEslintParser
    },
    plugins: {
        typescriptPlugin: typescriptEslintPlugin
    },
    rules: {
    }
}]