import { PiniaPluginContext } from 'pinia';
import { difference, intersection } from 'lodash';
import { CLASSES } from '@grafikjs/vue';
import { toRaw } from 'vue';

export default ({ store, app }: PiniaPluginContext) => {
	const { grafikCanvas } = app;
	if (store.$id === 'project') {
		console.log(store);

		store.$subscribe((mutation, state) => {
			const stateIds = Object.keys(state.byIds);
			const canvasIds = grafikCanvas.mapChildren(({ id }) => id);
			const addedIds = difference(stateIds, canvasIds);
			const removeedIds = difference(canvasIds, stateIds);
			console.log(addedIds, removeedIds);
			if (addedIds.length) {
				addedIds.forEach((id) => {
					const { tagName, animation, ...options } = toRaw(state.byIds[id]);
					const Shape = CLASSES[tagName];
					if (Shape) {
						const shape = new Shape(options);
						grafikCanvas.add(shape);
					}
				});
			} else if (removeedIds.length) {
				removeedIds.forEach((id) => {
					const shape = grafikCanvas.childById(id);
					grafikCanvas.remove(shape);
				});
			} else {
			}
		});
	}
};
