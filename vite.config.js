import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      watch: {
        usePolling: true
      },
      esbuild: {
        target: 'esnext',
        platform: 'linux'
      }
    },
    define: {
      VITE_API_URL: JSON.stringify(env.VITE_API_URL),
      VITE_IMG_FOLDER_URL: JSON.stringify(env.VITE_IMG_FOLDER_URL)
    }
  }
})
