module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [
    {
      files: ["*.jsx", "*.js"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  settings: {
    "import/core-modules": ["@expo/vector-icons"],
  },
  rules: {
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "no-use-before-define": 0,
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "react/style-prop-object": [2, { allow: ["StatusBar"] }],
    "no-unused-vars": [
      "warn", // or "error"
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};
