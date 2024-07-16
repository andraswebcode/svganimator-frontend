import { ShapeObject } from '@grafikjs/core';
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

export interface ProjectState {
	width: number;
	height: number;
	byIds: ByIDs;
	ids: IDList;
	changedProps: ChangedProps;
}

export type ProjectGetters = {
	structuredData: (state: ProjectState) => ShapeObject[];
	rulerXMarks: (state: ProjectState) => string[];
	rulerYMarks: (state: ProjectState) => string[];
	rulerSubmarks: (state: ProjectState) => string[];
};

export interface ProjectActions extends UndoRedoActions {
	fetch: (id: string) => void;
	addLayer: (layer: ByID, parent?: string) => void;
	removeLayer: (id: string) => void;
	getById: (id: string) => ByID | undefined;
	getProp: (id: string, prop: string) => any;
	updateProps: (id: string, props: any) => void;
}

export default defineStore<string, ProjectState, ProjectGetters, ProjectActions>('project', {
	state: () => ({
		width: 400,
		height: 400,
		ids: [],
		byIds: {},
		changedProps: {}
	}),
	getters: {
		structuredData: (state) => serialize(state.byIds, state.ids),
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
				})
				.catch((error) => {
					send(error.response?.data.message || error.message, 'negative');
					hide();
				});
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
		removeLayer(id) {},
		getById(id) {
			return this.byIds?.[id];
		},
		getProp(id, prop) {
			if (this.byIds[id]) {
				return this.byIds[id][prop];
			}
		},
		updateProps(id, props) {
			if (this.byIds?.[id]) {
				this.byIds[id] = {
					...this.byIds[id],
					...props
				};
				this.changedProps[id] = props;
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
