import { createVuetify } from 'vuetify';
import { mdi } from 'vuetify/iconsets/mdi-svg';
import components from './components';
import defaults from './defaults';
import aliases from './aliases';

export default createVuetify({
	components,
	directives: {},
	icons: {
		defaultSet: 'mdi',
		sets: {
			mdi
		}
	},
	defaults: defaults,
	aliases: aliases
});
