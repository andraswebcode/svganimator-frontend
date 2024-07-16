import { useCanvas } from '@grafikjs/vue';
import { JSONImporter } from '@grafikjs/core';
import { PiniaPluginContext } from 'pinia';

export default ({ store }: PiniaPluginContext) => {
	const {
		actions: { byId, select },
		context
	} = useCanvas(null, (canvas) => ({
		byId: canvas.childByIdDeep.bind(canvas),
		select: canvas.setSelectedShapes.bind(canvas)
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
			select(
				store.activeLayerIds.map((id) => byId(id)),
				true
			);
		}
	});
};
