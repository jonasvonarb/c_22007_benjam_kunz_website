module.exports = {
  root: true,
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:import/recommended",
  ],
  overrides: [
    {
      files: [
        "**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}",
        "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
      ],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
    // sourceType: "module",
  },
  plugins: ["react"],
  settings: {},
  env: {
    browser: true,
    node: true,
    amd: true,
  },
  rules: {
    "no-unused-vars": "warn",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": 0,
  },
};
