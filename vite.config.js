import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use different base depending on environment
  base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/my_utube/' : '/',
})
