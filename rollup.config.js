import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import buble from '@rollup/plugin-buble';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { basename } from 'path';

import pkg from './package.json';

const name = basename(pkg.main, '.js');
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

const importAllPlugin = ({ types: t }) => ({
  visitor: {
    VariableDeclarator(path) {
      if (
        t.isIdentifier(path.node.id) &&
        t.isCallExpression(path.node.init) &&
        t.isIdentifier(path.node.init.callee) &&
        path.node.init.callee.name === 'require' &&
        path.node.init.arguments.length === 1
      ) {
        path.parentPath.replaceWith(
          t.importDeclaration(
            [t.importNamespaceSpecifier(path.node.id)],
            path.node.init.arguments[0]
          )
        );
      }
    },
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
      useTsconfigDeclarationDir: true,
      tsconfigDefaults: {
        compilerOptions: {
          sourceMap: true,
        },
      },
      tsconfigOverride: {
        compilerOptions: {
          declaration: !isProduction,
          declarationDir: './dist/types',
          target: 'es6',
        },
        include: ['src/**/*.ts'],
        exclude: ['__tests__/**/*.ts', 'stories/**/*.tsx'],
      },
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
      plugins: ['@babel/plugin-transform-object-assign', importAllPlugin],
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
        file: `./dist/cjs/${name}.js`,
        format: 'cjs',
      },
      {
        sourceMap: true,
        file: `./dist/esm/${name}.esm.js`,
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
        file: `./dist/cjs/${name}.min.js`,
        format: 'cjs',
      },
      {
        sourceMap: false,
        file: `./dist/esm/${name}.esm.min.js`,
        format: 'esm',
      },
    ],
  },
];
