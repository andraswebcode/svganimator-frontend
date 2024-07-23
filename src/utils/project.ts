import { TrackObject } from '@grafikjs/core';
import { IDList } from '../store/project';

const _parseLayers = (layers: any[], idsRef: string[], byIdsRef: any, parentId?: string) => {
	layers.forEach((layer) => {
		if (parentId) {
			layer.parent = parentId;
		}
		if (layer.children) {
			const children: IDList = [];
			_parseLayers(layer.children, children, byIdsRef, layer.id);
			layer.children = children;
		}
		idsRef.push(layer.id);
		byIdsRef[layer.id] = layer;
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

const _serializeMap = (byIds: any, tre: any, kfe: any) => (id: string) => {
	const item = byIds[id] || {};
	const children = item.children?.map(_serializeMap(byIds, tre, kfe));
	const tracks = item.tracks
		?.map((prop): TrackObject | undefined => {
			const track = tre[id + '--' + prop];
			if (!track) {
				return;
			}
			const keyframes = track.keyframes?.map((kfId) => {
				const { to, value, easing } = kfe[kfId];
				return {
					to,
					value,
					easing
				};
			});
			return {
				property: track.property,
				originalValue: item[prop],
				keyframes
			};
		})
		.filter((track) => !!track);

	return {
		...item,
		children,
		animation: { tracks }
	};
};

export const serialize = (byIds: any, ids: any, tre: any, kfe: any) =>
	ids.map(_serializeMap(byIds, tre, kfe));
