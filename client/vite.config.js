import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server:{
    proxy:{
      "/usuarios": "http://localhost:5000",
      "/juegos": "http://localhost:5000",
      "/categorias": "http://localhost:5000",
    }
  }
})
