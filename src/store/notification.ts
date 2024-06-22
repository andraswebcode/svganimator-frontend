import { defineStore } from 'pinia';

declare type NotificationType = 'success' | 'info' | 'warning' | 'error';
declare type Notification = {
	message: string;
	type: NotificationType;
	show: boolean;
};

export default defineStore<string, Notification>('notification', {
	state: () => ({
		message: '',
		type: 'info',
		show: false
	}),
	actions: {
		send(message: string, type: NotificationType) {
			this.$state.message = message;
			this.$state.type = type;
			this.$state.show = true;
		}
	}
});
