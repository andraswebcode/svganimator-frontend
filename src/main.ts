import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from './router';
import store from './store';
import grafikjs from './grafikjs';

import './styles/index.scss';

createApp(App).use(ElementPlus).use(router).use(store).use(grafikjs).mount('#app');
