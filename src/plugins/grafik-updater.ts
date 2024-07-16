import { useCanvas } from '@grafikjs/vue';
import { JSONImporter } from '@grafikjs/core';
import { PiniaPluginContext } from 'pinia';

export default ({ store }: PiniaPluginContext) => {
	const {
		actions: { byId, select, release },
		context
	} = useCanvas(null, (canvas) => ({
		byId: canvas.childByIdDeep.bind(canvas),
		select: canvas.selectShapes.bind(canvas),
		release: canvas.releaseShapes.bind(canvas)
	}));
	const importer = new JSONImporter(context);
	let loaded = false;

	store.$subscribe(() => {
		if (store.$id === 'project') {
			if (!loaded) {
				importer.load({
					children: store.structuredData
				});
				loaded = true;
			}
			Object.keys(store.changedProps).forEach((id) => {
				const shape = byId(id);
				if (shape) {
					shape.set(store.changedProps[id]);
				}
			});
		} else if (store.$id === 'editor') {
			// release();
			select(
				store.activeLayerIds.map((id) => byId(id)),
				true
			);
		}
	});
};
