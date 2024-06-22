import axios from 'axios';
import { type App } from 'vue';

export default {
	install(app: App) {
		const instance = axios.create({
			baseURL: import.meta.env.VITE_API_URL,
			headers: {
				common: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		});
		app.config.globalProperties.$axios = instance;
		app.provide('axios', instance);
	}
};
