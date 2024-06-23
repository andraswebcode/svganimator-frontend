import { ShapeObject } from '@grafikjs/core';
import { defineStore } from 'pinia';

declare type ProjectState = {
	width?: number;
	height?: number;
	layers?: ShapeObject[];
};

declare type ProjectStateUndoable = {
	current: ProjectState;
	previous: ProjectState[];
	next: ProjectState[];
};

declare type ProjectGetters = {};

declare type ProjectActions = {
	undo: () => void;
	redo: () => void;
};

export default defineStore<string, ProjectStateUndoable, ProjectGetters, ProjectActions>(
	'project',
	{
		state: () => ({
			current: {},
			previous: [],
			next: []
		}),
		getters: {},
		actions: {
			undo: () => {},
			redo: () => {}
		}
	}
);
