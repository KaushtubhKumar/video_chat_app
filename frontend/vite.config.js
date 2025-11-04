import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // String shorthand: '/api' -> 'https://www.apicountries.com/api'
//       '/api': {
//         target: 'https://www.apicountries.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''), // remove /api prefix
//       },
//     },
//   },
// })