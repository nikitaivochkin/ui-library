import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import clear from 'rollup-plugin-clear';
import alias from '@rollup/plugin-alias';
import copy from 'rollup-plugin-copy';
import svg from 'rollup-plugin-svg';

import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
      }),
      postcss(),
      terser(),
      clear({
        targets: ['dist'],
      }),
      copy({
        targets: [
          {
            src: 'src/assets',
            dest: 'dist',
          },
        ],
      }),
      alias({
        resolve: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass'],
        entries: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
        ],
      }),
      svg(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
