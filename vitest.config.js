// vitest.config.ts

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true, // Enables test(), expect(), etc. globally
    environment: 'jsdom', // Simulates the browser
    setupFiles: './vitest.setup.js', // Path to setup file
  },
})
