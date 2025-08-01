import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default [
  // CommonJS build
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    external: [],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
    ],
  },
  // ES Module build
  {
    input: "src/index.js",
    output: {
      file: "dist/es/index.js",
      format: "es",
      sourcemap: true,
    },
    external: [],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
    ],
  },
];