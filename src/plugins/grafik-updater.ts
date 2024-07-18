import { JSONImporter } from '@grafikjs/core';
import { PiniaPluginContext } from 'pinia';
import { omit } from 'lodash';

export default ({ store, app }: PiniaPluginContext) => {
	const { grafikCanvas } = app as any;
	const importer = new JSONImporter(grafikCanvas);
	let loaded = false;

	store.$subscribe(() => {
		if (store.$id === 'project') {
			if (!loaded) {
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
			}
		} else if (store.$id === 'editor') {
			// Select shapes
			grafikCanvas.setSelectedShapes(
				store.activeLayerIds.map((id) => grafikCanvas.childByIdDeep(id))
			);
			// Update time
			if (!store.playing) {
				grafikCanvas.getAnimation().seek(store.time * 1000);
			} /*
			if (store.playing) {
				grafikCanvas.getAnimation().play();
			} else {
				grafikCanvas.getAnimation().pause();
			}*/
		}
	});
};
