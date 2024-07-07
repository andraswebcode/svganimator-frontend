import { ShapeObject } from '@grafikjs/core';
import { defineStore } from 'pinia';
import axios from '../axios';
import { useUser } from '.';
import { parse, serialize } from '../utils/project';
import { useLoader, useNotice } from '../hooks';

declare type IDList = string[];

declare interface ByID extends ShapeObject {
	children: IDList;
}

declare type ByIDs = {
	[key: string]: ByID;
};

declare type ProjectState = {
	width: number;
	height: number;
	byIds: ByIDs;
	ids: IDList;
};

declare type ProjectStateUndoable = {
	current: ProjectState;
	previous: ProjectState[];
	next: ProjectState[];
};

declare type ProjectGetters = {
	width: (state: ProjectStateUndoable) => number | undefined;
	height: (state: ProjectStateUndoable) => number | undefined;
	ids: (state: ProjectStateUndoable) => IDList | undefined;
	byIds: (state: ProjectStateUndoable) => ByIDs | undefined;
	structuredData: (state: ProjectStateUndoable) => ShapeObject[];
	rulerXMarks: (state: ProjectStateUndoable) => string[];
	rulerYMarks: (state: ProjectStateUndoable) => string[];
	rulerSubmarks: (state: ProjectStateUndoable) => string[];
};

declare type ProjectActions = {
	fetch: (id: string) => void;
	getById: (id: string) => ByID | undefined;
	updateProps: (id: string, props: any) => void;
	undo: () => void;
	redo: () => void;
};

export default defineStore<string, ProjectStateUndoable, ProjectGetters, ProjectActions>(
	'project',
	{
		state: () => ({
			current: {
				width: 400,
				height: 400,
				ids: [],
				byIds: {}
			},
			previous: [],
			next: []
		}),
		getters: {
			width: (state) => state.current.width,
			height: (state) => state.current.height,
			ids: (state) => state.current.ids,
			byIds: (state) => state.current.byIds,
			structuredData: (state) => serialize(state.current.byIds, state.current.ids),
			rulerXMarks: (state) =>
				Array(Math.ceil(state.current.width / 100))
					.fill('')
					.map((_, i) => '' + i * 100),
			rulerYMarks: (state) =>
				Array(Math.ceil(state.current.height / 100))
					.fill('')
					.map((_, i) => '' + i * 100),
			rulerSubmarks: () => Array(10).fill('')
		},
		actions: {
			fetch(id) {
				const _id = parseInt(id);

				if (!_id) {
					return;
				}

				const userData = useUser();
				const { send } = useNotice();
				const { show, hide } = useLoader();
				const { token } = userData.user;

				show('Project is loading. This might take a while...');

				axios
					.get('projects/' + _id, { headers: { Authorization: 'Bearer ' + token } })
					.then((response) => {
						const {
							data: {
								project: { width, height, layers }
							}
						} = response;

						const { ids, byIds } = parse(layers);
						this.current.width = width;
						this.current.height = height;
						this.current.ids = ids;
						this.current.byIds = byIds;
						hide();
					})
					.catch((error) => {
						send(error.response?.data.message || error.message, 'negative');
						hide();
					});
			},
			getById(id) {
				return this.byIds?.[id];
			},
			updateProps(id, props) {
				if (this.byIds?.[id]) {
					this.byIds[id] = {
						...this.byIds[id],
						...props
					};
				}
			},
			undo() {},
			redo() {}
		}
	}
);
