import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from './router';
import store from './store';
import grafikjs from './grafikjs';

createApp(App).use(ElementPlus).use(router).use(store).use(grafikjs).mount('#app');
