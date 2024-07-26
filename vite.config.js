import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import loadEnv from 'dotenv';
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VueDevTools(),
  ],
  define:{
    'process.env.APP_URL': JSON.stringify(process.env.APP_URL)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
