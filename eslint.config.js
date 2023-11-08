import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [{
    files: ["api/**/*.ts"],
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: typescriptParser
    },
    plugins: {
        typescriptPlugin
    },
    rules: {
        "no-console": "error"
    }
}]