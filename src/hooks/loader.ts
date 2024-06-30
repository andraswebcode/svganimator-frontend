import { useQuasar } from 'quasar';

const useLoader = () => {
	const quasar = useQuasar();
	return {
		show: (message: string) => quasar.loading.show({ message }),
		hide: () => quasar.loading.hide()
	};
};

export default useLoader;
