module.exports = {
  globals: {
    __VERSION__: true,
    process: true,
    fetch: true,
    afterAll: true,
    beforeAll: true,
    afterEach: true,
    beforeEach: true,
    context: true,
    describe: true,
    expect: true,
    it: true,
    jest: true,
    sinon: true,
    test: true,
    jasmine: true,
    __filename: true,
    __dirname: true,
    require: true,
    navigator: true,
    FormData: true,
    __DEV__: true,
  },
  root: true,
  extends: ["eslint:recommended", "prettier", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  plugins: ["babel", "prettier", "react-hooks"],
  rules: {
    "max-len": [
      "error",
      {
        code: 320,
      },
    ],
    "max-lines": [
      "error",
      {
        max: 500,
        skipBlankLines: true,
      },
    ],
    "react/prop-types": ["error", { ignore: ["navigation"] }],
    semi: ["error", "never"],
    "no-console": 0,
    "no-unused-vars": 1,
    "no-undef": 2,
    "key-spacing": [2],
    "object-curly-spacing": [2, "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "only-multiline",
        objects: "only-multiline",
        imports: "never",
        exports: "never",
        functions: "ignore",
      },
    ],
    quotes: [2, "single", "avoid-escape"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(usePhotoListResponse)",
      },
    ],
  },
  settings: {
    react: {
      version: require("./package.json").dependencies.react,
    },
  },
};
