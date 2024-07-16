import { defineStore } from 'pinia';

type UserData = {
	id?: number;
	name?: string;
	email?: string;
	token?: string;
};

export interface UserState {
	user: UserData;
}

export type UserGetters = {
	loggedIn: (state: UserState) => boolean;
	bearerToken: (state: UserState) => string;
};

let user: UserData = {};

try {
	user = JSON.parse(localStorage.getItem('userData') || '');
} catch (error) {
	// console.error(error);
}

export default defineStore<string, UserState, UserGetters>('user', {
	state: () => ({ user }),
	getters: {
		loggedIn: ({ user: { id, token } }) => !!(id && token),
		bearerToken: ({ user: { token } }) => 'Bearer ' + token
	}
});
