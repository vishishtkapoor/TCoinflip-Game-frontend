import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    inject({
      Buffer: ['buffer', 'Buffer'],  // Inject Buffer from the 'buffer' package
    }),
    react(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      'buffer': 'buffer', // Polyfill Buffer
    }
  },
  optimizeDeps: {
    include: ['buffer'], // Ensure it's included in the bundle
  }
})
