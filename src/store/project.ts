import { ShapeObject } from '@grafikjs/core';
import { defineStore } from 'pinia';
import axios from '../axios';
import { useNotification, useUser } from '.';
import { parse, serialize } from '../utils/project';

declare type IDList = string[];

declare interface ByID extends ShapeObject {
	children: IDList;
}

declare type ByIDs = {
	[key: string]: ByID;
};

declare type ProjectState = {
	width?: number;
	height?: number;
	byIds?: ByIDs;
	ids?: IDList;
};

declare type ProjectStateUndoable = {
	loading: boolean;
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
};

declare type ProjectActions = {
	fetch: (id: string) => void;
	getById: (id: string) => ByID | undefined;
	undo: () => void;
	redo: () => void;
};

export default defineStore<string, ProjectStateUndoable, ProjectGetters, ProjectActions>(
	'project',
	{
		state: () => ({
			loading: true,
			current: {},
			previous: [],
			next: []
		}),
		getters: {
			width: (state) => state.current.width,
			height: (state) => state.current.height,
			ids: (state) => state.current.ids,
			byIds: (state) => state.current.byIds,
			structuredData: (state) => serialize(state.current.byIds, state.current.ids)
		},
		actions: {
			fetch(id) {
				const _id = parseInt(id);

				if (!_id) {
					this.loading = false;
					return;
				}

				const userData = useUser();
				const { send } = useNotification();
				const { token } = userData.user;

				axios
					.get('projects/' + _id, { headers: { Authorization: 'Bearer ' + token } })
					.then((response) => {
						const {
							data: {
								project: { width, height, layers }
							}
						} = response;

						const { ids, byIds } = parse(layers);
						this.loading = false;
						this.current.width = width;
						this.current.height = height;
						this.current.ids = ids;
						this.current.byIds = byIds;
					})
					.catch((error) => {
						this.loading = false;
						send(error.message, 'error');
					});
			},
			getById(id) {
				return this.byIds?.[id];
			},
			undo() {},
			redo() {}
		}
	}
);
