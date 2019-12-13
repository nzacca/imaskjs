import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import polyfill from 'rollup-plugin-polyfill';


const format = process.env.BABEL_ENV || 'umd';

const isES = format.indexOf('es') === 0;
const basePath = 'dist/imask' + (format !== 'umd' ? '.' + format : '');


export default [false, true].map(min => ({
  input: 'src/index.js',
  output: {
    file: `${basePath}${min ? '.min' : ''}.js`,
    format,
    name: 'IMask',
    sourcemap: true,
  },
  plugins: [
    eslint({configFile: '../../.eslintrc'}),
    resolve(),
    babel({
      extends: './.babelrc',
      rootMode: 'upward',
    }),
    !isES && commonjs(),
    // !isES && polyfill(['./polyfills.js']),
    min && terser(),
  ],
}));
