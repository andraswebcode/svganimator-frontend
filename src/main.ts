import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vuetify from './vuetify';
import router from './router';
import store from './store';
import axios from './plugins/axios';
import grafikjs from './grafikjs';

import 'vuetify/styles';

createApp(App).use(router).use(vuetify).use(store).use(axios).use(grafikjs).mount('#app');
