import axios from '../axios';
import { useUser } from '../store';
import { serialize } from '../utils/project';
import useLoader from './loader';
import useNotice from './notice';

const useProjectRequest = () => {
	const userData = useUser();
	const { send } = useNotice();
	const { show, hide } = useLoader();
	const { bearerToken } = userData;

	const get = (id, then) => {
		const _id = parseInt(id);

		if (!_id) {
			then();
			return;
		}

		show('Project is loading. This might take a while...');

		axios
			.get('projects/' + _id, { headers: { Authorization: bearerToken } })
			.then((response) => {
				const {
					data: {
						title,
						description,
						status,
						width,
						height,
						layers,
						layer_ids,
						tracks,
						keyframes
					}
				} = response;
				console.log(response.data);

				hide();
				return {
					title,
					description,
					status,
					width,
					height,
					byIds: Array.isArray(layers) && !layers.length ? {} : layers,
					ids: layer_ids,
					tre: Array.isArray(tracks) && !tracks.length ? {} : tracks,
					kfe: Array.isArray(keyframes) && !keyframes.length ? {} : keyframes
				};
			})
			.then(then)
			.catch((error) => {
				send(error.response?.data.message || error.message, 'negative');
				hide();
			});
	};
	const list = (params, then) => {
		show('Projects are loading. This might take a while...');

		axios
			.get('projects', {
				params,
				headers: {
					Authorization: bearerToken
				}
			})
			.then(({ data }) => {
				hide();
				return {
					totalPages: data.total_pages,
					projects: data.items.map(
						({ id, title, width, height, layer_ids, layers, tracks, keyframes }) => {
							const l = Array.isArray(layers) && !layers.length ? {} : layers;
							const tre = Array.isArray(tracks) && !tracks.length ? {} : tracks;
							const kfe =
								Array.isArray(keyframes) && !keyframes.length ? {} : keyframes;
							const data = serialize(l, layer_ids, tre, kfe);
							return { id, title, width, height, data };
						}
					)
				};
			})
			.then(then)
			.catch((error) => {
				console.log(error);

				send(error.response?.data.message || error.message, 'negative');
				hide();
			});
	};
	const save = (id, data, then) => {
		const _id = parseInt(id);
		const url = _id ? 'projects/' + _id : 'projects';
		console.log(data);

		show('Project is saving. This might take a while...');

		axios[_id ? 'put' : 'post'](url, data, {
			headers: {
				Authorization: bearerToken
			}
		})
			.then((response) => {
				console.log(response);
				send('Project saved successfully.', 'positive');
				hide();
				return response.data;
			})
			.then(then)
			.catch((error) => {
				send(error.response?.data.message || error.message, 'negative');
				hide();
				console.error(error);
			});
	};

	return { get, list, save };
};

export default useProjectRequest;
