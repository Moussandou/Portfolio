import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { figmaAssetsPlugin } from './figma-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), figmaAssetsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/Portfolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
