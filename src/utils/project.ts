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
