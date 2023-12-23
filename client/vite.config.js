import { defineConfig } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
    server: {
        proxy: {
            '/server': {
                target: 'https://mobile-ordering-app-backend.onrender.com',  // Your backend server URL
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/server/, ''),
            },
        },
    },
});
