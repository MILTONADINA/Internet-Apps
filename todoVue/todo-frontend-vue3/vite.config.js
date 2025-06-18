import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; 

export default () => {
  
  const baseURL = './';

  return defineConfig({
    plugins: [vue()],
    server: {
      host: "localhost",
      port: 8081,
      proxy: {
        '/todoapi': {
          
          target: 'http://localhost:3001',
          changeOrigin: true,
          
        },
      }
    },
    base: baseURL, 
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  });
};