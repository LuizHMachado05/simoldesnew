import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/simoldesnew/',  // Deve ser o nome do seu repositório
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

