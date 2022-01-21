import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as volar from '@volar/experimental/compiler';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  plugins: [vue(volar.getVuePluginOptionsForVite())],
});
