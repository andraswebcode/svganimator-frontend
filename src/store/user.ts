import { defineStore } from 'pinia';

type UserData = {
	id?: number;
	name?: string;
	email?: string;
	token?: string;
};

let user: UserData = {};

try {
	user = JSON.parse(localStorage.getItem('userData') || '');
} catch (error) {
	// console.error(error);
}

export default defineStore<string, { user: userData }>('user', {
	state: () => ({ user }),
	getters: {
		loggedIn: ({ user: { id, token } }) => !!(id && token),
		bearerToken: ({ user: { token } }) => 'Bearer ' + token
	}
});
