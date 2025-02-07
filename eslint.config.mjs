import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['src/**/*.{js,mjs,cjs,ts}', 'test/**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    ignores: [
      "node_modules/**/*",
      "dist/**/*",
      "**/eslint.config.mjs"
    ],
    rules: {
      "typescript-eslint/no-unused-vards": "warn"
    }
  },
  // pluginJs.configs.recommended,
  //...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
];
