import { useQuasar } from 'quasar';

const useNotice = () => {
	const quasar = useQuasar();
	return {
		send: (message: string, type: string) => {
			quasar.notify({
				message,
				type
			});
		}
	};
};

export default useNotice;
