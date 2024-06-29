import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import grafikjs from './grafikjs';

import './styles/index.scss';

createApp(App).use(router).use(store).use(grafikjs).mount('#app');
