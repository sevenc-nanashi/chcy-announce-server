import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { svg4VuePlugin as svg } from 'vite-plugin-svg4vue';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		svg({
			assetsDirName: './src/assets',
		}),
		vue(),
	],
});
