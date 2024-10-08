import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls }
		}),
		quasar({
			autoImportComponentCase: 'pascal',
			sassVariables: 'src/styles/quasar-vars.scss'
		}),
		Components()
	]
});
