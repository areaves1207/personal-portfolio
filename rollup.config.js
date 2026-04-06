import vue from 'rollup-plugin-vue';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [vue()],
};