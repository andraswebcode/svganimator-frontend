import { JSONImporter } from '@grafikjs/core';
import { PiniaPluginContext } from 'pinia';
import { omit, cloneDeep, isEqual } from 'lodash';

export default ({ store, app }: PiniaPluginContext) => {
	const { grafikCanvas } = app as any;
	const importer = new JSONImporter(grafikCanvas);
	let loaded = false;
	const prevState = cloneDeep(store.$state);

	store.$subscribe(() => {
		if (store.$id === 'project') {
			/*if (!loaded) {
				importer.load({
					children: store.structuredData
				});
				loaded = true;
			}

			for (let id in store.byIds) {
				const shape = grafikCanvas.childByIdDeep(id);
				if (shape) {
					shape.set(omit(store.byIds[id], 'children'));
				}
			}*/
		} else if (store.$id === 'editor') {
			// Select shapes
			if (!isEqual(store.activeLayerIds, prevState.activeLayerIds)) {
				grafikCanvas.setSelectedShapes(
					store.activeLayerIds.map((id) => grafikCanvas.childByIdDeep(id))
				);
			}
			// Update time

			if (store.time !== prevState.time && !store.playing) {
				grafikCanvas.getAnimation().seek(store.time * 1000);
			}

			if (store.playing !== prevState.playing) {
				grafikCanvas.getAnimation()[store.playing ? 'play' : 'pause']();
			}
			prevState.activeLayerIds = store.activeLayerIds;
			prevState.playing = store.playing;
			prevState.time = store.time;
		}
	});
};
