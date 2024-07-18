import { ShapeObject, TrackObject } from '@grafikjs/core';
import { defineStore } from 'pinia';
import axios from '../axios';
import { useUser } from '.';
import { parse, serialize } from '../utils/project';
import { useLoader, useNotice } from '../hooks';
import { UndoRedoActions } from '../plugins/undo-redo';

export type IDList = string[];

export interface ByID extends ShapeObject {
	parent: string;
	children: IDList;
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

export interface ProjectState {
	width: number;
	height: number;
	byIds: ByIDs;
	ids: IDList;
}

export type ProjectGetters = {
	structuredData: (state: ProjectState) => ShapeObject[];
	animations: (state: ProjectState) => AnimationList[];
	rulerXMarks: (state: ProjectState) => string[];
	rulerYMarks: (state: ProjectState) => string[];
	rulerSubmarks: (state: ProjectState) => string[];
};

export interface ProjectActions extends UndoRedoActions {
	fetch: (id: string) => void;
	save: () => void;
	addLayer: (layer: ByID, parent?: string) => void;
	removeLayer: (id: string) => void;
	getById: (id: string) => ByID | undefined;
	getProp: (id: string, prop: string) => any;
	updateProps: (id: string | ChangedProps, props?: Partial<ByID>) => void;
	animate: (id: string, prop: string, value: any, time: number) => void;
}

export default defineStore<string, ProjectState, ProjectGetters, ProjectActions>('project', {
	state: () => ({
		width: 400,
		height: 400,
		ids: [],
		byIds: {}
	}),
	getters: {
		structuredData: (state) => serialize(state.byIds, state.ids),
		animations: (state) =>
			state.ids
				.map((id) => ({
					id,
					tracks: state.byIds[id]?.animation?.tracks
				}))
				.filter((item) => !!item.tracks?.length),
		rulerXMarks: (state) =>
			Array(Math.ceil(state.width / 100))
				.fill('')
				.map((_, i) => '' + i * 100),
		rulerYMarks: (state) =>
			Array(Math.ceil(state.height / 100))
				.fill('')
				.map((_, i) => '' + i * 100),
		rulerSubmarks: () => Array(10).fill('')
	},
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
						data: {
							project: { width, height, layers }
						}
					} = response;

					const { ids, byIds } = parse(layers);
					this.$patch({
						width,
						height,
						ids,
						byIds
					});
					hide();
					this.startHistory();
				})
				.catch((error) => {
					send(error.response?.data.message || error.message, 'negative');
					hide();
				});
		},
		save() {
			console.log(this.structuredData);
		},
		addLayer(layer, parent) {
			const { id } = layer;
			if (!parent) {
				this.ids.push(id);
				this.byIds[id] = layer;
			} else {
				//
			}
		},
		removeLayer(id) {
			console.log(id);
		},
		getById(id) {
			return this.byIds?.[id];
		},
		getProp(id, prop) {
			if (this.byIds[id]) {
				return this.byIds[id][prop];
			}
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
		animate(id, prop, value, time) {
			const byId = this.byIds[id];
			const timeMs = time * 1000;
			if (byId) {
				if (!byId.animation) {
					byId.animation = {
						tracks: []
					};
				}
				let track = byId.animation.tracks.find((track) => track.property === prop);
				if (!track) {
					track = {
						property: prop,
						originalValue: value,
						keyframes: []
					};
					byId.animation.tracks.push(track);
				}
				let keyframe = track.keyframes.find((kf) => kf.to === timeMs);
				if (!keyframe) {
					keyframe = {
						to: timeMs,
						value
					};
					track.keyframes.push(keyframe);
				} else {
					keyframe.value = value;
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
