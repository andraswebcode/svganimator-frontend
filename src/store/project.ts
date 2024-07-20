import { KeyframeObject, ShapeObject, TrackObject, uniqueId } from '@grafikjs/core';
import { defineStore } from 'pinia';
import { isArray, omit } from 'lodash';
import { UndoRedoActions } from '../plugins/undo-redo';
import { CLASSES } from '@grafikjs/vue';

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
		addLayer(layer, parent) {
			const { tagName } = layer;
			const id = layer.id || uniqueId(tagName);
			const Shape = CLASSES[tagName];
			const defs = omit(new Shape().toJSON(), 'id', 'animation', 'tagName');

			if (!parent) {
				this.ids.push(id);
				this.byIds[id] = {
					...defs,
					...layer,
					id,
					animation: isArray(layer.animation) ? layer.animation : []
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
