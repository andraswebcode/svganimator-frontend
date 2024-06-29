import { createApp } from 'vue';
import { Notify, Quasar } from 'quasar';
import quasarIconSet from 'quasar/icon-set/svg-mdi-v7';
import App from './App.vue';
import router from './router';
import store from './store';
import grafikjs from './grafikjs';

import './styles/index.scss';

createApp(App)
	.use(Quasar, {
		config: {
			dark: true,
			notify: {}
		},
		plugins: {
			Notify
		}, // import Quasar plugins and add here
		iconSet: quasarIconSet
		/*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
	})
	.use(router)
	.use(store)
	.use(grafikjs)
	.mount('#app');
