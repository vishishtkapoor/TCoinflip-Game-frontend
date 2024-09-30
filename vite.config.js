import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import polyfillNode from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [
    inject({
      Buffer: ['buffer', 'Buffer'],
    }),
    react(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      'buffer': 'buffer',
      // Fix tweetnacl-util import issue
      'tweetnacl-util': 'tweetnacl-util/nacl-util',
    },
  },
  optimizeDeps: {
    include: ['buffer', '@tonconnect/protocol', 'tweetnacl-util'],
    esbuildOptions: {
      // Specify that these dependencies should be treated as ESModules
      target: 'es2020',
      supported: {
        'dynamic-import': true,
      },
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      external: ['@telegram-apps/sdk', '@tonconnect/protocol', 'tweetnacl-util'],
    },
    commonjsOptions: {
      transformMixedEsModules: true,  // Handle both CJS and ESM modules
    },
  },
});
