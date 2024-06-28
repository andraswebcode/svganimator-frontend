const _parseLayers = (layers: any[], idsRef: string[], byIdsRef: any) => {
	layers.forEach((layer) => {
		idsRef.push(layer.id);
		byIdsRef[layer.id] = layer;
		if (layer.children) {
			const children: string[] = [];
			_parseLayers(layer.children, children, byIdsRef);
			layer.children = children;
		}
	});
};

export const parse = (layers: any[]) => {
	const output = {
		ids: [],
		byIds: {}
	};

	_parseLayers(layers, output.ids, output.byIds);

	return output;
};

const _serializeMap = (byIds: any) => (id: string) => {
	const item = byIds[id];
	const children = item.children?.map(_serializeMap(byIds));
	return {
		...item,
		children
	};
};

export const serialize = (byIds: any, ids: any) => ids.map(_serializeMap(byIds));
