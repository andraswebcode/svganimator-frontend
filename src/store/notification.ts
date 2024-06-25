import { defineStore } from 'pinia';

declare type NotificationType = 'success' | 'info' | 'warning' | 'error';
declare type Notification = {
	message: string;
	type: NotificationType;
	show: boolean;
};
declare type NotificationGetters = {};
declare type NotificationActions = {
	send: (message: string, type: NotificationType) => void;
};

export default defineStore<string, Notification, NotificationGetters, NotificationActions>(
	'notification',
	{
		state: () => ({
			message: '',
			type: 'info',
			show: false
		}),
		actions: {
			send(message, type) {
				this.$state.message = message;
				this.$state.type = type;
				this.$state.show = true;
			}
		}
	}
);
