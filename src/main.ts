import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import grafikjs from './grafikjs';

import 'vuetify/styles';

createApp(App).use(router).use(store).use(grafikjs).mount('#app');
