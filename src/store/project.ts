import { KeyframeObject, Shape, ShapeObject, TrackObject, uniqueId } from '@grafikjs/core';
import { defineStore } from 'pinia';
import axios from '../axios';
import { useUser } from '.';
import { useLoader, useNotice } from '../hooks';
import { UndoRedoActions } from '../plugins/undo-redo';

export type IDList = string[];

export interface ByID extends Omit<ShapeObject, 'animation'> {
	parent: string;
	children: IDList;
	animation: IDList;
}

export type ByIDs = {
	[key: string]: ByID;
};

export type ChangedProps = {
	[key: string]: Partial<ByID>;
};

export type AnimationList = {
	id: string;
	tracks?: TrackObject[];
};

export interface KeyframeEntity extends KeyframeObject {
	id: string;
	shapeId: string;
	property: string;
}

export type KeyframeEntities = {
	[key: string]: KeyframeEntity;
};

export type ChangedKeyframes = {
	[key: string]: Partial<KeyframeObject>;
};

export interface ProjectState {
	width: number;
	height: number;
	byIds: ByIDs;
	ids: IDList;
	kfe: KeyframeEntities;
}

export type ProjectGetters = {};

export interface ProjectActions extends UndoRedoActions {
	fetch: (id: string) => void;
	save: () => void;
	addLayer: (layer: ByID, parent?: string) => void;
	removeLayer: (id: string) => void;
	updateProps: (id: string | ChangedProps, props?: Partial<ByID>) => void;
	addKf: (id: string, prop: string, value: any, time: number) => void;
	removeKf: () => void;
	updateKf: (id: string | ChangedKeyframes, kf?: Partial<KeyframeObject>) => void;
}

export default defineStore<string, ProjectState, ProjectGetters, ProjectActions>('project', {
	state: () => ({
		width: 400,
		height: 400,
		ids: [],
		byIds: {},
		kfe: {}
	}),
	actions: {
		fetch(id) {
			const _id = parseInt(id);

			if (!_id) {
				this.$reset();
				this.startHistory();
				return;
			}

			const userData = useUser();
			const { send } = useNotice();
			const { show, hide } = useLoader();
			const { bearerToken } = userData;

			show('Project is loading. This might take a while...');

			axios
				.get('projects/' + _id, { headers: { Authorization: bearerToken } })
				.then((response) => {
					const {
						data: { width, height, layers, layer_ids, keyframes }
					} = response;
					console.log(response.data);

					this.$patch({
						width,
						height,
						byIds: layers,
						ids: layer_ids,
						kfe: keyframes
					});
					hide();
					this.startHistory();
				})
				.catch((error) => {
					send(error.response?.data.message || error.message, 'negative');
					hide();
				});
		},
		save() {},
		addLayer(layer, parent) {
			const id = layer.id || uniqueId(layer.tagName);
			const defs = new Shape();
			defs.init({});
			if (!parent) {
				this.ids.push(id);
				this.byIds[id] = {
					...defs.toJSON(),
					...layer,
					animation: layer.animation || []
				};
			} else {
				//
			}
		},
		removeLayer(id) {
			console.log(id);
		},
		updateProps(id, props) {
			if (typeof id === 'string') {
				if (this.byIds[id] && props) {
					this.byIds[id] = {
						...this.byIds[id],
						...props
					};
				}
			} else {
				for (let _id in id) {
					this.updateProps(_id, id[_id]);
				}
			}
		},
		addKf(id, prop, value, time) {
			const layer = this.byIds[id];
			if (layer) {
				const kf: KeyframeEntity = {
					id: uniqueId('keyframe'),
					shapeId: id,
					property: prop,
					to: time * 1000,
					value
				};
				this.kfe[kf.id] = kf;
				if (!layer.animation) {
					layer.animation = [];
				}
				layer.animation.push(kf.id);
			}
		},
		removeKf() {},
		updateKf(id, kf) {
			if (typeof id === 'string') {
				if (this.kfe[id] && kf) {
					this.kfe[id] = {
						...this.kfe[id],
						...kf
					};
				}
			} else {
				for (let _id in id) {
					this.updateKf(_id, id[_id]);
				}
			}
		},
		undo() {},
		redo() {},
		canUndo() {
			return false;
		},
		canRedo() {
			return false;
		},
		startHistory() {}
	}
});
