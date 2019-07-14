module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    document: 1
  },
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true
  //   },
  //   ecmaVersion: 2018,
  //   sourceType: "module"
  // },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": 0,
    "no-unused-vars": 0,
    "no-unsued-expressions": 0,
    "no-console": 0
  },
  parser: "babel-eslint"
};
