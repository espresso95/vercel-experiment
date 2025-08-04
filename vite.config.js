import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        counter: 'counter.html',
        color: 'color.html',
      },
    },
  },
});
