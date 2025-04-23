import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.d.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        sourceType: "module",
        ecmaVersion: 2021,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      "unused-imports": unusedImports,
      import: importPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,

      // Prettier formatting
      "prettier/prettier": "error",

      // Remove unused imports and variables
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ESLint native rules
      "@typescript-eslint/no-unused-vars": "off", // handled by unused-imports
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "warn",

      // Add "type" to type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
];
