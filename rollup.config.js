import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import buble from '@rollup/plugin-buble';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = [];

if (pkg.peerDependencies) {
  external.push(...Object.keys(pkg.peerDependencies));
}

if (pkg.dependencies) {
  external.push(...Object.keys(pkg.dependencies));
}

const terserPretty = terser({
  warnings: true,
  ecma: 5,
  keep_fnames: true,
  compress: {
    conditionals: false,
    if_return: false,
    join_vars: false,
    keep_fnames: true,
    loops: false,
    pure_getters: true,
    toplevel: true,
    sequences: false,
  },
  mangle: false,
  output: {
    braces: true,
    indent_level: 2,
  },
});

const terserMinified = terser({
  warnings: true,
  ecma: 5,
  toplevel: true,
  compress: {
    keep_infinity: true,
    passes: 10,
    pure_getters: true,
  },
});

const makePlugins = isProduction =>
  [
    resolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true,
    }),
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
      namedExports: {
        react: Object.keys(require('react')),
      },
    }),
    typescript({
      typescript: require('typescript'),
    }),
    buble({
      transforms: {
        unicodeRegExp: false,
        dangerousForOf: true,
        dangerousTaggedTemplateString: true,
      },
      objectAssign: 'Object.assign',
      exclude: 'node_modules/**',
    }),
    babel({
      babelrc: false,
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-transform-object-assign'],
    }),
    isProduction &&
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    isProduction ? terserMinified : terserPretty,
  ].filter(Boolean);

export default [
  {
    input: './src/index.ts',
    external,
    plugins: makePlugins(false),
    output: [
      {
        sourceMap: true,
        dir: './dist/cjs',
        format: 'cjs',
      },
      {
        sourceMap: true,
        dir: './dist/es',
        format: 'esm',
      },
    ],
  },
  {
    input: './src/index.ts',
    external,
    plugins: makePlugins(true),
    output: [
      {
        sourceMap: false,
        dir: './dist/cjs/min',
        format: 'cjs',
      },
      {
        sourceMap: false,
        dir: './dist/es/min',
        format: 'esm',
      },
    ],
  },
];
