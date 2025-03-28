import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dynamicImport from 'vite-plugin-dynamic-import';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dynamicImport()],
    esbuild: false,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
